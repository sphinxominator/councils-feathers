import React from 'react'
import styled from 'styled-components'

import onClickOutside from 'react-onclickoutside'

import { compose, pure, withState, withProps, withHandlers } from 'recompact'

import { lighten } from 'polished'

import {
  getYear,
  getMonth,
  getDay,
  getDate,
  getDaysInMonth,
  addMonths,
  setDate
} from 'date-fns'

import { days, months } from '../utils/dates'

import { Picker, Wrapper, Toggle, Header, toggleable } from './Picker'

const initalDate = new Date()

const CalendarPure = ({
  value,
  disabled,
  compact,
  toggled,
  year,
  month,
  day,
  weekDay,
  viewedYear,
  viewedMonth,
  options,
  onNextMonthClick,
  onPreviousMonthClick,
  onDayClick,
  handleToggleClick
}) =>
  <Wrapper toggled={toggled} compact={compact}>
    <Header onClick={handleToggleClick} disabled={disabled} compact={compact}>
      <p>
        {year}
      </p>
      <h2>
        {`${days[weekDay]}, ${months[month]} ${day}`}
      </h2>
    </Header>
    <Toggle toggled={toggled}>
      <Navigation>
        <NavigationButton onClick={onPreviousMonthClick}>
          {'<-'}
        </NavigationButton>
        {`${viewedYear} ${months[viewedMonth]}`}
        <NavigationButton onClick={onNextMonthClick}>
          {'->'}
        </NavigationButton>
      </Navigation>
      <Picker
        columns={7}
        options={options}
        selectedOption={1}
        onOptionClick={onDayClick}
      />
    </Toggle>
  </Wrapper>

const Navigation = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: .5rem auto .5rem auto;
  font-weight: bold;
`

const NavigationButton = styled.span`
  color: black;
  cursor: pointer;
`

export default compose(
  toggleable,
  withState('date', 'setViewedDate', initalDate),
  withProps(props => ({
    year: getYear(props.value),
    month: getMonth(props.value),
    day: getDate(props.value),
    weekDay: getDay(props.value),
    viewedYear: getYear(props.date),
    viewedMonth: getMonth(props.date),
    options: [...Array(getDaysInMonth(props.date))].map((_, i) => i + 1)
  })),
  withHandlers({
    onNextMonthClick: ({ setViewedDate, date }) => () =>
      setViewedDate(addMonths(date, 1)),
    onPreviousMonthClick: ({ setViewedDate, date }) => () =>
      setViewedDate(addMonths(date, -1)),
    onDayClick: props => event => {
      let newDate = setDate(props.date, event.target.getAttribute('value'))
      props.onChange(newDate)
      props.setViewedDate(newDate)
      props.setToggled(!props.toggled)
    }
  }),
  pure
)(CalendarPure)
