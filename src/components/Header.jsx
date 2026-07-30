"use client";

import NextLink from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Command, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);

  // Close search overlay on Escape key or clicking outside & handle shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isSearchOpen) {
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

  // Filter posts client-side by title or category
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q))
    );
    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/70 border-b border-border/60 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <NextLink href="/" className="group flex items-center gap-2.5 font-bold text-xl md:text-2xl tracking-tight text-foreground">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-mono font-extrabold shadow-sm group-hover:scale-105 transition-transform duration-300">
            PW
          </div>
          <span className="font-sans">
            Precious<span className="text-primary">Writes</span>
          </span>
        </NextLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center bg-muted/50 p-1 rounded-full border border-border/40 text-sm font-medium">
          <NextLink 
            href="/" 
            className="px-4 py-1.5 rounded-full hover:text-foreground text-foreground/70 hover:bg-background/60 transition-all duration-200"
          >
            Home
          </NextLink>
          <NextLink 
            href="/blog" 
            className="px-4 py-1.5 rounded-full hover:text-foreground text-foreground/70 hover:bg-background/60 transition-all duration-200"
          >
            Posts
          </NextLink>
          <NextLink 
            href="/about" 
            className="px-4 py-1.5 rounded-full hover:text-foreground text-foreground/70 hover:bg-background/60 transition-all duration-200"
          >
            About
          </NextLink>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Search Button */}
          <button 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-foreground/60 hover:text-foreground border border-border/40 transition-all text-xs font-sans cursor-pointer" 
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={15} />
            <span className="hidden sm:inline font-medium">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-background/80 text-foreground/50 rounded border border-border/50">
              <Command size={9} />K
            </kbd>
          </button>
          
          <ThemeToggle />

          {/* Hamburger Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors cursor-pointer text-foreground/80"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          ref={searchRef}
          className="absolute left-0 right-0 top-full bg-card/95 backdrop-blur-2xl border-b border-border py-4 px-4 shadow-2xl z-40 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="container mx-auto max-w-2xl relative">
            <div className="flex items-center gap-3 bg-muted/40 border border-border/80 rounded-xl px-4 py-3 focus-within:border-primary/60 transition-colors">
              <Search size={18} className="text-primary shrink-0" />
              <input
                type="text"
                placeholder="Search articles by title or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent font-sans text-sm focus:outline-none placeholder-foreground/40 text-foreground"
                autoFocus
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                className="p-1 rounded-md hover:bg-muted text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results Dropdown */}
            {searchQuery.trim() && (
              <div className="mt-3 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                {loading ? (
                  <div className="px-4 py-4 font-mono text-xs text-foreground/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> Loading database...
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="px-4 py-6 text-center font-sans text-sm text-foreground/50">
                    No articles found matching "<span className="text-foreground font-medium">{searchQuery}</span>"
                  </div>
                ) : (
                  <ul className="divide-y divide-border/40 max-h-72 overflow-y-auto">
                    {filteredPosts.map((post) => (
                      <li key={post.slug}>
                        <NextLink
                          href={`/blog/${post.slug}`}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                          className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/60 transition-colors group"
                        >
                          <div>
                            <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase font-semibold text-primary bg-primary/10 rounded mb-1">
                              {post.category}
                            </span>
                            <h4 className="font-sans text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                          </div>
                          <ArrowUpRight size={16} className="text-foreground/30 group-hover:text-primary transition-colors shrink-0" />
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

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl py-4 px-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 font-sans text-base">
            <NextLink 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-lg hover:bg-muted text-foreground/80 font-medium transition-colors"
            >
              Home
            </NextLink>
            <NextLink 
              href="/blog" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-lg hover:bg-muted text-foreground/80 font-medium transition-colors"
            >
              Posts
            </NextLink>
            <NextLink 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-lg hover:bg-muted text-foreground/80 font-medium transition-colors"
            >
              About
            </NextLink>
          </nav>
        </div>
      )}
    </header>
  );
}
