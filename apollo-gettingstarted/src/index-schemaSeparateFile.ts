    import { ApolloServer } from "@apollo/server"
    import { startStandaloneServer } from '@apollo/server/standalone'
    import { readFileSync } from "fs"

    const typeDefs = readFileSync("./schema.graphql", { encoding: 'utf-8' })

    //2.Biz logic for hello Query : Resolvers
    const resolvers = {
        Query: {
            hello() {
                return "Hello Graphql"
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
