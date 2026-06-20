import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default: "Mindful Living | Counselling and Therapy Services",
    template: "%s | Mindful Living",
  },
  description:
    "Mindful Living provides professional counselling, therapy, emotional wellness support, and neurodivergent child development services.",
  keywords: [
    "Mindful Living",
    "counselling",
    "therapy",
    "mental health",
    "occupational therapy",
    "behaviour therapy",
    "neurodivergent children",
    "family counselling",
  ],
  openGraph: {
    title: "Mindful Living | Counselling and Therapy Services",
    description:
      "Professional counselling and therapy for individuals, couples, families, and neurodivergent children.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>

      <GoogleAnalytics gaId="G-JK1GHS24ER" />
    </html>
  );
}