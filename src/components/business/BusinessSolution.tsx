import Image from "next/image";
import Card from "@/components/ui/Card";

type BusinessSolutionProps = {
  label: string;
  title: string;
  description: string;
  icon: string;
  exampleHref: string;
};

export default function BusinessSolution({
  label,
  title,
  description,
  icon,
  exampleHref,
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

        {/* Example link placeholder */}
        <div className="mt-auto pt-5 text-center">
          <a
            href={exampleHref}
            aria-disabled={exampleHref === "#"}
            className={`inline-block text-sm font-semibold text-[#287A60] transition-colors hover:text-[#20664E] hover:underline ${
              exampleHref === "#" ? "pointer-events-none" : ""
            }`}
          >
            View Example →
          </a>
        </div>
      </div>
    </Card>
  );
}
