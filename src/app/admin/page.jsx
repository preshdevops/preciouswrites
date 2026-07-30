"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!password) {
      setError("Enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border/80 rounded-3xl p-8 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Lock size={22} />
            </div>
            <h1 className="font-sans text-xl font-bold text-foreground">PreciousWrites</h1>
            <p className="font-mono text-xs text-foreground/50">Admin Console Authentication</p>
          </div>

          {/* Password Input */}
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="w-full bg-background border border-border/80 rounded-xl px-4 py-2.5 font-sans text-xs text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-white px-4 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Authenticating..." : "Log In"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="font-sans text-xs text-rose-500 mt-2 text-center font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
