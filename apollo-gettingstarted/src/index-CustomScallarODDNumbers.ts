import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError, GraphQLScalarType, Kind } from "graphql"

function oddValue(value:number ){
    if (typeof value === 'number' && Number.isInteger(value) && value % 2 !== 0) {
        return value
    }
    throw new GraphQLError('Provided Integer is not ODD integer', {
        extensions: { code: 'BAD_USER_INPUT' }
    })
}
const oddScalar = new GraphQLScalarType({
    name: 'Odd',
    description: 'Odd Custom data Type',
    parseValue(value: number) {
        if (typeof value === 'number' && Number.isInteger(value) && value % 2 !== 0) {
            return value
        }
        throw new GraphQLError('Provided Integer is not ODD integer', {
            extensions: { code: 'BAD_USER_INPUT' }
        })
    },
    serialize(value: number) {
        if (typeof value === 'number' && Number.isInteger(value) && value % 2 !== 0) {
            return value
        }
        throw new GraphQLError('Provided Integer is not ODD integer', {
            extensions: { code: 'BAD_USER_INPUT' }
        })
    },
    parseLiteral(ast){
        if(ast.kind === Kind.INT){
            return oddValue(parseInt(ast.value,10))
        }
        throw new GraphQLError('Provided Integer is not ODD integer', {
            extensions: { code: 'BAD_USER_INPUT' }
        })
    }

})


//1.Define Schema 
const typeDefs = `
 scalar Odd

 type Query {
    getOdd(odd:Odd!):Odd!
 }

`

//2.Biz logic for hello Query : Resolvers
const resolvers = {
    Odd: oddScalar,
    Query: {
        getOdd(parent,args,ctx,info){
            return args.odd
        }
    },
    //Mutation
    //Subscription
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
