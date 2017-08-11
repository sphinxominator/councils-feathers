import React from 'react'
import styled from 'styled-components'

import { pure, withProps, compose } from 'recompact'
import { graphql } from 'react-apollo'

import { MeetingQuery } from '../../queries'
import displayLoadingState from '../Loading'

import Modal from '../Modal'
import Datepicker from '../Datepicker'
import Timepicker from '../Timepicker'
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
        <div>
          <h2>1176</h2>
        </div>
      </Bottom>
    </Meeting>
    <Attendance>
      <h3>Ingen fremmødte</h3>
    </Attendance>
  </Modal>

const Meeting = styled.div`
  background-color: ${props => props.color};
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 1rem;
  width: 100%;
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
