import React from 'react'
import styled from 'styled-components'
import { Link, Route, Switch } from 'react-router-dom'
import { PlusIcon } from './Icons'

const CreateMeetingButton = () =>
  <Link to="/meetings/new">
    <PlusIcon color="white" />
  </Link>

const CreateGroupButton = () =>
  <Link to="/groups/new">
    <PlusIcon color="white" />
  </Link>

export default () =>
  <ActionButton>
    <Switch>
      <Route path="/meetings" component={CreateMeetingButton} />
      <Route path="/users" component={CreateGroupButton} />
      <Route path="/groups" component={CreateGroupButton} />
    </Switch>
  </ActionButton>

const ActionButton = styled.div`
  align-items: center;
  background-color: hsl(340, 100%, 63%);
  border-radius: 50%;
  bottom: 2rem;
  box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px,
    rgba(0, 0, 0, 0.227451) 0px 3px 10px;
  color: white;
  display: flex;
  height: 4rem;
  justify-content: center;
  position: fixed;
  right: 2rem;
  text-align: center;
  text-overflow: clip;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  width: 4rem;
  z-index: 1000;

  &:hover {
    background-color: hsl(340, 100%, 75%);
  }
`
