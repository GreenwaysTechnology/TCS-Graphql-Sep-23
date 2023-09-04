import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
 
type Query {
   hello(name:String!):String!
}
`
const resolvers = {
    Query: {
        hello(parent, args, ctx, info) {
            return `Hello ${args.name}`;
        }
    },

}
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready ${url}`)
