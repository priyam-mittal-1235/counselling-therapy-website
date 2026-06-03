"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  return (
    <form
      className="card-surface p-5 sm:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("submitting");
        setFeedback("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          service: String(formData.get("service") || ""),
          message: String(formData.get("message") || ""),
        };

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = (await response.json()) as { message?: string };

          if (!response.ok) {
            throw new Error(result.message || "Unable to submit the enquiry.");
          }

          setStatus("success");
          setFeedback(result.message || "Thank you. Mindful Living will contact you soon.");
          form.reset();
        } catch (error) {
          setStatus("error");
          setFeedback(
            error instanceof Error
              ? error.message
              : "Unable to submit the enquiry right now."
          );
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-sage-900">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-sage-900">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
            placeholder="+91 75007 61988"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="text-sm font-semibold text-sage-900">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
          placeholder="info@mindfulliving.com"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="service" className="text-sm font-semibold text-sage-900">
          Service of interest
        </label>
        <select
          id="service"
          name="service"
          className="mt-2 w-full rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition focus:border-softblue-500 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          <option>Individual Counselling</option>
          <option>Family Counselling</option>
          <option>Relationship Counselling</option>
          <option>Child and Adolescent Support</option>
          <option>Occupational Therapy</option>
          <option>Behaviour Therapy</option>
          <option>Parent Guidance</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold text-sage-900">
          How can we support you?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-lg border border-sage-200 bg-white px-4 py-3 text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
          placeholder="Share a brief note about what you are looking for."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sage-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-sage-800 motion-reduce:transform-none sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send enquiry"}
        <Send className="ml-2 h-4 w-4" aria-hidden="true" />
      </button>

      {feedback ? (
        <p
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
            status === "error" ? "bg-red-50 text-red-700" : "bg-sage-50 text-sage-800"
          }`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
