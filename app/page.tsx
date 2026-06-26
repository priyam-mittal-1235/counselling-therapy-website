import type { Metadata } from "next";
import {
  Activity,
  BadgeCheck,
  Brain,
  CalendarDays,
  HandHeart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Puzzle,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";
import { PaymentPortal } from "@/components/payment-portal";
import { contactDetails, stats } from "@/data/site";
import { InteractiveServiceFinder, AnimatedFaqSection, NeuroSupportServicesList } from "@/components/interactive-features";

export const metadata: Metadata = {
  title: "Mindful Living | Professional Counselling and Therapy Services",
  description:
    "A welcoming mental health and wellness practice offering counselling, therapy, neurodivergent child support, occupational therapy, behaviour therapy, and parent guidance in Dehradun.",
};

const services = [
  {
    title: "Counselling Services",
    description:
      "Private support for stress, anxiety, emotional difficulties, grief, self-esteem and life transitions.",
    icon: HeartHandshake,
    items: ["Individual Counselling", "Stress Management", "Anxiety Support"],
  },
  {
    title: "Therapy Services",
    description:
      "Structured therapeutic support including Occupational and Behaviour Therapy for neurodivergent children, focusing on coping skills, sensory regulation, and developmental growth.",
    icon: Sparkles,
    items: ["Evidence-based support", "Occupational & Behaviour Therapy", "Sensory & Emotional regulation"],
  },
  {
    title: "Occupational Therapy",
    description:
      "Developmental support for neurodivergent children with sensory, motor, attention and routine needs.",
    icon: Puzzle,
    items: ["Sensory processing", "Motor skills", "Daily living skills"],
  },
  {
    title: "Behaviour Therapy",
    description:
      "Positive behavior support that identifies needs and teaches practical replacement skills.",
    icon: Brain,
    items: ["Behavior assessment", "Routine planning", "Parent coaching"],
  },
  {
    title: "Child and Adolescent Support",
    description:
      "Age-sensitive care for children and teens facing emotional, social, behavioral or academic concerns.",
    icon: HandHeart,
    items: ["Child Counselling", "Adolescent Counselling", "Confidence building"],
  },
  {
    title: "Family and Relationship Support",
    description:
      "Guided sessions for better communication, conflict resolution, trust and connection.",
    icon: UsersRound,
    items: ["Family Counselling", "Relationship Counselling", "Parent Guidance"],
  },
];

const testimonials = [
  {
    quote:
      "Mindful Living helped me feel heard without judgment. The sessions gave me practical tools and a calmer way to handle difficult weeks.",
    name: "Priya Sharma",
    detail: "Stress and anxiety support",
  },
  {
    quote:
      "The team guided our family with patience and clarity. We learned to communicate better and understand each other with more compassion.",
    name: "Rahul Mehta",
    detail: "Family communication",
  },
  {
    quote:
      "Our child received thoughtful occupational therapy support, and we were included at every step. The home strategies made a real difference.",
    name: "Ananya Rao",
    detail: "Developmental care",
  },
  {
    quote:
      "Relationship counselling gave us a calmer way to speak, listen and rebuild trust. The process felt respectful and professional throughout.",
    name: "Meera and Arjun Kapoor",
    detail: "Relationship counselling",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Light Calm Redesign */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-cream-50 overflow-hidden py-16 lg:py-24 border-b border-cream-100">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="text-3xl font-extrabold tracking-tight text-sage-950 sm:text-5xl lg:text-6xl leading-tight">
                A Safe Space for <br className="hidden sm:inline" /> Growth and Healing
              </h1>
              <div className="mt-6 space-y-4 text-base leading-8 text-neutralwarm-700">
                <p>
                  Mindful Living is a professional counselling and therapy practice committed
                  to mental and emotional well-being. We provide a safe, confidential space
                  where individuals can openly explore their concerns and work towards
                  meaningful personal growth.
                </p>
                <p>
                  We support individuals, couples, families, and neurodivergent children
                  through tailored counselling, psychotherapy, Occupational Therapy, and
                  Behaviour Therapy — helping you navigate stress, anxiety, relationship
                  challenges, developmental concerns, and life transitions with compassionate,
                  evidence-based care.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="#contact" variant="primary" className="rounded-full px-8 py-4 shadow-lg text-white">
                  Book an Appointment
                </ButtonLink>
                <ButtonLink href="#services" variant="secondary" className="rounded-full px-8 py-4">
                  Explore Our Services
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} type="scale">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white p-2 shadow-soft aspect-[4/3] w-full hover-glow-img">
              <img
                src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80"
                alt="Counselling and therapy session in a warm, welcoming room"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-2 bg-sage-900/10 rounded-2xl pointer-events-none" />
            </div>
          </Reveal>
        </div>

        {/* Feature Cards Grid */}
        <div className="site-container mt-16 lg:mt-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Professional Counselling Services",
                description: "Personalized support for emotional well-being and personal growth.",
                icon: HeartHandshake,
                glowClass: "from-sage-50 to-white text-sage-700 border-sage-100/80 shadow-[0_0_15px_rgba(110,139,116,0.15)]",
              },
              {
                title: "Safe and Confidential Care",
                description: "A supportive environment where every individual feels heard and respected.",
                icon: ShieldCheck,
                glowClass: "from-softblue-50 to-white text-softblue-700 border-softblue-100/80 shadow-[0_0_15px_rgba(98,170,202,0.15)]",
              },
              {
                title: "Tailored Therapy Programs",
                description: "Individualized counselling and therapy plans designed around unique needs.",
                icon: Activity,
                glowClass: "from-sage-50 to-white text-sage-700 border-sage-100/80 shadow-[0_0_15px_rgba(110,139,116,0.15)]",
              },
              {
                title: "Specialized Child Support",
                description: "Occupational and Behaviour Therapy services for neurodivergent children.",
                icon: Puzzle,
                glowClass: "from-softblue-50 to-white text-softblue-700 border-softblue-100/80 shadow-[0_0_15px_rgba(98,170,202,0.15)]",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal key={idx} delay={120 + idx * 80}>
                  <div className="rounded-2xl border border-sage-100/60 bg-white p-6 shadow-card hover-glow h-full flex flex-col justify-between">
                    <div>
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${card.glowClass} border mb-5`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-sage-950 leading-tight">{card.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutralwarm-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="section-padding bg-cream-50">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Our Services"
              title="Professional support for every stage of life."
              description="Choose from counselling, therapy, developmental support, and family-centered guidance designed around your unique needs."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              const numStr = String(index + 1).padStart(2, "0");
              return (
                <Reveal key={service.title} delay={index * 60}>
                  <article className="card-surface group flex h-full flex-col p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-soft">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="text-3xl font-extrabold tracking-tight text-cream-200 group-hover:text-cream-300 transition duration-300">
                        {numStr}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-sage-950">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-neutralwarm-700">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-neutralwarm-700">
                      {service.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-softblue-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sage-50/50 py-10 border-y border-sage-100 text-sage-900">
        <div className="site-container grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <div className="rounded-xl border border-sage-100/80 bg-white p-4 sm:p-6 text-center shadow-card transition duration-300 hover:shadow-soft">
                <p className="text-4xl font-extrabold text-softblue-500">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-sage-800">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Therapist Section */}
      <section id="therapist" className="section-padding bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal type="scale">
            <div className="relative overflow-hidden rounded-2xl border-4 border-sage-100 bg-sage-50 p-3 shadow-soft hover-glow-img">
              <img
                src="/muskaan-garg-white.jpg?v=2"
                alt="Muskaan Garg"
                className="aspect-[3/4] w-full rounded-xl object-cover object-top shadow-card"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-softblue-700">
              Founder & Therapist
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sage-950 sm:text-4xl">
              Muskaan Garg
            </h2>
            <p className="mt-1 text-sm font-semibold text-sage-700">
              BA Psychology • M.Sc. Clinical Psychology
            </p>
            <div className="mt-6 space-y-4 text-base leading-8 text-neutralwarm-700">
              <p>
                At Mindful Living, I am dedicated to offering a compassionate, evidence-based,
                and warm therapeutic environment for individuals seeking emotional support. My goal
                is to partner with you in your healing journey, providing a safe and completely
                confidential space to address stress, anxiety, emotional struggles, or relationship
                challenges.
              </p>
              <p>
                Specializing in counselling, psychotherapy, and child development support, I design
                each session around your unique needs. We work together at your own pace, applying
                proven therapeutic tools to help you build coping skills, resilience, and personal
                growth.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="#contact" className="rounded-full px-6 py-3">
                Schedule a Consultation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Neuro Support Section */}
      <section id="support" className="section-padding bg-sage-50">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Neurodivergent Children Support"
              title="Developmental care that includes the child, parents and daily routines."
              description="Neurodiversity recognizes natural differences in how children think, learn, sense, communicate and engage with the world. Mindful Living offers Occupational Therapy, Behaviour Therapy and parent involvement through individualized care plans."
            />
            <NeuroSupportServicesList />
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1000&q=85"
                alt="Child development support session"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-cream-50">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Testimonials"
              title="Stories of support, progress and renewed confidence."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 80}>
                <article className="card-surface h-full p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <Quote className="h-8 w-8 text-softblue-500/30" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-6 text-neutralwarm-700 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="mt-6 border-t border-sage-100 pt-4">
                    <p className="font-semibold text-sage-950">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-neutralwarm-500">
                      {testimonial.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Portal Section */}
      <section id="payment" className="section-padding bg-white border-t border-sage-100">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Direct Payment Portal"
              title="Secure and instant payments."
              description="Make a quick, secure session payment directly from our website using any UPI App (GPay, PhonePe, Paytm, BHIM) or bank account details."
              align="center"
            />
          </Reveal>
          <div className="mt-12 max-w-4xl mx-auto">
            <Reveal delay={120}>
              <PaymentPortal />
            </Reveal>
          </div>
        </div>
      </section>

      <InteractiveServiceFinder />

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-cream-50">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Contact Us"
              title="Start with a confidential conversation."
              description="Reach out to ask a question, request an appointment, or choose the right counselling or therapy service for yourself, your family or your child."
            />

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                className="card-surface flex gap-4 p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-softblue-700">
                    Phone
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-neutralwarm-800">
                    {contactDetails.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${contactDetails.email}`}
                className="card-surface flex gap-4 p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-softblue-700">
                    Email
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-neutralwarm-800">
                    {contactDetails.email}
                  </span>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/cxA8wydBHdWcbVej8"
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface flex gap-4 p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-softblue-700">
                    Address
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-neutralwarm-800">
                    {contactDetails.address}
                  </span>
                  <span className="mt-2 inline-flex items-center text-xs font-bold text-softblue-700 hover:text-softblue-800 gap-1">
                    Get Directions
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>

              <a
                href={contactDetails.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1f8f5f] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#18794f] sm:w-auto"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                Contact on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>

        {/* Map block under contact forms */}
        <div className="site-container mt-12">
          <Reveal>
            <div className="relative w-full overflow-hidden rounded-2xl border border-sage-100 shadow-soft bg-white">
              <div className="relative min-h-[380px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3444.813308311546!2d78.009169!3d30.299376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDE3JzU3LjgiTiA3OMKwMDAnMzMuMCJF!5e0!3m2!1sen!2sin!4v1780395635475!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                  title="Mindful Living Clinic Map Location"
                />
              </div>
              <div className="bg-sage-50 border-t border-sage-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-sage-950">Mindful Living Clinic</h4>
                  <p className="text-xs text-neutralwarm-600 mt-0.5">{contactDetails.address}</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/cxA8wydBHdWcbVej8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-sage-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-sage-900 hover:-translate-y-0.5"
                >
                  <MapPin className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  Get Directions on Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatedFaqSection />
    </>
  );
}
