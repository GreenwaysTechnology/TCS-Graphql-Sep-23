import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';
// const gateway = new ApolloGateway({
//     serviceList: [
//         { name: 'users', url: 'http://localhost:4001' },
//         // Define additional services here
//     ],
// });
//SUPER Graph schema
const superGraphSDL = readFileSync('./supergraph.graphql', { 'encoding': 'utf8' });
const gateway = new ApolloGateway({
    supergraphSdl: superGraphSDL
});
// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
    gateway,
});
// Note the top-level `await`!
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});
console.log(`🚀  Server ready at ${url}`);
