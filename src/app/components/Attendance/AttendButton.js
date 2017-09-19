import React from 'react'
import styled from 'styled-components'

import { compose, withHandlers } from 'recompact'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'

import requiresAuth from '../RequiresAuth'
import { MeetingQuery, createAttendant } from '../../queries'

export const AttendFormPure = ({ data: { user }, handleSubmit }) =>
  <Button onClick={handleSubmit}>
    {'Tilmed ' + user.name}
  </Button>

const Button = styled.a``

const attend = {
  props: ({ mutate }) => ({
    attend: ({ userId, meetingId }) =>
      mutate({
        variables: {
          attendant: {
            userId,
            meetingId
          }
        }
      })
  })
}

export default compose(
  withRouter,
  graphql(MeetingQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id } })
  }),
  graphql(createAttendant, attend),
  requiresAuth,
  withHandlers({
    handleSubmit: props => event => {
      props
        .attend({
          userId: props.userId,
          meetingId: props.match.params.id
        })
        .then(response => console.log(response))
    }
  })
)(AttendFormPure)
