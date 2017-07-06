import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import isNode from 'detect-node'
import auth0 from 'auth0-js'

export class AuthProvider extends React.Component {
  state = { lock: null }

  componentDidMount() {
    if (!isNode) {
      let lock = new auth0.WebAuth({
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        domain: process.env.REACT_APP_AUTH0_DOMAIN
      })

      this.setState({ lock })
    }
  }

  getChildContext() {
    return { lock: this.state.lock }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

AuthProvider.childContextTypes = {
  lock: PropTypes.object
}

const authorize = lock => {
  lock.authorize({
    connection: 'google-oauth2',
    redirectUri: process.env.REACT_APP_URI + '/auth/callback',
    responseType: 'token'
  })
}

export const LoginButton = ({ label = 'Login' }, { lock }) =>
  <Button onClick={() => authorize(lock)}>
    {' '}{label}{' '}
  </Button>

LoginButton.contextTypes = {
  lock: PropTypes.object
}

const Button = styled.button`
  background-color: blue;
  border: 1px solid black;
  color: white;
`
