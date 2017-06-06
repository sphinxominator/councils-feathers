import React from 'react';
import styled from 'styled-components';

import { pure, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { MeetingQuery } from '../../queries';
import displayLoadingState from '../Loading';

import media from '../../mediaQueries';

const PagePure = ({ data: { meeting } }) => (
  <Background>
    <CloseFullscreen to='/meetings' />
    <Modal>
      <Meeting color={meeting.group.color}>
        <Title>{meeting.group.name} - {meeting.id}</Title>
        <CloseButton to='/meetings' >
          <CrossIcon />
        </CloseButton>
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
  min-height: 100%;
  max-width: 40em;
  width: 100%;
  z-index: 100;

  ${media.tablet`
    min-height: 20rem;
  `}
`

const Title = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.7rem;
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

const CloseFullscreen = styled(Link)`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
`;

const CloseButton = styled(Link)`
  position: absolute;
  right: .25rem;
  top: .25rem;
  text-decoration: none;

  svg {
    height: 1.7rem;
    width: 1.7rem;
  }
`;


const CrossIcon = () => (
  <svg enableBackground="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" >
    <polygon fill="#010101" points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2 51.5,51.1 79.6,23 "/>
  </svg>
);

export default compose(
  graphql(MeetingQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id }})
  }),
  displayLoadingState,
  pure
)(PagePure);
