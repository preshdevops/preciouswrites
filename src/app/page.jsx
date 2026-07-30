import Link from "next/link";
import { ArrowRight, BookOpen, Coffee, Code2, Sparkles, Terminal, ArrowUpRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import SpotifyWidget from "@/components/SpotifyWidget";
import { getAllPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";

export const dynamic = "force-dynamic";

const CURRENTLY_INTO_FALLBACK = [
  { id: 1, label: "Breaking Bad", sublabel: "Season 4. Pure masterclass." },
  { id: 2, label: "eFootball 2024", sublabel: "Possession build-up setup." },
];

export default async function Home() {
  let posts;
  try {
    posts = await getAllPosts();
    if (posts.length === 0) posts = staticPosts;
  } catch {
    posts = staticPosts;
  }

  let currentlyInto = CURRENTLY_INTO_FALLBACK;
  try {
    const { getCurrentlyInto } = await import("@/lib/currently-into");
    const entries = await getCurrentlyInto();
    if (entries && entries.length > 0) {
      currentlyInto = entries;
    }
  } catch {
    // fallback already set
  }

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 5);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-14 animate-in fade-in duration-700 space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/80 p-8 md:p-14 shadow-xl shadow-primary/5">
        
        {/* Subtle Background Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/60 w-fit text-xs font-mono text-foreground/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CS Student & Developer &bull; Osogbo, NG</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Faith, football, film, <br />
              <span className="gradient-text">and everything tech.</span>
            </h1>

            <p className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
              I’m Precious Olonade — Computer Science student, graphics designer, and Man United fan. This is where I document my thoughts, builds, and passions.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-sans text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                Explore Articles <ArrowRight size={16} />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 bg-muted/80 hover:bg-muted text-foreground px-6 py-3 rounded-xl font-sans text-sm font-semibold border border-border/60 transition-all cursor-pointer"
              >
                About Precious
              </Link>
            </div>

          </div>

          {/* Featured Quick Code Note / Thought Box */}
          <div className="lg:col-span-5 relative">
            <div className="bg-surface/80 backdrop-blur-xl border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold">
                  <Terminal size={15} /> pinned_thought.md
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 font-semibold uppercase">Live</span>
              </div>

              <p className="font-sans text-sm md:text-base text-foreground/90 leading-relaxed italic">
                "Sometimes, simple is better. Clear code, honest writing, and genuine faith outweigh complex noise every time."
              </p>

              <div className="flex items-center justify-between text-xs font-mono text-foreground/50 pt-2">
                <span>— Precious Olonade</span>
                <span className="text-primary font-semibold">01 / 01</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Featured Article Section */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary">
              <Sparkles size={14} /> Featured Article
            </div>
          </div>

          <div className="relative group bg-card border border-border/80 rounded-3xl p-6 md:p-10 hover:border-primary/50 transition-all duration-300 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs font-mono text-foreground/60">
                  <span className="px-2.5 py-1 rounded-md font-semibold bg-primary/10 text-primary uppercase border border-primary/20">
                    {featuredPost.category}
                  </span>
                  <span>&bull;</span>
                  <span>{featuredPost.date}</span>
                  <span>&bull;</span>
                  <span>{featuredPost.readingTime}</span>
                </div>

                <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="font-sans text-base text-foreground/75 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2">
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold font-sans hover:text-accent transition-colors text-sm"
                  >
                    Read Full Article <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Graphic Highlight Card */}
              <div className="lg:col-span-4 bg-muted/50 border border-border/60 rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Code2 size={24} />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-foreground/60">Deep Dive</span>
                <span className="font-sans text-xs text-foreground/70">Explore insights on technology, craft, and personal development.</span>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout (Grid + Sidebar) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
        
        {/* Left Column: Recent Articles */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <h2 className="font-sans text-xl font-extrabold text-foreground">Recent Articles</h2>
            <Link 
              href="/blog" 
              className="font-sans text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Quick Thought */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <h4 className="font-sans text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Coffee size={16} className="text-amber-500" /> Dev Note
            </h4>
            <p className="font-sans text-xs text-foreground/80 leading-relaxed italic mb-3">
              "Nothing can separate us from God's love. Not bad grades, not imposter syndrome, not forgotten git commits. Nothing."
            </p>
            <div className="font-mono text-[11px] text-primary text-right font-semibold">— Precious</div>
          </div>
          
          {/* Currently Into */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <h4 className="font-sans text-sm font-bold text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" /> Currently Into
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              {currentlyInto.map((item, index) => (
                <li key={item.id || index} className="flex flex-col gap-0.5 border-l-2 border-primary/40 pl-3">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  {item.sublabel && (
                    <span className="text-[11px] text-foreground/60">{item.sublabel}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Spotify Currently Playing */}
          <div>
            <SpotifyWidget />
          </div>
          
          {/* Newsletter Box */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
            <h4 className="font-sans text-sm font-bold text-foreground mb-1">Stay in the Loop</h4>
            <p className="font-sans text-xs text-foreground/70 mb-3 leading-relaxed">
              New articles on tech, faith, film, and football straight to your inbox.
            </p>
            <NewsletterForm variant="sidebar" />
          </div>

        </aside>

      </section>
      
    </div>
  );
}
