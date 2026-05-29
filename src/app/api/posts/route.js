import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let posts;
    try {
      posts = await getAllPosts();
      if (!posts || posts.length === 0) {
        posts = staticPosts;
      }
    } catch {
      posts = staticPosts;
    }
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
