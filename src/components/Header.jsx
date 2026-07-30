"use client";

import NextLink from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Command, ArrowUpRight, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-2xl hairline-b transition-all duration-300">
      
      {/* Precision Top Utility Bar */}
      <div className="hidden sm:block hairline-b py-1 px-4 bg-muted/40 font-mono text-[10px] text-foreground/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>SYS_VER 2.6 // OPERATIONAL</span>
            </span>
            <span>&bull;</span>
            <span>OSOGBO, NG [07°46'N 04°34'E]</span>
          </div>
          <div className="flex items-center gap-4">
            <span>TIME: <span className="text-foreground font-semibold">{time || "12:00:00"}</span></span>
            <span>&bull;</span>
            <span>PRECIOUS OLONADE</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Canonical Mark & Brand Title */}
        <NextLink href="/" className="group flex items-center gap-3 focus:outline-none">
          <div className="w-9 h-9 rounded-lg bg-foreground text-background font-mono font-extrabold text-xs flex items-center justify-center tracking-tighter group-hover:bg-primary group-hover:text-black transition-colors shadow-sm">
            ✦PO
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Precious<span className="text-primary font-mono font-normal">Writes</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 hidden md:block">
              Journal &bull; Tech &bull; Faith &bull; Cinema
            </span>
          </div>
        </NextLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider font-semibold">
          <NextLink 
            href="/" 
            className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            // 01. Home
          </NextLink>
          <NextLink 
            href="/blog" 
            className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            // 02. Archive
          </NextLink>
          <NextLink 
            href="/about" 
            className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            // 03. About
          </NextLink>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Quick Search */}
          <button 
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card hover:bg-muted text-foreground/70 hover:text-foreground hairline-border transition-all text-xs font-mono cursor-pointer" 
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={14} className="text-primary" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono bg-muted text-foreground/50 rounded border border-border">
              <Command size={9} />K
            </kbd>
          </button>
          
          <ThemeToggle />

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 rounded-lg bg-card hairline-border text-foreground/80 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Interactive Search Overlay Modal */}
      {isSearchOpen && (
        <div 
          ref={searchRef}
          className="absolute left-0 right-0 top-full bg-card/95 backdrop-blur-2xl hairline-b py-6 px-4 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="container mx-auto max-w-2xl relative space-y-4">
            <div className="flex items-center gap-3 bg-background hairline-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
              <Search size={18} className="text-primary shrink-0" />
              <input
                type="text"
                placeholder="Search by keyword, topic, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent font-sans text-sm focus:outline-none placeholder-foreground/40 text-foreground"
                autoFocus
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                className="p-1 rounded text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dropdown Results */}
            {searchQuery.trim() && (
              <div className="bg-background hairline-border rounded-xl shadow-xl overflow-hidden">
                {loading ? (
                  <div className="px-4 py-4 font-mono text-xs text-foreground/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> Querying database...
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
                            <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-primary bg-primary/10 rounded mb-1">
                              {post.category}
                            </span>
                            <h4 className="font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors">
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

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden hairline-t bg-background/95 backdrop-blur-xl py-6 px-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 font-mono text-sm font-semibold">
            <NextLink 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg bg-card hairline-border hover:border-primary text-foreground"
            >
              // 01. Home
            </NextLink>
            <NextLink 
              href="/blog" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg bg-card hairline-border hover:border-primary text-foreground"
            >
              // 02. Archive
            </NextLink>
            <NextLink 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg bg-card hairline-border hover:border-primary text-foreground"
            >
              // 03. About
            </NextLink>
          </nav>
        </div>
      )}
    </header>
  );
}
