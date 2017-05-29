import React from 'react';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { MeetingsQuery } from '../../queries';
import displayLoadingState from '../Loading';
import MeetingCard from './Card';

const MeetingsPure = ({ data: { meetings } = [], activeGroup }) => (
  <MeetingsList>
    <NegativeMargins>
      { meetings.filter(({ group }) => (
        !activeGroup || group.id === activeGroup
      )).map(({ id, text, group }) => (
        <MeetingCard key={id} id = {id} text={text} group={group} />
      )) }
    </NegativeMargins>
  </MeetingsList>
);

const mapStateToProps = (state) => ({
  activeGroup: state.groups.activeGroup
});

const MeetingsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const NegativeMargins = styled.div`
  margin: 0 -${props => props.theme.gutter}px;
  width: 100%;
`

export default compose(
  connect(mapStateToProps),
  graphql(MeetingsQuery),
  displayLoadingState,
  pure
)(MeetingsPure);
