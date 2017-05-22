import React from 'react';

import { pure, compose, withState, withHandlers } from 'recompose';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';

import { MeetingsQuery } from '../queries';

const MeetingFormPure = ({ value, onSubmit, onChange }) => (
  <form onSubmit={onSubmit}>
    Meeting
    <Input type='text' placeholder='text' onChange={onChange} />
  </form>
);

const createMeeting = gql`
  mutation createMeeting($meeting: meetingInput!) {
    createMeeting(meeting: $meeting) {
      id
      text
    }
  }
`;

const submitProp = {
  props: ({ mutate }) => ({
    submit: ({ text }) => mutate({
      variables: {
       meeting: { text }
     },
     update: (store, { data: { createMeeting } }) => {
       // Read the data from our cache for this query.
       const data = store.readQuery({ query: MeetingsQuery });
       // Add our comment from the mutation to the end.
       data.meetings.unshift(createMeeting);
       // Write our data back to the cache.
       store.writeQuery({ query: MeetingsQuery, data });
     },
   })
  })
};

const handlers = {
  onChange: props => event => {
    props.updateValue(event.target.value);
  },
  onSubmit: props => event => {
    event.preventDefault();
    props.submit({ text: props.value } );
  }
};

const Input = styled.input`
  padding: .5rem;
  margin: 1rem;
`

export default compose(
  graphql(createMeeting, submitProp),
  withState('value', 'updateValue', ''),
  withHandlers(handlers),
  pure
)(MeetingFormPure)
