export const metadata = {
  title: "About | PreciousWrites",
  description: "About Precious Olonade — CS student, designer, builder, and writer based in Osogbo, Nigeria.",
};

export default function About() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 animate-in fade-in duration-1000">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-center border-b border-border pb-12">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-6">About</h1>
          <p className="font-sans text-xl text-foreground/80 italic max-w-2xl mx-auto">
            "Sometimes, simple is better."
          </p>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Quick Facts */}
          <div className="md:col-span-4 relative">
            <div className="border-double-custom p-6 bg-muted/20 flex flex-col gap-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-primary border-b border-border pb-2">Quick Facts</h3>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Based In</span>
                  <span className="font-medium text-primary">Osogbo, Nigeria</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Studying</span>
                  <span className="font-medium text-primary">Computer Science (Final Year)</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Football</span>
                  <span className="font-medium text-primary">Man United. Through pain.</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">OS</span>
                  <span className="font-medium text-primary">Ubuntu Linux</span>
                </li>
              </ul>
            </div>
            <div className="absolute -z-10 -bottom-3 -right-3 w-full h-full border border-accent/10 translate-x-1 translate-y-1 pointer-events-none"></div>
          </div>
          
          {/* Bio */}
          <div className="md:col-span-8 prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:font-sans prose-p:leading-relaxed prose-p:text-foreground/90">
            <p className="text-xl leading-relaxed text-primary font-medium">
              Hey. My name is <strong>Precious Olonade</strong>. Final-year Computer Science student based in Osogbo.
            </p>
            <p>
              Web developer, AI Enthusiast, and someone who builds things on the internet. Most of my time goes into code and figuring out how systems work. The rest goes to watching films, playing eFootball, and following Man United through every painful transfer window.
            </p>
            
            <h2 className="text-3xl mt-12 mb-6 border-b border-border pb-4 font-serif">Faith</h2>
            <p>
              God first. Not as a caption, as a foundation. Faith isn't a content category for me, it's the lens everything else gets seen through. All God wants is to have a relationship with you. That's it. No performance required.
            </p>
            
            <h2 className="text-3xl mt-12 mb-6 border-b border-border pb-4 font-serif">Building</h2>
            <p>
              CS is the discipline. Design is the instinct. Most of my projects live somewhere between web development and graphic design. Canva, CorelDRAW, Figma, React, Next.js. Whatever gets the job done.
            </p>
            <p>
              Vibecoding with AI tools is part of the workflow now. But understanding why something works is still more satisfying than just watching it run.
            </p>
            
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-serif mb-4">Connect</h3>
              <p className="font-sans text-base">
                You can find me on Instagram at <a href="https://instagram.com/precious_segun" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-primary transition-colors">@precious_segun</a> or on <a href="https://x.com/preshonX" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-primary transition-colors">X</a>. 
              </p>
              <p className="font-sans text-sm text-foreground/60 mt-4">
                For anything else, or if you want to play a lag-free match of eFootball, reach out.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
