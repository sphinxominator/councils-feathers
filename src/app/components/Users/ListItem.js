import React from 'react'
import styled from 'styled-components'

export default ({ name = '' }) =>
  <ListItem>
    <Placeholder>
      {name.charAt(0)}
    </Placeholder>
    <Name>
      {name}
    </Name>
  </ListItem>

const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Name = styled.p`
  margin: 0 0 0 .5rem;
  font-size: 1.4rem;
`

const Placeholder = styled.div`
  align-items: center;
  background-color: grey;
  border-radius: 50%;
  color: white;
  display: inline-flex;
  height: 2.5rem;
  justify-content: center;
  width: 2.5rem;
`
