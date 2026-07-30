import CategoryFilter from "@/components/CategoryFilter";
import { getAllPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Articles | PreciousWrites",
  description: "All posts by Precious Olonade on faith, football, film, tech, and life.",
};

export default async function BlogListing() {
  let posts;
  try {
    posts = await getAllPosts();
    if (posts.length === 0) posts = staticPosts;
  } catch {
    posts = staticPosts;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 animate-in fade-in duration-700 max-w-6xl space-y-12">
      
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-semibold uppercase tracking-wider">
          <BookOpen size={13} /> The Archive
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          All <span className="gradient-text">Articles</span>
        </h1>
        <p className="font-sans text-base text-foreground/70 leading-relaxed">
          Filter through thoughts on faith, football, cinema, software, and everyday reflections.
        </p>
      </header>

      {/* Category Filter and Post Grid */}
      <CategoryFilter posts={posts} />
      
    </div>
  );
}
