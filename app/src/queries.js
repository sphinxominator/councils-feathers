import { gql } from 'react-apollo';


// Queries
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

// Mutations
export const CreateMeeting = gql`
  mutation createMeeting($meeting: meetingInput!) {
    createMeeting(meeting: $meeting) {
      id
      text
      groupId
      group {
        id
        name
        color
      }
    }
  }
`;
