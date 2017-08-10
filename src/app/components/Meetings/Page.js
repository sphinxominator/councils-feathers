import React from 'react'
import styled from 'styled-components'

import { pure, withProps, compose } from 'recompact'
import { graphql } from 'react-apollo'

import { MeetingQuery } from '../../queries'
import displayLoadingState from '../Loading'

import Modal from '../Modal'
import Card from './Card'

const PagePure = ({ name, date, color }) =>
  <Modal locationOnClose="/meetings">
    <Card name={name} date={date} color={color} />
    <Attendance>
      <h3>Ingen fremmødte</h3>
    </Attendance>
  </Modal>

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
