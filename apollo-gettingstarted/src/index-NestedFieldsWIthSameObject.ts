import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//1.Define Schema 
const typeDefs = `

type Address {
    city:String
}

type User {
    id:ID!
    firstName:String
    lastName:String
    age:Int
    points:Float
    status:Boolean
    address:Address
}

 #Define api
 type Query{
    user:User
 } 

`
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        user() {
            return {
                id: 1,
                firstName: 'Subramanian',
                lastName: 'Murugan',
                status: true,
                age: 43,
                points: 120.7,
                //nested field
                address: {
                    city: 'Coimbatore'
                }

            }
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



















