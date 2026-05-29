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
        <div className="border border-border bg-muted/20 p-8 shadow-sm">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Lock size={20} className="text-accent" />
              </div>
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary">PreciousWrites</h1>
            <p className="font-sans text-sm text-foreground/60 mt-1">Admin Dashboard</p>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent transition-colors"
              autoFocus
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-background px-4 py-3 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="font-sans text-sm text-rose-600 dark:text-rose-400 mt-3 text-center">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
