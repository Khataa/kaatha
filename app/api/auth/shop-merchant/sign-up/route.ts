import { handlePrismaOperation } from "@/app/utils/dbUtils";
import {
  checkGetRequestOrSetError,
  doesShopIdExists,
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
    shopId,
    shopName,
    shopMerchantName,
    shopMerchantEmail,
    shopMerchantPassword,
  } = body;

  if (
    !shopId ||
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
  const shop = await doesShopIdExists(shopId);
  if (shop)
    return NextResponse.json({ error: "shop already exists" }, { status: 400 });
  const password = await hashPassword(shopMerchantPassword);
  const result = await handlePrismaOperation(async () => {
    const shop = await Prisma.shop.create({
      data: {
        shopId,
        shopName,
        shopMerchantName,
        shopMerchantEmail,
        shopMerchantPassword: password,
        isOnBoarded: false,
      },
    });
  }, new NextResponse());
  if (!result)
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  return NextResponse.json(
    { success: true, message: "shop created successfully" },
    { status: 200 }
  );
}
