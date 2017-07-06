export const SET_ACTIVE_GROUP = 'SET_ACTIVE_GROUP'

export function setActiveGroup(groupId) {
  return {
    type: SET_ACTIVE_GROUP,
    groupId
  }
}
