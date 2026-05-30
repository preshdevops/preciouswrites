import { NextResponse } from "next/server";
import { getCurrentlyInto } from "@/lib/currently-into";

const FALLBACK = [
  { id: 1, label: "Breaking Bad", sublabel: "Season 4, Episode 3. Download limits." },
  { id: 2, label: "eFootball 2024", sublabel: "Possession build-up. Always." },
];

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const entries = await getCurrentlyInto();
    if (!entries || entries.length === 0) {
      return NextResponse.json({ entries: FALLBACK });
    }
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Failed to fetch currently into:", error);
    return NextResponse.json({ entries: FALLBACK });
  }
}
