"use client";

import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

const CATEGORIES = ["Faith", "Football", "Culture", "Tech", "Life"];

export default function PostForm({ initialData, onSubmit, submitLabel = "Save Post" }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
  const [tags, setTags] = useState(
    initialData?.tags ? (Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags) : ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError("Title, excerpt, and content are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        title: title.trim(),
        excerpt: excerpt.trim(),
        category,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        content: content.trim(),
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Editor */}
      <div className="flex flex-col gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full bg-background border border-border px-4 py-3 font-serif text-xl text-primary placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Excerpt */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description for the post card"
            rows={2}
            className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Faith, Grace, God"
              className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">Content (HTML)</label>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="font-sans text-xs text-accent hover:text-primary transition-colors cursor-pointer lg:hidden"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="<p>Write your post here...</p>"
            rows={16}
            className="w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent transition-colors resize-y leading-relaxed"
          />
          <p className="font-sans text-[11px] text-foreground/40">
            Wrap paragraphs in &lt;p&gt; tags. Keep it short, keep it real.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="font-sans text-sm text-rose-600 dark:text-rose-400">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-background px-4 py-3 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>

      {/* Preview */}
      <div className={`${showPreview ? "block" : "hidden"} lg:block`}>
        <div className="sticky top-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-sans text-xs font-medium text-foreground/60 uppercase tracking-wider">Preview</span>
          </div>
          <div className="border border-border bg-muted/20 p-6 min-h-[400px]">
            {title && (
              <h1 className="font-serif text-3xl font-bold text-primary mb-4">{title}</h1>
            )}
            {excerpt && (
              <p className="font-sans text-sm text-foreground/60 mb-6 italic">{excerpt}</p>
            )}
            {category && (
              <span className="px-2 py-0.5 bg-muted text-accent rounded-full text-[10px] uppercase font-semibold mb-6 inline-block">{category}</span>
            )}
            <div className="border-t border-border mt-4 pt-6">
              <div
                className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:font-sans prose-p:leading-relaxed prose-p:text-foreground/90 max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
