import type { ReactNode } from "react";
import Container from "./Container";

/**
 * Section component that provides consistent vertical spacing,
 * semantic headers, and uses the Container component for alignment.
 */
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
  // Section-level spacing and scroll behavior
  const sectionClasses = [
    "scroll-mt-8", // Offset for sticky navigation
    "py-14 sm:py-20", // Vertical padding scale
    className, // Backgrounds or extra borders from parent
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClasses}>
      <Container className={containerClassName}>
        {/* Conditional rendering of the section header */}
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

        {/* Section content */}
        {children}
      </Container>
    </section>
  );
}
