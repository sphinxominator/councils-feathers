export default `
  type Meeting {
    id: String!
    text: String
  }

  type RootQuery {
    meetings: [Meeting]
    meeting(id: Int!): Meeting
  }

  input meetingInput {
    text: String!
  }

  type RootMutation {
    createMeeting (
      meeting: meetingInput
    ): Meeting
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;
