import Link from "next/link";
import { ArrowRight, BookOpen, Coffee, Feather } from "lucide-react";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  let posts;
  try {
    posts = await getAllPosts();
    if (posts.length === 0) posts = staticPosts;
  } catch {
    posts = staticPosts;
  }

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 animate-in fade-in duration-1000">
      
      {/* Decorative Top Flourish */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="h-[1px] w-12 bg-border"></div>
        <Feather size={16} className="text-accent" />
        <div className="h-[1px] w-12 bg-border"></div>
      </div>

      {/* Hero / Intro Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 max-w-6xl mx-auto">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-signature text-3xl text-accent">Hey, welcome</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary leading-tight">
            Faith, football, film, <br/>
            <span className="text-accent italic font-normal">and everything in between.</span>
          </h1>
          <p className="font-sans text-lg text-foreground/80 leading-relaxed max-w-xl">
            My name is Precious. CS student, graphics designer, Man United fan. This is where I write about the things that stay on my mind.
          </p>
          <div className="mt-2 flex items-center gap-4">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"
            >
              About Me
            </Link>
            <div className="font-signature text-2xl text-foreground/75 transform -rotate-3 pl-2">
              Precious
            </div>
          </div>
        </div>
        
        {/* Quote Element */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="border-double-custom p-8 bg-muted/20 relative shadow-sm hover:shadow-md transition-all duration-500 flex flex-col gap-6 justify-center min-h-[300px]">
            <span className="font-sans text-xs uppercase tracking-widest text-accent font-semibold">PINNED THOUGHT</span>
            <p className="font-serif text-2xl text-primary italic leading-relaxed">
              "Sometimes, simple is better."
            </p>
            <div className="font-signature text-xl text-foreground/75">— Precious</div>
          </div>
          {/* Faded Background Shape for Asymmetry */}
          <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-accent/10 translate-x-2 translate-y-2 pointer-events-none"></div>
        </div>
      </section>

      {/* Double Border Section Divider */}
      <div className="border-double-custom py-2 my-16 max-w-6xl mx-auto border-t border-b"></div>

      {/* Magazine Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Column: Featured & Recent Essays */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Highlighted Essay */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-6 bg-accent"></span>
              <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-accent">Latest Post</h2>
            </div>
            
            <article className="group flex flex-col gap-6">
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary hover:text-accent transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h3>
              
              <div className="flex items-center gap-3 text-xs text-foreground/60 font-sans tracking-wide">
                <span>{featuredPost.date}</span>
                <span>&bull;</span>
                <span>{featuredPost.readingTime}</span>
                <span>&bull;</span>
                <span className="px-2 py-0.5 bg-muted text-accent rounded-full text-[10px] uppercase font-semibold">{featuredPost.category}</span>
              </div>
              
              <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div>
                <Link 
                  href={`/blog/${featuredPost.slug}`} 
                  className="inline-flex items-center gap-2 text-primary font-bold font-sans hover:text-accent transition-colors pb-1 border-b-2 border-accent/60"
                >
                  Continue Reading <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </div>
          
          {/* Double line between featured and recent */}
          <div className="h-[1px] bg-border/80 w-full my-4"></div>
          
          {/* Grid of recent essays */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
              <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-primary">Recent Posts</h2>
              <Link href="/blog" className="font-sans text-xs font-bold text-accent hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                All Posts <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-12 lg:border-l lg:border-border lg:pl-8">
          
          {/* Quick Thought */}
          <div className="bg-muted/40 border border-border p-6 shadow-sm relative overflow-hidden">
            <h4 className="font-serif text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Coffee size={18} className="text-accent" /> Quick Thought
            </h4>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed italic mb-4">
              "Nothing can separate us from God's love. Not bad grades, not imposter syndrome, not the fact that you forgot to push your code before the deadline. Nothing."
            </p>
            <div className="font-signature text-xl text-accent text-right">— P.</div>
          </div>
          
          {/* Currently Watching / Playing */}
          <div>
            <h4 className="font-serif text-lg font-bold text-primary mb-4 border-b border-border pb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-accent" /> Currently Into
            </h4>
            <p className="font-sans text-xs text-foreground/60 uppercase tracking-widest mb-3">RIGHT NOW</p>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex flex-col gap-1 border-l-2 border-accent/40 pl-3">
                <span className="font-medium text-primary">Breaking Bad</span>
                <span className="text-xs text-foreground/60">Season 4, Episode 3. Download limits.</span>
              </li>
              <li className="flex flex-col gap-1 border-l-2 border-border pl-3">
                <span className="font-medium text-primary">eFootball 2024</span>
                <span className="text-xs text-foreground/60">Possession build-up. Always.</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="bg-primary text-background p-6">
            <h4 className="font-serif text-xl font-bold mb-2">Stay in the Loop</h4>
            <p className="font-sans text-xs text-background/80 mb-4 leading-relaxed">
              New posts on faith, football, film, tech, and whatever else is on my mind.
            </p>
            <NewsletterForm variant="sidebar" />
          </div>

        </aside>

      </section>
      
    </div>
  );
}
