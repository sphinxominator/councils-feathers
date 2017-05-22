import React from 'react';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { GroupsQuery } from '../queries';
import displayLoadingState from '../Loading';

import Badge from './Badge';

const GroupsPure = ({ data: { groups } }) => (
  <GroupsList>
    { groups.map(({ id, name, color }) => ( <Badge key={id} color={color} name={name} /> ))  }
  </GroupsList>
);

const GroupsList = styled.div`
  max-width: 70em;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

export default compose(
  graphql(GroupsQuery),
  displayLoadingState,
  pure
)(GroupsPure);
