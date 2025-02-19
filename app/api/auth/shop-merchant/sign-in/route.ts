import { handlePrismaOperation } from "@/app/utils/dbUtils";
import { checkPostRequestOrSetError } from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { validatePassword } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

export async function POST(req: NextRequest) {
  if (!checkPostRequestOrSetError(req))
    return NextResponse.json(
      { error: "invalid request type" },
      { status: 400 }
    );
  const body = await req.json();
  const { shopMerchantEmail, shopMerchantPassword } = body;
  if (!shopMerchantEmail || !shopMerchantPassword)
    return NextResponse.json(
      { error: "invalid request body" },
      { status: 400 }
    );
  const result = await handlePrismaOperation(async () => {
    const shop = await Prisma.shop.findFirst({ where: { shopMerchantEmail } });
    return shop;
  }, new NextResponse());
  if (!result)
    return NextResponse.json(
      { error: "shop not found", message: "please sign-up", status: false },
      { status: 404 }
    );
  const ispasswordValid = await validatePassword(
    shopMerchantPassword,
    result.shopMerchantPassword
  );
  if (!ispasswordValid)
    return NextResponse.json(
      {
        error: "invalid password",
        message: "please check your credentials",
        status: false,
      },
      { status: 400 }
    );
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }
  const token = jwt.sign(result.shopId , JWT_SECRET);
  const res = NextResponse.json({ status: true, message: 'Login successful' });
  res.cookies.set("token", token);
  res.cookies.set("userType", "shop");
  return res;
}