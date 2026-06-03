import type { Metadata } from "next";
import { Quote, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read client reviews and success stories from Mindful Living counselling, therapy, and neurodivergent child support services.",
};

const successStories = [
  {
    title: "Building calmer coping skills",
    description:
      "Through counselling, a client learned to identify stress patterns, practice grounding skills, and respond to anxiety with more confidence.",
  },
  {
    title: "Strengthening family communication",
    description:
      "Family sessions helped members slow down difficult conversations, listen more clearly, and create healthier boundaries at home.",
  },
  {
    title: "Supporting daily routines",
    description:
      "Occupational therapy and parent guidance helped a child participate more comfortably in sensory and self-care routines.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Real stories of care, progress, and support."
        description="Client experiences reflect the warmth, professionalism, and practical support Mindful Living aims to bring into every session."
        image="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-padding bg-cream-50">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Client reviews"
              title="A professional space where people feel heard."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 90}>
                <article className="card-surface h-full p-5 sm:p-7">
                  <div className="flex gap-1 text-cream-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote className="mt-6 h-8 w-8 text-softblue-600" aria-hidden="true" />
                  <p className="mt-5 text-base leading-8 text-neutralwarm-700">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-7 border-t border-sage-100 pt-5">
                    <p className="font-semibold text-sage-950">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-neutralwarm-600">{testimonial.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Success stories"
              title="Progress can look different for every person and family."
              description="These examples show the kind of outcomes clients often seek: calmer routines, better emotional regulation, stronger communication, and more confidence in daily life."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {successStories.map((story, index) => (
              <Reveal key={story.title} delay={index * 90}>
                <article className="rounded-lg border border-sage-100 bg-sage-50 p-5 sm:p-6">
                  <h2 className="text-xl font-semibold text-sage-950">{story.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-neutralwarm-700">
                    {story.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
