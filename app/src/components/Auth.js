import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Auth0Lock from 'auth0-lock';

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.lock = new Auth0Lock('B1Y0w8pMQ9LXK5REYBigK06PGvzqdCK0', 'councils.eu.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000/auth/callback',
        responseType: 'code',
        params: {
          scope: 'openid email'
        }
      }
    });
  }

  getChildContext() {
    return { lock: this.lock }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AuthProvider.childContextTypes = {
  lock: PropTypes.object
}

export const LoginButton = ({ label = 'Login' }, { lock }) => (
  <Button onClick={() => lock.show() }> { label } </Button>
)

LoginButton.contextTypes = {
  lock: PropTypes.object
}

const Button = styled.button`
  background-color: blue;
  color: white;
`
