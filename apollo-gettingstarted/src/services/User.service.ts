import { prisma } from "../database.js"

export class User {
    id: number
    name: string
    email: string
    createdAt: string
}

export class UserService {

    public findAll() {
        return prisma.user.findMany({})
    }

    public findById(id: number) {
        return prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }
    public save(user: User) {
        return prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                createdAt: new Date()
            }
        })
    }
    public update(id: number, user: User) {
        return prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: user.email
            }
        })
    }
    public remove(id: number) {
        return prisma.user.delete({
            where: {
                id: id
            }
        })
    }

}