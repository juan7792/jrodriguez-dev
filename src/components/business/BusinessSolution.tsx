
import Card from "@/components/ui/Card";

type BusinessSolutionProps = {
  label: string;
  title: string;
  description: string;
};

export default function BusinessSolution({
  label,
  title,
  description,
}: BusinessSolutionProps) {
  return (
    <Card hover className="business-solution-card h-full p-6">
      <div className="flex flex-col gap-3">
        <span className="business-card-label text-xs font-semibold uppercase tracking-wider">
          {label}
        </span>

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
