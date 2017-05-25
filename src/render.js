import 'isomorphic-fetch';

import React from 'react';

import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider, renderToStringWithData } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { groups as groupsReducers } from '../app/src/reducers'

import App from '../app/src/App';

const render = (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:3001/graphql',
      opts: {
        credentials: 'same-origin',
        // transfer request headers to networkInterface so that they're accessible to proxy server
        // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
        headers: req.headers,
      },
    }),
  });

  const store = createStore(
    combineReducers({
      apollo: client.reducer(),
      groups: groupsReducers
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
    )
  );

  const sheet = new ServerStyleSheet();

  const app = sheet.collectStyles(
    <Provider store={store}>
      <ApolloProvider client={client} store={store}>
        <StaticRouter location={req.originalUrl} context={{}}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  );

  renderToStringWithData(app).then((content) => {
    const initialState = {[client.reduxRootKey]: client.getInitialState() };
    const styles = sheet.getStyleTags();
    const markup = html(content, initialState, styles);

    res.status(200);
    res.send(`<!doctype html>\n${markup}`);
    res.end();
  });
}

function html(content, state, styles) {
  return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }

          [data-reactroot] {
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
        </style>
        ${styles}
      </head>
      <body>
        <div id="content">${content}</div>
        <script>
            window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}
         </script>
         <script type="text/javascript" src="http://localhost:3001/build/static/js/main.11d55634.js"></script>
      </body>
    </html>`
}


module.exports = render;
