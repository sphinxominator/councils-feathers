import React from 'react';

import { ApolloClient,  ApolloProvider, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { groups as groupsReducers } from './reducers';
import { Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './components/Auth';
import Header from './Header';
import Main from './Main';

import theme from './theme';

const networkInterface = createNetworkInterface({
  opts: {
    credentials: 'same-origin'
  },
  uri: '/graphql'
});

const client = new ApolloClient({ networkInterface });

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    groups: groupsReducers
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);


export default () => (
  <Provider store={store}>
    <ApolloProvider client={client} store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Route path='/' component={Header} />
          <Route path='/' component={Main} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>
);
