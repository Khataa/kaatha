import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";
import { getCustomerIdFromToken, getShopIdFromToken,  } from "@/app/utils/requestUtils";

export async function GET(req: NextRequest) {
  const customerToken = req.cookies.get('token')?.value;
  const shopToken = req.cookies.get('token')?.value;

  if(await getCustomerIdFromToken(customerToken!)) return NextResponse.json({ status: true, type: "customer" });
  if(await getShopIdFromToken(shopToken!)) return NextResponse.json({ status: true, type: "shop" });
  return NextResponse.json({ status: false });
}