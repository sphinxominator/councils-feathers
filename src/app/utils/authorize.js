export const authorize = (roles, requiredRoles) => {
  console.log(roles, requiredRoles)
  const answer = roles.find(role => requiredRoles.indexOf(role) > -1)
  console.log(!!answer)
  return !!answer
}
