import React from 'react'
import styled from 'styled-components'

import { pure, withProps, compose } from 'recompact'
import { graphql } from 'react-apollo'

import { MeetingQuery } from '../../queries'
import displayLoadingState from '../Loading'

import Modal from '../Modal'
import Datepicker from '../Datepicker'
import Timepicker from '../Timepicker'
import { UsersListItem } from '../Users'
import { Bottom } from '../Styles'

const PagePure = ({ name, date, color }) =>
  <Modal locationOnClose="/meetings">
    <Meeting color={color}>
      <Datepicker value={date} compact disabled />
      <Timepicker value={date} compact disabled />
      <Bottom>
        <h2>
          {name}
        </h2>
        <AttendActions>
          <h2>1176</h2>
        </AttendActions>
      </Bottom>
    </Meeting>
    <Attendance>
      <Attendant>
        <UsersListItem name={'Viktor Andersen'} />
        <input type="text" placeholder="PIN" />
      </Attendant>
      <Attendant>
        <UsersListItem name={'Viktor Andersen'} />
      </Attendant>
    </Attendance>
  </Modal>

const Meeting = styled.div`
  background-color: ${props => props.color};
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  min-height: 15rem;
  padding: 1rem;
  width: 100%;
`

const AttendActions = styled.div`
  display: inline-flex;
  align-items: center;
`

const Attendance = styled.div`
  border-radius: 0 0 ${props => props.theme.rounding}
    ${props => props.theme.rounding};
  flex-grow: 1;
  min-height: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Attendant = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: .75rem 1rem .75rem 1rem;
  box-sizing: border-box;
`

export default compose(
  graphql(MeetingQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id } })
  }),
  displayLoadingState,
  withProps(({ data: { meeting: { date, group: { name, color } } } }) => ({
    date,
    name,
    color
  })),
  pure
)(PagePure)
