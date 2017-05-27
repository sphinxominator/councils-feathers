import 'isomorphic-fetch';

import React from 'react';
import path from 'path';
import fs from 'fs';

import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider, renderToStringWithData } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { groups as groupsReducers } from '../app/src/reducers'

import App from '../app/src/App';

export default async (req, res) => {

  //const filePath = path.resolve(__dirname, '..', 'app', 'build', 'index.html')
  const filePath = path.resolve(__dirname, '..', 'app', 'public', 'index.html');
  const devScript = `<script type="text/javascript" src="http://localhost:3000/static/js/bundle.js"></script>`

  const htmlData = await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      err ? reject(err) : resolve(htmlData);
    })
  });

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
    const initialState = {'apollo': client.getInitialState() };
    const styles = sheet.getStyleTags();
    const markup = htmlData.replace('<!--{{SSR}}-->', content).replace('<!--{{STYLES}}-->', styles).replace('<!--{{DEVSCRIPT}}-->', devScript).replace('<!--{{INITIAL_STATE}}-->', formattedState(initialState));
    res.status(200);
    res.send(markup);
    res.end();
  });
};

const formattedState = (state) => (`
  <script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
    window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
  </script>
`)
