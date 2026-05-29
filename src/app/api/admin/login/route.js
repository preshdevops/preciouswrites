import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";
import crypto from "crypto";

// In-memory rate limiting map
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    // Clean up expired entries in-memory
    for (const [key, value] of attempts.entries()) {
      if (now > value.expiresAt) {
        attempts.delete(key);
      }
    }

    // Check rate limit for this IP
    const record = attempts.get(ip);
    if (record) {
      if (now > record.expiresAt) {
        // Reset window
        attempts.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
      } else if (record.count >= MAX_ATTEMPTS) {
        return NextResponse.json(
          { error: "Too many attempts. Try again later." },
          { status: 429 }
        );
      } else {
        record.count += 1;
      }
    } else {
      attempts.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    }

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

    const inputBuffer = Buffer.from(password);
    const adminBuffer = Buffer.from(adminPassword);

    // Timing-safe comparison (requires same buffer length)
    if (inputBuffer.length !== adminBuffer.length) {
      return NextResponse.json(
        { error: "Wrong password." },
        { status: 401 }
      );
    }

    if (!crypto.timingSafeEqual(inputBuffer, adminBuffer)) {
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
