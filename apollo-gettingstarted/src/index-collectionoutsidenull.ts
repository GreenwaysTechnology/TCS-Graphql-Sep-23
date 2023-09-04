import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
 
type Query {
    skills:[String]!
}
`
const resolvers = {
    Query: {
        skills() {
            //return []
           // return ['Graphql']
           //return null 
           return [null]
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
