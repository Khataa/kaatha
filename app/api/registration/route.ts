import { handlePrismaOperation } from "@/app/utils/dbUtils";
import { checkPostRequestOrSetError } from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    if(!checkPostRequestOrSetError(req)) return NextResponse.json({ error : "invalid request type" }, { status : 400 });
    const body = await req.json();
    const {customerId, shopId} = body;
    const initialAmount = body?.intialAmount || 0;
    if(!customerId || !shopId) return NextResponse.json({ error : "invalid request body" }, { status : 400 }); 
    const result = await handlePrismaOperation(async () => {
        const registration = await Prisma.registration.create({
            data : {
                customerId : parseInt(customerId as string),
                shopId : parseInt(shopId as string),
                amount : initialAmount as number,
                registeredAt : new Date()
            }
        });
        return registration;
    }, new NextResponse());
    if(!result) return NextResponse.json({ error : "registration failed" }, { status : 400 });
    return NextResponse.json(result, { status : 200 });
}