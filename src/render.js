import 'isomorphic-fetch'

import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  renderToStringWithData
} from 'react-apollo'

import {
  groups as groupsReducer,
  auth as authReducer,
  auth0 as auth0Reducer
} from './app/reducers'

import App from './app/App'
import html from './html'

let assets = {}

if (process.env.RAZZLE_ASSETS_MANIFEST) {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
} else {
  assets = require('../build/assets.json')
}

export default async (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: process.env.RAZZLE_URI + '/graphql',
      opts: {
        credentials: 'same-origin',
        headers: req.headers
      }
    })
  })

  const store = createStore(
    combineReducers({
      apollo: client.reducer(),
      groups: groupsReducer,
      auth: authReducer,
      auth0: auth0Reducer
    }),
    {
      // initial state
      auth: req.user
    },
    compose(applyMiddleware(client.middleware()))
  )

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

  const content = await renderToStringWithData(app)

  const initialState = JSON.stringify({
    auth: req.user,
    apollo: client.getInitialState()
  }).replace(/</g, '\\u003c')

  const js = (assets && assets.client && assets.client.js) || ''
  const styles = sheet.getStyleTags()
  const markup = html(js, styles, content, initialState)

  res.status(200)
  res.send(markup)
  res.end()
}
