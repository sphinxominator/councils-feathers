import React from 'react';

import { ApolloClient,  ApolloProvider, createNetworkInterface } from 'react-apollo';
import styled, { keyframes, ThemeProvider } from 'styled-components';

import logo from './logo.svg';
import { MeetingsForm, MeetingsList } from './components/Meetings';
import { GroupsForm, GroupsList } from './components/Groups';
import { AuthProvider, LoginButton } from './components/Auth';

import theme from './theme';

const networkInterface = createNetworkInterface({
  opts: {
    credentials: 'same-origin'
  },
  uri: '/graphql'
});

const client = new ApolloClient({ networkInterface });

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to Councils</h2>
          <LoginButton />
        </Header>
        <Main>
          <GroupsForm />
          <GroupsList />
          <MeetingsForm />
          <MeetingsList />
        </Main>
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Main = styled.div`
  margin: 0 auto;
  max-width: 60rem;
`

const Logo = styled.img`
  height: 80px;
  animation: ${rotate360} 5s linear infinite;
`

const Header = styled.div`
  background-color: #222;
  height: 160px;
  padding: 20px;
  color: white;
  text-align: center;
`
