import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { PostService } from "./services/Post.service.js"


//Context Type:Type script syntax to have strong typing
interface MyContext {
    dataSources: {
        postAPI: PostService
    }
}

//1.Define Schema 
const typeDefs = `

type Post{
    userId:Int!
    id:ID!
    title:String
    body:String
}

type Query{
    posts:[Post!]!
    post(id:ID!):Post!
}
input PostCreateInput {
    userId:Int!
    title:String
    body:String
}
input PostUpdateInput {
    title:String
    body:String
}

type PostResponse{
    userId:Int
    id:ID
    title:String
    body:String
}

type Mutation {
    createPost(post:PostCreateInput):Post
    updatePost(id:ID!,post:PostUpdateInput):Post
    removePost(id:ID!):PostResponse
}

`


//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        async posts(parent, args, ctx, info) {
            return ctx.dataSources.postAPI.getPosts()
        },
        async post(parent, args, ctx, info) {
            return ctx.dataSources.postAPI.getPostById(+args.id)
        }
    },
    Mutation: {
        async createPost(parent, args, ctx, info) {
            return ctx.dataSources.postAPI.createPost(args.post)
        },
        async updatePost(parent, args, ctx, info) {
            return ctx.dataSources.postAPI.updatePost(+args.id, args.post)
        },
        async removePost(parent, args, ctx, info) {
            return ctx.dataSources.postAPI.removePost(+args.id)
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
                postAPI: new PostService()
            }
        }
    }
})
console.log(`Apollo Server is Ready ${url}`)
