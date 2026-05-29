import { NextResponse } from "next/server";
import db from "@/lib/db";

// Ensure subscribers table exists
let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  tableReady = true;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email presence
    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await ensureTable();

    // Insert subscriber
    await db.execute({
      sql: "INSERT INTO subscribers (email) VALUES (?)",
      args: [email.toLowerCase().trim()],
    });

    return NextResponse.json(
      { message: "You're in. New posts straight to your inbox." },
      { status: 200 }
    );
  } catch (error) {
    // Handle duplicate email
    if (error.message?.includes("UNIQUE constraint")) {
      return NextResponse.json(
        { message: "You're already subscribed." },
        { status: 200 }
      );
    }

    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "A server error occurred. Please try again shortly." },
      { status: 500 }
    );
  }
}
