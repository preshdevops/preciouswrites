import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/80 text-foreground py-12 md:py-16 mt-20 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Status */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-foreground">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[11px] font-mono font-extrabold">
                PW
              </div>
              <span className="font-sans">
                Precious<span className="text-primary">Writes</span>
              </span>
            </Link>
            
            <p className="font-sans text-sm text-foreground/70 leading-relaxed max-w-sm">
              Faith, football, film, tech, and everything in between. A digital notebook by Precious Olonade.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-foreground/60 bg-muted/60 px-3 py-1.5 rounded-full w-fit border border-border/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Building & Writing from Osogbo</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2 text-foreground/70">
              <a 
                href="https://instagram.com/precious_segun" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 transition-all cursor-pointer" 
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://x.com/preshonX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 transition-all cursor-pointer" 
                aria-label="X (Twitter)"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a 
                href="https://github.com/preshdevops" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 transition-all cursor-pointer" 
                aria-label="GitHub"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3 font-sans">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-foreground/50">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-foreground/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/blog" className="text-foreground/70 hover:text-primary transition-colors">All Articles</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About Precious</Link></li>
              <li><Link href="/admin" className="text-foreground/70 hover:text-primary transition-colors">Admin Console</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-foreground/50">Stay Connected</h3>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Get new posts delivered straight to your inbox. No spam ever.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} PreciousWrites. Built with Next.js & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={12} className="text-rose-500 fill-rose-500" /> by Precious Olonade
          </p>
        </div>
      </div>
    </footer>
  );
}
