import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";
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

  if (!post) {
    post = staticPosts.find((p) => p.slug === slug);
    allPosts = allPosts?.length ? allPosts : staticPosts;
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-sans text-3xl font-bold text-foreground">Post not found.</h1>
        <Link href="/blog" className="text-primary underline mt-4 inline-block font-sans text-sm">Return to Articles</Link>
      </div>
    );
  }

  const relatedPosts = (allPosts || []).filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="animate-in fade-in duration-700">
      
      {/* Article Header */}
      <header className="bg-card border-b border-border/80 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-sans text-xs font-semibold mb-6 px-3 py-1.5 rounded-full bg-muted/60 border border-border/40 w-fit"
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>
          
          <div className="flex items-center gap-3 text-xs font-mono font-semibold uppercase mb-4">
            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              {post.category}
            </span>
          </div>
          
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold leading-tight text-foreground mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-foreground/60 font-sans text-xs pt-2 border-t border-border/40">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <User size={14} className="text-primary" /> Precious Olonade
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {post.date}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-3xl">
        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-a:text-primary hover:prose-a:text-accent prose-p:font-sans prose-p:leading-relaxed prose-p:text-foreground/90 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Tag Pills */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-foreground/50 mr-1 flex items-center gap-1">
              <Tag size={12} /> Tags:
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-muted/80 border border-border/60 text-foreground/70 text-xs font-mono rounded-lg">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Author Bio Card */}
        <div className="mt-12 bg-card border border-border/80 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-bold font-mono text-xl flex items-center justify-center shrink-0 shadow-md">
            PO
          </div>
          <div className="space-y-2">
            <h3 className="font-sans text-lg font-bold text-foreground">Written by Precious Olonade</h3>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Final-year CS student, web developer, and designer based in Osogbo, Nigeria. Writing about faith, football, film, software engineering, and life.
            </p>
            <div className="pt-1">
              <Link href="/about" className="text-primary font-sans font-semibold text-xs hover:text-accent transition-colors underline">
                Learn more about Precious &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-muted/40 py-16 border-t border-border/60">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-8">
            <h2 className="font-sans text-2xl font-bold text-foreground text-center">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
