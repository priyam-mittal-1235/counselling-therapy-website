import type { Metadata } from "next";
import { BadgeCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Founder & Therapist | Muskaan Garg",
  description:
    "Meet Muskaan Garg, Founder & Lead Psychologist at Mindful Living. Learn about her educational qualifications, professional background, and compassionate client care approach.",
};

export default function TherapistPage() {
  return (
    <>
      <PageHero
        eyebrow="Founder & Therapist"
        title="Muskaan Garg"
        description="Providing compassionate, evidence-based counselling and psychological support in a confidential, warm environment."
        image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-padding bg-cream-50">
        <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-white p-3 shadow-soft">
              <img
                src="/muskaan-garg-white.jpg?v=2"
                alt="Muskaan Garg"
                className="aspect-[3/4] w-full rounded-xl object-cover object-center shadow-card"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Therapist Profile"
              title="A dedicated professional supporting your healing and growth journey."
            />
            <div className="mt-6 space-y-4 text-base leading-8 text-neutralwarm-700">
              <div className="inline-flex flex-col gap-2 rounded-xl bg-sage-50 border border-sage-100 p-4 w-full">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-softblue-700">Qualifications</span>
                <p className="text-lg font-bold text-sage-950">BA Psychology</p>
                <p className="text-lg font-bold text-sage-950">M.Sc. Clinical Psychology</p>
              </div>
              <p className="mt-4">
                As the founder of Mindful Living, I believe that emotional and mental well-being is the foundation of a healthy life. Every individual experiences unique challenges, and I aim to structure and guide our therapeutic sessions to align specifically with your needs.
              </p>
              <p>
                With a focus on trust, complete confidentiality, and evidence-based interventions, I support clients across various concerns including stress, anxiety, emotional coping, relationship transitions, and childhood development.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="site-container grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Ethical & Private",
              description:
                "Strict adherence to professional confidentiality and ethical clinical standards, ensuring a safe therapeutic experience.",
              icon: ShieldCheck,
            },
            {
              title: "Compassionate Approach",
              description:
                "Therapy delivered with patience, empathy, and absolute respect for each individual's pace and personal journey.",
              icon: HeartHandshake,
            },
            {
              title: "Evidence-Based Support",
              description:
                "Interventions grounded in modern psychological research and tailored to address real-world difficulties.",
              icon: BadgeCheck,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 80}>
                <article className="card-surface h-full p-6">
                  <Icon className="h-9 w-9 text-softblue-700" aria-hidden="true" />
                  <h2 className="mt-5 text-xl font-semibold text-sage-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-neutralwarm-700">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
