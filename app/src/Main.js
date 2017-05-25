import React from 'react';

import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { MeetingsForm, MeetingsList } from './components/Meetings';
import { GroupsForm, GroupsList } from './components/Groups';
import Navigator from './Navigator';

const MeetingsContainer = () => (
  <Container>
    <MeetingsForm />
    <MeetingsList />
  </Container>
);

const UsersContainer = () => (
  <Container>
    <p>users</p>
  </Container>
);

export default () => (
  <Main>
    <GroupsForm />
    <GroupsList />
    <Route exact path='/' component={MeetingsContainer} />
    <Route exact path='/meetings' component={MeetingsContainer} />
    <Route exact path='/users' component={UsersContainer} />
    <Navigator />
  </Main>
);

const Container = styled.div`
  flex-grow: 1;
`

const Main = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 auto;
  width: 80%;
`
