import { compose, withState, branch, renderComponent } from 'recompact'
import { Redirect } from 'react-router'

const withRedirect = compose(
  withState('to', 'redirect', null),
  branch(props => props.to, renderComponent(Redirect))
)

export default withRedirect
