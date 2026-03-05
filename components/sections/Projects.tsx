"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import CardButton from "@/components/ui/CardButton";
import TechTag from "@/components/ui/TechTag";
import { useTheme } from "next-themes";

type Project = {
  key: string;
  roleKey: string;
  tech: string[];
};

// Minimal lookup: re-use the same icons you use in TechStack.
// Anything not found falls back to text-only TechTag (no icon).
const TECH_TAGS: Record<
  string,
  {
    label: string;
    short?: string;
    iconSrc?: string;
    iconLight?: string;
    iconDark?: string;
    iconAlt?: string;
  }
> = {
  // -------------------------
  // Languages
  // -------------------------
  Java: {
    label: "Java",
    short: "J",
    iconLight: "/icons/tech/java-light.svg",
    iconDark: "/icons/tech/java-dark.svg",
  },
  Python: { label: "Python", short: "P", iconSrc: "/icons/tech/python.svg" },
  TypeScript: {
    label: "TypeScript",
    short: "T",
    iconSrc: "/icons/tech/typescript.svg",
  },
  JavaScript: {
    label: "JavaScript",
    short: "J",
    iconSrc: "/icons/tech/javascript.svg",
  },
  SQL: { label: "SQL", short: "S", iconSrc: "/icons/tech/sql.svg" },
  "C++": { label: "C++", short: "C", iconSrc: "/icons/tech/cpp.svg" },

  // -------------------------
  // Backend
  // -------------------------
  Spring: { label: "Spring", short: "S", iconSrc: "/icons/tech/spring.svg" },
  "Spring Boot": {
    label: "Spring Boot",
    short: "S",
    iconSrc: "/icons/tech/spring-boot.svg",
  },
  Hibernate: {
    label: "Hibernate",
    short: "H",
    iconSrc: "/icons/tech/hibernate.svg",
  },
  "Node.js": {
    label: "Node.js",
    short: "N",
    iconSrc: "/icons/tech/nodejs.svg",
  },
  NestJS: { label: "NestJS", short: "N", iconSrc: "/icons/tech/nestjs.svg" },
  "REST APIs": {
    label: "REST APIs",
    short: "R",
    iconSrc: "/icons/tech/rest-api.svg",
  },
  SCIM: {
    label: "SCIM",
    short: "S",
    iconLight: "/icons/tech/scim-light.svg",
    iconDark: "/icons/tech/scim-dark.svg",
  },
  "SCIM APIs": {
    label: "SCIM APIs",
    short: "S",
    iconLight: "/icons/tech/scim-light.svg",
    iconDark: "/icons/tech/scim-dark.svg",
  },
  JUnit: { label: "JUnit", short: "J", iconSrc: "/icons/tech/junit.svg" },
  Mockito: { label: "Mockito", short: "M", iconSrc: "/icons/tech/mockito.png" },

  // Optional backend/security icons (add files if you want)
  JWT: { label: "JWT", short: "J", iconSrc: "/icons/tech/jwt.svg" },
  "Azure AD": {
    label: "Azure AD",
    short: "AD",
    iconSrc: "/icons/tech/azure-ad.svg",
  },

  // -------------------------
  // Frontend
  // -------------------------
  Angular: { label: "Angular", short: "A", iconSrc: "/icons/tech/angular.svg" },
  React: { label: "React", short: "R", iconSrc: "/icons/tech/react.svg" },
  "Next.js": {
    label: "Next.js",
    short: "N",
    iconLight: "/icons/tech/nextjs-light.svg",
    iconDark: "/icons/tech/nextjs-dark.svg",
  },
  "Tailwind CSS": {
    label: "Tailwind CSS",
    short: "T",
    iconSrc: "/icons/tech/tailwind.svg",
  },
  HTML: { label: "HTML", short: "H", iconSrc: "/icons/tech/html.svg" },
  CSS: { label: "CSS", short: "C", iconSrc: "/icons/tech/css.svg" },

  // -------------------------
  // Databases
  // -------------------------
  PostgreSQL: {
    label: "PostgreSQL",
    short: "P",
    iconSrc: "/icons/tech/postgresql.svg",
  },
  MySQL: {
    label: "MySQL",
    short: "M",
    iconLight: "/icons/tech/mysql-light.svg",
    iconDark: "/icons/tech/mysql-dark.svg",
  },
  SQLite: { label: "SQLite", short: "S", iconSrc: "/icons/tech/sqlite.svg" },

  // -------------------------
  // Data / Cloud
  // -------------------------
  Azure: { label: "Azure", short: "A", iconSrc: "/icons/tech/azure.svg" },
  ADX: { label: "ADX", short: "A", iconSrc: "/icons/tech/adx.svg" },
  KQL: { label: "KQL", short: "K", iconSrc: "/icons/tech/kql.svg" },
  Databricks: {
    label: "Databricks",
    short: "D",
    iconSrc: "/icons/tech/databricks.svg",
  },
  AWS: {
    label: "AWS",
    short: "A",
    iconLight: "/icons/tech/aws-light.svg",
    iconDark: "/icons/tech/aws-dark.svg",
  },

  // -------------------------
  // Tools / Infra
  // -------------------------
  Git: { label: "Git", short: "G", iconSrc: "/icons/tech/git.svg" },
  Docker: { label: "Docker", short: "D", iconSrc: "/icons/tech/docker.svg" },
  Linux: { label: "Linux", short: "L", iconSrc: "/icons/tech/linux.svg" },
  Maven: { label: "Maven", short: "M", iconSrc: "/icons/tech/maven.svg" },
  Jira: { label: "Jira", short: "J", iconSrc: "/icons/tech/jira.svg" },

  // -------------------------
  // Scientific / Modeling
  // -------------------------
  MATLAB: { label: "MATLAB", short: "M", iconSrc: "/icons/tech/matlab.svg" },
  NumPy: { label: "NumPy", short: "NP", iconSrc: "/icons/tech/numpy.svg" },
  Matplotlib: {
    label: "Matplotlib",
    short: "MPL",
    iconSrc: "/icons/tech/matplotlib.svg",
  },
  "Statistics Toolbox": {
    label: "Statistics Toolbox",
    short: "ST",
    iconSrc: "/icons/tech/statistics-toolbox.svg",
  },
  "GeNIe Modeler": {
    label: "GeNIe Modeler",
    short: "G",
    iconSrc: "/icons/tech/genie-modeler.svg",
  },

  // -------------------------
  // Speech / Translation
  // -------------------------
  "Azure Cognitive Services": {
    label: "Azure Cognitive Services",
    short: "A",
    iconSrc: "/icons/tech/azure-cognitive-services.svg",
  },
  Whisper: {
    label: "Whisper",
    short: "W",
    iconLight: "/icons/tech/openai-light.svg",
    iconDark: "/icons/tech/openai-dark.svg",
  },
  Vosk: { label: "Vosk", short: "V", iconSrc: "/icons/tech/vosk.png" },
  "Deep-Translator": {
    label: "Deep-Translator",
    short: "DT",
    iconLight: "/icons/tech/deep-translator-light.svg",
    iconDark: "/icons/tech/deep-translator-dark.svg",
  },
  Streamlit: {
    label: "Streamlit",
    short: "S",
    iconSrc: "/icons/tech/streamlit.svg",
  },
};

