import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isNode from 'detect-node';

const Auth0Lock = !isNode ? require('auth0-lock').default : null;

export class AuthProvider extends React.Component {
  state = { lock: null }

  componentDidMount(){
    if(Auth0Lock){
      let lock = new Auth0Lock('B1Y0w8pMQ9LXK5REYBigK06PGvzqdCK0', 'councils.eu.auth0.com', {
        auth: {
          redirectUrl: 'http://localhost:3001/auth/callback',
          responseType: 'code',
          params: {
            scope: 'openid email'
          }
        }
      });

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
    );
  }
}

AuthProvider.childContextTypes = {
  lock: PropTypes.object
}

export const LoginButton = ({ label = 'Login' }, { lock }) => (
  <Button onClick={() => lock && lock.show() }> { label } </Button>
)

LoginButton.contextTypes = {
  lock: PropTypes.object
}

const Button = styled.button`
  background-color: blue;
  color: white;
`
