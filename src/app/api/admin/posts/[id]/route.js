import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPostById, updatePost, deletePost } from "@/lib/posts";

export async function PUT(request, { params }) {
  const valid = await isAuthenticated();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await getPostById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const data = await request.json();
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

    const result = await updatePost(Number(id), {
      title,
      excerpt,
      category,
      tags: parsedTags,
      content,
    });

    return NextResponse.json({ message: "Post updated.", ...result });
  } catch (error) {
    console.error("Error updating post:", error);
    if (error.message?.includes("UNIQUE constraint")) {
      return NextResponse.json(
        { error: "A post with this title already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const valid = await isAuthenticated();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await getPostById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await deletePost(Number(id));
    return NextResponse.json({ message: "Post deleted." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
