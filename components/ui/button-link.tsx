import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "light";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showIcon?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sage-700 text-white shadow-soft hover:bg-sage-800 focus-visible:outline-softblue-400",
  secondary:
    "border border-sage-200 bg-white text-sage-800 hover:border-sage-400 hover:bg-sage-50",
  light:
    "bg-white text-sage-900 shadow-soft hover:bg-cream-100 focus-visible:outline-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  showIcon = true,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transform-none ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      {showIcon ? <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /> : null}
    </Link>
  );
}
