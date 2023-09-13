import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from "fs"
import { UserResolver } from './users/users.resolver.js'
import { UserDataSource } from "./users/users.datasource.js"

const typeDefs = readFileSync("./schema.graphql", { encoding: 'utf-8' })


//Context Type:Type script syntax to have strong typing
interface MyContext {
    dataSources: {
        usersAPI: UserDataSource
    }
}
//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer<MyContext>({
    typeDefs: typeDefs,
    resolvers: [UserResolver]
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async (obj) => {
        return {
            dataSources: {
                usersAPI: new UserDataSource()
            }
        }
    }
})
console.log(`Apollo Server is Ready ${url}`)
