import React from 'react';
import styled from 'styled-components';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { MeetingQuery } from '../../queries';
import displayLoadingState from '../Loading';

const PagePure = ({ data: { meeting } }) => (
  <Link to='/meetings'>
    <Modal>
      <Page color={meeting.group.color}>
        <h1>{meeting.id} {meeting.text}</h1>
      </Page>
    </Modal>
  </Link>
);

const Page = styled.div`
  max-width: 40em;
  position: relative;
  margin: 0 auto;
  color: white;
  background-color: ${props => props.color};

  z-index: 100;
`

const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

export default compose(
  graphql(MeetingQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id }})
  }),
  displayLoadingState,
  pure
)(PagePure);
