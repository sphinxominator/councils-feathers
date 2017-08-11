import React from 'react'
import styled from 'styled-components'

import { withState, withHandlers, compose } from 'recompact'
import onClickOutside from 'react-onclickoutside'

import { lighten } from 'polished'

export const Picker = ({ columns, options, selectedOption, onOptionClick }) =>
  <OptionsList>
    {options.map(option =>
      <Option
        key={option}
        selected={option === selectedOption}
        columns={columns}
      >
        <span onClick={onOptionClick} value={option}>
          {option}
        </span>
      </Option>
    )}
  </OptionsList>

const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-bottom: .25rem;
`
const Option = styled.div`
  flex: ${props => `0 0 ${100 / props.columns}%`};
  display: flex;
  justify-content: center;

  cursor: pointer;

  span {
    height: 2.5rem;
    width: 2.5rem;
    background-color: ${props => (props.selected ? '#3f51b5' : 'transparent')};
    color: ${props => (props.selected ? 'white' : 'black')};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
      background-color: ${lighten(0.1, '#3f51b5')};
      color: white;
    }
  }
`

export const Header = styled.div`
  background-color: transparent;
  padding: ${props => (props.compact ? '0 0 .5rem 0' : '1rem 0 .5rem .5rem')};
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`
export const Toggle = styled.div`
  display: ${props => (props.toggled ? 'block' : 'none')};
  background-color: white;
`

export const Wrapper = styled.div`
  margin: ${props => (props.compact ? '0' : '1rem 0 1rem 0')};
  width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: ${props =>
    props.toggled
      ? '0 19px 60px rgba(0, 0, 0, .3), 0 15px 20px rgba(0, 0, 0, .22)'
      : '0'};
`

export const toggleable = compose(
  withState('toggled', 'setToggled', false),
  withHandlers({
    handleClickOutside: ({ setToggled }) => () => setToggled(false),
    handleToggleClick: ({ setToggled, toggled, disabled }) => () =>
      !!!disabled && setToggled(!toggled)
  }),
  onClickOutside
)
