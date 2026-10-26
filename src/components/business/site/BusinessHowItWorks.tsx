import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

const icons = [
  "/icons/business/talk.svg",
  "/icons/business/plan.svg",
  "/icons/business/build.svg",
];

type ProcessStep = {
  title: string;
  description: string;
};

export default async function BusinessHowItWorks() {
  const t = await getTranslations("BusinessHowItWorks");
  const steps = t.raw("steps") as ProcessStep[];

  return (
    <Section
      id="how-it-works"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="business-card business-card-interactive h-full p-6"
          >
            <div className="flex h-full flex-col gap-4">
              <span className="text-sm font-semibold text-[#287A60]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col items-center gap-4 text-center">
                <Image
                  src={icons[index]}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />

                <h3 className="text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="business-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
