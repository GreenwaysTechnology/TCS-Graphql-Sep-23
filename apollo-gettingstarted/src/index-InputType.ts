import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `

type User {
    id:ID!
    firstName:String
    lastName:String
    age:Int
    points:Float
    status:Boolean
}

input UserInput {
    id:ID!
    status:Boolean
    age:Int
}

type Query {
   users:[User!]!
   #user(id:ID!,status:Boolean,age:Int):User
   user(userInput:UserInput!):User
}
`
const users = [{
    id: 1,
    firstName: 'Subramanian',
    lastName: 'Murugan',
    age: 43,
    points: 1000,
    status: true
},
{
    id: 2,
    firstName: 'Geetha',
    lastName: 'Subramanian',
    age: 40,
    points: 5000,
    status: true
},
{
    id: 3,
    firstName: 'Ram',
    lastName: 'M',
    age: 30,
    points: 5000,
    status: false
}

]



const resolvers = {
    Query: {
        users() {
            return users;
        },
        user(_, args) {
            console.log(args)
            return users.find(user => {
                //+ operator is used to convert string to number
                return user.id === +args.userInput.id
            })
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
