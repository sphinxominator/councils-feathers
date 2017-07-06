import 'isomorphic-fetch'

import React from 'react'
import path from 'path'
import fs from 'fs'

import { StaticRouter } from 'react-router-dom'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  renderToStringWithData
} from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import {
  groups as groupsReducers,
  auth as authReducer
} from '../app/src/reducers'

import App from '../app/src/App'

export default async (req, res) => {
  let filePath
  let devScript = ''

  if (process.env.NODE_ENV !== 'production') {
    filePath = path.resolve(__dirname, '..', 'app', 'public', 'index.html')
    devScript = `<script type="text/javascript" src="http://localhost:3000/static/js/bundle.js"></script>`
  } else {
    filePath = path.resolve(__dirname, '..', 'app', 'build', 'index.html')
  }

  const htmlData = await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      err ? reject(err) : resolve(htmlData)
    })
  })

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    networkInterface: createNetworkInterface({
      uri: process.env.URI + '/graphql',
      opts: {
        credentials: 'same-origin',
        // transfer request headers to networkInterface so that they're accessible to proxy server
        // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
        headers: req.headers
      }
    })
  })

  const store = createStore(
    combineReducers({
      apollo: client.reducer(),
      groups: groupsReducers,
      auth: authReducer
    }),
    {
      auth: req.user
    }, // initial state
    compose(applyMiddleware(client.middleware()))
  )

  //console.log(req.user);

  const sheet = new ServerStyleSheet()

  const app = sheet.collectStyles(
    <Provider store={store}>
      <ApolloProvider client={client} store={store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  )

  renderToStringWithData(app).then(content => {
    const initialState = formattedState({
      auth: req.user,
      apollo: client.getInitialState()
    })
    const styles = sheet.getStyleTags()
    const markup = injectVariables(htmlData, {
      content,
      styles,
      devScript,
      initialState
    })
    res.status(200)
    res.send(markup)
    res.end()
  })
}

const formattedState = state => `
  <script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
    window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
  </script>
`

const injectVariables = (html, variables = {}) =>
  Object.keys(variables).reduce(
    (acc, key) => acc.replace(`<replaceme id="{{${key}}}"/>`, variables[key]),
    html
  )
