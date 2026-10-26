import BusinessHero from "@/components/business/site/BusinessHero";
import BusinessProblemsSolutions from "@/components/business/site/BusinessProblemsSolutions";
import BusinessHowItWorks from "@/components/business/site/BusinessHowItWorks";
import BusinessWhyWorkWithMe from "@/components/business/site/BusinessWhyWorkWithMe";
import BusinessContact from "@/components/business/site/BusinessContact";
import BusinessFooter from "@/components/business/site/BusinessFooter";
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
