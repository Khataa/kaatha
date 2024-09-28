import { NextRequest, NextResponse } from "next/server";
import { handlePrismaOperation } from "./dbUtils";
import Prisma from "@/db/prisma";
import jwt from "jsonwebtoken";

export async function checkGetRequestOrSetError(req: NextRequest) {
  return checkIfTypeOrSetError(req, "GET");
}
export async function checkPostRequestOrSetError(req: NextRequest) {
  return checkIfTypeOrSetError(req, "POST");
}
async function checkIfTypeOrSetError(req: NextRequest, type: "GET" | "POST") {
  if (req.method !== type) {
    NextResponse.json({ error: "invalid request type" });
    return false;
  }
  return true;
}

export async function doesShopIdExists(shopId: number) {
  if (!shopId) return false;
  const result = await handlePrismaOperation(async () => {
    const shop = await Prisma.shop.findUnique({ where: { shopId } });
    return !!shop;
  }, new NextResponse());
}

export async function getShopId(req: NextRequest) {
  // get the authorizationJWT from cookies
  const authorizationJWT = req.cookies.get("authorizationJWT");
  if (!authorizationJWT) return null;
  const getShopId = await getShopIdFromToken(authorizationJWT.value);
  return getShopId as string;
}

async function getShopIdFromToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}