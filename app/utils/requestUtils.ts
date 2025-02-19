import { NextRequest, NextResponse } from "next/server";
import { handlePrismaOperation } from "./dbUtils";
import Prisma from "@/db/prisma";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

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
export async function doesShopExistsAlready(shopMerchantEmail: string) {
  if (!shopMerchantEmail) return false;
  const res = await handlePrismaOperation(async () => {
    const shop = await Prisma.shop.findFirst({
      where: { shopMerchantEmail },
    });
    return shop !== null;
  }, new NextResponse());
  return res;
}

export async function getShopId(req: NextRequest) {
  const authorizationJWT = req.cookies.get("token");
  if (!authorizationJWT) return null;
  const getShopId = await getShopIdFromToken(authorizationJWT.value);
  return getShopId as string;
}

export async function getShopIdFromToken(token: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function doesCustomeExistsAlready(customerEmail: string) {
  if (!customerEmail) return false;
  const result = await handlePrismaOperation(async () => {
    const customer = await Prisma.customer.findFirst({
      where: { customerEmail },
    });
    return customer!=null;
  }, new NextResponse());
  return result;
}

export async function getCustomerId(req: NextRequest) {
  const authorizationJWT = req.cookies.get("token");
  if (!authorizationJWT) return null;
  const customerId = await getCustomerIdFromToken(authorizationJWT.value);
  return customerId as string;
}

export async function getCustomerIdFromToken(token: string) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}