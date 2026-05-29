import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { seedPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";

export async function POST() {
  const valid = await isAuthenticated();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await seedPosts(staticPosts);
    return NextResponse.json({ message: "Database seeded with existing posts." });
  } catch (error) {
    console.error("Error seeding posts:", error);
    return NextResponse.json({ error: "Failed to seed posts." }, { status: 500 });
  }
}
