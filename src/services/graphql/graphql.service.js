import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import Resolvers from './graphql.resolvers';
import Schema from './graphql.schema';

module.exports = function () {
  const app = this;

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  app.use('/graphql', graphqlExpress((req) => {
    let { provider, cookies } = req.feathers;
    return {
      schema: executableSchema,
      graphiql: true,
      context: { provider, cookies }
    }
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }))
};
