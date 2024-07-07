import '@tamagui/core/reset.css'
import { rules } from './rules'
import { Octokit } from '@octokit/core'

import {
  Button,
  Spacer,
  TamaguiProvider,
  XStack,
  YStack,
  getTokens,
  Text,
} from 'tamagui'
// mport { Octokit } from '@octokit/core'
import { LinearGradient } from 'tamagui/linear-gradient'

import config from './tamagui.config'
import React from 'react'
// const code = new URL(location.href).searchParams.get('code')
// if (code) {
//   // remove ?code=... from URL
//   const path =
//     location.pathname +
//     location.search.replace(/\b(code|state)=\w+/g, '').replace(/[?&]+$/, '')
//   history.replaceState({}, '', path)

//   // exchange the code for a token with your backend.
//   // If you use https://github.com/octokit/oauth-app.js
//   // the exchange would look something like this
//   const response = await fetch('/api/github/oauth/token', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({ code }),
//   })
//   const { token } = await response.json()
// `token` is the OAuth Access Token that can be use

// const { Octokit } = await import('https://esm.sh/@octokit/core')
// const octokit = new Octokit({ auth: token })

//   const {
//     data: { login },
//   } = await octokit.request('GET /user')
//   alert(`Hi there, ${login}`)
// }

export const Root = () => {
  const [code, setCode] = React.useState<string | null>(null)
  const [setOctokit] = React.useState<Octokit | null>(null)

  // const octokit = new Octokit({ auth: `<GET YOUR PAT FREN>` })
  // React.useEffect(() => {
  //   async function setup() {
  //     // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  //     const thing = await octokit.auth()
  //   }
  // }, [])
  async function getGithubCode() {
    console.log('hello')
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=${encodeURIComponent(scope)}`
    // const octokit = new Octokit({
    //  client
    // })
    // app.oauthLoginUrl()
    // const res = await fetch('http://localhost:3000/github')
    //   .then((res) => res.json())
    //   .catch((e) => console.error(e))
    // console.log(res)

    window.location.href = 'http://localhost:3000/github'
  }

  // const response = await fetch('http://localhost:3000/github')
  //   .then((res) => res.json())
  //   .catch((e) => console.error(e))

  // console.log(response)

  const getOauthToken = async () => {
    const code = new URL(location.href).searchParams.get('code')
    console.log('code', code)
    setCode(code)
    const res = await fetch('http://localhost:3000/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e))
    console.log(res)
    if (code) {
      // remove ?code=... from URL
      const path =
        location.pathname +
        location.search.replace(/\b(code|state)=\w+/g, '').replace(/[?&]+$/, '')
      history.replaceState({}, '', path)
      const octokit = new Octokit({ auth: res.token })
      const {
        data: { login },
      } = await octokit.request('GET /user')
      alert('Hi there, ' + login)

      // exchange the code for a token with your backend.
      // If you use https://github.com/octokit/oauth-app.js
      // the exchange would look something like this
      // const response = await fetch('/api/github/oauth/token', {
      // const response = await fetch('/api/github/oauth/token', {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      //   body: JSON.stringify({ code }),
      // })
      // const { token } = await response.json()
    }
    // `token` is the OAuth Access Token that can be use
    // const { Octokit } = await import('https://esm.sh/@octokit/core')
    // const octokit = new Octokit({ auth: token })
    //   const {
    //     data: { login },
    //   } = await octokit.request('GET /user')
    //   alert(`Hi there, ${login}`)
    // }
  }
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <YStack f={1} ai="center" jc="center">
        <Button
          onPress={async () => {
            await getGithubCode()
          }}
        >
          get token
        </Button>
        <Button
          onPress={() => {
            getOauthToken()
          }}
        >
          get 0auth token
        </Button>
        <LinearGradient zIndex={-1} fullscreen colors={['red', 'blue']} />
      </YStack>
    </TamaguiProvider>
  )
}
