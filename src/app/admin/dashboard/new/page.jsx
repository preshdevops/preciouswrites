"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import PostForm from "@/components/admin/PostForm";

function NewPostContent() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to create post.");
    }

    router.push("/admin/dashboard");
  };

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
        <h1 className="font-serif text-3xl font-bold text-primary mb-8">New Post</h1>
        <PostForm onSubmit={handleSubmit} submitLabel="Publish Post" />
      </div>
    </div>
  );
}

export default function NewPostPage() {
  return (
    <AdminGuard>
      <NewPostContent />
    </AdminGuard>
  );
}
