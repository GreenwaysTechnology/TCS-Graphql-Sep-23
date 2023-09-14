import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';


const typeDefs = gql`
  # highlight-start
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
  # highlight-end

  type Query {
    me: User
  }

  type User
    @key(fields: "id") { 
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
    User: {
        __resolveReference(user, { fetchUserById }) {
            return fetchUserById(user.id);
        },
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// Note the top level await!
const { url } = await startStandaloneServer(server, {
  listen: {
      port: 4001
  }
})
console.log(`🚀  Server ready at ${url}`);