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

type Query {
   users:[User]
} 

`;
//Mock user data
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
];
//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        users() {
            return users;
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
