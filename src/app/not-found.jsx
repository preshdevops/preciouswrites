import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
      <div className="bg-card border border-border/80 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-xl space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Compass size={28} />
        </div>
        <h1 className="font-sans text-5xl font-extrabold text-foreground tracking-tight">404</h1>
        <h2 className="font-sans text-xl font-bold text-foreground">Page Not Found</h2>
        <p className="font-sans text-xs text-foreground/70 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer w-full"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
