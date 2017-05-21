import React from 'react';
import logo from './logo.svg';

import styled, { keyframes } from 'styled-components';

import Auth0Lock from 'auth0-lock';
import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client';

export default class App extends React.Component {
  state = { meetings: null }

  constructor() {
    super()
    this.mountSockets();
  }

  async componentDidMount() {
    this.lock = new Auth0Lock('B1Y0w8pMQ9LXK5REYBigK06PGvzqdCK0', 'councils.eu.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000/auth/callback',
        responseType: 'code',
        params: {
          scope: 'openid email'
        }
      }
    });

    const res = await fetch('/meetings', { credentials: 'include' })
    const meetings = await res.json()
    this.setState({ meetings: meetings.data });
  }

  showLock() {
    this.lock.show();
  }

  mountSockets() {
    const socket = io('http://localhost:3001');
    const app = feathers();
    app.configure(socketio(socket));

    const meetingService = app.service('meetings');

    meetingService.on('created', (meeting) => {
      this.setState({ meetings: this.state.meetings.concat([meeting]) });
    })

  }

  render() {
    const { meetings } = this.state

    return (
      <Main>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to React</h2>
        </Header>
        <Intro onClick={()=>this.showLock()}>
          To get started, edt <code>src/App.js</code> and save to reload
        </Intro>
        { meetings &&
          meetings.map(( meeting ) => {
            return(<p key={meeting.id}>id: {meeting.id}, text: {meeting.text}</p>)
          })
        }

      </Main>
    );
  }
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Main = styled.div`
  text-align: center;
`

const Logo = styled.img`
  height: 80px;
  animation: ${rotate360} 1s linear infinite;
`

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`

const Intro = styled.p`
  font-size: large;
`
