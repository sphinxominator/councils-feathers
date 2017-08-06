import React from 'react'
import styled from 'styled-components'

import { pure, compose } from 'recompact'
import { graphql } from 'react-apollo'

import { MeetingQuery } from '../../queries'
import displayLoadingState from '../Loading'

import Modal from '../Modal'

const PagePure = ({ data: { meeting } }) =>
  <Modal locationOnClose="/meetings">
    <Meeting color={meeting.group.color}>
      <Title>
        {meeting.group.name}
      </Title>
    </Meeting>
    <Attendance>
      <h3>Ingen fremmødte</h3>
    </Attendance>
  </Modal>

const Title = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.7rem;
`

const Meeting = styled.div`
  flex-grow: 2;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  justify-content: center;
  min-height: 5rem;
  position: relative;
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
  pure
)(PagePure)
