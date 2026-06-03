import { Reveal } from "@/components/ui/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cream-50 py-16 sm:py-20 lg:py-24 border-b border-cream-100 min-h-[360px] flex items-center">
      {/* Background Image - high visibility with natural colors */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${image})`,
          opacity: 0.85
        }}
        aria-hidden="true"
      />
      {/* 25% Soft overlay to blend and increase contrast */}
      <div className="absolute inset-0 bg-sage-950/25" aria-hidden="true" />
      
      {/* Floating glass content box for maximum readability */}
      <div className="site-container relative z-10 w-full">
        <Reveal className="max-w-2xl rounded-3xl border border-white/60 bg-white/90 p-5 sm:p-10 shadow-soft backdrop-blur-md">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-softblue-700">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-sage-950 sm:text-4xl lg:text-5xl leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-base leading-7 text-neutralwarm-700">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
