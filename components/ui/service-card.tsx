import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  items?: string[];
};

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href = "/services",
  items,
}: ServiceCardProps) {
  return (
    <article className="card-surface group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-soft motion-reduce:transform-none">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100 text-sage-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-sage-950">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-neutralwarm-700">{description}</p>
      {items ? (
        <ul className="mt-5 space-y-2 text-sm text-neutralwarm-700">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-softblue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={href}
        className="mt-6 inline-flex items-center text-sm font-semibold text-sage-700 transition hover:text-sage-950"
      >
        Learn more
        <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
