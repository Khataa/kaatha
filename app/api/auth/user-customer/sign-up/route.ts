import { handlePrismaOperation } from "@/app/utils/dbUtils";
import {
  checkPostRequestOrSetError,
  doesCustomeExistsAlready,
} from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { hashPassword } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!checkPostRequestOrSetError(req))
    return NextResponse.json(
      { error: "invalid request type", status: false },
      { status: 400 }
    );


  const body = await req.json();
  const { customerName, customerEmail, customerPassword } = body;

  if (!customerName || !customerEmail || !customerPassword)
    return NextResponse.json(
      { error: "invalid request body", status: false },
      { status: 400 }
    );

  const customer = await doesCustomeExistsAlready(customerEmail);
  if (customer)
    return NextResponse.json(
      { error: "customer already exists", status: false },
      { status: 400 }
    );
  const password = await hashPassword(customerPassword);
  const result = await handlePrismaOperation(async () => {
    const customer = await Prisma.customer.create({
      data: {
        customerName,
        customerEmail,
        customerPassword: password,
        isOnBoarded: false,
      },
    });
    return customer;
  }, new NextResponse());
  if (!result)
    return NextResponse.json(
      { message: "customer not created", status: false },
      { status: 500 }
    );
  return NextResponse.json(
    { message: "customer created successfully", status: true },
    { status: 200 }
  );
}