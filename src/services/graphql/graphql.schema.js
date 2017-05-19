export default `
  type Meeting {
    id: String!
    text: String
  }

  type RootQuery {
    meetings: [Meeting]
    meeting(id: Int!): Meeting
  }

  schema {
    query: RootQuery
  }
`;
