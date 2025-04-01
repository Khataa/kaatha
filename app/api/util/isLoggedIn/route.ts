import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";
import { getIdFromToken,  } from "@/app/utils/requestUtils";

export async function GET(req: NextRequest) {
  const customerToken = req.cookies.get('token')?.value;
  const shopToken = req.cookies.get('token')?.value;

  if(await getIdFromToken(customerToken!)) return NextResponse.json({ status: true, type: "customer" });
  if(await getIdFromToken(shopToken!)) return NextResponse.json({ status: true, type: "shop" });
  return NextResponse.json({ status: false });
}