import React from 'react'
import { LoginButton } from './Auth'
import styled from 'styled-components'

import { connect } from 'react-redux'

import { branch, renderComponent, compose } from 'recompose'

const HeaderPure = () =>
  <Header>
    Community
    <ProfileContainer />
  </Header>

const Header = styled.div`
  background-color: transparent;
  display: flex;
  flex-grow: 1;
  flex-basis: 20px;
  padding: 0px;
  color: black;
  margin: 1rem auto;
  max-width: 60rem;
  width: 95%;
`

const Profile = ({ auth }) =>
  <StyledProfile>
    <h2>
      {auth.name}
    </h2>
    <ProfilePicture src={auth.picture} alt="profile" />
  </StyledProfile>

const ProfilePicture = styled.img`
  margin-left: auto;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const ProfileContainer = compose(
  connect(({ auth }) => ({ auth })),
  branch(props => props.auth && !props.auth.name, renderComponent(LoginButton))
)(Profile)

const StyledProfile = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
`

export default HeaderPure
