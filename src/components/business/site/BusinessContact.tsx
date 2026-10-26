
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default async function BusinessContact() {
  const t = await getTranslations("BusinessContact");

  const email = "juanm.rodriguez.dev@gmail.com";
  const linkedin = "https://linkedin.com/in/j-rodriguez-lvv";

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    t("emailSubject")
  )}`;

  return (
    <Section
      id="contact"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Email contact */}
        <Card
          hover
          className="business-card business-card-interactive h-full p-6 sm:p-8"
        >
          <div className="flex h-full flex-col items-start gap-4">
            <Image
              src="/icons/business/message-circle.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0"
            />

            <h3 className="text-xl font-semibold">
              Let's get started
            </h3>

            <p className="business-text-muted text-sm leading-relaxed">
              Tell me a little about your project, and we'll take it from there.
            </p>

            <a
              href={mailtoHref}
              className="business-button mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors"
            >
              Tell me about your project
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Card>

        {/* LinkedIn contact */}
        <Card
          hover
          className="business-card business-card-interactive h-full p-6 sm:p-8"
        >
          <div className="flex h-full flex-col items-start gap-4">
            <Image
              src="/icons/business/linkedin.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0"
            />

            <h3 className="text-xl font-semibold">
              Prefer to connect?
            </h3>

            <p className="business-text-muted text-sm leading-relaxed">
              You can also reach out directly through LinkedIn.
            </p>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-sm font-semibold text-[#287A60] underline-offset-4 transition-colors hover:text-[#20664E] hover:underline"
            >
              Connect on LinkedIn →
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
}
