import type { Metadata } from "next";
import { BadgeCheck, HeartHandshake, Lightbulb, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { values } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mindful Living's mission, vision, values, and evidence-based approach to counselling and therapy.",
};

const commitments = [
  {
    title: "Client-centered practice",
    description:
      "We collaborate with each client to understand their experiences, priorities, and goals before shaping a support plan.",
    icon: UsersRound,
  },
  {
    title: "Compassionate care",
    description:
      "Our work is rooted in empathy, patience, and respect for each person's pace, identity, and context.",
    icon: HeartHandshake,
  },
  {
    title: "Evidence-based methods",
    description:
      "Therapeutic support draws from structured, research-informed approaches adapted to real-life needs.",
    icon: BadgeCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Mindful Living"
        title="Professional care with a warm, human approach."
        description="Mindful Living is a compassionate space dedicated to supporting your emotional well-being, personal resilience, and relationship health. Through professional counselling, psychotherapy, and developmental therapy services, we partner with individuals, couples, families, and neurodivergent children to navigate life's challenges with understanding, structured guidance, and respectful, evidence-based care."
        image="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-padding bg-cream-50">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal type="scale">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
              alt="A professional consultation between supportive healthcare practitioners"
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft hover-glow-img"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Organization overview"
              title="A trusted space for counselling, therapy, and emotional wellness."
            />
            <p className="mt-6 text-base leading-8 text-neutralwarm-700">
              Mindful Living was established with the vision of creating a supportive
              environment where individuals and families can access quality mental health
              care and therapeutic services. We believe that emotional well-being is the
              foundation of a healthy and fulfilling life.
            </p>
            <p className="mt-5 text-base leading-8 text-neutralwarm-700">
              Our team is committed to helping clients navigate personal, emotional,
              behavioural, and developmental challenges through individualized care and
              evidence-based therapeutic practices. We strive to empower every individual
              with the tools and support needed to achieve personal growth, resilience,
              and overall well-being.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="site-container grid gap-5 md:grid-cols-2">
          <Reveal>
            <article className="card-surface h-full p-5 sm:p-8">
              <Lightbulb className="h-10 w-10 text-softblue-700" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold text-sage-950">Mission</h2>
              <p className="mt-4 text-base leading-8 text-neutralwarm-700">
                To provide compassionate, professional, and accessible counselling and
                therapy services that promote mental wellness, personal growth, and
                improved quality of life.
              </p>
              </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="card-surface h-full p-5 sm:p-8">
              <Sparkles className="h-10 w-10 text-softblue-700" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold text-sage-950">Vision</h2>
              <p className="mt-4 text-base leading-8 text-neutralwarm-700">
                To build a community where mental health is valued, supported, and
                accessible to everyone.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-sage-50">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Core values"
              title="Values that shape every conversation."
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value} delay={index * 60}>
                <div className="flex items-center gap-3 rounded-lg border border-sage-100 bg-white p-5 shadow-card">
                  <ShieldCheck className="h-5 w-5 text-sage-700" aria-hidden="true" />
                  <span className="font-semibold text-sage-950">{value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              title="Thoughtful therapy that respects your story and your pace."
              description="Mindful Living combines attentive listening, structured therapeutic tools, emotional regulation strategies, and practical goal-setting. For children and families, care planning includes parent involvement, developmental context, and daily routine support."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {commitments.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="card-surface h-full p-6">
                    <Icon className="h-9 w-9 text-softblue-700" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-semibold text-sage-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-neutralwarm-700">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
