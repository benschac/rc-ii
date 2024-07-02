import { createRoot } from 'react-dom/client'

import { Root } from './Root'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<Root />)
}
