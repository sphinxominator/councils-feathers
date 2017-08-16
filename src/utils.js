// Every value in the given object should an env name.
// If the env is set, a new object is returned with the value
// being replaced by the value of the env variable.
export const ensuredEnvVariables = vars =>
  Object.keys(vars).reduce((newVars, name) => {
    let envVar = vars[name]
    if (process.env[envVar]) {
      newVars[name] = process.env[envVar]
      return newVars
    } else {
      throw new Error(`${envVar} is not set.`)
    }
  }, {})
