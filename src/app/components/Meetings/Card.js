import React from 'react'
import styled from 'styled-components'

import Datepicker from '../Datepicker'
import Timepicker from '../Timepicker'

export default ({ date, name, color }) =>
  <Card color={color}>
    <Time>
      <Datepicker disabled compact value={date} />
      <Timepicker disabled compact value={date} />
    </Time>
    <Bottom>
      <Text>
        {name}
      </Text>
      <div>
        <Dot color={color} />
        <Dot color={color} />
        <Dot color={color} />
      </div>
    </Bottom>
  </Card>

const Card = styled.div`
  background-color: white;
  border: 1px solid #e6e6e6;
  border-bottom: 2px solid ${props => props.color};
  border-radius: ${props => props.theme.rounding};
  color: black;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  height: auto;
  min-height: 11rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: ${props => props.color};
    color: white;
  }
`

const Time = styled.div`
  margin-bottom: .5rem;

  h2 {
    font-size: 1.4rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

const Dot = styled.span`
  height: .75rem;
  width: .75rem;
  margin: 0 .125rem;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: black;
  font-size: .5rem;

  display: inline-block;
`

const Bottom = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 0;
  }
`

const Text = styled.p`
  font-size: 20px;
  margin: 0 0 .5rem 0;
`

Card.defaultProps = {
  theme: {
    primary: '#43b5ad'
  }
}
