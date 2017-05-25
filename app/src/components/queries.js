import { gql } from 'react-apollo';

export const MeetingsQuery = gql`
  query MeetingsQuery {
    meetings {
      id
      text
      group {
        id
        name
        color
      }
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

export const MeetingsAndGroupsQuery = gql`
  query MeetingsAndGroupsQuery {
    meetings {
      id
      text
      groupId
    }
    groups {
      id
      name
      color
    }
  }
`
