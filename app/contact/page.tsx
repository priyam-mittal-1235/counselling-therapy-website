import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactDetails } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mindful Living for counselling, therapy, occupational therapy, behaviour therapy, and parent guidance appointments.",
};

const contactCards = [
  {
    title: "Phone",
    value: contactDetails.phone,
    href: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    title: "Email",
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
    icon: Mail,
  },
  {
    title: "Address",
    value: contactDetails.address,
    href: "https://maps.app.goo.gl/cxA8wydBHdWcbVej8",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a confidential conversation."
        description="Reach out to Mindful Living to ask a question, request an appointment, or find the right counselling or therapy service."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-padding bg-cream-50">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Book an appointment"
              title="Tell us what kind of support you are looking for."
              description="Please fill out the form below to enquire about our counselling and therapy services. A member of our team will get in touch with you within 24 business hours."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="card-surface flex gap-4 p-5 transition hover:-translate-y-1 hover:shadow-soft motion-reduce:transform-none"
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-softblue-700">
                        {card.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-neutralwarm-700">
                        {card.value}
                      </span>
                    </span>
                  </a>
                );
              })}

              <a
                href={contactDetails.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1f8f5f] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#18794f] motion-reduce:transform-none"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                Contact on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="map" className="section-padding bg-white">
        <div className="site-container">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <SectionHeading
                eyebrow="Find us"
                title="Visit Mindful Living by appointment."
                description="Our wellness clinic is located in Aman Vihar, near Niranjanpur Mandi, Dehradun. You can easily find us on the map or contact us for detailed directions."
              />
              <div className="relative w-full overflow-hidden rounded-2xl border border-sage-100 shadow-soft bg-white">
                <div className="relative min-h-[360px] w-full">
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
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