function toTechTagProps(label: string) {
  return TECH_TAGS[label] ?? { label };
}

type FlowchartConfig = {
  projectKey: string; // kebab-case file base name
  alt: string;
};

const FLOWCHARTS: Record<string, FlowchartConfig> = {
  telemetryPipeline: {
    projectKey: "telemetry-pipeline",
    alt: "Flowchart for Cloud-Based Automotive Telemetry Data Pipeline",
  },
  scimApi: {
    projectKey: "user-provisioning-api",
    alt: "Flowchart for User Provisioning Integration API",
  },
  ecommerce: {
    projectKey: "e-commerce-platform",
    alt: "Flowchart for Full-Stack E-commerce Platform",
  },
  speechTranslation: {
    projectKey: "speech-translation",
    alt: "Flowchart for Real-Time Multilingual Speech Translation System",
  },
  reliabilityModel: {
    projectKey: "reliability-model",
    alt: "Flowchart for Probabilistic Reliability Modeling for Water Treatment",
  },
  trainingLog: {
    projectKey: "training-log-system",
    alt: "Flowchart for Training Log System Management",
  },
  gameTracker: {
    projectKey: "game-library",
    alt: "Flowchart for Game Inventory & Progress Tracker",
  },
};

function buildFlowSrc(
  projectKey: string,
  locale: string,
  mode: "dark" | "light",
) {
  return `/images/projects/${projectKey}-${locale}-${mode}.svg`;
}

