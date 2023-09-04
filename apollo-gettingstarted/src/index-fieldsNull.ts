import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
 
type User {
    id:ID!
    firstName:String!
    lastName:String!
    age:Int
    points:Float
    status:Boolean
}

type Query {
    user:User!
}


`
const resolvers = {
    Query: {
        user() {
            return {
                firstName: 'Subramanian',
                lastName: 'Murugan',
                age: 43,
                points: 100,
                status: false
            }
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
