
import Card from "@/components/ui/Card";

type BusinessProblemProps = {
  label: string;
  title: string;
  description: string;
};

export default function BusinessProblem({
  label,
  title,
  description,
}: BusinessProblemProps) {
  return (
    <Card hover className="h-full p-6">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
    </Card>
  );
}
