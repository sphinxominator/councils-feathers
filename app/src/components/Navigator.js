import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import media from '../mediaQueries'

export default () =>
  <Navigator>
    <Link to="/meetings">
      <Button>Meetings</Button>
    </Link>
    <Link to="/users">
      <Button>Users</Button>
    </Link>
  </Navigator>

const Navigator = styled.div`
  background-color: hsl(0, 0%, 95%);
  display: flex;
  bottom: 0;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;

  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  ${media.tablet`
    background-color: transparent;
    box-shadow: none;
  `};
`

const Button = styled.span`margin: 0 1rem;`
