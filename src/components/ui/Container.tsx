import type { ReactNode, JSX } from "react";

/**
 * Standardized layout wrapper to keep content centered and padded
 * across different screen sizes.
 */
type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export default function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  // Centralized layout constraints
  const combinedClasses = [
    "mx-auto w-full max-w-5xl", // Centering and width
    "px-4 sm:px-6", // Responsive horizontal padding
    className, // Custom overrides
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={combinedClasses}>{children}</Component>;
}
