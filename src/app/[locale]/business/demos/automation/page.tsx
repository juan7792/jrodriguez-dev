import AutomationDemo from "@/components/business/demos/automation/AutomationDemo";
import DemoFooter from "@/components/business/demos/DemoFooter";
// @ts-expect-error CSS side-effect imports are handled by Next.js.
import "@/styles/business.css";

export default function AutomationDemoPage() {
  return (
    <div className="business-theme flex flex-1 flex-col">
      <AutomationDemo />
      <DemoFooter />
    </div>
  );
}