
import { getTranslations } from "next-intl/server";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

type ProcessStep = {
  title: string;
  description: string;
};

export default async function BusinessHowItWorks() {
  const t = await getTranslations("BusinessHowItWorks");
  const steps = t.raw("steps") as ProcessStep[];

  return (
    <Section
      id="process"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={index} className="h-full p-6">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-emerald-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
