import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from "fs"
import { helloResolver } from "./resolvers.hello.js"
import { HaiResolver } from "./resolver.hai.js"


const typeDefs = readFileSync("./schema.graphql", { encoding: 'utf-8' })

//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: [helloResolver, HaiResolver]
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready ${url}`)
