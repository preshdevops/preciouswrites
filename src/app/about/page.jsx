import { Code2, Heart, Shield, Laptop, Sparkles, MapPin, GraduationCap, Tv, Trophy, Terminal } from "lucide-react";

export const metadata = {
  title: "About Precious Olonade ✦ PreciousWrites",
  description: "About Precious Olonade — CS student, designer, builder, and writer based in Osogbo, Nigeria.",
};

export default function About() {
  const skills = ["React", "Next.js", "Tailwind CSS", "Figma", "CorelDRAW", "Canva", "Node.js", "SQLite / Turso", "Git"];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 animate-in fade-in duration-500 max-w-5xl space-y-14">
      
      {/* Header Banner */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles size={13} /> ✦ ARCHITECT & BUILDER
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-foreground tracking-tight">
          Precious <span className="gradient-title">Olonade</span>
        </h1>
        <p className="font-mono text-sm text-primary font-bold italic">
          "I always win"
        </p>
      </header>

      {/* Structural Quick Info Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="bespoke-card rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <MapPin size={16} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">// LOCATION</span>
          <span className="text-xs font-bold text-foreground">Osogbo, Nigeria</span>
        </div>

        <div className="bespoke-card rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <GraduationCap size={16} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">// DISCIPLINE</span>
          <span className="text-xs font-bold text-foreground">CS (Final Year)</span>
        </div>

        <div className="bespoke-card rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Trophy size={16} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">// CLUB</span>
          <span className="text-xs font-bold text-foreground">Man United</span>
        </div>

        <div className="bespoke-card rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <Laptop size={16} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">// OS</span>
          <span className="text-xs font-bold text-foreground">Ubuntu Linux</span>
        </div>
      </div>

      {/* Main Narrative Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Tech Matrix */}
        <div className="md:col-span-4 bespoke-card rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider hairline-b pb-3 flex items-center gap-2">
            <Terminal size={15} /> // TECH_MATRIX
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 rounded-md bg-muted border border-border/60 text-xs font-mono text-foreground/80 font-medium">
                {skill}
              </span>
            ))}
          </div>

          <div className="pt-4 hairline-t space-y-3 font-mono text-xs">
            <h4 className="uppercase tracking-wider text-foreground/50 font-bold">// PASSIONS</h4>
            <div className="flex items-center gap-2 text-foreground/80">
              <Tv size={14} className="text-amber-400" /> Cinema & Series (Breaking Bad)
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <Trophy size={14} className="text-emerald-400" /> eFootball (Possession)
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <Heart size={14} className="text-rose-400" /> Gospel & Faith
            </div>
          </div>
        </div>

        {/* Right Column: Essays */}
        <div className="md:col-span-8 space-y-6 font-sans text-foreground/80 text-sm leading-relaxed">
          
          <div className="bespoke-card rounded-2xl p-6 md:p-8 space-y-3 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Shield size={20} className="text-primary" /> Faith
            </h2>
            <p>
              God first. Not as a social media caption, but as the core foundation. Faith isn't a content category for me — it's the lens through which everything else is understood. All God wants is to have a relationship with you. No performance required.
            </p>
          </div>

          <div className="bespoke-card rounded-2xl p-6 md:p-8 space-y-3 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Code2 size={20} className="text-primary" /> Building & Craft
            </h2>
            <p>
              Computer Science provides the discipline; design is the instinct. Most of my work exists at the intersection of full-stack web development and graphic design — building intuitive, visually striking web experiences with React, Next.js, Figma, and Tailwind CSS.
            </p>
            <p>
              AI tools and vibecoding are part of the daily workflow, but understanding <em>why</em> something works at the structural level will always be the most satisfying feeling.
            </p>
          </div>

          <div className="bespoke-card rounded-2xl p-6 md:p-8 space-y-3 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">Connect</h2>
            <p>
              Follow along on Instagram <a href="https://instagram.com/precious_segun" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline hover:text-accent transition-colors">@precious_segun</a> or connect on <a href="https://x.com/preshonX" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline hover:text-accent transition-colors">X (@preshonX)</a>. 
            </p>
            <p className="text-xs text-foreground/60 font-mono">
              // REACH OUT FOR COLLABORATIONS OR EFOOTBALL MATCHES.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
