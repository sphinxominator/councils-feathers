// Not that elegant to import a react lib, but it gives syntax highlighting
import { gql } from 'react-apollo'

export default gql`
  type Meeting {
    id: Int!
    date: String!
    groupId: Int!
    group: Group
    attendants: [User]
  }

  type Group {
    id: Int!
    name: String!
    color: String
    members: [User]
  }

  type User {
    name: String
    user_id: String!
    picture: String
  }

  type Attendant {
    meetingId: Int!
    userId: Int!
    group: Group
    meeting: Meeting
  }

  type RootQuery {
    meetings: [Meeting]
    meeting(id: Int!): Meeting
    groups: [Group]
    group(id: Int!): Group
    users: [User]
    user(id: String!): User
  }

  input meetingInput {
    date: String
    groupId: Int
  }

  input groupInput {
    name: String
    color: String
  }

  input attendantInput {
    userId: String
    meetingId: String
  }

  type RootMutation {
    createMeeting(meeting: meetingInput): Meeting
    createGroup(group: groupInput): Group
    createAttendant(attendant: attendantInput): Attendant
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`
