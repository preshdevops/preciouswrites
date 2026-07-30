import { Code2, Heart, Shield, Laptop, Sparkles, MapPin, GraduationCap, Tv, Trophy } from "lucide-react";

export const metadata = {
  title: "About Precious Olonade | PreciousWrites",
  description: "About Precious Olonade — CS student, designer, builder, and writer based in Osogbo, Nigeria.",
};

export default function About() {
  const skills = ["React", "Next.js", "Tailwind CSS", "Figma", "CorelDRAW", "Canva", "Node.js", "SQLite / Turso", "Git"];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 animate-in fade-in duration-700 max-w-5xl space-y-16">
      
      {/* Header Banner */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> The Person Behind The Screen
        </div>
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight">
          Hey, I'm <span className="gradient-text">Precious Olonade</span>
        </h1>
        <p className="font-sans text-lg text-foreground/70 italic leading-relaxed">
          "I always win"
        </p>
      </header>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/80 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <MapPin size={18} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">Location</span>
          <span className="font-sans text-sm font-bold text-foreground">Osogbo, Nigeria</span>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <GraduationCap size={18} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">Education</span>
          <span className="font-sans text-sm font-bold text-foreground">Computer Science (Final Year)</span>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Trophy size={18} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">Club</span>
          <span className="font-sans text-sm font-bold text-foreground">Manchester United</span>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Laptop size={18} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">OS</span>
          <span className="font-sans text-sm font-bold text-foreground">Ubuntu Linux</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Tech Stack & Skills */}
        <div className="md:col-span-4 bg-card border border-border/80 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-sans text-base font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
            <Code2 size={18} className="text-primary" /> Tech & Tools
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-lg bg-muted border border-border/60 text-xs font-mono text-foreground/80">
                {skill}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-border/60 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground/50 font-bold">Passions</h4>
            <div className="flex items-center gap-2 text-xs font-sans text-foreground/80">
              <Tv size={14} className="text-amber-500" /> Cinema & Series (Breaking Bad)
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-foreground/80">
              <Trophy size={14} className="text-emerald-500" /> eFootball (Possession Play)
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-foreground/80">
              <Heart size={14} className="text-purple-500" /> Gospel & Faith
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="md:col-span-8 space-y-8 font-sans text-foreground/80 text-base leading-relaxed">
          
          <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Shield size={22} className="text-primary" /> Faith
            </h2>
            <p>
              God first. Not as a social media caption, but as the core foundation. Faith isn't a content category for me — it's the lens through which everything else is understood. All God wants is to have a relationship with you. No performance required.
            </p>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Code2 size={22} className="text-accent" /> Building & Design
            </h2>
            <p>
              Computer Science provides the discipline; design is the instinct. Most of my work exists at the intersection of full-stack web development and graphic design — building intuitive, visually striking web experiences with React, Next.js, Figma, and Tailwind CSS.
            </p>
            <p>
              AI tools and vibecoding are part of the daily workflow, but understanding <em>why</em> something works at the structural level will always be the most satisfying feeling.
            </p>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Connect</h2>
            <p>
              Follow along on Instagram <a href="https://instagram.com/precious_segun" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline hover:text-accent transition-colors">@precious_segun</a> or connect on <a href="https://x.com/preshonX" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline hover:text-accent transition-colors">X (@preshonX)</a>. 
            </p>
            <p className="text-xs text-foreground/60">
              Reach out for web development, design collaborations, or a lag-free match of eFootball.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
