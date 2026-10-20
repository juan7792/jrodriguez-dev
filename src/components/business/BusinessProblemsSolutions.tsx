import { getTranslations } from "next-intl/server";

import Section from "@/components/ui/Section";
import BusinessProblem from "./BusinessProblem";
import BusinessSolution from "./BusinessSolution";

const icons = {
  problem1: "/icons/business/wrench.svg",
  solution1: "/icons/business/puzzle.svg",
  problem2: "/icons/business/spreadsheet.svg",
  solution2: "/icons/business/automation.svg",
  problem3: "/icons/business/barchart.svg",
  solution3: "/icons/business/dashboard.svg",
};

type BusinessItem = {
  problem: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
  };
};

export default async function BusinessProblemsSolutions() {
  const t = await getTranslations("BusinessProblemsSolutions");

  const items = t.raw("items") as Record<string, BusinessItem>;

  return (
    <Section
      id="solutions"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="flex flex-col gap-4">
        {Object.entries(items).map(([key, item], index) => (
          <div
            key={key}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <BusinessProblem
              label={`${t("problemLabel")} ${index + 1}`}
              title={item.problem.title}
              description={item.problem.description}
              icon={icons[`problem${index + 1}` as keyof typeof icons]}
            />

            <BusinessSolution
              label={`${t("solutionLabel")} ${index + 1}`}
              title={item.solution.title}
              description={item.solution.description}
              icon={icons[`solution${index + 1}` as keyof typeof icons]}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
