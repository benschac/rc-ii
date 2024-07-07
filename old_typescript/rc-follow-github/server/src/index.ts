import { tokens } from './../../../game-of-life/src/tokens'
import { OAuthApp } from '@octokit/oauth-app'
// import { App } from 'octokit'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import fetch from 'node-fetch'
import { basicAuth } from 'hono/basic-auth'
import { etag } from 'hono/etag'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { githubAuth } from '@hono/oauth-providers/github'

// const app = new OAuthApp({
//   clientId,
//   clientSecret,
//   defaultScopes: ['repo', 'gist'],
// })

const app = new Hono()

// const ghapp = new OAuthApp({
//   clientType: 'oauth-app',
//   clientId: '1234567890abcdef1234',
//   clientSecret: '1234567890abcdef1234567890abcdef12345678',
// })

// app.on('token', async ({ token, octokit }) => {
//   const { data } = await octokit.request('GET /user')
//   console.log(`Token retrieved for ${data.login}`)
// })
// Mount Builtin Middleware
app.use('*', poweredBy())
// app.use(
//   '*',
//   cors({
//     origin: '*',
//     allowHeaders: ['Authorization'],
//   })
// )
app.use('*', logger())
app.use(
  '/github',
  githubAuth({
    // client_id,
    // client_secret,
    scope: ['public_repo', 'read:user', 'user', 'user:email', 'user:follow'],
    oauthApp: true,
  })
)
app.use(
  '/token/*',
  cors({
    origin: 'http://localhost:9000',
    allowHeaders: [
      'Content-Type',
      'X-Custom-Header',
      'Upgrade-Insecure-Requests',
    ],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)
app.post('/token', async (c) => {
  const params = await c.req.json()
  const octo = new OAuthApp({
    clientType: 'oauth-app',
    // clientId: client_id,
    defaultScopes: [
      'repo',
      'gist',
      'read:user',
      'user',
      'user:email',
      // 'user:follow',
    // ],
    // clientSecret: client_secret,
  })
  const token = await octo.createToken({
    code: params.code,
  })

  console.log(params.code, token)
  // const token = await octo.createToken({
  //   code: params,
  // })
  console.log(params)
  // const thing = await octo.createToken({
  //   code: params,
  // })
  // console.log(thing.authentication.token)
  return c.json({ token: token.authentication.token })
  // return c.text(
  //   `Your OAuth token  params: ${JSON.stringify(params)}, token is ${thing.authentication.token}`
  // )
})

// app.get('/github', (c) => {
//   const token = c.get('token')
//   const refreshToken = c.get('refresh-token')
//   const user = c.get('user-github')
//   console.log('hiiiiii')

//   return c.json({
//     token,
//     refreshToken,
//     user,
//   })
// })

// app.use(
//   '/auth/*',
//   basicAuth({
//     username: 'hono',
//     password: 'acoolproject',
//   })
// )
// app.get(
//   '/github',
//   githubAuth({
//     client_id,
//     client_secret,
//     scope: ['public_repo', 'read:user', 'user', 'user:email', 'user:follow'],
//     oauthApp: true,
//   }),
//   async (c) => {
//     const token = c.get('token')
//     const refreshToken = c.get('refresh-token')
//     const user = c.get('user-github')
//     console.log('hiiiiii')
//     console.log({
//       token,
//       refreshToken,
//       user,
//     })

//     const octo = new OAuthApp({
//       clientType: 'oauth-app',
//       clientId: client_id,
//       clientSecret: client_secret,
//       scope: ['public_repo', 'read:user', 'user', 'user:email', 'user:follow'],
//       redirectUrl: 'http://localhost:9000',
//     })
//     const params = c.req.query()
//     const thing = await octo.createToken({
//       code: params.code,
//     })
//     console.log(thing.authentication.token)
//     // return c.redirect('http://localhost:9000/')
//   }
// )

// app.get('/github', (c) => {
//   const token = c.get('token')
//   const refreshToken = c.get('refresh-token')
//   const user = c.get('user-github')
//   console.log('hiiiiii')
//   console.log({
//     token,
//     refreshToken,
//     user,
//   })

//   return c.json({
//     token,
//     refreshToken,
//     user,
//   })
// })
app.use('/etag/*', etag())

// Custom Middleware
// Add Custom Header
app.use('/hello/*', async (c, next) => {
  await next()
  c.header('X-message', 'This is addHeader middleware!')
})

// Add X-Response-Time header
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  c.header('X-Response-Time', `${ms}ms`)
})

// Custom Not Found Message
app.notFound((c) => {
  return c.text('Custom 404 Not Found', 404)
})

// Error handling
app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

// Routing
app.get('/', (c) => c.text('Hono!!'))
// Use Response object directly
app.get('/hello', () => new Response('This is /hello'))

// Named parameter
app.get('/entry/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`Your ID is ${id}`)
})

// Nested route
const book = new Hono()
book.get('/', (c) => c.text('List Books'))
book.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.text('Get Book: ' + id)
})
book.post('/', (c) => c.text('Create Book'))
app.route('/book', book)

// Redirect
app.get('/redirect', (c) => c.redirect('/'))
// Authentication required
app.get('/auth/*', (c) => c.text('You are authorized'))
// ETag
app.get('/etag/cached', (c) => c.text('Is this cached?'))

// Async
app.get('/fetch-url', async (c) => {
  const response = await fetch('https://example.com/')
  return c.text(`https://example.com/ is ${response.status}`)
})

// Request headers
app.get('/user-agent', (c) => {
  const userAgent = c.req.header('User-Agent')
  return c.text(`Your UserAgent is ${userAgent}`)
})
app.get('/oauth', async (c) => {
  const octo = new OAuthApp({
    clientType: 'oauth-app',
    // clientId: client_id,
    // clientSecret: client_secret,
    redirectUrl: 'http://localhost:9000',
  })
  const params = c.req.query()
  const thing = await octo.createToken({
    code: params.code,
  })
  console.log(thing.authentication.token)
  return c.text(
    `Your OAuth token  params: ${JSON.stringify(params)}, token is ${thing.authentication.token}`
  )
  // const token = c.req.header('Authorization')
  // do the check here
  // const octo = new Octokit({ clientId: client_id, clientSecret: client_secret })
})

// JSON
app.get('/api/posts', prettyJSON(), (c) => {
  const posts = [
    { id: 1, title: 'Good Morning' },
    { id: 2, title: 'Good Afternoon' },
    { id: 3, title: 'Good Evening' },
    { id: 4, title: 'Good Night' },
  ]
  return c.json(posts)
})
// status code
app.post('/api/posts', (c) => c.json({ message: 'Created!' }, 201))
// default route
app.get('/api/*', (c) => c.text('API endpoint is not found', 404))

// Throw Error
app.get('/error', () => {
  throw Error('Error has occurred')
})

// @ts-ignore
app.get('/type-error', () => 'return not Response instance')

export default app
