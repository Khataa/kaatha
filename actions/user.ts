'use server'
import Prisma from "@/db/prisma";

export async function getUser(id : number){
    const user = await Prisma.user.findUnique({where : {id}})
    return user;
}