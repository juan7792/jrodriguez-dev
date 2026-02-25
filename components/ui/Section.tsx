import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export default function Section({
  children,
  title,
  subtitle,
  className = "",
  containerClassName = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-8 py-14 sm:py-20 ${className}`}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <header className="mb-10 sm:mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
