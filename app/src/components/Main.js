import React from 'react';

import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { MeetingsForm, MeetingsList, MeetingsPage } from './Meetings';
import { GroupsForm, GroupsList } from './Groups';

const MeetingsContainer = () => (
  <Container>
    <MeetingsList />
    <Route exact path='/meetings/:id' component={MeetingsPage} />
  </Container>
);

const UsersContainer = () => (
  <Container>
    <p>users</p>
  </Container>
);

export default () => (
  <Main>
    <MeetingsForm />
    <GroupsForm />
    <GroupsList />
    <Route exact path='/' component={MeetingsContainer} />
    <Route path='/meetings' component={MeetingsContainer} />
    <Route exact path='/users' component={UsersContainer} />
  </Main>
);

const Container = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;
`

const Main = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 auto;
  width: 95%;
  max-width: 60rem;
`
