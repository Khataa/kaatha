import { handlePrismaOperation } from "@/app/utils/dbUtils";
import {
  checkPostRequestOrSetError,
  getCustomerId,
} from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

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
  const { aadharCardNo, customerMobileNo, customerAddress } = body;
  if (!aadharCardNo || !customerMobileNo || !customerAddress)
    return NextResponse.json(
      {
        error: "invalid request body",
        message: "invalid request body",
        status: false,
      },
      { status: 400 }
    );
  const customerId = await getCustomerId(req);
  if (!customerId) return NextResponse.json({ error: "customer not found" });
  const id = parseInt(customerId as string);
  await handlePrismaOperation(async () => {
    const customerOnBoard = await Prisma.customer.update({
      where: {
        customerId: id,
      },
      data: {
        aadharCardNo,
        customerMobileNo,
        customerAddress,
        isOnBoarded: true,
      },
    });
    return customerOnBoard;
  }, new NextResponse());
  return NextResponse.json(
    { status: true, message: "success" },
    { status: 200 }
  );
}