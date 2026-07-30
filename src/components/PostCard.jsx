import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

export default function PostCard({ post }) {
  const getCategoryBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case "faith":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "football":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "film":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "tech":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "life":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <article className="group relative flex flex-col justify-between bg-card border border-border/80 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full overflow-hidden">
      {/* Top Subtle Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        {/* Meta Bar */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-4">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border uppercase ${getCategoryBadgeClass(post.category)}`}>
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-foreground/50">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {post.readingTime}
            </span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-sans text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors mb-3">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="font-sans text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>
      </div>
      
      {/* Bottom Link Action */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs font-medium text-foreground/60 group-hover:text-primary transition-colors">
        <span>Read Article</span>
        <div className="w-7 h-7 rounded-full bg-muted/60 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </article>
  );
}
