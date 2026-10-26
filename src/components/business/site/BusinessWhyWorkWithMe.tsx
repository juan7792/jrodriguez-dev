import { getTranslations } from "next-intl/server";
import Image from "next/image";

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
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[240px_1fr]">
        {/* Photo */}
        <div className="mx-auto w-full max-w-[240px] lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#DCE7DE] bg-[#E8F4EA]">
            <Image
              src="/images/business/profile.jpg"
              alt="Juan Rodriguez"
              fill
              sizes="(max-width: 1024px) 240px, 240px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Strength cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {strengths.map((strength, index) => (
            <Card
              key={index}
              className="business-card business-card-interactive h-full min-h-[240px] p-6"
            >
              <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                <h3 className="text-xl font-bold text-[#287A60]">
                  {strength.title}
                </h3>

                <p className="business-text-muted text-sm leading-relaxed">
                  {strength.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </Section>
  );
}