import { connect } from 'react-redux'
import { compose, renderNothing, withProps, branch } from 'recompact'
import { graphql } from 'react-apollo'

import displayLoadingState from './Loading'
import { CurrentUserQuery } from '../queries'

export default compose(
  connect(({ auth }) => ({ auth })),
  branch(props => !props.auth.userId, renderNothing),
  withProps(props => ({ userId: props.auth.userId })),
  graphql(CurrentUserQuery, {
    options: ({ userId }) => ({ variables: { id: userId } })
  }),
  displayLoadingState
)
