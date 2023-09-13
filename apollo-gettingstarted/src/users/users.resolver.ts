export const UserResolver = {
    Query: {
        users(parent, args, ctx, info) {
            return ctx.dataSources.usersAPI.findAll()
        }
    }

}