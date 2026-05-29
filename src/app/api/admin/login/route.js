import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password not configured." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Wrong password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { message: "Logged in." },
      { status: 200 }
    );

    return setSessionCookie(response);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
