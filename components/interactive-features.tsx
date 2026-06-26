"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, CheckCircle2, MessageSquare, ArrowRight, Sparkles, User, Users, Heart } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What can I expect in my first consultation session?",
    a: "The initial consultation is a warm, collaborative discussion where we talk about your concerns, history, and what you hope to achieve in therapy. It is also an opportunity to ask questions, understand our approach, and see if we are a good fit for your therapeutic journey.",
  },
  {
    q: "Are our sessions completely confidential?",
    a: "Yes, confidentiality is a core pillar of our practice. All conversations, records, and registration details are kept strictly private in accordance with professional clinical guidelines. Information is never shared without your explicit written consent.",
  },
  {
    q: "How do I make a payment or confirm my booking?",
    a: "You can book directly using the contact form, calling us, or via WhatsApp. For payments, we have a secure Payment Portal on the home page where you select your service and complete the transfer securely using our official UPI QR scanner. Once completed, just share the screenshot over WhatsApp.",
  },
  {
    q: "Do you offer online/virtual therapy sessions?",
    a: "Yes, we offer online counseling, parent consultations, virtual therapy, and report discussion sessions for clients who prefer virtual support or are located outside Dehradun.",
  },
  {
    q: "What is your approach to neurodevelopmental support for children?",
    a: "Our developmental care is strength-based and routine-focused. We coordinate closely with parents to build a custom program that incorporates Occupational Therapy, Behaviour Therapy, and parent guidance, designed to adapt perfectly to the child's daily environments (home and school).",
  },
];

// ─── QUIZ DATA ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    title: "Who is this support for?",
    field: "recipient",
    options: [
      { id: "self", label: "For Myself", icon: User, desc: "Individual support for personal growth, anxiety, or stress." },
      { id: "child", label: "For My Child", icon: Users, desc: "Occupational or behaviour therapy, academic or development support." },
      { id: "family", label: "For My Relationship / Family", icon: Heart, desc: "Couple counselling, parenting support, or family guidance." },
    ],
  },
  {
    title: "What is your primary concern?",
    field: "concern",
    options: {
      self: [
        { id: "anxiety", label: "Anxiety, Stress, or Emotional struggles" },
        { id: "growth", label: "Personal Growth & Self-esteem" },
        { id: "transition", label: "Navigating Life Transitions or Grief" },
      ],
      child: [
        { id: "sensory", label: "Sensory Processing or Motor Skills support" },
        { id: "behavior", label: "Behavioral struggles & Social integration" },
        { id: "academic", label: "Learning or attention concerns (ADHD/Dyslexia)" },
      ],
      family: [
        { id: "relationship", label: "Couple communication and trust" },
        { id: "parenting", label: "Parent-child relationship support & training" },
        { id: "conflict", label: "Resolving family conflict or communication gaps" },
      ],
    },
  },
];

const RECOMMENDATIONS: Record<string, { title: string; desc: string; buttonText: string; url: string }> = {
  "self-anxiety": {
    title: "Psychotherapy / Counselling",
    desc: "Private, supportive sessions focused on regulating emotions, building coping mechanisms, and managing stress or anxiety in a safe, non-judgmental environment.",
    buttonText: "Book Counselling Session (₹800/session)",
    url: "#contact",
  },
  "self-growth": {
    title: "Consultation / Counselling",
    desc: "Individual counseling focusing on personal awareness, self-esteem, life goals, and general emotional clarity.",
    buttonText: "Schedule Consultation (₹500)",
    url: "#contact",
  },
  "self-transition": {
    title: "Psychotherapy / Counselling",
    desc: "Dedicated grief or transition counseling to help you navigate sudden life changes, loss, or relationship transitions.",
    buttonText: "Book Counselling Session (₹800/session)",
    url: "#contact",
  },
  "child-sensory": {
    title: "Intervention Session (Occupational Therapy)",
    desc: "Dedicated therapy targeting sensory regulation, fine/gross motor skills, attention, and school participation.",
    buttonText: "Request Intervention Session (₹1000/session)",
    url: "#contact",
  },
  "child-behavior": {
    title: "Intervention Session (Behaviour Therapy)",
    desc: "Positive behavioral support designed to teach replacement skills, build routine consistency, and support parent-child dynamics.",
    buttonText: "Request Intervention Session (₹1000/session)",
    url: "#contact",
  },
  "child-academic": {
    title: "Special Education / Developmental Consultation",
    desc: "Specialized cognitive and learning assistance tailored for ADHD, dyslexia, dysgraphia, and intellectual support.",
    buttonText: "Consult Our Specialist",
    url: "#contact",
  },
  "family-relationship": {
    title: "Relationship Guidance",
    desc: "Guided sessions to help partners work through conflicts, build boundaries, communicate calmly, and restore mutual trust.",
    buttonText: "Book Relationship Session (₹1200/session)",
    url: "#contact",
  },
  "family-parenting": {
    title: "Parent Guidance and Counselling",
    desc: "Practical support workshops and 1-on-1 counseling to help parents align on techniques, routines, and child support.",
    buttonText: "Schedule Parent Guidance",
    url: "#contact",
  },
  "family-conflict": {
    title: "Family Counselling",
    desc: "Mediation and therapy for multiple family members to rebuild open communication, bridge gaps, and restore harmony.",
    buttonText: "Request Family Counselling",
    url: "#contact",
  },
};

