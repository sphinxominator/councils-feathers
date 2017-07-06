import Immutable from 'seamless-immutable'
import { SET_ACTIVE_GROUP } from '../actions'

const initialState = Immutable({
  activeGroup: '1'
})

export function groups(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_GROUP:
      const { groupId } = action

      return state.merge({
        activeGroup: state.activeGroup !== groupId ? groupId : null
      })

    default:
      return state
  }
}

const initialAuthState = Immutable({
  auth: null
})

export function auth(state = initialAuthState, action) {
  return state
}
