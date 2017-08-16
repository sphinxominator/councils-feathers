import 'isomorphic-fetch'
import { ensuredEnvVariables } from '../../utils'

export default class UserService {
  setup(app) {
    this.app = app

    try {
      this.auth0 = ensuredEnvVariables({
        domain: 'RAZZLE_AUTH0_DOMAIN',
        client_id: 'RAZZLE_AUTH0_MANAGEMENT_ID',
        client_secret: 'RAZZLE_AUTH0_MANAGEMENT_SECRET'
      })

      this.fetchAccessToken().then(
        accessToken => (this.accessToken = accessToken)
      )
    } catch (error) {
      this.app.debug(error)
    }
  }

  async fetchAccessToken() {
    const { domain, client_id, client_secret } = this.auth0
    const response = await fetch(`https://${domain}/oauth/token`, {
      method: 'post',
      body: JSON.stringify({
        client_id,
        client_secret,
        audience: `https://${domain}/api/v2/`,
        grant_type: 'client_credentials'
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    const json = await response.json()

    if (!json.access_token) {
      this.app.debug(json)
      throw new Error(
        "We did not recieve an Auth0 Access Token. Authentication won't work."
      )
    }

    this.app.debug('Auth0 Access Token recieved.')
    return json.access_token
  }

  async get(id, params) {
    const response = await fetch(
      `https://${this.auth0.domain}/api/v2/users/${id}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`
        })
      }
    )
    return await response.json()
  }
}
