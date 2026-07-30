import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Heart, Terminal, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card hairline-t text-foreground py-14 md:py-20 mt-24 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 hairline-b">
          
          {/* Brand & Canonical Mark */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-foreground text-background font-mono font-extrabold text-xs flex items-center justify-center tracking-tighter">
                ✦PO
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                Precious<span className="text-primary font-mono font-normal">Writes</span>
              </span>
            </Link>
            
            <p className="font-sans text-xs md:text-sm text-foreground/70 leading-relaxed max-w-sm">
              Faith, football, film, tech, and everything in between. A digital journal by Precious Olonade.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-foreground/60 bg-muted/60 px-3 py-1.5 rounded-lg w-fit hairline-border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>[ LOC: OSOGBO, NG ] &bull; ACTIVE</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2 font-mono text-xs">
              <a 
                href="https://instagram.com/precious_segun" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary hairline-border transition-all flex items-center gap-1.5 cursor-pointer" 
              >
                <span>INSTAGRAM</span> <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://x.com/preshonX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary hairline-border transition-all flex items-center gap-1.5 cursor-pointer" 
              >
                <span>X / TWITTER</span> <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://github.com/preshdevops" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary hairline-border transition-all flex items-center gap-1.5 cursor-pointer" 
              >
                <span>GITHUB</span> <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          
          {/* Quick Links Matrix */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono">
            <h3 className="text-xs font-bold tracking-widest uppercase text-primary">// INDEX</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5"><span>01.</span> Home</Link></li>
              <li><Link href="/blog" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5"><span>02.</span> Article Archive</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5"><span>03.</span> About Precious</Link></li>
              <li><Link href="/admin" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5"><span>04.</span> Admin Console</Link></li>
            </ul>
          </div>
          
          {/* Newsletter Box */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-primary">// SUBSCRIBE</h3>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Get new entries delivered directly to your inbox. No spam.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} PRECIOUSWRITES ✦ ALL RIGHTS RESERVED.</p>
          <p className="flex items-center gap-1.5">
            <Terminal size={13} className="text-primary" />
            <span>BUILT BY PRECIOUS OLONADE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
