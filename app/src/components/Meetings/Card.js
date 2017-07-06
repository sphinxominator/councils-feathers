import React from 'react'
import styled from 'styled-components'
import Grid from '../Grid'

import { Link } from 'react-router-dom'

var d = new Date('October 13, 2014 11:13:00')

export default ({ id, text, date = d, group }) =>
  <Link to={`/meetings/${id}`}>
    <StyledGrid xs={1} sm={1 / 2} md={1 / 3} lg={1 / 4}>
      <Card color={group.color}>
        <Text>
          {group.name}
        </Text>
        <Text>
          {date.toString()}
        </Text>
      </Card>
    </StyledGrid>
  </Link>

const StyledGrid = styled(Grid)`
  margin-bottom: 1rem
`

const Card = styled.div`
  border-radius: ${props => props.theme.rounding};
  padding: 1rem;
  height: auto;
  background-color: ${props => props.color};
  color: white;
  text-align: center;
`

Card.defaultProps = {
  theme: {
    primary: '#43b5ad'
  }
}

const Text = styled.p`
  font-size: 20px;
  margin: 1rem 0 1rem;
`
