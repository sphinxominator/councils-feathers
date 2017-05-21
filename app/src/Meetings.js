import React from 'react';

import { pure, branch, renderComponent, compose } from 'recompose';
import displayLoadingState from './Loading';

import { gql, graphql } from 'react-apollo';

const data = graphql(gql`
  query MeetingsQuery {
    meetings{
      id
      text
    }
  }
`)

const MeetingsPure = ({ data: { meetings } }) => (
  <div>
    { meetings.map(( meeting ) => {
        return(<p key={meeting.id}>id: {meeting.id}, text: {meeting.text}</p>)
      }) }
  </div>
);

export default compose(
  data,
  displayLoadingState,
  pure
)(MeetingsPure);
