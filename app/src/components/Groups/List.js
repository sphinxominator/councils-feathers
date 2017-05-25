import React from 'react';

import { pure, compose } from 'recompose';

import { setActiveGroup } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { graphql } from 'react-apollo';
import { GroupsQuery } from '../queries';
import displayLoadingState from '../Loading';

import styled from 'styled-components';

import Badge from './Badge';

const GroupsPure = ({ data: { groups }, activeGroup, setActiveGroup }) => (
  <GroupsList>
    { groups.map(({ id, name, color }) => (
        <Badge
          key={id}
          id={id}
          color={color}
          name={name}
          setActiveGroup={setActiveGroup}
          active={activeGroup===id || activeGroup===null} /> )
      )}
  </GroupsList>
);

const mapStateToProps = (state) => ({
  activeGroup: state.groups.activeGroup
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ setActiveGroup }, dispatch)
);

const GroupsList = styled.div`
  max-width: 70em;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(GroupsQuery),
  displayLoadingState,
  pure
)(GroupsPure);
