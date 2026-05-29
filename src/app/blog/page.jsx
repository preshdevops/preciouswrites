import CategoryFilter from "@/components/CategoryFilter";
import { getAllPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Posts | PreciousWrites",
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
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 animate-in fade-in duration-1000">
      
      <header className="mb-16 border-b border-border pb-12 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-6">All Posts</h1>
        <p className="font-sans text-lg text-foreground/80 leading-relaxed">
          Faith, football, film, tech, and everything in between.
        </p>
      </header>

      {/* Category Filter and Post Grid */}
      <CategoryFilter posts={posts} />
      
    </div>
  );
}
