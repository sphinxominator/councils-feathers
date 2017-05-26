import React from 'react';

import { ThemeProvider } from 'styled-components';
//import { AuthProvider } from './components/Auth';
import { Route } from 'react-router-dom'

import Header from './components/Header';
import Main from './components/Main';

import theme from './theme';

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <Route path='/' component={Header} />
      <Route path='/' component={Main} />
    </div>
  </ThemeProvider>
);
