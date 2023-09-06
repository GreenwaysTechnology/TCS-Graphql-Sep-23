import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Mock data
const USERS = [{
    id: 1,
    name: 'A',
    email: 'a@gmail.com'

},
{
    id: 2,
    name: 'B',
    email: 'b@gmail.com'

},
{
    id: 3,
    name: 'C',
    email: 'c@gmail.com'
}]

const ADDRESS = [{
    city: 'CBE',
    state: 'TN',
    id: 1 //link field
},
{
    city: 'CHN',
    state: 'TN',
    id: 2 //link field
},
{
    city: 'BNG',
    state: 'KA',
    id: 3 //link field
}
]


//1.Define Schema 
const typeDefs = `

type Address {
    city:String
    state:String    
}

type User {
    id:ID!
    name:String
    email:String
    address:Address
}

 #Define api
 type Query{
    users:[User!]!
 } 

`
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
         users(){
            return USERS
         }
    },
    
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
