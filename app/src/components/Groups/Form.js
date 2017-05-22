import React from 'react';

import { pure, compose, withState, withHandlers } from 'recompose';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';

import { GroupsQuery } from '../queries';

const GroupFormPure = ({ onSubmit, onChangeName, onChangeColor }) => (
  <form onSubmit={onSubmit}>
    Group
    <Input type='text' placeholder='name' onChange={onChangeName} />
    <Input type='text' placeholder='color' onChange={onChangeColor} />
    <input type='submit' value='submit' />
  </form>
);

GroupFormPure.defaultProps = {
  color: 'black'
}

const createGroup = gql`
  mutation createGroup($group: groupInput!) {
    createGroup(group: $group) {
      id
      name
      color
    }
  }
`;

const submitProp = {
  props: ({ mutate }) => ({
    submit: ({ name, color }) => mutate({
      variables: {
       group: { name, color }
     },
     update: (store, { data: { createGroup } }) => {
       // Read the data from our cache for this query.
       const data = store.readQuery({ query: GroupsQuery });
       // Add our comment from the mutation to the end.
       data.groups.unshift(createGroup);
       // Write our data back to the cache.
       store.writeQuery({ query: GroupsQuery, data });
     },
   })
  })
};

const handlers = {
  onChangeName: props => event => {
    props.updateName(event.target.value);
  },
  onChangeColor: props => event => {
    props.updateColor(event.target.value);
  },
  onSubmit: props => event => {
    event.preventDefault();
    let { name, color } = props;
    props.submit({ name, color } );
  }
};

const Input = styled.input`
  padding: .5rem;
  margin: 1rem;
`

export default compose(
  graphql(createGroup, submitProp),
  withState('name', 'updateName', ''),
  withState('color', 'updateColor', ''),
  withHandlers(handlers),
  pure
)(GroupFormPure)
