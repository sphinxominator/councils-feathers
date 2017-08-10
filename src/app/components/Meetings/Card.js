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
        <Dot />
        <Dot />
        <Dot />
      </div>
    </Bottom>
  </Card>

const Card = styled.div`
  background-color: ${props => props.color};
  border-radius: ${props => props.theme.rounding};
  color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  height: auto;
  min-height: 11rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
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
  background-color: hsl(0, 0%, 95%);
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
