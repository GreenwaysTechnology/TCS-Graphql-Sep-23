import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { UserService } from "./services/User.service.js"


//Context Type:Type script syntax to have strong typing
interface MyContext {
    dataSources: {
        userAPI: UserService
    }
}

//1.Define Schema 
const typeDefs = `
type User {
    id:Int
    name:String
    email:String
    createdAt:String
}
type Query {
    users:[User]
    user(id:ID):User
}
input UserCreateInput {
    name:String
    email:String
}
input UserUpdateInput {
    name:String
    email:String
}
type Mutation {
    createUser(user:UserCreateInput):User
    updateUser(id:ID,user:UserUpdateInput):User
    removeUser(id:ID):User
    
}

`

//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        users(parent, args, context, info) {
            return context.dataSources.userAPI.findAll()
        },
        user(parent, args, context, info) {
            return context.dataSources.userAPI.findById(+args.id)
        }

    },
    Mutation: {
        async createUser(parent, args, context, info) {
            return context.dataSources.userAPI.save(args.user)
        },
        async updateUser(parent, args, context, info) {
            return context.dataSources.userAPI.update(+args.id, args.user)
        },
        async removeUser(parent, args, context, info) {
            return context.dataSources.userAPI.remove(+args.id)
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
            dataSources: {
                userAPI: new UserService()
            }
        }
    }
})
console.log(`Apollo Server is Ready ${url}`)
