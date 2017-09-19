import { gql } from 'react-apollo'

// Queries
export const CurrentUserQuery = gql`
  query CurrentUserQuery($id: String!) {
    user(id: $id) {
      user_id
      name
      picture
    }
  }
`

export const MeetingsQuery = gql`
  query MeetingsQuery {
    meetings {
      id
      date
      group {
        id
        name
        color
      }
    }
  }
`

export const MeetingQuery = gql`
  query MeetingQuery($id: Int!) {
    meeting(id: $id) {
      id
      date
      group {
        id
        name
        color
      }
      attendants {
        user_id
      }
    }
  }
`

export const GroupQuery = gql`
  query GroupQuery($id: Int!) {
    group(id: $id) {
      name
      color
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
      date
      groupId
      group {
        id
        name
        color
      }
    }
  }
`

export const createAttendant = gql`
  mutation createAttendant($attendant: attendantInput!) {
    createAttendant(attendant: $attendant) {
      meetingId
    }
  }
`
