export default `
  type Meeting {
    id: String!
    date: String!
    groupId: Int!
    group: Group
  }

  type Group {
    id: String!
    name: String!
    color: String
  }

  type RootQuery {
    meetings: [Meeting]
    meeting(id: Int!): Meeting
    groups: [Group]
    group(id: Int!): Group
  }

  input meetingInput {
    date: String
    groupId: Int
  }

  input groupInput {
    name: String
    color: String
  }

  type RootMutation {
    createMeeting (
      meeting: meetingInput
    ): Meeting

    createGroup (
      group: groupInput
    ): Group
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`
