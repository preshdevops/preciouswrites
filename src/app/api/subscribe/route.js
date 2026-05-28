import { NextResponse } from "next/server";

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

    // Server log (Ubuntu Linux console output!)
    console.log(`\n📬 [SUBSCRIBER LOG] New newsletter subscription received:\n  Email: ${email}\n  Timestamp: ${new Date().toISOString()}\n`);

    // Return success response
    return NextResponse.json(
      { message: "Wonderful! You've been successfully subscribed to The Cozy Letter." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription API endpoint exception:", error);
    return NextResponse.json(
      { error: "A server error occurred. Please try again shortly." },
      { status: 500 }
    );
  }
}
