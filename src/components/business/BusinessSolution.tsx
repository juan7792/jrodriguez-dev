
import Image from "next/image";
import Link from "next/link";

import Card from "@/components/ui/Card";

type BusinessSolutionProps = {
  label: string;
  title: string;
  description: string;
  icon: string;
  demoHref: string;
};

export default function BusinessSolution({
  label,
  title,
  description,
  icon,
  demoHref,
}: BusinessSolutionProps) {
  return (
    <Card hover className="business-solution-card h-full p-6">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="business-card-label text-xs font-semibold uppercase tracking-wider">
            {label}
          </span>

          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0"
          />
        </div>

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="business-card-description text-sm leading-relaxed">
          {description}
        </p>

        {/* Solution links */}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-5 text-center">
          <Link
            href="#"
            className="text-sm font-semibold text-[#287A60] transition-colors hover:text-[#20664E] hover:underline"
          >
            View Example →
          </Link>

          <Link
            href={demoHref}
            className="text-sm font-semibold text-[#287A60] transition-colors hover:text-[#20664E] hover:underline"
          >
            Try Live Demo →
          </Link>
        </div>
      </div>
    </Card>
  );
}
