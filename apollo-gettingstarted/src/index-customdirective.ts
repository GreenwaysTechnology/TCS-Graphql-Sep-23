import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { defaultFieldResolver } from 'graphql'

//1.Define Schema 
const typeDefs = `

type User {
    id:ID!
    name:String @uppercase
    email:String    
}

#Directive Declarations
directive  @uppercase on FIELD_DEFINITION

type Query {
    users:[User]
}

`
const USERS = [{
    id: 1,
    name: 'subramaian',
    email: 'subu@gmail.com'
},
{
    id: 2,
    name: 'murugan',
    email: 'murugan@gmail.com'
},
{
    id: 3,
    name: 'geetha',
    email: 'geetha@gmail.com',
},

]

//Directive logic 

function uppercaseDirectiveTransformer(schema, directiveName) {
    return mapSchema(schema, {
        //Logic
        [MapperKind.OBJECT_FIELD]: (filedConfig) => {
            //Check whether this field has the specificed directive 
            const uppercaseDirective = getDirective(schema, filedConfig, directiveName)
                ?.[0];
            if (uppercaseDirective) {
                //Get fields orginal resolver
                const { resolve = defaultFieldResolver } = filedConfig
                //Replace the original Resolver with a function that calls
                //the orginal resolver, then converts its result to upper case
                filedConfig.resolve = async function (source, args, ctx, info) {
                    const result = await resolve(source, args, ctx, info)
                    if (typeof result === 'string') {
                        //actual logic
                        return result.toUpperCase()
                    }
                    return result
                }
            };
            return filedConfig;

        }
    })
}




//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Query: {
        users() {
            return USERS
        }
    },
    //Mutation
    //Subscription
}

//schema creation
let schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

//attach Directive Existing Schema
schema = uppercaseDirectiveTransformer(schema, 'uppercase')

//3.We need to deploy the schema and bind with resolver 
const server = new ApolloServer({
    schema
})

//4.Start web server (Express.js)
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready ${url}`)
