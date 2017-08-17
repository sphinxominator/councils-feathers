import React from 'react'
import styled from 'styled-components'

export default ({ text }) =>
  <Button>
    {text}
  </Button>

const Button = styled.a`
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.rounding};
  margin: .5rem;
  padding: .5rem;
  cursor: pointer;
  border-color: white;

  &:hover {
    background-color: white;
    color: black;
  }
`
