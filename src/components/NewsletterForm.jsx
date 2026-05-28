"use client";

import { useState } from "react";

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
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please check your connection.");
    }
  };

  const isSidebar = variant === "sidebar";

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder={isSidebar ? "Enter email..." : "Your email address"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          isSidebar
            ? "bg-background/10 border border-background/25 px-3 py-2 text-background placeholder-background/50 focus:outline-none focus:border-background/60 font-sans text-xs w-full"
            : "bg-background border border-border px-4 py-2 focus:outline-none focus:border-accent font-sans w-full text-foreground"
        }
        disabled={status === "loading"}
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={
          isSidebar
            ? "bg-background text-primary px-3 py-2 font-sans font-medium text-xs hover:bg-accent hover:text-white transition-colors w-full uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            : "bg-primary text-background px-4 py-2 font-sans font-medium hover:bg-accent transition-colors w-full disabled:opacity-50 cursor-pointer"
        }
      >
        {status === "loading" ? "Subscribing..." : isSidebar ? "Join the List" : "Subscribe"}
      </button>
      
      {message && (
        <p className={`font-sans text-xs mt-1 leading-relaxed ${
          status === "success" 
            ? (isSidebar ? "text-background/90 font-medium" : "text-green-600 dark:text-green-400 font-medium")
            : (isSidebar ? "text-rose-300 font-medium" : "text-rose-600 dark:text-rose-400 font-medium")
        }`}>
          {message}
        </p>
      )}
    </form>
  );
}
