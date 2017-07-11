import React from 'react'

import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { MeetingsForm, MeetingsList, MeetingsPage } from './Meetings'
import { GroupsForm, GroupsList } from './Groups'

import ActionButton from './ActionButton'

const MeetingsContainer = () =>
  <Container>
    <MeetingsList />
    <Switch>
      <Route exact path="/meetings/new" component={MeetingsForm} />
      <Route exact path="/meetings/:id" component={MeetingsPage} />
    </Switch>
  </Container>

const UsersContainer = () =>
  <Container>
    <p>users</p>
  </Container>

export default () =>
  <Main>
    <GroupsList />
    <Route exact path="/groups/new" component={GroupsForm} />
    <Route exact path="/" component={MeetingsContainer} />
    <Route path="/meetings" component={MeetingsContainer} />
    <Route exact path="/users" component={UsersContainer} />
    <ActionButton />
  </Main>

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
