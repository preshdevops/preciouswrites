import CategoryFilter from "@/components/CategoryFilter";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Journal | PreciousWrites",
  description: "Read all essays and musings by PreciousWrites.",
};

export default function BlogListing() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 animate-in fade-in duration-1000">
      
      <header className="mb-16 border-b border-border pb-12 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-6">The Journal</h1>
        <p className="font-sans text-lg text-foreground/80 leading-relaxed">
          An archive of thoughts, stories, and observations on the writing life.
        </p>
      </header>

      {/* Category Filter and Post Grid */}
      <CategoryFilter posts={posts} />
      
    </div>
  );
}
