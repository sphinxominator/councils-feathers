import React from 'react'
import styled from 'styled-components'

import { pure, compose } from 'recompact'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import media from '../../mediaQueries'
import { MeetingsQuery } from '../../queries'

import displayLoadingState from '../Loading'
import MeetingCard from './Card'
import Grid from '../Grid'

const MeetingsPure = ({ data: { meetings } = [], activeGroup }) =>
  <MeetingsList>
    <NegativeMargins>
      {meetings
        .filter(({ group }) => !activeGroup || group.id === activeGroup)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(({ id, date, group: { name, color } }) =>
          <Link to={`/meetings/${id}`}>
            <StyledGrid xs={1} sm={1 / 2} md={1 / 3} lg={1 / 3}>
              <MeetingCard
                key={id}
                id={id}
                date={date}
                name={name}
                color={color}
              />
            </StyledGrid>
          </Link>
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

const StyledGrid = styled(Grid)`
  margin-bottom: 2rem;
  padding: 0;

  ${media.tablet`
    padding: 0 20px 0 20px;
  `}
`

export default compose(
  connect(mapStateToProps),
  graphql(MeetingsQuery),
  displayLoadingState,
  pure
)(MeetingsPure)
