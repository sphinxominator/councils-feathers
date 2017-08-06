import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './app/registerServiceWorker'

import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import {
  groups as groupsReducers,
  auth as authReducer,
  auth0 as auth0Reducer
} from './app/reducers'

import App from './app/App'

const networkInterface = createNetworkInterface({
  opts: {
    credentials: 'same-origin'
  },
  uri: '/graphql'
})

const client = new ApolloClient({ networkInterface })

const initialState = window.__INITIAL_STATE__

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    groups: groupsReducers,
    auth: authReducer,
    auth0: auth0Reducer
  }),
  initialState,
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

const root = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client} store={store}>
        <App />
      </ApolloProvider>
    </Provider>
  </BrowserRouter>,
  root
)

/*if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <ApolloProvider client={client} store={store}>
            <NextApp />
          </ApolloProvider>
        </Provider>
      </BrowserRouter>,
      root
    )
  })
}*/

registerServiceWorker()
