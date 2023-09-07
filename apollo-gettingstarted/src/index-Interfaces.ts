import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//1.Define Schema 
const typeDefs = `
interface Book {
    title:String!
    author:Author!
}
type Author{
   name:String
}
type Course {
   name:String    
}
type Textbook implements Book {
    title:String!
    author:Author!
    courses:Course
}
type ColoringBook implements Book {
    title:String!
    author:Author!
    colors:[String!]!
}
 
type Query {
    books:[Book!]!
}
`
//Mock data f
const BOOKS = [{
    title: 'Apollo Graphql in Action',
    author: {
        name: 'Subramanian'
    },
    courses: {
        name: 'IT'
    }
},
{
    title: 'Birds Drawing for Kids',
    author: {
        name: 'John'
    },
    colors: ['Green', 'Yellow']
}
]


//2.Biz logic for hello Query : Resolvers
const resolvers = {

    Query: {
        books() {
            return BOOKS;
        }
    },
    Book: {
        __resolveType(book, ctx, info) {
            if(book.courses){
                return 'Textbook' //Type must be String
            }
            if(book.colors){
                return 'ColoringBook'
            }
            return null
        }
    }

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
