"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, LogOut, Database } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";

function DashboardContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setMessage("Post deleted.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  };

  const handleSeed = async () => {
    if (!confirm("Seed the database with the default posts? This won't overwrite existing posts.")) return;
    
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      if (res.ok) {
        setMessage("Database seeded.");
        await fetchPosts();
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Seed failed:", err);
    } finally {
      setSeeding(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  };

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="font-serif text-xl font-bold text-primary">
            PreciousWrites <span className="font-sans text-xs text-foreground/50 font-normal ml-1">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-sans text-xs text-foreground/60 hover:text-primary transition-colors">
              View Blog
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 font-sans text-xs text-foreground/60 hover:text-primary transition-colors cursor-pointer"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        
        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div>
              <p className="font-sans text-2xl font-bold text-primary">{posts.length}</p>
              <p className="font-sans text-xs text-foreground/60 uppercase tracking-wider">Posts</p>
            </div>
            <div>
              <p className="font-sans text-2xl font-bold text-primary">{categories.length}</p>
              <p className="font-sans text-xs text-foreground/60 uppercase tracking-wider">Categories</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-sans text-sm hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Database size={14} /> {seeding ? "Seeding..." : "Seed DB"}
            </button>
            <Link
              href="/admin/dashboard/new"
              className="inline-flex items-center gap-2 bg-primary text-background px-4 py-2.5 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300"
            >
              <Plus size={14} /> New Post
            </Link>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 px-4 py-3 bg-secondary/10 border border-secondary/30 font-sans text-sm text-secondary">
            {message}
          </div>
        )}

        {/* Posts Table */}
        {loading ? (
          <div className="text-center py-20 font-sans text-sm text-foreground/60">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border border-border bg-muted/20">
            <p className="font-serif text-xl text-primary mb-2">No posts yet</p>
            <p className="font-sans text-sm text-foreground/60 mb-6">Create your first post or seed the database with defaults.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-sans text-sm hover:bg-muted transition-colors cursor-pointer"
              >
                <Database size={14} /> Seed Defaults
              </button>
              <Link
                href="/admin/dashboard/new"
                className="inline-flex items-center gap-2 bg-primary text-background px-4 py-2.5 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300"
              >
                <Plus size={14} /> Write Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="font-serif text-lg font-bold text-primary truncate">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1 font-sans text-xs text-foreground/50">
                    <span className="text-accent font-medium uppercase">{post.category}</span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/dashboard/edit/${post.id}`}
                    className="p-2 hover:bg-muted rounded transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-foreground/60" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-rose-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
