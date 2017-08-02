import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { withProps, compose, pure, branch, renderNothing } from 'recompose'

const LoginButtonPure = ({ href, provider = 'google', isLogin = true }) =>
  <Button href={'/auth/login/' + provider}>
    {' '}{isLogin ? 'Log ind' : 'Log ud'}{' '}
  </Button>

const Button = styled.a`
  background-color: ${({ isLogin }) => (isLogin ? 'blue' : 'purple')};
  border: 1px solid black;
  color: white;
  height: 1.5rem;
`

export const LoginButton = compose(
  connect(({ auth }) => ({ auth })),
  withProps(({ auth }) => ({
    isLogin: !auth
  })),
  branch(({ isLogin }) => !isLogin, renderNothing),
  pure
)(LoginButtonPure)
