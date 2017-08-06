import React from 'react'

import { pure, compose } from 'recompact'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { MeetingsQuery } from '../../queries'
import displayLoadingState from '../Loading'
import MeetingCard from './Card'

import media from '../../mediaQueries'

const MeetingsPure = ({ data: { meetings } = [], activeGroup }) =>
  <MeetingsList>
    <NegativeMargins>
      {meetings
        .filter(({ group }) => !activeGroup || group.id === activeGroup)
        .map(({ id, text, group }) =>
          <MeetingCard key={id} id={id} text={text} group={group} />
        )}
    </NegativeMargins>
  </MeetingsList>

const mapStateToProps = ({ groups }) => ({
  activeGroup: groups.activeGroup
})

const MeetingsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const NegativeMargins = styled.div`
  width: 100%;

  ${media.tablet`
    margin: 0 -${props => props.theme.gutter}px;
  `};
`

export default compose(
  connect(mapStateToProps),
  graphql(MeetingsQuery),
  displayLoadingState,
  pure
)(MeetingsPure)
