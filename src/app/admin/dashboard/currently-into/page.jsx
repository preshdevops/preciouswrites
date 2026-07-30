"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";

export const dynamic = "force-dynamic";

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
    <div className="min-h-screen font-sans">
      {/* Top Bar */}
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
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl space-y-6">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-sans text-xs font-semibold px-3 py-1.5 rounded-full bg-muted/60 border border-border/40 w-fit"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">Currently Into</h1>
          <p className="font-sans text-xs text-foreground/60">
            Update the "Currently Into" sidebar entries on the home page.
          </p>
        </div>

        {message && (
          <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 font-mono text-xs text-foreground/50">Loading entries...</div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={index} className="bg-card border border-border/80 rounded-2xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-primary uppercase">
                    Item #{index + 1}
                  </span>
                  {entries.length > 1 && (
                    <button
                      onClick={() => removeEntry(index)}
                      className="p-1.5 text-foreground/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase font-bold text-foreground/50">Title / Topic</label>
                  <input
                    type="text"
                    value={entry.label}
                    onChange={(e) => updateEntry(index, "label", e.target.value)}
                    placeholder="e.g. Breaking Bad"
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-2 font-sans text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase font-bold text-foreground/50">Subtitle / Note</label>
                  <input
                    type="text"
                    value={entry.sublabel}
                    onChange={(e) => updateEntry(index, "sublabel", e.target.value)}
                    placeholder="e.g. Season 4. Masterclass episode."
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-2 font-sans text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={addEntry}
                className="inline-flex items-center gap-1.5 border border-border/80 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-muted transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Item
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 cursor-pointer"
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
