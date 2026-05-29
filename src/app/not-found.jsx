import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center justify-center text-center animate-in fade-in duration-1000">
      <div className="relative max-w-md w-full">
        <div className="border-double-custom p-8 md:p-12 bg-muted/20 relative z-10">
          <div className="flex justify-center mb-6 text-accent">
            <Compass size={48} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-serif text-2xl font-semibold text-primary mb-4">Page Not Found</h2>
          <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-8">
            This page doesn't exist. Maybe it never did.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 font-sans text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} /> Go Home
          </Link>
        </div>
        <div className="absolute -z-10 inset-0 border border-accent/10 translate-x-3 translate-y-3 pointer-events-none"></div>
      </div>
    </div>
  );
}
