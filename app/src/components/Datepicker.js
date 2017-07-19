import React from 'react'
import styled from 'styled-components'

import { compose, pure, withState, withProps, withHandlers } from 'recompose'

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

const initalDate = new Date()

const days = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Maj',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dec'
]

const CalendarPure = ({
  value,
  year,
  month,
  day,
  weekDay,
  viewedYear,
  viewedMonth,
  daysInViewedMonth,
  onNextMonthClick,
  onPreviousMonthClick,
  onDayClick
}) =>
  <Calendar>
    <Header>
      <p>
        {year}
      </p>
      <h2>
        {`${days[weekDay]}, ${months[month]} ${day}`}
      </h2>
    </Header>
    <Navigation>
      <NavigationButton onClick={onPreviousMonthClick}>
        {'<-'}
      </NavigationButton>
      {`${viewedYear} ${months[viewedMonth]}`}
      <NavigationButton onClick={onNextMonthClick}>
        {'->'}
      </NavigationButton>
    </Navigation>
    <DayPickerPure
      daysInViewedMonth={daysInViewedMonth}
      day={day}
      onDayClick={onDayClick}
    />
  </Calendar>

const DayPickerPure = ({ daysInViewedMonth, day, onDayClick }) =>
  <Days>
    {[...Array(daysInViewedMonth)].map((_, i) => {
      let dayNumber = i + 1
      return (
        <Day key={dayNumber} selected={dayNumber === day}>
          <span onClick={onDayClick} value={dayNumber}>
            {dayNumber}
          </span>
        </Day>
      )
    })}
  </Days>

const Calendar = styled.div`
  background-color: white;
  width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 19px 60px rgba(0, 0, 0, .3), 0 15px 20px rgba(0, 0, 0, .22);
`

const Header = styled.div`
  background-color: #3f51b5;
  color: white;
  padding: 1rem 0 .5rem .5rem;

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

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

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const Day = styled.div`
  flex: 0 0 14.28571%;
  display: flex;
  justify-content: center;

  cursor: pointer;

  span {
    height: 2.5rem;
    width: 2.5rem;
    background-color: ${props => (props.selected ? '#3f51b5' : 'trasparent')};
    color: ${props => (props.selected ? 'white' : 'trasparent')};
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

export default compose(
  withState('value', 'setValue', initalDate),
  withState('date', 'setDate', initalDate),
  withProps(props => ({
    year: getYear(props.value),
    month: getMonth(props.value),
    day: getDate(props.value),
    weekDay: getDay(props.value),
    viewedYear: getYear(props.date),
    viewedMonth: getMonth(props.date),
    daysInViewedMonth: getDaysInMonth(props.date)
  })),
  withHandlers({
    onNextMonthClick: props => props.setDate(addMonths(props.date, 1)),
    onPreviousMonthClick: props => props.setDate(addMonths(props.date, -1)),
    onDayClick: props => event => {
      let newDate = setDate(props.date, event.target.getAttribute('value'))
      props.setValue(newDate)
      props.setDate(newDate)
    }
  }),
  pure
)(CalendarPure)
