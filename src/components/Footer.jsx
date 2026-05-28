import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-16 md:py-24 border-t border-border mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl mb-4 text-primary">PreciousWrites</h2>
            <p className="font-sans mb-6 max-w-sm text-foreground/80 leading-relaxed">
              A literary home on the internet exploring writing, creativity, and the nuanced beauty of everyday life.
            </p>
            <div className="flex gap-4 text-primary">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="12" y2="22"/><path d="m8 18 4-6"/><path d="M16 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-sans font-bold text-lg mb-4 tracking-wide uppercase text-sm">Explore</h3>
            <ul className="space-y-3 font-sans">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Journal</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans font-bold text-lg mb-4 tracking-wide uppercase text-sm">Newsletter</h3>
            <p className="font-sans text-sm mb-4 text-foreground/80">Join the weekly digest for musings on creativity.</p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 text-center font-sans text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} PreciousWrites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
