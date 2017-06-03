import React from 'react';
import styled from 'styled-components';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { MeetingQuery } from '../../queries';
import displayLoadingState from '../Loading';

const PagePure = ({ data: { meeting } }) => (
  <Background>
    <CloseLink to='/meetings' />
    <Modal>
      <Meeting color={meeting.group.color}>
        <h2>{meeting.group.name} - {meeting.id}</h2>
      </Meeting>
      <Attendance>
        <h3>Ingen fremmødte</h3>
      </Attendance>
    </Modal>
  </Background>
);

const Background = styled.div`
  align-items: center;
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.2); /* Black w/ opacity */
  display: flex;
  flex-direction: column;
  height: 100%; /* Full height */
  justify-content: center;
  left: 0;
  overflow: auto; /* Enable scroll if needed */
  position: fixed; /* Stay in place */
  top: 0;
  width: 100%; /* Full width */
  z-index: 1; /* Sit on top */
`

const Modal = styled.div`
  align-items: center;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  max-width: 40em;
  width: 100%;
  z-index: 100;
`

const Meeting = styled.div`
  border-radius: ${props => props.theme.rounding} ${props => props.theme.rounding} 0 0 ;
  flex-grow: 2;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  justify-content: center;
  min-height: 5rem;
  position: relative;
  width: 100%;

`

const Attendance = styled.div`
  border-radius: 0 0 ${props => props.theme.rounding} ${props => props.theme.rounding};
  flex-grow: 1;
  min-height: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: hsl(0,0%,95%);
`

const CloseLink = styled(Link)`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
`;



export default compose(
  graphql(MeetingQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id }})
  }),
  displayLoadingState,
  pure
)(PagePure);
