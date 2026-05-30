"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";

function CurrentlyIntoContent() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/currently-into");
      const data = await res.json();
      if (res.ok) {
        setEntries(data.entries?.length > 0 ? data.entries : [
          { label: "", sublabel: "" },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch entries:", err);
      setEntries([{ label: "", sublabel: "" }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/currently-into", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save.");
      }
    } catch {
      setMessage("Connection error.");
    } finally {
      setSaving(false);
    }
  };

  const updateEntry = (index, field, value) => {
    setEntries((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    );
  };

  const addEntry = () => {
    setEntries((prev) => [...prev, { label: "", sublabel: "" }]);
  };

  const removeEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  };

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
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl">
        {/* Back link */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-sans text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Currently Into</h1>
        <p className="font-sans text-sm text-foreground/60 mb-8">
          Update the &quot;Currently Into&quot; sidebar section on the homepage.
        </p>

        {/* Message */}
        {message && (
          <div className="mb-6 px-4 py-3 bg-secondary/10 border border-secondary/30 font-sans text-sm text-secondary">
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 font-sans text-sm text-foreground/60">Loading...</div>
        ) : (
          <div className="flex flex-col gap-6">
            {entries.map((entry, index) => (
              <div key={index} className="border border-border bg-muted/20 p-5 flex flex-col gap-3 relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-sans text-xs text-foreground/50 uppercase tracking-wider font-medium">
                    Item {index + 1}
                  </span>
                  {entries.length > 1 && (
                    <button
                      onClick={() => removeEntry(index)}
                      className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 size={14} className="text-rose-500" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">
                    Label
                  </label>
                  <input
                    type="text"
                    value={entry.label}
                    onChange={(e) => updateEntry(index, "label", e.target.value)}
                    placeholder="e.g. Breaking Bad"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">
                    Sublabel
                  </label>
                  <input
                    type="text"
                    value={entry.sublabel}
                    onChange={(e) => updateEntry(index, "sublabel", e.target.value)}
                    placeholder="e.g. Season 4, Episode 3"
                    className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
            ))}

            {/* Add + Save */}
            <div className="flex items-center gap-3">
              <button
                onClick={addEntry}
                className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-sans text-sm hover:bg-muted transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Item
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-primary text-background px-4 py-2.5 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CurrentlyIntoPage() {
  return (
    <AdminGuard>
      <CurrentlyIntoContent />
    </AdminGuard>
  );
}
