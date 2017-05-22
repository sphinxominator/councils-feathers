import React from 'react';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { MeetingsQuery } from '../queries';
import displayLoadingState from '../Loading';
import MeetingCard from './Card';

const MeetingsPure = ({ data: { meetings } }) => (
  <MeetingsList>
    <NegativeMargins>
      { meetings.map(({ id, text }) => ( <MeetingCard key={id} text={text} /> )) }
    </NegativeMargins>
  </MeetingsList>
);

const MeetingsList = styled.div`
  max-width: 70em;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`
const NegativeMargins = styled.div`
  margin: 0 -${props => props.theme.gutter}px;
  width: 100%;
`

export default compose(
  graphql(MeetingsQuery),
  displayLoadingState,
  pure
)(MeetingsPure);
