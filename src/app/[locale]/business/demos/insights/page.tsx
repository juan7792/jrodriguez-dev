import InsightsDemo from "@/components/business/demos/insights/InsightsDemo";
import DemoFooter from "@/components/business/demos/DemoFooter";

// @ts-expect-error CSS side-effect imports are handled by Next.js.
import "@/styles/business.css";

export default function InsightsDemoPage() {
  return (
    <div className="business-theme flex flex-1 flex-col">
      <InsightsDemo />
      <DemoFooter />
    </div>
  );
}