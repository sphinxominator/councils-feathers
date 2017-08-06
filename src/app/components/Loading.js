import React from 'react'
import { branch, renderNothing } from 'recompact'
import styled from 'styled-components'

//const Loading = () => <Background>Loading</Background>

const displayLoadingState = branch(props => props.data.loading, renderNothing)

const Background = styled.div`
  background-color: black;
  color: white;
  font-size: 40px;
  height: 100px;
  width: 100px;
`

export default displayLoadingState
