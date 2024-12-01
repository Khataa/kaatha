import { NextResponse } from "next/server";

export async function handlePrismaOperation(operation :()=>Promise<any>, res : NextResponse){
    try {
        const result =  await operation();
        return result;
    }catch(e){
        return NextResponse.json({error : e}, {status : 500});
    }
}
