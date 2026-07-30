import Link from "next/link";
import { ArrowRight, BookOpen, Coffee, Code2, Sparkles, Terminal, ArrowUpRight, Shield, Cpu, Activity } from "lucide-react";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import SpotifyWidget from "@/components/SpotifyWidget";
import { getAllPosts } from "@/lib/posts";
import { posts as staticPosts } from "@/data/posts";

export const dynamic = "force-dynamic";

const CURRENTLY_INTO_FALLBACK = [
  { id: 1, label: "Breaking Bad", sublabel: "Season 4. Pure narrative perfection." },
  { id: 2, label: "eFootball 2024", sublabel: "Possession build-up tactic." },
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
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-14 animate-in fade-in duration-500 space-y-16">
      
      {/* Architectural Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bespoke-card p-8 md:p-14 shadow-2xl">
        
        {/* Subtle Hairline Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 max-w-6xl mx-auto">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Canonical Mark Emblem */}
            <div className="flex items-center gap-3 font-mono text-xs text-primary font-bold tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span>✦ PRECIOUS OLONADE // CANONICAL JOURNAL</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] tracking-tight">
              Faith, football, film, <br />
              <span className="gradient-title">and everything tech.</span>
            </h1>

            <p className="font-sans text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl">
              Computer Science student, full-stack builder, and designer based in Osogbo, Nigeria. Documenting thoughts on software craftsmanship, faith, football, and cinema.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
              >
                <span>// EXPLORE ARCHIVE</span> <ArrowRight size={14} />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 bg-muted hover:bg-card text-foreground px-6 py-3.5 rounded-xl hairline-border transition-all cursor-pointer"
              >
                <span>// ABOUT PRECIOUS</span>
              </Link>
            </div>

          </div>

          {/* System Info / Terminal Card */}
          <div className="lg:col-span-5">
            <div className="bg-muted/60 backdrop-blur-xl hairline-border rounded-2xl p-6 space-y-5 shadow-xl">
              
              <div className="flex items-center justify-between hairline-b pb-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Terminal size={14} /> SYS_MATRIX.CONFIG
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-bold uppercase">Active</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-foreground/80">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/50">DISCIPLINE:</span>
                  <span className="font-bold text-foreground">Computer Science</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/50">PRIMARY_STACK:</span>
                  <span className="font-bold text-primary">React &bull; Next.js &bull; Turso</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/50">DESIGN_TOOLS:</span>
                  <span className="font-bold text-foreground">Figma &bull; CorelDRAW</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/50">FOOTBALL_CLUB:</span>
                  <span className="font-bold text-emerald-400">Man United</span>
                </div>
              </div>

              <div className="pt-2 hairline-t">
                <SpotifyWidget />
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* Featured Article Spotlight */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4 font-mono text-xs font-bold uppercase tracking-widest text-primary">
            <div className="flex items-center gap-2">
              <Sparkles size={14} /> <span>// FEATURED SPOTLIGHT</span>
            </div>
          </div>

          <div className="relative group bespoke-card rounded-3xl p-6 md:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs font-mono text-foreground/60">
                  <span className="px-2.5 py-1 rounded-md font-bold bg-primary/10 text-primary uppercase border border-primary/20">
                    [{featuredPost.category}]
                  </span>
                  <span>&bull;</span>
                  <span>{featuredPost.date}</span>
                  <span>&bull;</span>
                  <span>{featuredPost.readingTime}</span>
                </div>

                <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="font-sans text-sm md:text-base text-foreground/75 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 font-mono text-xs font-bold">
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                  >
                    <span>READ_FULL_ARTICLE</span> <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-muted/60 hairline-border rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold">
                  ✦
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground/70">ARCHIVAL HIGHLIGHT</span>
                <span className="font-sans text-xs text-foreground/60">Explore in-depth thoughts on tech craftsmanship and personal growth.</span>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Main Articles Grid & Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
        
        {/* Left Column: Recent Posts */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="flex items-center justify-between hairline-b pb-4">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">// RECENT ENTRIES</h2>
            <Link 
              href="/blog" 
              className="font-mono text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>VIEW ALL</span> <ArrowRight size={13} />
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
          
          {/* Dev Note */}
          <div className="bespoke-card rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <Coffee size={14} className="text-amber-500" /> // DEV_NOTE
            </h4>
            <p className="font-sans text-xs text-foreground/80 leading-relaxed italic">
              "Nothing can separate us from God's love. Not bad grades, not imposter syndrome, not forgotten git commits. Nothing."
            </p>
            <div className="font-mono text-[11px] text-primary text-right font-bold">— Precious</div>
          </div>
          
          {/* Currently Into */}
          <div className="bespoke-card rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider hairline-b pb-2 flex items-center gap-2">
              <BookOpen size={14} /> // CURRENTLY_INTO
            </h4>
            <ul className="space-y-3 font-mono text-xs">
              {currentlyInto.map((item, index) => (
                <li key={item.id || index} className="flex flex-col gap-0.5 border-l-2 border-primary/50 pl-3">
                  <span className="font-bold text-foreground">#{String(index + 1).padStart(2, '0')} {item.label}</span>
                  {item.sublabel && (
                    <span className="text-[11px] font-sans text-foreground/60">{item.sublabel}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Spotify Widget */}
          <div>
            <SpotifyWidget />
          </div>
          
          {/* Newsletter Box */}
          <div className="bg-muted/60 hairline-border rounded-2xl p-5 space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">// DISPATCH_NEWSLETTER</h4>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              New entries delivered straight to your inbox. No spam.
            </p>
            <NewsletterForm variant="sidebar" />
          </div>

        </aside>

      </section>
      
    </div>
  );
}
