import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllPosts, createPost } from "@/lib/posts";

export async function GET() {
  const valid = await isAuthenticated();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

export async function POST(request) {
  const valid = await isAuthenticated();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validate required fields
    const { title, excerpt, category, tags, content } = data;
    if (!title || !excerpt || !category || !content) {
      return NextResponse.json(
        { error: "Title, excerpt, category, and content are required." },
        { status: 400 }
      );
    }

    const parsedTags = Array.isArray(tags)
      ? tags
      : (tags || "").split(",").map((t) => t.trim()).filter(Boolean);

    const result = await createPost({
      title,
      excerpt,
      category,
      tags: parsedTags,
      content,
    });

    return NextResponse.json({ message: "Post created.", ...result }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    if (error.message?.includes("UNIQUE constraint")) {
      return NextResponse.json(
        { error: "A post with this title already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
