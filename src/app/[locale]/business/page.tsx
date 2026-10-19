import BusinessHero from "@/components/business/BusinessHero";
import BusinessProblemsSolutions from "@/components/business/BusinessProblemsSolutions";
import BusinessHowItWorks from "@/components/business/BusinessHowItWorks";
import BusinessWhyWorkWithMe from "@/components/business/BusinessWhyWorkWithMe";
import BusinessContact from "@/components/business/BusinessContact";
import BusinessFooter from "@/components/business/BusinessFooter";
// @ts-expect-error CSS side-effect imports are handled by Next.js.
import "@/styles/business.css";

export default function BusinessPage() {
  return (
    <div className="business-theme min-h-screen">
      <BusinessHero />
      <BusinessProblemsSolutions />
      <BusinessHowItWorks />
      <BusinessWhyWorkWithMe />
      <BusinessContact />
      <BusinessFooter />
    </div>
  );
}