export default function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();

  // Theme (dark/light/system)
  const { theme, resolvedTheme } = useTheme();
  const mode = (resolvedTheme ?? theme ?? "dark") as "light" | "dark";

  const projects: Project[] = useMemo(
    () => [
      {
        key: "telemetryPipeline",
        roleKey: "dataEngineer",
        tech: ["Azure", "ADX", "KQL", "Databricks", "Python"],
      },
      {
        key: "scimApi",
        roleKey: "backendEngineer",
        tech: ["Java", "Spring", "Hibernate", "PostgreSQL", "Azure AD", "SCIM"],
      },
      {
        key: "ecommerce",
        roleKey: "fullStackDeveloper",
        tech: [
          "Java",
          "Angular",
          "MySQL",
          "Hibernate",
          "Spring Boot",
          "JWT",
          "Tailwind CSS",
          "Docker",
        ],
      },
      {
        key: "speechTranslation",
        roleKey: "fullStackDeveloper",
        tech: [
          "Azure Cognitive Services",
          "Python",
          "Whisper",
          "Vosk",
          "Deep-Translator",
          "Streamlit",
        ],
      },
      {
        key: "reliabilityModel",
        roleKey: "modelDeveloper",
        tech: ["MATLAB", "Statistics Toolbox", "GeNIe Modeler"],
      },
      {
        key: "trainingLog",
        roleKey: "soloDeveloper",
        tech: ["Python", "SQLite", "NumPy", "PostgreSQL", "Matplotlib", "Git"],
      },
      {
        key: "gameTracker",
        roleKey: "soloDeveloper",
        tech: ["C++", "SQLite", "Git"],
      },
    ],
    [],
  );

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const active = projects.find((p) => p.key === activeKey) ?? null;

  // Lock scroll when modal open
  useEffect(() => {
    if (!activeKey) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeKey]);

  // ESC to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;

      // 1) si hay imagen expandida, cerrarla primero
      if (expandedImage) {
        setExpandedImage(null);
        return;
      }

      // 2) si no, cerrar modal
      setActiveKey(null);
    }

    if (activeKey || expandedImage)
      window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeKey, expandedImage]);

  // Determine whether this project has a flowchart
  const activeFlow = active ? FLOWCHARTS[active.key] : undefined;

  // Build flowchart src for current theme
  const flowSrc =
    activeFlow && active
      ? buildFlowSrc(
          activeFlow.projectKey,
          locale,
          mode === "light" ? "light" : "dark",
        )
      : null;

  const lang = locale.split("-")[0];

  const portfolioHref =
    lang === "es"
      ? "/pdf/Portafolio-Juan-Rodriguez-ES.pdf"
      : lang === "de"
        ? "/pdf/Portfolio-Juan-Rodriguez-DE.pdf"
        : "/pdf/Portfolio-Juan-Rodriguez-EN.pdf";

  return (
    <Section
      id="projects"
      title={t("title")}
      subtitle={t("subtitle")}
      className="pt-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          {t("eyebrow")}
        </p>

        <a href={portfolioHref} target="_blank" rel="noopener noreferrer">
          <Button className="cursor-pointer" variant="secondary">
            {t("download")}
          </Button>
        </a>
      </div>

      <div className="grid -mx-2 gap-4 sm:mx-0 lg:grid-cols-2">
        {projects.map((p) => (
          <CardButton
            key={p.key}
            onClick={() => setActiveKey(p.key)}
            className="cursor-pointer p-4 sm:p-6"
          >
            {/* subtle halo */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200
                group-hover:opacity-100
                bg-[radial-gradient(650px_circle_at_30%_15%,rgba(56,189,248,0.12),transparent_45%)]
              "
            />

            <div className="relative flex flex-col items-center justify-center text-center min-h-[210px] py-12 sm:py-0 sm:pb-20">
              {/* Title – true center of the card */}
              <h3 className="w-full px-2 text-lg font-semibold tracking-tight sm:px-6 sm:text-xl">
                {t(`${p.key}.name`)}
              </h3>

              {/* Tech – anchored below, limited to 2 lines */}
              <div className="relative mt-3 w-[92%] sm:absolute sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2 sm:mt-0">
                <div className="flex flex-wrap justify-center gap-2 max-h-[76px] overflow-hidden">
                  {p.tech.map((tag) => (
                    <TechTag key={tag} size="sm" {...toTechTagProps(tag)} />
                  ))}
                </div>
              </div>

              {/* Hover hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 dark:text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                {t("openHint")}
              </div>
            </div>
          </CardButton>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <>
            {/* Overlay */}
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              aria-label="Close"
              onClick={() => setActiveKey(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
              className="
                fixed left-1/2 top-1/2 z-[61] w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2
                max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl
                dark:border-slate-800 dark:bg-slate-950 scrollbar-hide
              "
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {t("modal.eyebrow")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {t(`${active.key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {t(`roles.${active.roleKey}`)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.tech.map((tag) => (
                      <TechTag
                        key={tag}
                        {...toTechTagProps(tag)}
                        className="text-xs px-3 py-1"
                      />
                    ))}
                  </div>
                </div>

                <Button
                  className="cursor-pointer group flex h-10 w-10 items-center justify-center rounded-xl p-0 sm:h-9 sm:w-auto sm:px-4 sm:py-2"
                  variant="secondary"
                  onClick={() => setActiveKey(null)}
                  aria-label={t("modal.close")}
                >
                  <span className="text-lg transition-transform group-hover:rotate-90 sm:text-base">
                    ✕
                  </span>
                </Button>
              </div>

              {/* Body: left text + optional right flowchart */}
              {/* ✅ CHANGES HERE: md:items-stretch + left self-start + right flex center */}
              <div className="mt-5 grid gap-6 md:grid-cols-[1.2fr_620px] lg:grid-cols-[1.3fr_680px] md:items-stretch">
                {/* Left column */}
                <div className="md:self-start">
                  <p className="text-sm font-semibold">{t("modal.overview")}</p>
                  <p className="mt-3 text-sm leading-normal text-slate-600 dark:text-slate-300">
                    {t(`${active.key}.details`)}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-semibold">
                      {t("modal.highlights")}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {(t.raw(`${active.key}.highlights`) as string[]).map(
                        (h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                            <span>{h}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {/* Right column: Flowchart (theme-aware via file naming) */}
                {activeFlow && flowSrc && (
                  <div className="flex items-center">
                    <div className="w-full overflow-hidden rounded-xl border border-slate-200/60 dark:border-white/10">
                      <img
                        key={flowSrc}
                        src={flowSrc}
                        alt={activeFlow.alt}
                        className="block w-full h-auto translate-y-0.5 sm:translate-y-[5px] cursor-pointer"
                        loading="lazy"
                        onClick={() => setExpandedImage(flowSrc)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-7 flex items-center justify-end gap-3">
                <a
                  href={portfolioHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="cursor-pointer" variant="secondary">
                    {t("download")}
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Expanded flowchart overlay */}
      <AnimatePresence>
        {expandedImage && (
          <>
            {/* Overlay */}
            <motion.button
              type="button"
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md"
              aria-label="Close image"
              onClick={() => setExpandedImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Image */}
            <motion.div
              className="fixed inset-0 z-[71] flex items-center justify-center p-6"
              onClick={() => setExpandedImage(null)}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <img
                src={expandedImage}
                alt=""
                className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedImage(null);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
