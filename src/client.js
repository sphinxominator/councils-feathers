import React from 'react'
import App from './clientApp'
import { render } from 'react-dom'

import registerServiceWorker from './app/registerServiceWorker'

render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}

registerServiceWorker()
