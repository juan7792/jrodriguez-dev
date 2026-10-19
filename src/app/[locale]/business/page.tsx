import BusinessHero from "@/components/business/BusinessHero";
import BusinessProblemsSolutions from "@/components/business/BusinessProblemsSolutions";
import BusinessHowItWorks from "@/components/business/BusinessHowItWorks";
import BusinessWhyWorkWithMe from "@/components/business/BusinessWhyWorkWithMe";
import BusinessContact from "@/components/business/BusinessContact";
import BusinessFooter from "@/components/business/BusinessFooter";

export default function BusinessPage() {
  return (
    <main id="top">
      <BusinessHero />
      <BusinessProblemsSolutions />
      <BusinessHowItWorks />
      <BusinessWhyWorkWithMe />
      <BusinessContact />
      <BusinessFooter />
    </main>
  );
}
