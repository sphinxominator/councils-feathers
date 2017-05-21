import { gql } from 'react-apollo';

export default gql`
  query MeetingsQuery {
    meetings{
      id
      text
    }
  }
`
