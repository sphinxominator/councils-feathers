//import auth0 from 'auth0-js'
//import isNode from 'detect-node'

const credentials = {
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  redirectUri: process.env.REACT_APP_URI + '/auth/callback'
}

//const lock = !isNode ? new auth0.WebAuth(credentials) : {}

const initialState = {
  lock: {},
  credentials
}

export default (state = initialState, action) => {
  return state
}
