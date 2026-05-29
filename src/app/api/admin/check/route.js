import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const valid = await isAuthenticated();
  return NextResponse.json({ authenticated: valid });
}
