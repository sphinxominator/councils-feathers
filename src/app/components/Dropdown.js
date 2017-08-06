import React from 'react'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'

import {
  compose,
  withHandlers,
  pure,
  withState,
  branch,
  renderNothing
} from 'recompact'

const DropdownPure = ({ open, onClick, children, content, setOpen }) =>
  <Wrapper>
    <Clickable onClick={onClick}>
      {children}
    </Clickable>
    <DropdownContent open={open} setOpen={setOpen}>
      {content}
    </DropdownContent>
  </Wrapper>

const DropdownContentPure = ({ children }) =>
  <Content>
    {children}
  </Content>

const Clickable = styled.div`
  cursor: pointer;
  position: relative;
`

const Wrapper = styled.div`position: relative;`

const Content = styled.div`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: .5rem;
  left: -100px;
  position: absolute;
  z-index: 100;
`

const DropdownContent = compose(
  branch(props => !props.open, renderNothing),
  withHandlers({
    handleClickOutside: ({ setOpen }) => () => setOpen(false)
  }),
  onClickOutside
)(DropdownContentPure)

export default compose(
  withState('open', 'setOpen', false),
  withHandlers({
    onClick: ({ setOpen }) => () => setOpen(true)
  }),
  pure
)(DropdownPure)
