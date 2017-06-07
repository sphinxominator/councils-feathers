import React from 'react';
import { LoginButton } from './Auth';
import styled from 'styled-components';

import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({ auth });

const HeaderPure = ({auth}) => (
  <Header>
    <LoginButton />
    { auth && auth.name }
  </Header>
);

const Header = styled.div`
  background-color: grey;
  flex-grow: 1;
  flex-basis: 20px;
  padding: 0px;
  color: white;
  text-align: center;
`

export default connect(mapStateToProps)(HeaderPure);
