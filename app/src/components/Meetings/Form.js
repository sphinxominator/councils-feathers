import React from 'react'
import styled from 'styled-components'

import { pure, compose, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import displayLoadingState from '../Loading'
import { MeetingsQuery, GroupsQuery, CreateMeeting } from '../../queries'

import Modal from '../Modal'

export const MeetingFormPure = ({
  data: { groups },
  activeGroupIndex,
  value,
  onSubmit,
  onChange,
  onGroupSelectChange
}) =>
  <Modal locationOnClose="/meetings">
    <Meeting color={groups[activeGroupIndex].color}>
      <Select
        value={activeGroupIndex}
        onChange={onGroupSelectChange}
        color={groups[activeGroupIndex].color}
      >
        {groups.map((group, i) =>
          <Option value={i} key={group.id}>
            {group.name}
          </Option>
        )}
      </Select>
      <Input type="button" value="Opret møde" onClick={onSubmit} />
    </Meeting>
  </Modal>

const Input = styled.input`
  padding: .5rem;
  margin: 1rem;
`

const Meeting = styled.div`
  align-items: center;
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`

const Select = styled.select`
  background-color: ${props => props.color};
  border: 0;
  color: white;
  font-size: 2rem;
  margin-top: 1rem;
`

const Option = styled.option`
  background-color: transparent;
  border: 0;
  color: white;
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
  onSubmit: props => event => {
    event.preventDefault()
    const group = props.data.groups[props.activeGroupIndex]
    props
      .submit({
        text: '',
        groupId: group.id
      })
      .catch(error => console.log(error.message))
  },
  onGroupSelectChange: props => event => {
    props.changeGroup(event.target.value)
  }
}

const mapStateToProps = ({ groups }) => ({
  activeGroup: groups.activeGroup
})

const findActiveGroupIndex = props => {
  const activeGroup = props.data.groups.findIndex(
    group => group.id === props.activeGroup
  )

  // Let's just pick the first in the list
  return activeGroup > -1 ? activeGroup : 0
}

export default compose(
  connect(mapStateToProps),
  graphql(GroupsQuery),
  graphql(CreateMeeting, submitProp),
  displayLoadingState,
  withState('activeGroupIndex', 'changeGroup', findActiveGroupIndex),
  withHandlers(handlers),
  pure
)(MeetingFormPure)
