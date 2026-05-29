"use client";

import NextLink from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);

  // Close search overlay on Escape key or clicking outside
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Fetch posts once when search is opened
  useEffect(() => {
    if (isSearchOpen && allPosts.length === 0) {
      setLoading(true);
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => {
          if (data.posts) {
            setAllPosts(data.posts);
          }
        })
        .catch((err) => console.error("Search fetch error:", err))
        .finally(() => setLoading(false));
    }
  }, [isSearchOpen, allPosts.length]);

  // Filter posts client-side by title
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border relative">
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
          <button 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" 
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
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

      {/* Search Bar Slide-Down Overlay */}
      {isSearchOpen && (
        <div 
          ref={searchRef}
          className="absolute left-0 right-0 top-full bg-background border-b border-border py-4 px-4 shadow-lg z-40 animate-in slide-in-from-top duration-300"
        >
          <div className="container mx-auto max-w-3xl relative">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-foreground/50 shrink-0" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent font-sans text-lg focus:outline-none placeholder-foreground/30 text-foreground"
                autoFocus
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-foreground/50 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Dropdown Results */}
            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-4 bg-background border border-border rounded-md shadow-xl overflow-hidden z-50">
                {loading ? (
                  <div className="px-4 py-3 font-sans text-sm text-foreground/50">Loading...</div>
                ) : filteredPosts.length === 0 ? (
                  <div className="px-4 py-3 font-sans text-sm text-foreground/50">No results found for "{searchQuery}"</div>
                ) : (
                  <ul className="divide-y divide-border/60 max-h-60 overflow-y-auto">
                    {filteredPosts.map((post) => (
                      <li key={post.slug}>
                        <NextLink
                          href={`/blog/${post.slug}`}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                          className="block px-4 py-3 hover:bg-muted font-serif text-base text-primary hover:text-accent transition-colors"
                        >
                          {post.title}
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
