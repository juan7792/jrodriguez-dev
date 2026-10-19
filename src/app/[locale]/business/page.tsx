import BusinessHero from "@/components/business/BusinessHero";
import BusinessProblemsSolutions from "@/components/business/BusinessProblemsSolutions";
import BusinessHowItWorks from "@/components/business/BusinessHowItWorks";

export default function BusinessPage() {
  return (
    <main id="top">
      <BusinessHero />
      <BusinessProblemsSolutions />
      <BusinessHowItWorks />
    </main>
  );
}
