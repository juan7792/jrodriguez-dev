
import { getTranslations } from "next-intl/server";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

type Strength = {
  title: string;
  description: string;
};

export default async function BusinessWhyWorkWithMe() {
  const t = await getTranslations("BusinessWhyWorkWithMe");

  const strengths = t.raw("strengths") as Strength[];

  return (
    <Section
      id="about"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <p className="mb-8 max-w-3xl text-base leading-relaxed business-text-muted">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {strengths.map((strength, index) => (
          <Card key={index} className="business-card business-card-interactive h-full p-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                {strength.title}
              </h3>

              <p className="text-sm leading-relaxed business-text-muted">
                {strength.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
