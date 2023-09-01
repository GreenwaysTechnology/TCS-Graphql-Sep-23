import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//1.Define Schema 
const typeDefs = `

type User {
    id:ID
    firstName:String
    lastName:String
    age:Int
    points:Float
    status:Boolean
}

type Query{
   user:User
} 

`;
//Mock user data
const user = {
    id: 1,
    firstName: 'Subramanian',
    lastName: 'Murugan',
    age: 43,
    points: 1000,
    status: true
};
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        user() {
            return user;
        }
    },
    //Mutation
    //Subscription
};
//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});
console.log(`Apollo Server is Ready ${url}`);
