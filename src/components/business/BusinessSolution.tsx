
import Image from "next/image";
import Card from "@/components/ui/Card";

type BusinessSolutionProps = {
  label: string;
  title: string;
  description: string;
  icon: string;
};

export default function BusinessSolution({
  label,
  title,
  description,
  icon,
}: BusinessSolutionProps) {
  return (
    <Card hover className="business-solution-card h-full p-6">
      <div className="flex flex-col gap-3">
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
      </div>
    </Card>
  );
}
