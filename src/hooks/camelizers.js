import humps from 'humps'

export function decamelizeModel() {
  return hook => {
    hook.data = humps.decamelizeKeys(hook.data)
    return hook
  }
}

export function camelizeModel() {
  return hook => {
    hook.result = humps.camelizeKeys(hook.result)
    return hook
  }
}
