import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Journal | PreciousWrites",
  description: "Read all essays and musings by PreciousWrites.",
};

export default function BlogListing() {
  const categories = ["All", ...new Set(posts.map(post => post.category))];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 animate-in fade-in duration-1000">
      
      <header className="mb-16 border-b border-border pb-12 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-6">The Journal</h1>
        <p className="font-sans text-lg text-foreground/80 leading-relaxed">
          An archive of thoughts, stories, and observations on the writing life.
        </p>
      </header>

      {/* Category Filters (Static for now, would be interactive in a client component) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button 
            key={category}
            className={`px-4 py-1.5 rounded-full border ${category === "All" ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground/70 hover:border-primary hover:text-primary"} font-sans text-sm transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      
    </div>
  );
}
