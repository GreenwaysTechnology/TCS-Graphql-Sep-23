import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//1.Define Schema 
const typeDefs = `

union CandyResult = Candy | OutOfStock | RegionUnAvilability

type Candy{
   id:String!
   name:String!    
   price:Float
}

type OutOfStock{
    name:String
    id:String
    restockDate:String
}

type RegionUnAvilability{
    id:String
    name:String
    availableRegions:[String!]
}

type Query{
    candy(id:String!):CandyResult    
}

`
const data = [
    {
        "id": "gummy-bears",
        "name": "Gummy Bears",
        "price": 1000
    },
    {
        "id": "sour-patch",
        "name": "Sour Patch Kids",
        "price": 1000
    },
    {
        "id": "Wonka-nerds",
        "name": "Wonka-nerds",
        "restockDate": "2023-09-06"
    },
    {
        "id": "Wonka-nerds",
        "name": "Wonka-nerds",
        "availableRegions": ["Coimbatore", "Chennai", "Banaglore"]
    }
]

//2.Biz logic for hello Query : Resolvers
const resolvers = {
    //Union Type Resolution Code
    CandyResult: {
        __resolveType(obj, ctx, info) {
            //we need to pass unique field to resolve
            if (obj.restockDate) {
                return 'OutOfStock'
            }
            if (obj.availableRegions) {
                return 'RegionUnAvilability'
            }
            if (obj.price) {
                return 'Candy'
            }
            return null
        }
    },
    Query: {
        candy(_, args) {
            return data.find(item => {
                return item.id === args.id
            })
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
