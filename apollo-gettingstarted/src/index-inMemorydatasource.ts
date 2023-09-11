import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { CommentService } from "./services/Comments.service.js"
// import { COMMENTS } from "./mock-data/comments.js"

//Context Type:Type script syntax to have strong typing
interface MyContext {
    dataSources: {
        commentsAPI: CommentService
    }
}

//1.Define Schema 
const typeDefs = `

type Comment{ 
    postId:Int
    id:ID
    name:String
    email:String
    body:String
}

type Query {
    comments:[Comment]!
    comment(id:ID):Comment
}

input InputCommentCreate {
    postId:Int
    id:ID
    name:String
    email:String
    body:String
}
input InputCommentUpdate {
    postId:Int
    id:ID
    name:String
    email:String
    body:String
}
type Mutation {
    addComment(comment:InputCommentCreate):Comment
    updateComment(id:ID!,comment:InputCommentUpdate):Comment
    removeComment(id:ID!):Boolean
}

`


//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        comments(parent, args, context, info) {
            //ACCESS data source /service object
            return context.dataSources.commentsAPI.findAll()
        },
        comment(parent, args, context, info) {
            return context.dataSources.commentsAPI.findById(+args.id);
        }
    },
    Mutation: {
        addComment(parent, args, context, info) {
            return context.dataSources.commentsAPI.save(args.comment)
        },
        updateComment(parent, args, context, info) {
            return context.dataSources.commentsAPI.update(+args.id, args.comment)
        },
        removeComment(parent, args, context, info) {
            return context.dataSources.commentsAPI.remove(+args.id)
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
                commentsAPI: new CommentService()
            }
        }
    }
})
console.log(`Apollo Server is Ready ${url}`)
