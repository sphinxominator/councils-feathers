import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { withHandlers, compose, pure } from 'recompose'

const LoginButtonPure = ({ onClick, label = 'Login' }) =>
  <Button onClick={onClick}>
    {' '}{label}{' '}
  </Button>

const Button = styled.button`
  background-color: blue;
  border: 1px solid black;
  color: white;
`

const authorize = lock => {
  lock.authorize({
    connection: 'google-oauth2',
    redirectUri: process.env.REACT_APP_URI + '/auth/callback',
    responseType: 'token'
  })
}

export const LoginButton = compose(
  connect(({ auth0 }) => ({ lock: auth0.lock })),
  withHandlers({
    onClick: props => event => authorize(props.lock)
  }),
  pure
)(LoginButtonPure)
