import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLScalarType, Kind } from "graphql"

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date  Type',
    serialize(value: Date) {
        //Logic to treate that data type
        console.log('seralize',value)
        return value.getTime()
    },
    parseValue(value: Date) {
        console.log('parseValue',value)
        //convert incoming integer to Date
        return new Date(value)
    },
    parseLiteral(ast) {
        console.log('parseLiteral',ast)

        if (ast.kind == Kind.INT) {
            return new Date(parseInt(ast.value, 10))
        }
        return null
    }

})


//1.Define Schema 
const typeDefs = `

#Custom data type
scalar Date

type User {
    id:ID!
    name:String
    email:String
    date:Date
}
type Query {
    users:[User]
}

`
const USERS = [{
    id: 1,
    name: 'A',
    email: 'a@gmail.com',
    date: new Date()
},
{
    id: 2,
    name: 'B',
    email: 'b@gmail.com',
    date: new Date()
},
{
    id: 3,
    name: 'C',
    email: 'c@gmail.com',
    date: new Date()
},

]
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Date: dateScalar,
    Query: {
        users(parent, args, ctx, info) {
            return USERS
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
