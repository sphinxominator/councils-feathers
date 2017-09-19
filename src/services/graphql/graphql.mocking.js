import casual from 'casual'
import { MockList } from 'graphql-tools'

export default {
  Int: () => casual.integer(0, 10000),
  Group: () => ({
    name: casual.city,
    color: casual.rgb_hex
  }),
  Meeting: () => ({
    date: casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss')
  }),
  RootQuery: () => ({
    meetings: () => new MockList([3, 10]),
    groups: () => new MockList([3, 5])
  })
}
