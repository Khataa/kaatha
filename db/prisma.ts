import { PrismaClient } from "@prisma/client";

function getPrismaClient(){
    return new PrismaClient()
}

declare global {
    var prisma : ReturnType<typeof getPrismaClient> | undefined
}

const Prisma = global.prisma || getPrismaClient()

export default Prisma

if (process.env.NODE_ENV !== "production") global.prisma = Prisma