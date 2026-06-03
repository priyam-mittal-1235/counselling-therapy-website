import type { Metadata } from "next";
import { Brain, CheckCircle2, HeartHandshake, Puzzle, Route, UsersRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Neurodivergent Support",
  description:
    "Specialized occupational therapy, behaviour therapy, parent guidance, developmental support, and individualized care plans for neurodivergent children.",
};

const supportAreas = [
  {
    title: "Understanding neurodiversity",
    description:
      "Neurodiversity recognizes natural differences in how children think, learn, sense, communicate, and engage with the world.",
    icon: Brain,
  },
  {
    title: "Occupational therapy",
    description:
      "Support for sensory processing, motor coordination, play skills, daily living routines, attention, and participation at home or school.",
    icon: Puzzle,
  },
  {
    title: "Behaviour therapy",
    description:
      "Positive behavior support that identifies triggers, teaches replacement skills, and builds predictable routines with family involvement.",
    icon: CheckCircle2,
  },
  {
    title: "Parent involvement",
    description:
      "Parents receive practical guidance, home strategies, progress updates, and collaborative planning throughout the care process.",
    icon: UsersRound,
  },
  {
    title: "Individualized care plans",
    description:
      "Each child receives a plan shaped around developmental needs, strengths, sensory profile, family priorities, and everyday routines.",
    icon: Route,
  },
  {
    title: "Developmental support",
    description:
      "Therapy focuses on functional growth, confidence, communication, emotional regulation, independence, and participation.",
    icon: HeartHandshake,
  },
];

export default function NeurodivergentSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Neurodivergent Support"
        title="Supporting Every Child's Unique Journey"
        description="Mindful Living provides occupational therapy, behaviour therapy, parent guidance, individualized care plans, and supportive developmental services."
        image="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-padding bg-cream-50">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Neurodiversity"
              title="Every child deserves support that honors their strengths."
              description="Neurodivergent children may experience the world through different sensory, communication, attention, learning, or behavioral patterns. Our role is to understand each child's profile and build support that helps them participate more comfortably in daily life."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Strength-based care", "Family collaboration", "Routine-focused goals", "Developmental progress"].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 text-sm font-semibold text-sage-900 shadow-card">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} type="scale">
            <img
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=1200&q=80"
              alt="A child engaging with developmental therapy materials"
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft hover-glow-img"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Dedicated support"
              title="Therapy that connects clinical insight with everyday life."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <Reveal key={area.title} delay={index * 60}>
                  <article className="card-surface h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-sage-950">{area.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-neutralwarm-700">
                      {area.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sage-50">
        <div className="site-container">
          <Reveal>
            <div className="rounded-lg bg-white p-8 shadow-soft lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-softblue-700">
                    Care planning
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-sage-950 sm:text-4xl">
                    Collaborative plans for the child, parents, and daily environments.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-neutralwarm-700">
                    The care plan may include observation, goal-setting, therapeutic
                    sessions, parent guidance, home strategies, school routine
                    recommendations, and progress reviews.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Assessment and goal setting", "Therapy sessions", "Parent coaching", "Progress reviews"].map((step) => (
                    <div key={step} className="rounded-lg border border-sage-100 bg-cream-50 p-5 text-sm font-semibold text-sage-900">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <ButtonLink href="/contact">Speak with our team</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
