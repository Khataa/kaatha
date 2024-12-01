import { handlePrismaOperation } from "@/app/utils/dbUtils";
import {
  checkPostRequestOrSetError,
  getShopId,
} from "@/app/utils/requestUtils";
import Prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!checkPostRequestOrSetError(req))
    return NextResponse.json(
      { error: "invalid request type", status: false },
      { status: 400 }
    );
  const shopId = await getShopId(req);
  if (!shopId) return NextResponse.json({ error: "shop not found", status : false }, {status : 404});
  const id = parseInt(shopId as string);
  const { shopCategory, shopMerchantMobileNo, shopLocation } = body;
  if (!shopCategory || !shopMerchantMobileNo || !shopLocation)
    return NextResponse.json(
      {
        error: "invalid request data",
        message: "all fields are required",
        status: false,
      },
      { status: 400 }
    );

  const result = await handlePrismaOperation(async () => {
    const shop = await Prisma.shop.update({
      where: {
        shopId: id,
      },
      data: {
        shopCategory,
        shopMerchantMobileNo,
        shopLocation,
        isOnBoarded: true,
      },
    });
    return shop;
  }, new NextResponse());

  if (!result)
    return NextResponse.json(
      { error: "something went wrong", status: false },
      { status: 500 }
    );
  return NextResponse.json(
    { success: true, message: "shop on-boarded successfully", status: true },
    { status: 200 }
  );
}
