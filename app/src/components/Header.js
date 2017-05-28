import React from 'react';
//import { LoginButton } from './components/Auth';
import styled from 'styled-components';

export default () => (
  <Header>
    <h2>Welcome to Councils</h2>
  </Header>
);

const Header = styled.div`
  background-color: grey;
  flex-grow: 1;
  flex-basis: 160px;
  padding: 20px;
  color: white;
  text-align: center;
`
