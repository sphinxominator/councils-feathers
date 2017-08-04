import React from 'react'
import styled from 'styled-components'

import { pure, compose, withState, withHandlers, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import displayLoadingState from '../Loading'
import withRedirect from '../Redirect'
import { MeetingsQuery, GroupsQuery, CreateMeeting } from '../../queries'

import Modal from '../Modal'

import Datepicker from '../Datepicker'

export const MeetingFormPure = ({
  data: { groups },
  activeGroup,
  activeGroupIndex,
  onSubmit,
  onSelectChange,
  date,
  setDate
}) =>
  <Modal locationOnClose="/meetings">
    <Meeting color={activeGroup.color}>
      <Select
        value={activeGroupIndex}
        onChange={onSelectChange}
        color={activeGroup.color}
      >
        {groups.map((group, i) =>
          <Option value={i} key={group.id}>
            {group.name}
          </Option>
        )}
      </Select>
      <Datepicker onChange={setDate} value={date} />
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
  cursor: pointer;
  margin-top: 1.5rem;
  font-size: 1.7rem;
  font-weight: bold;

  transition: box-shadow 0.15s ease-in;

  &:hover {
    text-shadow: 0 19px 60px rgba(0, 0, 0, .3), 0 15px 20px rgba(0, 0, 0, .22);
  }
`

const Option = styled.option`
  background-color: transparent;
  border: 0;
  color: white;
`

const submitProp = {
  props: ({ mutate }) => ({
    submit: ({ date, groupId }) =>
      mutate({
        variables: {
          meeting: {
            date,
            groupId
          }
        },
        update: (store, { data: { createMeeting } }) => {
          const data = store.readQuery({ query: MeetingsQuery })
          data.meetings.unshift(createMeeting)
          store.writeQuery({ query: MeetingsQuery, data })
        }
      })
  })
}

const handlers = {
  onSubmit: props => event => {
    props
      .submit({
        text: '',
        date: props.date,
        groupId: props.activeGroup.id
      })
      .then(response =>
        props.redirect(`/meetings/${response.data.createMeeting.id}`)
      )
      .catch(error => console.log(error.message))
  },
  onSelectChange: props => event => {
    props.changeGroup(event.target.value)
  }
}

const initialActiveGroupIndex = props => {
  const index = props.data.groups.findIndex(
    group => group.id === props.initialGroupId
  )
  return index > -1 ? index : 0 // Return the first if none is selected
}

export default compose(
  connect(({ groups }) => ({ initialGroupId: groups.activeGroup })),
  graphql(GroupsQuery),
  graphql(CreateMeeting, submitProp),
  displayLoadingState,
  withState('activeGroupIndex', 'changeGroup', initialActiveGroupIndex),
  withState('date', 'setDate', new Date()),
  withProps(props => ({
    activeGroup: props.data.groups[props.activeGroupIndex]
  })),
  withRedirect,
  withHandlers(handlers),
  pure
)(MeetingFormPure)
