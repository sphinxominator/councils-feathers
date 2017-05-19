import React from 'react';
import Auth0Lock from 'auth0-lock';

export default class App extends React.Component {
  componentDidMount() {
    this.lock = new Auth0Lock('B1Y0w8pMQ9LXK5REYBigK06PGvzqdCK0', 'councils.eu.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3030/auth/callback',
        responseType: 'code',
        params: {
          scope: 'openid email'
        }
      }
    });
  }

  showLock() {
    this.lock.show();
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1 onClick={()=>this.showLock()}>Hello World</h1>
      </div>);
  }
}
