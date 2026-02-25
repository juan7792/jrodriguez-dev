"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Card from "../ui/Card";

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="py-3">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="mt-1 inline-block text-sm font-medium text-slate-900 underline-offset-4 hover:underline
                   dark:text-slate-100"
      >
        {value}
      </a>
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("Contact");

  // TODO: Reemplaza estos valores por los tuyos reales:
  const email = "juanm.rodriguez.dev@gmail.com";
  const linkedin = "linkedin.com/in/j-rodriguez-lvv/";
  const github = "github.com/juan7792";

  return (
    <Section
      id="contact"
      title={t("title")}
      subtitle={t("subtitle")}
      className="py-16 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/60 dark:border-white/5"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {t("eyebrow")}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          className="rounded-xl border border-slate-200 bg-white/60 p-5 sm:p-6 backdrop-blur
                     dark:border-slate-800 dark:bg-slate-950/40"
        >
          <h3 className="text-base font-semibold tracking-tight">
            {t("direct.title")}
          </h3>

          <div className="mt-4 divide-y divide-slate-200/60 dark:divide-slate-800/60">
            <ContactRow label="Email" value={email} href={`mailto:${email}`} />
            <ContactRow
              label="LinkedIn"
              value={linkedin}
              href={`https://${linkedin}`}
            />
            <ContactRow
              label="GitHub"
              value={github}
              href={`https://${github}`}
            />
          </div>

          <p className="mt-6 text-sm leading-normal text-slate-500 dark:text-slate-400">
            {t("direct.note")}
          </p>
        </Card>

        <Card
          className="rounded-xl border border-slate-200 bg-white/60 p-5 sm:p-6 backdrop-blur
                     dark:border-slate-800 dark:bg-slate-950/40"
        >
          <h3 className="text-base font-semibold tracking-tight">
            {t("message.title")}
          </h3>

          <p className="mt-3 text-sm leading-normal text-slate-500 dark:text-slate-400">
            {t("message.body")}
          </p>

          <ul className="mt-5 space-y-2 text-sm leading-normal text-slate-500 dark:text-slate-400">
            {(t.raw("message.bullets") as string[]).map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <a href={`mailto:${email}`}>
              <Button>{t("message.cta")}</Button>
            </a>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            {t("message.small")}
          </p>
        </Card>
      </div>
    </Section>
  );
}