export function InteractiveServiceFinder() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelectOption = (field: string, val: string) => {
    setSelections((prev) => ({ ...prev, [field]: val }));
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setStep(99); // Result step
    }
  };

  const handleReset = () => {
    setSelections({});
    setStep(0);
  };

  const getRecommendationKey = () => {
    return `${selections.recipient}-${selections.concern}`;
  };

  const recommendation = RECOMMENDATIONS[getRecommendationKey()];

  return (
    <section className="section-padding bg-cream-50/50 border-t border-sage-100">
      <div className="site-container max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="Interactive Helper"
            title="Find the right therapy option in 30 seconds"
            description="Answer two quick questions to see which consultation or treatment option matches your specific circumstances."
            align="center"
          />
        </Reveal>

        <div className="mt-10 rounded-3xl border border-sage-100/60 bg-white p-8 shadow-card relative overflow-hidden">
          {/* Subtle background glow decorator */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-softblue-200/10 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {step < STEPS.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-sage-50 pb-4">
                  <h3 className="text-lg font-bold text-sage-950">{STEPS[step].title}</h3>
                  <span className="text-xs font-semibold text-neutralwarm-500 uppercase tracking-widest">
                    Step {step + 1} of {STEPS.length}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {step === 0
                    ? (STEPS[0].options as any[]).map((opt) => {
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption("recipient", opt.id)}
                            className="flex flex-col items-center justify-center p-6 rounded-2xl border border-sage-100 hover:border-softblue-300 hover:bg-softblue-50/10 transition-all text-center group"
                          >
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-50 text-sage-700 group-hover:bg-softblue-100 group-hover:text-softblue-800 transition mb-4 border border-sage-100/50 shadow-sm">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="font-bold text-sage-950 block mb-1.5">{opt.label}</span>
                            <span className="text-xs text-neutralwarm-600 leading-relaxed">{opt.desc}</span>
                          </button>
                        );
                      })
                    : (STEPS[1].options as any)[selections.recipient]?.map((opt: any) => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption("concern", opt.id)}
                          className="flex items-center justify-between p-5 rounded-2xl border border-sage-100 hover:border-softblue-300 hover:bg-softblue-50/10 transition-all text-left w-full group"
                        >
                          <div>
                            <span className="font-bold text-sage-950 block">{opt.label}</span>
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-50 text-sage-600 group-hover:bg-softblue-500 group-hover:text-white transition shadow-sm">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </button>
                      ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep(0)}
                    className="text-xs font-bold text-neutralwarm-500 hover:text-sage-950 transition flex items-center gap-1 mt-4"
                  >
                    ← Back to Step 1
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-50 border border-green-100 text-green-600 mb-4 shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold text-neutralwarm-500 uppercase tracking-widest">Recommended Option</p>
                <h3 className="mt-2 text-2xl font-extrabold text-sage-950">{recommendation?.title || "Specialized Consultation"}</h3>
                <p className="mt-4 text-base text-neutralwarm-700 max-w-xl mx-auto leading-8">
                  {recommendation?.desc || "Based on your needs, we recommend a custom enquiry session to design a tailored therapeutic layout."}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a
                    href={recommendation?.url || "#contact"}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-sage-700 hover:bg-sage-800 px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                  >
                    {recommendation?.buttonText || "Request Appointment"}
                  </a>
                  <button
                    onClick={handleReset}
                    className="text-sm font-bold text-neutralwarm-500 hover:text-sage-950 transition"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function AnimatedFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white border-t border-sage-100">
      <div className="site-container max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Clear details on appointments, guidelines, booking confirmations, and how sessions work."
            align="center"
          />
        </Reveal>

        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 50}>
                <div className="rounded-2xl border border-sage-100 bg-white p-1 hover-glow shadow-card overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sage-950 text-base"
                  >
                    <span>{item.q}</span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-sage-50 text-sage-600 transition duration-300 ${isOpen ? "rotate-180 bg-sage-700 text-white shadow" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="border-t border-sage-50/50 p-5 bg-sage-50/20 text-sm leading-8 text-neutralwarm-700">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── NEURO SUPPORT SERVICES ACCORDION ────────────────────────────────────────
const NEURO_SERVICES = [
  {
    name: "Occupational Therapy",
    desc: "Occupational therapy helps children develop the skills needed for daily activities, play, and learning. It focuses on improving fine motor skills, sensory processing, balance, coordination, and independence in everyday tasks.",
    bullets: ["Fine motor skills development", "Sensory processing support", "Balance & coordination", "Daily living independence"],
  },
  {
    name: "Behavioral Therapy",
    desc: "Behavioral therapy uses evidence-based techniques to improve communication, learning, social skills, and adaptive behaviors. It also helps reduce challenging behaviors by teaching appropriate alternatives through positive reinforcement.",
    bullets: ["Communication & social skills", "Evidence-based ABA techniques", "Positive reinforcement methods", "Reducing challenging behaviors"],
  },
  {
    name: "Parent Training",
    desc: "Parent training equips caregivers with practical strategies to support their child's development at home. It focuses on behavior management, communication techniques, and creating consistent routines to maximize progress.",
    bullets: ["Behavior management strategies", "Communication techniques", "Consistent routine building", "Home-based skill support"],
  },
  {
    name: "Developmental Support",
    desc: "Developmental support promotes a child's overall growth across cognitive, language, social, emotional, and motor domains. It uses individualized activities and interventions to help children achieve age-appropriate developmental milestones.",
    bullets: ["Cognitive & language growth", "Social & emotional development", "Motor domain interventions", "Age-appropriate milestone goals"],
  },
];

export function NeuroSupportServicesList() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setActiveService(activeService === name ? null : name);
  };

  const handleBook = (serviceName: string) => {
    const event = new CustomEvent("select-service", {
      detail: { service: serviceName },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="mt-8 grid gap-4 grid-cols-1">
      {NEURO_SERVICES.map((service) => {
        const isOpen = activeService === service.name;
        return (
          <div
            key={service.name}
            className={`rounded-xl border bg-white shadow-card transition-all duration-300 overflow-hidden ${
              isOpen ? "border-sage-300 ring-2 ring-sage-100" : "border-sage-100 hover:border-sage-200"
            }`}
          >
            <button
              onClick={() => handleToggle(service.name)}
              className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-sage-950 transition hover:bg-sage-50/30 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className={`p-2 rounded-lg transition-colors ${isOpen ? "bg-sage-800 text-white shadow-sm" : "bg-sage-100 text-sage-700"}`}>
                  <Sparkles className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                </div>
                <span className="text-base sm:text-lg tracking-tight font-extrabold text-sage-950">{service.name}</span>
              </div>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180 bg-sage-800 text-white shadow-md" : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                }`}
              >
                <ChevronDown className="h-4.5 w-4.5" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="border-t border-sage-100/60 p-5 bg-sage-50/20 space-y-4">
                    <p className="text-sm leading-relaxed text-sage-800 font-semibold">
                      {service.desc}
                    </p>
                    
                    <div className="grid gap-2.5 text-xs text-sage-700 sm:grid-cols-2 pt-1">
                      {service.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-2 bg-white/80 rounded-lg p-2.5 border border-sage-100/30 shadow-sm">
                          <CheckCircle2 className="h-4 w-4 text-sage-600 flex-shrink-0" />
                          <span className="font-bold text-sage-900">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3.5 border-t border-sage-100/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sage-600/80">
                        In-person & Virtual sessions available
                      </span>
                      <button
                        onClick={() => handleBook(service.name)}
                        className="inline-flex items-center justify-center rounded-full bg-sage-800 hover:bg-sage-950 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 group cursor-pointer"
                      >
                        Book an Appointment
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
