import { gql } from 'react-apollo';

export const MeetingsQuery = gql`
  query MeetingsQuery {
    meetings {
      id
      text
    }
  }
`

export const GroupsQuery = gql`
  query GroupsQuery {
    groups {
      id
      name
      color
    }
  }
`
