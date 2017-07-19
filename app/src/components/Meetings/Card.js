import React from 'react'
import styled from 'styled-components'
import Grid from '../Grid'

import { Link } from 'react-router-dom'

const d = '14. Januar, 2017'
const t = '10:45'

export default ({ id, date = d, time = t, group: { name, color } }) =>
  <Link to={`/meetings/${id}`}>
    <StyledGrid xs={1} sm={1 / 2} md={1 / 3} lg={1 / 3}>
      <Card color={color}>
        <Text>
          {date}
        </Text>
        <Text>
          {time}
        </Text>
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
    </StyledGrid>
  </Link>

const StyledGrid = styled(Grid)`
  margin-bottom: 1rem;
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
`

const Card = styled.div`
  background-color: ${props => props.color};
  border-radius: ${props => props.theme.rounding};
  color: white;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 8rem;
  padding: 2rem 1rem .5rem 1rem;
  text-align: center;
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
