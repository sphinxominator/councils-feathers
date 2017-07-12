import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { withHandlers, withProps, compose, pure } from 'recompose'

const LoginButtonPure = ({ onClick, isLogin = true }) =>
  <Button onClick={onClick}>
    {' '}{isLogin ? 'Log ind' : 'Log ud'}{' '}
  </Button>

const Button = styled.button`
  background-color: ${props => (props.isLogin ? 'blue' : 'purple')};
  border: 1px solid black;
  color: white;
  height: 1.5rem;
`

const authorize = lock => {
  lock.authorize({
    connection: 'google-oauth2',
    redirectUri: process.env.REACT_APP_URI + '/auth/callback',
    responseType: 'token'
  })
}

export const LoginButton = compose(
  connect(({ auth0, auth }) => ({ lock: auth0.lock, auth })),
  withHandlers({
    onClick: props => event => {
      !props.auth ? authorize(props.lock) : console.log('loging out')
    }
  }),
  withProps(props => ({ isLogin: !props.auth })),
  pure
)(LoginButtonPure)
