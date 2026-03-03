"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import TechTag from "@/components/ui/TechTag";

type StackCategory = {
  key: string;
  items: {
    label: string;
    short?: string;
    iconSrc?: string;
    iconLight?: string;
    iconDark?: string;
    iconAlt?: string;
  }[];
};

export default function TechStack() {
  const t = useTranslations("TechStack");

  const categories: StackCategory[] = [
    {
      key: "languages",
      items: [
        {
          label: "Java",
          short: "J",
          iconLight: "/icons/tech/java-light.svg",
          iconDark: "/icons/tech/java-dark.svg",
        },
        { label: "Python", short: "P", iconSrc: "/icons/tech/python.svg" },
        {
          label: "TypeScript",
          short: "T",
          iconSrc: "/icons/tech/typescript.svg",
        },
        {
          label: "JavaScript",
          short: "J",
          iconSrc: "/icons/tech/javascript.svg",
        },
        { label: "SQL", short: "S", iconSrc: "/icons/tech/sql.svg" },
      ],
    },
    {
      key: "backend",
      items: [
        { label: "Spring", short: "S", iconSrc: "/icons/tech/spring.svg" },
        {
          label: "Spring Boot",
          short: "S",
          iconSrc: "/icons/tech/spring-boot.svg",
        },
        {
          label: "Hibernate",
          short: "H",
          iconSrc: "/icons/tech/hibernate.svg",
        },
        { label: "Node.js", short: "N", iconSrc: "/icons/tech/nodejs.svg" },
        { label: "NestJS", short: "N", iconSrc: "/icons/tech/nestjs.svg" },
        { label: "REST", short: "R", iconSrc: "/icons/tech/rest-api.svg" },
        {
          label: "SCIM",
          short: "S",
          iconLight: "/icons/tech/scim-light.svg",
          iconDark: "/icons/tech/scim-dark.svg",
        },
        {
          label: "JUnit",
          short: "J",
          iconSrc: "/icons/tech/junit.svg",
        },
        { label: "Mockito", short: "M", iconSrc: "/icons/tech/mockito.png" },
      ],
    },
    {
      key: "dataCloud",
      items: [
        { label: "Azure", short: "A", iconSrc: "/icons/tech/azure.svg" },
        {
          label: "Azure Data Explorer (ADX)",
          short: "A",
          iconSrc: "/icons/tech/adx.svg",
        },
        { label: "KQL", short: "K", iconSrc: "/icons/tech/kql.svg" },
        {
          label: "Databricks",
          short: "D",
          iconSrc: "/icons/tech/databricks.svg",
        },
        {
          label: "AWS",
          short: "A",
          iconLight: "/icons/tech/aws-light.svg",
          iconDark: "/icons/tech/aws-dark.svg",
        },
      ],
    },
    {
      key: "ai",
      items: [
        {
          label: "Azure Cognitive Services",
          short: "A",
          iconSrc: "/icons/tech/azure-cognitive-services.svg",
        },
        {
          label: "Whisper",
          short: "W",
          iconLight: "/icons/tech/openai-light.svg",
          iconDark: "/icons/tech/openai-dark.svg",
        },
        {
          label: "Vosk",
          short: "V",
          iconSrc: "/icons/tech/vosk.png",
        },
        {
          label: "MATLAB Statistics Toolbox",
          short: "MST",
          iconSrc: "/icons/tech/statistics-toolbox.svg",
        },
        {
          label: "GeNIe Modeler",
          short: "G",
          iconSrc: "/icons/tech/genie-modeler.svg",
        },
        {
          label: "OpenAI API",
          short: "O",
          iconLight: "/icons/tech/openai-light.svg",
          iconDark: "/icons/tech/openai-dark.svg",
        },
      ],
    },
    {
      key: "databases",
      items: [
        {
          label: "PostgreSQL",
          short: "P",
          iconSrc: "/icons/tech/postgresql.svg",
        },
        {
          label: "MySQL",
          short: "M",
          iconLight: "/icons/tech/mysql-light.svg",
          iconDark: "/icons/tech/mysql-dark.svg",
        },
        { label: "SQLite", short: "S", iconSrc: "/icons/tech/sqlite.svg" },
      ],
    },
    {
      key: "frontend",
      items: [
        { label: "Angular", short: "A", iconSrc: "/icons/tech/angular.svg" },
        { label: "React", short: "R", iconSrc: "/icons/tech/react.svg" },
        {
          label: "Next.js",
          short: "N",
          iconLight: "/icons/tech/nextjs-light.svg",
          iconDark: "/icons/tech/nextjs-dark.svg",
        },
        {
          label: "Tailwind CSS",
          short: "T",
          iconSrc: "/icons/tech/tailwind.svg",
        },
        { label: "HTML", short: "H", iconSrc: "/icons/tech/html.svg" },
        { label: "CSS", short: "C", iconSrc: "/icons/tech/css.svg" },
      ],
    },
    {
      key: "toolsInfra",
      items: [
        { label: "Git", short: "G", iconSrc: "/icons/tech/git.svg" },
        { label: "Docker", short: "D", iconSrc: "/icons/tech/docker.svg" },
        { label: "Linux", short: "L", iconSrc: "/icons/tech/linux.svg" },
        { label: "Maven", short: "M", iconSrc: "/icons/tech/maven.svg" },
        { label: "Jira", short: "J", iconSrc: "/icons/tech/jira.svg" },
      ],
    },
  ];

  return (
    <Section
      id="tech"
      title={t("title")}
      subtitle={t("subtitle")}
      className="py-16 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/60 dark:border-white/5"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {t("eyebrow")}
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {categories.map((cat) => (
          <Card key={cat.key} className="p-5 sm:p-6">
            <h3 className="mb-3 text-sm font-semibold tracking-tight">
              {t(`categories.${cat.key}`)}
            </h3>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <TechTag key={item.label} {...item} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
