import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

export default function PostCard({ post }) {
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "faith":
        return "text-purple-400 border-purple-500/30 bg-purple-500/10";
      case "football":
        return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
      case "film":
        return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "tech":
        return "text-sky-400 border-sky-500/30 bg-sky-500/10";
      case "life":
        return "text-rose-400 border-rose-500/30 bg-rose-500/10";
      default:
        return "text-primary border-primary/30 bg-primary/10";
    }
  };

  return (
    <article className="group relative flex flex-col justify-between bespoke-card rounded-2xl p-6 h-full overflow-hidden">
      {/* Structural Accent Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      
      <div>
        {/* Category & Date Metadata Bar */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-4">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(post.category)}`}>
            [{post.category}]
          </span>
          <div className="flex items-center gap-3 text-foreground/50 text-[11px]">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {post.readingTime}
            </span>
          </div>
        </div>
        
        {/* Article Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors mb-3">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="font-sans text-xs md:text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>
      </div>
      
      {/* Bottom Read Action */}
      <div className="flex items-center justify-between pt-4 hairline-t text-xs font-mono text-foreground/60 group-hover:text-primary transition-colors">
        <span>READ_ENTRY</span>
        <div className="w-7 h-7 rounded-lg bg-muted text-foreground group-hover:bg-primary group-hover:text-black flex items-center justify-center transition-all duration-300">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </article>
  );
}
