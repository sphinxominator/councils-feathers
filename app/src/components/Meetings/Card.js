import React from 'react';
import styled from 'styled-components';
import Grid from 'grid-styled';

export default ({ text, date = new Date(), group }) => (
  <StyledGrid xs={1} sm={1/2} md={1/3} lg={1/4}>
    <Card group={group}>
      <Text>{group.name}</Text>
      <Text>{date.toString()}</Text>
    </Card>
  </StyledGrid>
)

const StyledGrid = styled(Grid)`
  margin-bottom: 1rem
`

const Card = styled.div`
  border-radius: ${props => props.theme.rounding};
  padding: 1rem;
  height: auto;
  background-color: ${props => props.group.color};
  color: white;
  text-align: center;

Card.defaultProps = {
  theme: {
    primary: '#43b5ad';
  }
}
`

const Text = styled.p`
  font-size: 20px;
  margin: 1rem 0 1rem;
`
