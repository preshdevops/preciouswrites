export const metadata = {
  title: "About | PreciousWrites",
  description: "Learn more about Precious Oluwasegun Olonade, the creator of PreciousWrites.",
};

export default function About() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 animate-in fade-in duration-1000">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 text-center border-b border-border pb-12">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-6">About the Author</h1>
          <p className="font-sans text-xl text-foreground/80 italic max-w-2xl mx-auto">
            "I write to explore ideas first, to map out the complicated patterns of systems and stars, and let social comfort catch up later."
          </p>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Quick Facts Typographic Card */}
          <div className="md:col-span-4 relative">
            <div className="border-double-custom p-6 bg-muted/20 flex flex-col gap-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-primary border-b border-border pb-2">Quick Facts</h3>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Operating System</span>
                  <span className="font-medium text-primary">Ubuntu Linux</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Current Location</span>
                  <span className="font-medium text-primary">Alimosho, Lagos</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Favorite Film</span>
                  <span className="font-medium text-primary">Inception</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 uppercase tracking-widest text-[10px]">Top Tracks</span>
                  <span className="font-medium text-primary">Godzilla, Rap God</span>
                </li>
              </ul>
            </div>
            <div className="absolute -z-10 -bottom-3 -right-3 w-full h-full border border-accent/10 translate-x-1 translate-y-1 pointer-events-none"></div>
          </div>
          
          {/* Conversational Human-scale Bio */}
          <div className="md:col-span-8 prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:font-sans prose-p:leading-relaxed prose-p:text-foreground/90">
            <p className="text-xl leading-relaxed text-primary font-medium">
              Hello there. I'm <strong>Precious Oluwasegun Olonade</strong>—a builder, thinker, and student currently staying in Alimosho, Lagos.
            </p>
            <p>
              I am currently in my final year studying Computer Science. I have a deeply ambitious, slightly insane (but entirely on-brand) goal of securing my PhD in my twenties. When I'm not writing database schemas, debugging React applications, or vibecoding alongside AI, you'll find me questioning systems, studying astronomy, or explaining wormholes in simple terms to whoever will listen.
            </p>
            
            <h2 className="text-3xl mt-12 mb-6 border-b border-border pb-4 font-serif">A Mix of Two Worlds</h2>
            <p>
              My brain operates in an odd intersection of the highly technical and the deeply creative. On one hand, I love Ubuntu Linux, terminal shortcuts, and building clean web products like CineVault. On the other hand, I've spent years working on graphic design with Canva and CorelDRAW, though I often suffer from the classic creative paralysis of <em>"what exactly should I make next?"</em>
            </p>
            
            <blockquote className="pull-quote border-l-4 border-accent pl-6 py-2 my-8 italic text-xl font-serif text-foreground/80">
              "True learning isn't pretending to know everything; it's being curious enough to ask when you're confused."
            </blockquote>
            
            <h2 className="text-3xl mt-12 mb-6 border-b border-border pb-4 font-serif">Community, Peace, and Quiet Hours</h2>
            <p>
              Beyond technology, a massive part of my life belongs to community and quiet reflection. I serve as a minister at The Miracle Global Ministries (Osogbo chapter) and handle media, social, and design roles at the Osogbo Peace Club. 
            </p>
            <p>
              To balance the ambitious rush of tech and university life, I attend meditation sessions hosted by Monk Thaniyo every Monday and Thursday. It's a grounding practice that keeps me anchored. 
            </p>
            
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-serif mb-4">Let's Connect</h3>
              <p className="font-sans text-base">
                I keep my face off the internet for the most part—preferring ideas to lead the way—but you can always catch me on Instagram at <a href="https://instagram.com/precious_segun" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-primary transition-colors">@precious_segun</a>. 
              </p>
              <p className="font-sans text-sm text-foreground/60 mt-4">
                For academic inquiries, tech build discussions, or if you want to play a lag-free match of eFootball 2024, drop me an email at <a href="mailto:precious@example.com" className="text-accent underline">precious@example.com</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
