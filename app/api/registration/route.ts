import { checkPostRequestOrSetError } from "@/app/utils/requestUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    if(!checkPostRequestOrSetError(req)) return NextResponse.json({ error : "invalid request type" }, { status : 400 });
    const body = await req.json();
    const {customerId, shopId} = body;
    const initialAmount = body?.intialAmount || 0;
    if(!customerId || !shopId) return NextResponse.json({ error : "invalid request body" }, { status : 400 }); 
}