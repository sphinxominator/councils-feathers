import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock('B1Y0w8pMQ9LXK5REYBigK06PGvzqdCK0', 'councils.eu.auth0.com', {
  auth: {
    redirectUrl: 'http://localhost:3000/auth/callback',
    responseType: 'code',
    params: {
      scope: 'openid email'
    }
  }
});
