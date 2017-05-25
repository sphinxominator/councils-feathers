import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default () => (
  <Navigator>
    <Link to='/meetings'>
      <Button>Meetings</Button>
    </Link>
    <Link to='/users'>
      <Button>Users</Button>
    </Link>
  </Navigator>
);

const Navigator = styled.div`
  background-color: ${props => props.theme.primary};
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`

const Button = styled.span`
  margin: 0 1rem;
`
