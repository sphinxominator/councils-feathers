import React from 'react'
import styled from 'styled-components'

import { ThemeProvider } from 'styled-components'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Main from './components/Main'
import Navigator from './components/Navigator'

import theme from './theme'

export default () =>
  <ThemeProvider theme={theme}>
    <Background>
      <Route path="/" component={Header} />
      <Route path="/" component={Main} />
      <Route path="/" component={Navigator} />
    </Background>
  </ThemeProvider>

const Background = styled.div`
  background-color: #fafafa;
  font-family: 'Roboto', sans-serif;
`
