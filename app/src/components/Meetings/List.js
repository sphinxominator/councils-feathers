import React from 'react';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';

import MeetingsQuery from './queries';
import displayLoadingState from '../Loading';

const MeetingsPure = ({ data: { meetings } }) => (
  <div>
    { meetings.map(( meeting ) => {
        return(<p key={meeting.id}>id: {meeting.id}, text: {meeting.text}</p>)
      }) }
  </div>
);

export default compose(
  graphql(MeetingsQuery),
  displayLoadingState,
  pure
)(MeetingsPure);
