import { handlePrismaOperation } from "@/app/utils/dbUtils";
import { checkPostRequestOrSetError } from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    if(!checkPostRequestOrSetError(req)) return NextResponse.json({ error : "invalid request type" }, { status : 400 });
    const body = await req.json();
    const {registerdId, paymentAmount, paymentDescription} = body;
    const res = new NextResponse();
    let amount = await handlePrismaOperation(async () => {
        const pastAmount = await Prisma.registration.findFirst({
            where : {
                registerdId : registerdId
            }
        })
        return pastAmount?.amount || 0
    }, res);
    amount = amount + paymentAmount;
    const result = await handlePrismaOperation(async () => {
        const update = await Prisma.registration.update({
            where : {
                registerdId : registerdId
            },
            data : {
                amount : amount
            }
        })
    }, res);
    if(!result) return NextResponse.json({ error : "payment failed" }, { status : 400 });
    const paymentCreation = await handlePrismaOperation(async () => {
        const payment = await Prisma.payments.create({
            data : {
                registeredId : registerdId,
                paymentDescription : paymentDescription,
                paymentAmount : paymentAmount,
                deduct : paymentAmount<0,
                add : paymentAmount>0,
                paymentDate : new Date()
            }
        })
        return payment;
    }, res)
    if(!paymentCreation) return NextResponse.json({ error : "payment failed" }, { status : 400 });
    return NextResponse.json(paymentCreation, { status : 200 });
}