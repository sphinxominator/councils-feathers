import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import Resolvers from './graphql.resolvers'
import Schema from './graphql.schema'
import mocks from './graphql.mocking'

module.exports = function() {
  const app = this

  const schema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  })

  //addMockFunctionsToSchema({ schema, mocks })

  app.use(
    '/graphql',
    graphqlExpress(req => {
      let { provider, cookies } = req.feathers
      return {
        schema: schema,
        graphiql: true,
        context: { provider, cookies }
      }
    })
  )

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  )
}
