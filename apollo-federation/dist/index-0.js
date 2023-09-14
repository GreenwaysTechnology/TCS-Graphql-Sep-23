import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
const typeDefs = gql `
  type Query {
    me: User
  }

  type User {
    id: ID!
    username: String
  }
`;
const resolvers = {
    Query: {
        me() {
            return { id: '1', username: '@ava' };
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Note the top-level await!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
