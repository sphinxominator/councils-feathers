import React from 'react'
import styled from 'styled-components'

import { pure, compose, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { MeetingsQuery, CreateMeeting } from '../../queries'

import Modal from '../Modal'

export const MeetingFormPure = ({ value, onSubmit, onChange }) =>
  <Modal locationOnClose="/meetings">
    <form onSubmit={onSubmit}>
      Meeting
      <Input type="text" placeholder="text" onChange={onChange} />
    </form>
  </Modal>

const Input = styled.input`
  padding: .5rem;
  margin: 1rem;
`

const submitProp = {
  props: ({ mutate }) => ({
    submit: props =>
      mutate({
        variables: {
          meeting: {
            text: props.text,
            groupId: props.groupId
          }
        },
        update: (store, { data: { createMeeting } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: MeetingsQuery })
          // Add our comment from the mutation to the end.
          data.meetings.unshift(createMeeting)
          // Write our data back to the cache.
          store.writeQuery({ query: MeetingsQuery, data })
        }
      })
  })
}

const handlers = {
  onChange: props => event => {
    props.updateValue(event.target.value)
  },
  onSubmit: props => event => {
    event.preventDefault()
    props
      .submit({
        text: props.value,
        groupId: props.activeGroup
      })
      .catch(error => console.log(error.message))
  }
}

const mapStateToProps = ({ groups }) => ({
  activeGroup: groups.activeGroup
})

export default compose(
  connect(mapStateToProps),
  graphql(CreateMeeting, submitProp),
  withState('value', 'updateValue', ''),
  withHandlers(handlers),
  pure
)(MeetingFormPure)
