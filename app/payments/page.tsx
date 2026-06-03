"use client";

import { useState } from "react";
import { Check, Copy, CreditCard, MessageCircle, QrCode, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const SERVICES = [
  { id: "consultation", label: "Consultation", amount: 500 },
  { id: "individual", label: "Individual Counselling", amount: 800 },
  { id: "family", label: "Family Counselling", amount: 1000 },
  { id: "relationship", label: "Relationship Counselling", amount: 1200 },
  { id: "child", label: "Child Counselling", amount: 800 },
  { id: "occupational", label: "Occupational Therapy", amount: 1000 },
  { id: "behaviour", label: "Behaviour Therapy", amount: 1000 },
  { id: "other", label: "Other / Custom Amount", amount: 0 },
];

export default function PaymentsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(SERVICES[0].id);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayAmount, setDisplayAmount] = useState<number | null>(null);
  const [error, setError] = useState("");

  const activeService = SERVICES.find((s) => s.id === service);
  const finalAmount = service === "other" ? Number(customAmount) : activeService?.amount || 0;

  const handleCopy = () => {
    navigator.clipboard.writeText("muskaan17grg@okaxis");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill out all required fields.");
      return;
    }
    if (service === "other" && (!customAmount || Number(customAmount) <= 0)) {
      setError("Please enter a valid payment amount.");
      return;
    }

    setIsGenerating(true);

    const serviceLabel = SERVICES.find((s) => s.id === service)?.label ?? service;

    try {
      // Save payment details to the database
      await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service: serviceLabel,
          amount: finalAmount,
        }),
      });

      // Show the static QR code image after a short loader delay
      setTimeout(() => {
        setDisplayAmount(finalAmount);
        setShowQr(true);
        setIsGenerating(false);
      }, 850);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setIsGenerating(false);
    }
  };

  const getWhatsAppLink = () => {
    const serviceLabel = SERVICES.find((s) => s.id === service)?.label ?? service;
    const text = `Hello Mindful Living,

I have completed the payment.

Name: ${name.trim()}
Phone: ${phone.trim()}
Service: ${serviceLabel}
Amount Paid: ₹${displayAmount}

I am attaching my payment receipt for confirmation.`;
    
    return `https://wa.me/917500761988?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* Custom Hero Section with Secure Payment Badge */}
      <section className="relative overflow-hidden bg-cream-50 py-16 sm:py-20 lg:py-24 border-b border-cream-100 min-h-[360px] flex items-center">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-softblue-700">
                Payment Portal
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-sage-950 sm:text-4xl lg:text-5xl leading-tight">
                Secure & Instant Payments
              </h1>
              <p className="mt-4 text-base leading-7 text-neutralwarm-700">
                Fill out the patient details to generate the official UPI payment QR Code.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} type="scale">
            <div className="flex justify-center items-center w-full">
              <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white p-6 shadow-soft aspect-square w-full max-w-[280px] hover-glow-img flex justify-center items-center">
                <img
                  src="/assets/secure-badge.png"
                  alt="100% Secure Transaction"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="site-container">
          <div className="card-surface overflow-hidden rounded-2xl border border-sage-100 bg-white p-5 md:p-8 shadow-soft max-w-5xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              
              {/* Left Side: Form */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-sage-50 pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-sage-950">Enter Payment Details</h3>
                    <p className="mt-1 text-sm text-neutralwarm-600">
                      Fill in the patient details to generate a secure UPI payment QR Code.
                    </p>
                  </div>
                  <img src="/assets/secure-badge.png" alt="100% Secure" className="h-10 sm:h-12 w-auto object-contain self-start sm:self-center" />
                </div>

                {error && (
                  <div className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-800 border border-red-100 text-sm font-semibold">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleGenerate} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="payment-name" className="block text-sm font-semibold text-sage-900">
                      Patient / Client Full Name *
                    </label>
                    <input
                      id="payment-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setShowQr(false);
                      }}
                      placeholder="e.g. Rohit Sharma"
                      className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="payment-phone" className="block text-sm font-semibold text-sage-900">
                      Contact Number *
                    </label>
                    <input
                      id="payment-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setShowQr(false);
                      }}
                      placeholder="e.g. 9876543210"
                      className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="payment-email" className="block text-sm font-semibold text-sage-900">
                      Email Address *
                    </label>
                    <input
                      id="payment-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setShowQr(false);
                      }}
                      placeholder="e.g. rohit@example.com"
                      className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="payment-service" className="block text-sm font-semibold text-sage-900">
                      Service Type *
                    </label>
                    <select
                      id="payment-service"
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        setShowQr(false);
                      }}
                      className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition focus:border-softblue-500 focus:outline-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label} {s.amount > 0 ? `(₹${s.amount})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {service === "other" && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <label htmlFor="payment-amount" className="block text-sm font-semibold text-sage-900">
                        Custom Amount (₹) *
                      </label>
                      <input
                        id="payment-amount"
                        type="number"
                        required
                        min="1"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setShowQr(false);
                        }}
                        placeholder="Enter amount in INR"
                        className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isGenerating || !name.trim() || !phone.trim() || !email.trim() || (service === "other" && !customAmount)}
                    className="w-full inline-flex min-h-12 items-center justify-center rounded-full bg-sage-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-sage-800 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating secure UPI QR...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <QrCode className="h-4 w-4" />
                        Generate Payment QR Code
                      </span>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Side: QR Render Card */}
              <div className="flex flex-col justify-center items-center rounded-xl border border-sage-100 bg-cream-50/50 p-6 text-center">
                {showQr ? (
                  <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-800">
                      <Sparkles className="h-3 w-3" />
                      Scan to Pay Securely
                    </span>
                    
                    {/* Fixed Static QR Code Image */}
                    <div className="relative mt-4 overflow-hidden rounded-xl border-4 border-white bg-white p-3 shadow-card max-w-[200px] hover-glow-img">
                      <img 
                        src="/assets/upi-qr.png" 
                        alt="Mindful Living Secure UPI QR Code" 
                        className="h-44 w-44 object-contain" 
                      />
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-softblue-500/60 opacity-60 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-neutralwarm-500">Payable Amount</p>
                      <p className="text-2xl font-extrabold text-sage-950">₹{displayAmount?.toLocaleString("en-IN")}</p>
                    </div>

                    {/* Fixed UPI ID Details */}
                    <div className="mt-4 w-full max-w-xs rounded-lg border border-sage-200 bg-white px-3 py-2 flex items-center justify-between text-left">
                      <div className="overflow-hidden">
                        <span className="block text-[10px] uppercase font-bold text-neutralwarm-400 leading-none">UPI ID</span>
                        <span className="text-sm font-semibold text-sage-950 select-all">muskaan17grg@okaxis</span>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="p-2 text-neutralwarm-600 hover:text-sage-900 rounded-md transition hover:bg-sage-50"
                        aria-label="Copy UPI ID"
                        type="button"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Note / WhatsApp redirection */}
                    <div className="mt-6 space-y-3">
                      <p className="text-xs leading-5 text-neutralwarm-600 max-w-xs">
                        Once payment is done, take a screenshot of the transaction and share it via WhatsApp for immediate confirmation.
                      </p>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#1f8f5f] px-5 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-[#18794f]"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Share Payment Receipt on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700 shadow-inner">
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <h4 className="mt-4 font-semibold text-sage-950">Payment QR Code Generator</h4>
                    <p className="mt-2 text-xs leading-5 text-neutralwarm-600 max-w-xs">
                      Fill out the name, phone number, email, and service selection on the left to generate the UPI payment QR Code here.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
