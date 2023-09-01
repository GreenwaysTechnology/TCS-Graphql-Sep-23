import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//1.Define Schema 
const typeDefs = `
 #Define api
 type Query{
    add:Int
    multiply:Int
    div:Int
} 

`
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        add() {
            return 10 + 10
        },
        multiply() {
            return 10 * 10
        },
        div() {
            return 10 / 2
        }

    },
    //Mutation
    //Subscription
}
//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready ${url}`)



















