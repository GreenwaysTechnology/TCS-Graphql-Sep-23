import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//libraries

const libraries = [
    {
        branch: 'TownHall'
    },
    {
        branch: 'RiverSide'
    }
]
const BOOKS = [{
    title: 'Graphql In Action',
    author: 'Subramanian',
    branch: 'TownHall'
},
{
    title: 'Apollo Server',
    author: 'John',
    branch: 'RiverSide'
}
,{
    title: 'Moon Landing Mission',
    author: 'Ram',
    branch: 'RiverSide'
}

]



//1.Define Schema 
const typeDefs = `

#A library has a branch and book
type Library{
   branch:String! # link field
   books:[Book!]
}
type Book{
  title:String
  author:Author! # api for Book  
}
type Author{
  name:String!   
}

 #Define api
 type Query{
   libraries:[Library]
 } 

`
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        libraries() {
            return libraries;
        }
    },
    //Resolver Chain
    Library: {
        books(parent) {
            return BOOKS.filter(book => {
                return book.branch === parent.branch
            })
        }
    },
    Book: {
        author(parent) {
            //Author is Object so we need to return object
            return {
                name: parent.author
            }
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
