import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Context Type:Type script syntax to have strong typing
interface MyContext {
    greet: String
}

//1.Define Schema 
const typeDefs = `
  type Query {
    hello:String
  }
`


//2.Biz logic for hello Query : Resolvers
const resolvers = {

    Query: {
        hello(parent, args, contextValue, info) {
            return `${contextValue.greet}`
        }
    }


}


//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer<MyContext>({
    typeDefs: typeDefs,
    resolvers: resolvers
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async (obj) => {
        return {
            greet: 'Welcome'    //return Promise.resolve({greet:'Welcome'})
        }
    }
})
console.log(`Apollo Server is Ready ${url}`)
