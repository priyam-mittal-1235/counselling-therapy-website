import Link from "next/link";
import { HeartHandshake, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails, navLinks } from "@/data/site";

const footerServices = [
  "Individual Counselling",
  "Relationship Counselling",
  "Child and Adolescent Support",
  "Occupational Therapy",
  "Behaviour Therapy",
  "Parent Guidance",
];

export function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-50">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 hover:opacity-90 transition cursor-pointer">
            <img src="/assets/logo.jpg?v=3" alt="Mindful Living Logo" className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover bg-white p-0.5 border border-white/20" />
            <span>
              <span className="block text-sm sm:text-lg font-bold">Mindful Living</span>
              <span className="block text-[9px] sm:text-xs text-sage-200">Counselling & Therapy</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-sage-100">
            Professional counselling and therapy support for emotional well-being,
            personal growth, family relationships, and developmental care.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream-200">
            Quick Links
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-sage-100">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream-200">
            Services
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-sage-100">
            {footerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-5 py-6 text-sm text-sage-100 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} Mindful Living. All rights reserved.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contactDetails.phone}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {contactDetails.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Dehradun
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
