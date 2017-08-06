import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { branch, renderNothing, compose } from 'recompact'

import { LoginButton } from './Auth'

const ActionsPure = ({ auth }) =>
  <Wrapper>
    <Top>
      {auth.name}
    </Top>
    <Bottom>Log ud</Bottom>
  </Wrapper>

const Wrapper = styled.div`
  width: 100%;
  min-height: 5rem;
  display: flex;
  flex-direction: column;
`
const Top = styled.div`
  flex-grow: 1;
  display: flex;
`

const Bottom = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
`

export default connect(({ auth }) => ({ auth }))(ActionsPure)
