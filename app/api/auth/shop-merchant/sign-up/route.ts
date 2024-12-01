import { handlePrismaOperation } from "@/app/utils/dbUtils";
import {
  checkGetRequestOrSetError,
  doesShopExistsAlready,
} from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!checkGetRequestOrSetError(req))
    return NextResponse.json(
      { error: "invalid request type", status: false },
      { status: 400 }
    );
  const body = await req.json();
  const {
    shopName,
    shopMerchantName,
    shopMerchantEmail,
    shopMerchantPassword,
  } = body ?? {};

  if (
    !shopName ||
    !shopMerchantName ||
    !shopMerchantEmail ||
    !shopMerchantPassword
  ) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: 400 }
    );
  }
  const shop = await doesShopExistsAlready(shopMerchantEmail);
  console.log(shop);
  if (shop)
    return NextResponse.json({ error: "shop already exists" }, { status: 400 });
  const password = await hashPassword(shopMerchantPassword);
  await handlePrismaOperation(async () => {
    const shop = await Prisma.shop.create({
      data: {
        shopName,
        shopMerchantName,
        shopMerchantEmail,
        shopMerchantPassword: password,
        isOnBoarded: false,
      },
    });
  }, new NextResponse());

  return NextResponse.json(
    { success: true, message: "shop created successfully" },
    { status: 200 }
  );
}
