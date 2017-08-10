import React from 'react'
import styled from 'styled-components'

import {
  compose,
  withState,
  withHandlers,
  withProps,
  flattenProp,
  pure
} from 'recompact'
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns'

import { Picker, Header, Toggle, Wrapper, toggleable } from './Picker'

const allOptions = [
  {
    name: 'hours',
    options: [...Array(24)].map((_, i) => i),
    updater: setHours
  },
  {
    name: 'minutes',
    options: [...Array(12)].map((_, i) => i * 5),
    updater: setMinutes
  }
]

const TimepickerPure = ({
  value,
  toggled,
  disabled,
  compact,
  options,
  name,
  onOptionClick,
  handleToggleClick
}) =>
  <Wrapper toggled={toggled} compact={compact}>
    <Header onClick={handleToggleClick} disabled={disabled} compact={compact}>
      <h2>
        <Num active={name === 'hours'} toggled={toggled}>
          {('0' + getHours(value).toString()).slice(-2)}
        </Num>
        {':'}
        <Num active={name === 'minutes'} toggled={toggled}>
          {('0' + getMinutes(value).toString()).slice(-2)}
        </Num>
      </h2>
    </Header>
    <Toggle toggled={toggled}>
      <Picker
        options={options}
        selectedOption={value}
        columns={6}
        onOptionClick={onOptionClick}
      />
    </Toggle>
  </Wrapper>

const Num = styled.span`
  color: ${props => (props.active && props.toggled ? 'black' : 'white')};
`

export default compose(
  toggleable,
  withState('selecting', 'setSelecting', 'hours'),
  withState('optionsIndex', 'setOptionsIndex', 0),
  withProps(props => ({
    option: allOptions[props.optionsIndex]
  })),
  flattenProp('option'),
  withHandlers({
    onOptionClick: props => ({ target }) => {
      let newDate = props.updater(props.value, target.getAttribute('value'))

      props.onChange(newDate)

      if (props.optionsIndex < allOptions.length - 1) {
        props.setOptionsIndex(n => n + 1)
      } else {
        props.setOptionsIndex(0)
        props.setToggled(!props.toggled)
      }
    }
  }),
  pure
)(TimepickerPure)
