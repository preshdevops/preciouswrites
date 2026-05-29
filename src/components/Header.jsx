"use client";

import NextLink from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <NextLink href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary">
          PreciousWrites
        </NextLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center font-sans text-sm font-medium">
          <NextLink href="/" className="hover:text-accent transition-colors">Home</NextLink>
          <NextLink href="/blog" className="hover:text-accent transition-colors">Posts</NextLink>
          <NextLink href="/about" className="hover:text-accent transition-colors">About</NextLink>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" aria-label="Search">
            <Search size={20} />
          </button>
          
          <ThemeToggle />

          {/* Hamburger Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Slide-Down */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md py-6 px-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 font-sans text-lg font-medium text-center">
            <NextLink 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="hover:text-accent py-2 transition-colors border-b border-border/40"
            >
              Home
            </NextLink>
            <NextLink 
              href="/blog" 
              onClick={() => setIsOpen(false)}
              className="hover:text-accent py-2 transition-colors border-b border-border/40"
            >
              Posts
            </NextLink>
            <NextLink 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="hover:text-accent py-2 transition-colors"
            >
              About
            </NextLink>
          </nav>
        </div>
      )}
    </header>
  );
}
