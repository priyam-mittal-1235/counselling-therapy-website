import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Mindful Living counselling, therapy, psychological assessments, intervention sessions, neurodevelopmental support, family services, and online therapy.",
};

// ─── Core services with pricing ───────────────────────────────────────────────
const coreServices = [
  {
    name: "Consultation",
    price: "₹500",
    per: "per session",
    description:
      "An initial meeting to understand your concerns, goals, and the right care pathway for you or your child.",
    includes: [] as string[],
  },
  {
    name: "Psychological Assessments",
    price: null,
    per: null,
    description:
      "Comprehensive psychological evaluations to understand cognitive, emotional, and behavioural functioning.",
    includes: [] as string[],
  },
  {
    name: "Developmental Assessments",
    price: null,
    per: null,
    description:
      "Detailed assessments to identify developmental delays, learning profiles, and neurodevelopmental conditions.",
    includes: [] as string[],
  },
  {
    name: "Psychotherapy / Counselling",
    price: "₹800",
    per: "per session",
    description:
      "Evidence-based therapeutic sessions for emotional, psychological, and relational wellbeing.",
    includes: [] as string[],
  },
  {
    name: "Intervention Sessions",
    price: "₹1,000",
    per: "per session",
    description:
      "Structured, goal-oriented intervention sessions tailored to each child's needs.",
    includes: ["Behaviour Therapy", "Occupational Therapy", "Special Education"],
  },
  {
    name: "Relationship Guidance",
    price: "₹1,200",
    per: "per session",
    description:
      "Focused sessions for couples and families seeking healthier communication and renewed connection.",
    includes: [] as string[],
  },
];

// ─── Other services ────────────────────────────────────────────────────────────
const otherServices = [
  "Life Skill Training",
  "Play Based Therapy",
  "Group Therapy for Children",
  "Parent Counselling and Guidance",
];

// ─── Online services ───────────────────────────────────────────────────────────
const onlineServices = [
  "Online Counselling",
  "Parent Consultation",
  "Therapy Sessions",
  "Webinars",
  "Report Discussion Sessions",
];

// ─── Neurodevelopmental conditions ────────────────────────────────────────────
const neurodevelopmentalConditions = [
  "ADHD",
  "Autism Spectrum Disorder",
  "Learning Disabilities (Dyslexia, Dysgraphia, Dyscalculia)",
  "Intellectual Disability",
  "Developmental Delay",
];

// ─── Family services ──────────────────────────────────────────────────────────
const familyServices = [
  "Parent-Child Relationship Counselling",
  "Parenting Workshop",
  "Family Counselling",
  "Psychoeducation Sessions",
];

// ─── Tick icon ────────────────────────────────────────────────────────────────
function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        dark ? "bg-sage-600" : "bg-softblue-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-3 w-3 ${dark ? "text-sage-100" : "text-softblue-800"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Services"
        title="Counselling and therapy services tailored to your needs."
        description="Mindful Living supports individuals, couples, families, children, adolescents, and neurodivergent children with compassionate and evidence-based care."
        image="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1800&q=85"
      />

      {/* ── Section 1 : Core Services & Pricing ───────────────────────────── */}
      <section className="section-padding bg-cream-50">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Core Services & Fees"
              title="Transparent pricing for every service we offer."
              description="We believe in clear, honest communication about the cost of care. All sessions are conducted by qualified professionals."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service, index) => (
              <Reveal key={service.name} delay={index * 60}>
                <div className="flex h-full flex-col rounded-xl border border-sage-100 bg-white p-5 sm:p-6 shadow-sm">
                  {/* Name + Price badge */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold leading-snug text-sage-950">
                      {service.name}
                    </h3>
                    {service.price ? (
                      <div className="shrink-0 rounded-full bg-sage-100 px-3 py-1 text-sm font-bold text-sage-800">
                        {service.price}
                      </div>
                    ) : (
                      <div className="shrink-0 rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold text-sage-600">
                        On enquiry
                      </div>
                    )}
                  </div>

                  {/* Per-session label */}
                  {service.per && (
                    <p className="mt-1 text-xs font-medium text-sage-400">
                      {service.per}
                    </p>
                  )}

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-sage-600">
                    {service.description}
                  </p>

                  {/* Sub-items (e.g. intervention includes) */}
                  {service.includes.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-sage-700"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2 : Additional Services + Online Services ─────────────── */}
      <section className="section-padding bg-white">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Additional Services */}
            <Reveal>
              <SectionHeading
                eyebrow="Additional Services"
                title="More ways we can support you."
                description="Beyond our core offerings, we provide a range of specialised services to meet diverse therapeutic and developmental needs."
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {otherServices.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 rounded-lg border border-cream-200 bg-cream-50 px-4 py-3 text-sm font-medium text-sage-800"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-sage-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Online Services */}
            <Reveal delay={100}>
              <div className="rounded-xl border border-softblue-200 bg-softblue-50 p-5 sm:p-8">
                <span className="mb-4 inline-block rounded-full bg-softblue-100 px-3 py-1 text-xs font-semibold text-softblue-800">
                  Online Services
                </span>
                <h3 className="mb-2 text-xl font-semibold text-sage-950">
                  Access care from anywhere
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-sage-600">
                  All our key services are available online, making professional support accessible from the comfort of your home.
                </p>
                <ul className="space-y-3">
                  {onlineServices.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 text-sm font-medium text-sage-800"
                    >
                      <Tick />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Section 3 : Neurodevelopmental Support + Family Services ─────── */}
      <section className="section-padding bg-cream-50">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Neurodevelopmental */}
            <Reveal>
              <SectionHeading
                eyebrow="Neurodevelopmental Support"
                title="Specialised care for children who learn differently."
                description="We provide expert assessment, therapy, and intervention for children with neurodevelopmental conditions — delivered with sensitivity, structure, and family involvement."
              />
              <ul className="mt-8 space-y-3">
                {neurodevelopmentalConditions.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 rounded-lg border border-sage-100 bg-white px-4 py-3 text-sm font-medium text-sage-800 shadow-sm"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-sage-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Family Services */}
            <Reveal delay={100}>
              <div className="rounded-xl bg-sage-700 p-5 text-white sm:p-8">
                <span className="mb-4 inline-block rounded-full bg-sage-600 px-3 py-1 text-xs font-semibold text-sage-100">
                  Family Services
                </span>
                <h3 className="mb-2 text-xl font-semibold">
                  Stronger families, healthier children
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-sage-200">
                  We believe that when families are supported, children thrive. Our family services create a foundation of connection, understanding, and growth.
                </p>
                <ul className="space-y-3">
                  {familyServices.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 text-sm font-medium text-sage-100"
                    >
                      <Tick dark />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Section 4 : CTA ───────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=1200&q=80"
              alt="A warm counselling space prepared for a therapy session"
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Care pathway"
              title="From first contact to meaningful progress."
              description="Your journey begins with a warm, confidential consultation where we listen, understand your concerns, and work with you to create a personalised care plan — one that fits your life, your pace, and your goals."
            />
            <div className="mt-8">
              <ButtonLink href="/contact">Request an appointment</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
