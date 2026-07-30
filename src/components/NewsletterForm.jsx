"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function NewsletterForm({ variant = "sidebar" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please check your connection.");
    }
  };

  const isSidebar = variant === "sidebar";

  return (
    <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder={isSidebar ? "you@example.com" : "Your email address"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background/80 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary font-sans text-xs transition-colors"
          disabled={status === "loading"}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-4 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0 disabled:opacity-50 cursor-pointer"
        >
          {status === "loading" ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Subscribe</span>
              <Send size={13} />
            </>
          )}
        </button>
      </div>

      {message && (
        <div
          className={`flex items-center gap-1.5 font-sans text-xs mt-1 p-2 rounded-lg ${
            status === "success"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
          }`}
        >
          {status === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
