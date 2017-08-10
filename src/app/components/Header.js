import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { branch, renderNothing, compose } from 'recompact'

import { LoginButton } from './Auth'
import Menu from './Menu'
import Dropdown from './Dropdown'

const HeaderPure = () =>
  <Header>
    <Title>Community</Title>
    <Right>
      <Dropdown content={<Menu />}>
        <Profile />
      </Dropdown>
      <LoginButton />
    </Right>
  </Header>

const Header = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-grow: 1;
  flex-basis: 20px;
  padding: 0px;
  color: black;
  margin: 0 auto;
  max-width: 60rem;
  width: 95%;
`
const Title = styled.h2`font-size: 2rem;`

const Right = styled.div`
  align-items: center;
  margin-left: auto;
  display: inline-flex;
`

const ProfilePure = ({ auth: { picture } }) =>
  <StyledProfile>
    <ProfilePicture src={picture} alt="profile" />
  </StyledProfile>

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const Profile = compose(
  connect(({ auth }) => ({ auth })),
  branch(props => !props.auth, renderNothing)
)(ProfilePure)

const StyledProfile = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
`

export default HeaderPure
