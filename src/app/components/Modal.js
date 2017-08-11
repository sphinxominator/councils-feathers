import React from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import { compose, pure, withHandlers } from 'recompact'
import { Link } from 'react-router-dom'

import media from '../mediaQueries'

import withRedirect from './Redirect'

export default props =>
  <Background>
    <Modal {...props} />
  </Background>

const ModalPure = ({ locationOnClose, children, narrow = false }) =>
  <Content narrow={narrow}>
    <CloseButton to={locationOnClose}>
      <CrossIcon />
    </CloseButton>
    {children}
  </Content>

const Background = styled.div`
  align-items: center;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: hsla(0, 0%, 30%, 0.1); /* Black w/ opacity */
  display: flex;
  flex-direction: column;
  height: 100%; /* Full height */
  justify-content: center;
  left: 0;
  overflow: auto; /* Enable scroll if needed */
  position: fixed; /* Stay in place */
  top: 0;
  width: 100%; /* Full width */
  z-index: 200; /* Sit on top */
`

const Content = styled.div`
  align-items: center;
  background-color: hsl(0, 0%, 95%);
  border-radius: ${props => props.theme.rounding}
    ${props => props.theme.rounding} 0 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: ${props => (props.narrow ? '30em' : '40em')};
  position: relative;
  width: 100%;
  z-index: 100;

  ${media.tablet`
    min-height: 20rem;
  `};
`

const CloseButton = styled(Link)`
  position: absolute;
  right: .25rem;
  top: .25rem;
  text-decoration: none;
  z-index: 200;

  svg {
    height: 1.7rem;
    width: 1.7rem;

    polygon {
      fill: white;
    }
  }
`

const CrossIcon = () =>
  <svg enableBackground="new 0 0 100 100" version="1.1" viewBox="0 0 100 100">
    <polygon
      fill="#010101"
      points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2 51.5,51.1 79.6,23 "
    />
  </svg>

const Modal = compose(
  withRedirect,
  withHandlers({
    handleClickOutside: ({ redirect, locationOnClose }) =>
      redirect(locationOnClose)
  }),
  onClickOutside,
  pure
)(ModalPure)
