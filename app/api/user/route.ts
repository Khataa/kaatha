import { JWT_SECRET } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Create a simple response object
  const message = {
    status: true,
    message: "Hello, this is a GET request!",
    jwt: JWT_SECRET,
  };
  // Return the response as JSON
  return NextResponse.json(message);
}
