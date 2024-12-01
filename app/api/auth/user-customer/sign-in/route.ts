import { handlePrismaOperation } from "@/app/utils/dbUtils";
import { checkPostRequestOrSetError } from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { validatePassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

export async function POST(req: NextRequest) {
    if (!checkPostRequestOrSetError)
        return NextResponse.json(
            {
                error: "invalid request type",
                message: "invalid request type",
                status: false,
            },
            { status: 400 }
        );
    const body = await req.json();
    const { customerEmail, customerPassword } = body;
    if (!customerEmail || !customerPassword)
        return NextResponse.json(
            {
                error: "invalid request body",
                message: "invalid request body",
                status: false,
            },
            { status: 400 }
        );
    const result = await handlePrismaOperation(async () => {
        const customer = await Prisma.customer.findFirst({
            where: { customerEmail },
        });
        return customer;
    }, new NextResponse());

    if (!result)
        return NextResponse.json(
            { error: "customer not found", message: "please sign-up", status: false },
            { status: 404 }
        );

    const isPasswordValid = await validatePassword(
        customerPassword,
        result.customerPassword
    );
    if (!isPasswordValid)
        return NextResponse.json(
            { error: "invalid password", message: "invalid password", status: false },
            { status: 404 }
        );
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
    const token = jwt.sign(
        { customerId: result.customerId },
        JWT_SECRET
    );
    const res = NextResponse.json({ message: "success", status: true, token }, {status: 200});
    res.cookies.set("authorizationJWTForCustomer", token);
    return res;
}