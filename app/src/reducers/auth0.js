import auth0 from 'auth0-js'
import isNode from 'detect-node'

const lock = !isNode
  ? new auth0.WebAuth({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      domain: process.env.REACT_APP_AUTH0_DOMAIN
    })
  : {}

const initialState = {
  lock
}

export default (state = initialState, action) => {
  return state
}
