import React from 'react';
import logo from './logo.svg';
import { LoginButton } from './components/Auth';
import styled, { keyframes } from 'styled-components';

import { Link } from 'react-router-dom';

export default () => (
  <Header>
    <Link to='/'>
      <Logo src={logo} alt="logo" />
    </Link>
    <h2>Welcome to Councils</h2>
    <LoginButton />
  </Header>
);

const Header = styled.div`
  background-color: #222;
  height: 160px;
  padding: 20px;
  color: white;
  text-align: center;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  height: 80px;
  animation: ${rotate360} 5s linear infinite;
`
