"use client";

import NextLink from "next/link";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <NextLink href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary">
          PreciousWrites
        </NextLink>

        <nav className="hidden md:flex gap-8 items-center font-sans text-sm font-medium">
          <NextLink href="/" className="hover:text-accent transition-colors">Home</NextLink>
          <NextLink href="/blog" className="hover:text-accent transition-colors">Journal</NextLink>
          <NextLink href="/about" className="hover:text-accent transition-colors">About</NextLink>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
