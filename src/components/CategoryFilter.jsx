"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";

export default function CategoryFilter({ posts }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const getPostCount = (cat) => {
    if (cat === "All") return posts.length;
    return posts.filter((p) => p.category === cat).length;
  };

  return (
    <>
      {/* Category Index Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 bg-card hairline-border rounded-2xl max-w-fit mx-auto shadow-sm font-mono">
        {categories.map((category, index) => {
          const isActive = category === activeCategory;
          const count = getPostCount(category);
          const idxStr = String(index).padStart(2, '0');

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-black shadow-md shadow-primary/20 scale-[1.02]"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <span>[{idxStr}] {category.toUpperCase()}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isActive
                    ? "bg-black/20 text-black font-extrabold"
                    : "bg-muted text-foreground/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-card hairline-border rounded-2xl font-mono text-xs text-foreground/60">
          // NO_ENTRIES_FOUND_IN_THIS_CATEGORY
        </div>
      )}
    </>
  );
}
