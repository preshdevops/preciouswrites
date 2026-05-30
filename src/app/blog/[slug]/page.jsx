import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";
import PostCard from "@/components/PostCard";


export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = staticPosts.find((p) => p.slug === slug);
  }
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | PreciousWrites`,
    description: post.excerpt,
  };
}

export default async function SinglePost({ params }) {
  const { slug } = await params;

  let post;
  let allPosts;
  try {
    post = await getPostBySlug(slug);
    allPosts = await getAllPosts();
  } catch {
    post = staticPosts.find((p) => p.slug === slug);
    allPosts = staticPosts;
  }

  // Fallback to static if DB returned nothing
  if (!post) {
    post = staticPosts.find((p) => p.slug === slug);
    allPosts = allPosts?.length ? allPosts : staticPosts;
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-4xl">Post not found.</h1>
        <Link href="/blog" className="text-accent underline mt-4 inline-block">Return to Posts</Link>
      </div>
    );
  }

  // Get 2 related posts (excluding current)
  const relatedPosts = (allPosts || []).filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="animate-in fade-in duration-1000">
      
      {/* Post Header */}
      <header className="bg-muted/30 border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-sans text-sm font-medium mb-8">
            <ArrowLeft size={16} /> Back to Posts
          </Link>
          
          <div className="flex items-center justify-center gap-3 text-sm text-accent font-sans font-medium tracking-widest uppercase mb-6">
            <span>{post.category}</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-primary mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-foreground/70 font-sans text-sm">
            <span>By Precious</span>
            <span>&bull;</span>
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-3xl">
        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary prose-p:font-sans prose-p:leading-relaxed prose-p:text-foreground/90 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-muted text-foreground/70 text-sm font-sans rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Author Bio */}
        <div className="mt-16 bg-muted/50 border border-border p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="w-24 h-24 rounded-full bg-secondary/30 shrink-0 border border-border flex items-center justify-center overflow-hidden">
            <span className="font-serif text-secondary text-2xl italic">P</span>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">About the Author</h3>
            <p className="font-sans text-foreground/80 leading-relaxed mb-4 text-sm">
              Precious Olonade. Final-year CS student, graphics designer, and builder based in Osogbo, Nigeria. Writes about faith, football, film, tech, and life.
            </p>
            <Link href="/about" className="text-accent font-sans font-medium hover:text-primary transition-colors text-sm underline underline-offset-4">
              Read full bio
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-muted py-16 border-t border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(rp => (
                <PostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </div>
      )}
      
    </article>
  );
}
