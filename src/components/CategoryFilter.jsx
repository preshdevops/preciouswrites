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

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-in fade-in duration-500">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full border ${
              category === activeCategory
                ? "border-accent bg-accent/10 text-accent font-medium shadow-sm"
                : "border-border text-foreground/70 hover:border-primary hover:text-primary"
            } font-sans text-sm transition-all duration-300 cursor-pointer`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 font-serif text-lg text-foreground/60 italic">
          No entries found in this category.
        </div>
      )}
    </>
  );
}
