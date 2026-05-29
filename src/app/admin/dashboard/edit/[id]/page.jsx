"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import PostForm from "@/components/admin/PostForm";

function EditPostContent() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (res.ok) {
        const found = (data.posts || []).find((p) => p.id === Number(params.id));
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSubmit = async (data) => {
    const res = await fetch(`/api/admin/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to update post.");
    }

    router.push("/admin/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-sans text-sm text-foreground/60">Loading post...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-xl text-primary mb-4">Post not found.</p>
          <Link href="/admin/dashboard" className="text-accent underline font-sans text-sm">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 font-sans text-sm text-foreground/60 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Editor */}
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        <h1 className="font-serif text-3xl font-bold text-primary mb-8">Edit Post</h1>
        <PostForm initialData={post} onSubmit={handleSubmit} submitLabel="Update Post" />
      </div>
    </div>
  );
}

export default function EditPostPage() {
  return (
    <AdminGuard>
      <EditPostContent />
    </AdminGuard>
  );
}
