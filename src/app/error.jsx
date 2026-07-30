"use client";

import { useEffect } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
      <div className="bg-card border border-border/80 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-xl space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle size={28} />
        </div>
        <h1 className="font-sans text-2xl font-bold text-foreground">Something Broke</h1>
        <p className="font-sans text-xs text-foreground/70 leading-relaxed">
          An unexpected error occurred while loading this page. Let's try reloading.
        </p>
        <button 
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer w-full"
        >
          <RotateCcw size={14} /> Try Again
        </button>
      </div>
    </div>
  );
}
