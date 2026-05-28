import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <article className="group flex flex-col gap-4 border border-border p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
      
      <div className="flex items-center gap-3 text-sm text-foreground/70 font-sans mb-2">
        <span className="text-accent font-medium tracking-wide uppercase">{post.category}</span>
        <span>&bull;</span>
        <span>{post.date}</span>
        <span>&bull;</span>
        <span>{post.readingTime}</span>
      </div>
      
      <h3 className="font-serif text-2xl font-bold leading-tight text-primary group-hover:text-accent transition-colors">
        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true"></span>
          {post.title}
        </Link>
      </h3>
      
      <p className="font-sans text-foreground/80 leading-relaxed line-clamp-3 flex-grow">
        {post.excerpt}
      </p>
      
      <div className="mt-4 flex items-center gap-2 text-primary font-medium font-sans text-sm group-hover:text-accent transition-colors">
        Read Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </article>
  );
}
