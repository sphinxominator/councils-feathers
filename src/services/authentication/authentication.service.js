const auth = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const jwtDecode = require('jwt-decode');
const Auth0Strategy = require('passport-auth0');

module.exports = function () {
  const app = this;

  app.configure(auth({
    secret: process.env.AUTH0_CLIENT_SECRET,
    jwt: {
      audience: process.env.AUTH0_CLIENT_ID,
      issuer: 'https://' + process.env.AUTH0_DOMAIN + '/'
    }
  }));

  app.configure(jwt({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.AUTH0_CLIENT_SECRET,
    service: 'api/users'
  }));

  app.passport.use(new Auth0Strategy({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.URI + '/auth/callback'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, { profile, token: extraParams.id_token });
    }
  ));

  app.get('/auth/callback',
    auth.express.authenticate('auth0', { failureRedirect: '/failure'}),
    function(req, res){
      // Set the cookie to expire with the token
      const { exp } = jwtDecode(req.user.token);
      const expires = new Date(exp * 1000);

      res.cookie('feathers-jwt', req.user.token, { expires })
      res.redirect('/');
    }
  );
};

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies){
    token = req.cookies['feathers-jwt'];
  }
  return token;
};
