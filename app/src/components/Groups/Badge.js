import React from 'react';
import styled from 'styled-components';

export default ({ name, color }) => (
  <Badge color={color}> {name} </Badge>
)

const Badge = styled.div`
  background-color: ${props => props.color};
  color: white;
  margin-right: .5rem;
  padding: .2rem;
`

Badge.defaultProps = {
  color: 'green'
}
