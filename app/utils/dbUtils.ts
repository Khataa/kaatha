import { NextResponse } from "next/server";

export async function handlePrismaOperation(operation :()=>Promise<any>, res : NextResponse){
    try {
        return await operation();
    }catch(e){
        return NextResponse.json({error : e}, {status : 500});
    }
}
