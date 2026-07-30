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
        setMessage("Post deleted successfully.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  };

  const handleSeed = async () => {
    if (!confirm("Seed the database with default posts?")) return;
    
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
    <div className="min-h-screen font-sans">
      {/* Top Header */}
      <header className="border-b border-border/80 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg text-foreground">
            <div className="w-6 h-6 rounded-md bg-primary text-white text-[10px] font-mono flex items-center justify-center font-extrabold">
              PW
            </div>
            <span>PreciousWrites <span className="font-mono text-xs text-foreground/50 font-normal">Console</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-sans text-xs font-semibold text-foreground/70 hover:text-primary transition-colors">
              View Blog &rarr;
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl space-y-6">
        
        {/* Stats Header Bar */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-8">
            <div>
              <p className="font-sans text-3xl font-extrabold text-foreground">{posts.length}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">Total Articles</p>
            </div>
            <div className="h-8 w-[1px] bg-border/60" />
            <div>
              <p className="font-sans text-3xl font-extrabold text-foreground">{categories.length}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">Categories</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center gap-1.5 border border-border/80 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Database size={14} /> {seeding ? "Seeding..." : "Seed DB"}
            </button>
            <Link
              href="/admin/dashboard/new"
              className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              <Plus size={14} /> Write Article
            </Link>
          </div>
        </div>

        {/* Status Notification Message */}
        {message && (
          <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {message}
          </div>
        )}

        {/* Posts Table / List */}
        {loading ? (
          <div className="text-center py-20 font-mono text-xs text-foreground/50">Loading articles from database...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border/80 rounded-2xl space-y-4">
            <p className="font-sans text-lg font-bold text-foreground">No articles in database yet</p>
            <p className="font-sans text-xs text-foreground/60 max-w-sm mx-auto">Create your first article or seed the database with static defaults.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="inline-flex items-center gap-1.5 border border-border px-4 py-2 rounded-xl font-sans text-xs font-semibold hover:bg-muted transition-colors cursor-pointer"
              >
                <Database size={14} /> Seed Defaults
              </button>
              <Link
                href="/admin/dashboard/new"
                className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all"
              >
                <Plus size={14} /> Write Article
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border/80 rounded-2xl overflow-hidden divide-y divide-border/60 shadow-sm">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-4 space-y-1">
                  <h3 className="font-sans text-base font-bold text-foreground truncate">{post.title}</h3>
                  <div className="flex items-center gap-3 font-mono text-xs text-foreground/50">
                    <span className="text-primary font-semibold uppercase">{post.category}</span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/dashboard/edit/${post.id}`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                    title="Edit Article"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="p-2 hover:bg-rose-500/10 text-foreground/60 hover:text-rose-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    title="Delete Article"
                  >
                    <Trash2 size={15} />
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
