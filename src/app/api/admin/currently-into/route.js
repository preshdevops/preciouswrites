import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getCurrentlyInto, updateCurrentlyInto } from "@/lib/currently-into";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = await getCurrentlyInto();
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Failed to fetch currently into:", error);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function PUT(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { entries } = await request.json();

    if (!Array.isArray(entries)) {
      return NextResponse.json({ error: "entries must be an array" }, { status: 400 });
    }

    const updated = await updateCurrentlyInto(entries);
    return NextResponse.json({ entries: updated });
  } catch (error) {
    console.error("Failed to update currently into:", error);
    return NextResponse.json({ error: "Failed to update entries" }, { status: 500 });
  }
}
