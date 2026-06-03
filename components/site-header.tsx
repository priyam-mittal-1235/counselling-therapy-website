"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake, Menu, Phone, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoZoomed, setIsLogoZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-sage-100 bg-cream-50/95 backdrop-blur">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-softblue-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <nav className="site-container flex h-20 items-center justify-between" aria-label="Main">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/assets/logo.jpg?v=3"
            alt="Mindful Living Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-sage-100/50 shadow-sm cursor-zoom-in hover:scale-105 transition duration-200"
            onClick={() => setIsLogoZoomed(true)}
          />
          <Link href="/" className="hover:opacity-90 transition cursor-pointer" aria-label="Mindful Living home">
            <span>
              <span className="block text-sm sm:text-lg font-bold leading-tight text-sage-950">
                Mindful Living
              </span>
              <span className="block text-[9px] sm:text-xs font-medium text-neutralwarm-600">
                Counselling & Therapy
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-sage-900" : "text-neutralwarm-700 hover:text-sage-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-full bg-sage-700 px-5 text-sm font-semibold text-white shadow-card transition hover:bg-sage-800"
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            Book a Session
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-sage-200 bg-white text-sage-900 lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-sage-100 bg-cream-50 lg:hidden">
          <div className="site-container grid gap-2 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-sage-100 text-sage-950"
                      : "text-neutralwarm-700 hover:bg-white hover:text-sage-950"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-sage-700 px-5 text-sm font-semibold text-white"
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              Book a Session
            </Link>
          </div>
        </div>
      ) : null}

      {mounted && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isLogoZoomed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsLogoZoomed(false)}
                  className="fixed inset-0 z-[200] flex items-center justify-center bg-sage-950/70 p-4 backdrop-blur-md cursor-zoom-out"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 15, opacity: 0 }}
                    transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-[360px] overflow-hidden rounded-2xl border border-sage-200/60 bg-cream-50 p-6 text-center shadow-2xl cursor-default"
                  >
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setIsLogoZoomed(false)}
                      className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sage-900 shadow-sm border border-sage-100 hover:bg-sage-50 transition cursor-pointer"
                      aria-label="Close logo viewer"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Title Header */}
                    <div className="mb-5 mt-2">
                      <h3 className="text-lg font-bold text-sage-950 tracking-tight">
                        Mindful Living
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-sage-600/80 mt-0.5">
                        Counselling & Therapy
                      </p>
                    </div>

                    {/* Framed Logo Image */}
                    <div className="mx-auto aspect-square w-full max-w-[220px] rounded-full border border-sage-100/80 bg-white p-2.5 shadow-md flex items-center justify-center">
                      <img
                        src="/assets/logo.jpg?v=3"
                        alt="Mindful Living Logo"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>

                    {/* Tagline Footer */}
                    <div className="mt-5 pt-4 border-t border-sage-100">
                      <p className="text-sm font-medium text-sage-800 italic">
                        "Calm mind. Better life."
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  );
}
