import React from 'react'
import styled from 'styled-components'

import { pure, compose } from 'recompact'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import { setActiveGroup } from '../../actions'
import { GroupsQuery } from '../../queries'
import displayLoadingState from '../Loading'

import Badge from './Badge'

const GroupsPure = ({ data: { groups }, activeGroup, setActiveGroup }) =>
  <GroupsList>
    {groups.map(({ id, name, color }) =>
      <Badge
        key={id}
        id={id}
        color={color}
        name={name}
        onClick={setActiveGroup}
        active={activeGroup === id || activeGroup === null}
      />
    )}
  </GroupsList>

const GroupsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const mapStateToProps = ({ groups }) => ({
  activeGroup: groups.activeGroup
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setActiveGroup }, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(GroupsQuery),
  displayLoadingState,
  pure
)(GroupsPure)
