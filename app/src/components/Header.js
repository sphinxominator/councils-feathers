import React from 'react'
import { LoginButton } from './Auth'
import styled from 'styled-components'

import { connect } from 'react-redux'

const mapStateToProps = ({ auth }) => ({ auth })

const HeaderPure = ({ auth }) =>
  <Header>
    <LoginButton />
    {auth &&
      auth.name &&
      <div>
        <h2>
          {auth.name}
        </h2>
        <ProfilePicture src={auth.picture} alt="profile" />
      </div>}
  </Header>

const Header = styled.div`
  background-color: transparent;
  flex-grow: 1;
  flex-basis: 20px;
  padding: 0px;
  color: black;
  text-align: center;
  margin-top: 1rem;
`

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

export default connect(mapStateToProps)(HeaderPure)
