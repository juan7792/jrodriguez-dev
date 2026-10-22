
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Order = {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
};

const orders: Order[] = [
  { id: "ORD-001", customer: "Acme Corp", product: "Laptop", quantity: 2, unitPrice: 850 },
  { id: "ORD-002", customer: "Bright Studio", product: "Monitor", quantity: 3, unitPrice: 240 },
  { id: "ORD-003", customer: "", product: "Keyboard", quantity: 5, unitPrice: 45 },
  { id: "ORD-004", customer: "Acme Corp", product: "Laptop", quantity: 2, unitPrice: 850 },
  { id: "ORD-005", customer: "North Labs", product: "Mouse", quantity: -2, unitPrice: 30 },
  { id: "ORD-006", customer: "Green Tech", product: "Monitor", quantity: 4, unitPrice: 240 },
];

function getOrderIssues(order: Order) {
  const issues: Array<"missingCustomer" | "invalidQuantity"> = [];

  if (!order.customer.trim()) {
    issues.push("missingCustomer");
  }

  if (!Number.isFinite(order.quantity) || order.quantity <= 0) {
    issues.push("invalidQuantity");
  }

  return issues;
}

export default function AutomationDemo() {
  const t = useTranslations("BusinessAutomationDemo");
  type ProcessingStatus = "idle" | "processing" | "completed";

  const [status, setStatus] = useState<ProcessingStatus>("idle");

  const processed = status === "completed";

  useEffect(() => {
    if (status !== "processing") return;

    const timer = window.setTimeout(() => {
      setStatus("completed");
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [status]);

  function handleProcess() {
    if (status === "completed") {
      setStatus("idle");
    } else if (status === "idle") {
      setStatus("processing");
    }
  }

  const results = orders.map((order) => ({
    order,
    issues: getOrderIssues(order),
  }));

  const readyCount = results.filter(
    (result) => result.issues.length === 0
  ).length;

  const attentionCount = orders.length - readyCount;

  return (
    <main className="business-theme min-h-screen bg-[#FAF8F3] px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Desktop: table and results side by side */}
        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">

          {/* Left panel: Orders */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-[#DCE7DE] bg-white">

            {/* Header */}
            <div className="border-b border-[#DCE7DE] p-6">
              <h1 className="text-xl font-semibold text-[#20362F]">
                {t("title")}
              </h1>

              <p className="mt-2 text-sm text-[#5B6B61]">
                {t("description")}
              </p>
            </div>

            {/* Orders table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F5F7F4] text-[#20362F]">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      {t("orderId")}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {t("customer")}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {t("product")}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {t("quantity")}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold">
                      {t("unitPrice")}
                    </th>
                    {processed && (
                      <th className="px-4 py-3 font-semibold">
                        {t("status")}
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#DCE7DE]">
                  {results.map(({ order, issues }) => (
                    <tr
                      key={order.id}
                      className="text-[#20362F] transition-colors hover:bg-[#FAF8F3]"
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                        {order.id}
                      </td>

                      <td className="px-4 py-4">
                        {order.customer || "—"}
                      </td>

                      <td className="px-4 py-4">
                        {order.product}
                      </td>

                      <td className="px-4 py-4">
                        {order.quantity}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        ${order.unitPrice.toFixed(2)}
                      </td>

                      {processed && (
                        <td className="whitespace-nowrap px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              issues.length === 0
                                ? "bg-[#E8F4EA] text-[#287A60]"
                                : "bg-amber-50 text-amber-800"
                            }`}
                          >
                            {issues.length === 0
                              ? t("ready")
                              : t("needsAttention")}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Processing controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#DCE7DE] px-6 py-4">
              <p className="text-xs text-[#5B6B61]">
                {t("sampleOrders", { count: orders.length })}
              </p>

              <button
                type="button"
                onClick={handleProcess}
                disabled={status === "processing"}
                className="inline-flex min-h-11 w-44 cursor-pointer items-center justify-center gap-2 rounded-lg !bg-[#287A60] px-4 text-sm font-semibold !text-white transition-colors hover:!bg-[#20664E] disabled:cursor-wait disabled:opacity-80"
              >
                {status === "processing" && (
                  <Image
                    src="/icons/business/loader-circle.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="animate-spin"
                  />
                )}

                {status === "idle"
                  ? `${t("process")} →`
                  : status === "processing"
                    ? t("processing")
                    : t("reset")}
              </button>
            </div>
          </div>

          {/* Right panel: Processing Results */}
          <div className="min-w-0 rounded-xl border border-[#DCE7DE] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#20362F]">
              {t("resultsTitle")}
            </h2>

            
            {status === "completed" ? (
              <>
                {/* Summary */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#E8F4EA] p-4">
                    <p className="text-3xl font-bold text-[#287A60]">
                      {readyCount}
                    </p>
                    <p className="mt-2 text-sm text-[#20362F]">
                      {t("readyCount")}
                    </p>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4">
                    <p className="text-3xl font-bold text-amber-800">
                      {attentionCount}
                    </p>
                    <p className="mt-2 text-sm text-[#20362F]">
                      {t("attentionCount")}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-[#5B6B61]">
                  {attentionCount > 0
                    ? t("resultsDescription")
                    : t("allReady")}
                </p>

                {attentionCount > 0 && (
                  <div className="mt-4 space-y-3">
                    {results
                      .filter(({ issues }) => issues.length > 0)
                      .map(({ order, issues }) => (
                        <div
                          key={order.id}
                          className="rounded-lg border border-amber-200 bg-amber-50/50 p-4"
                        >
                          <p className="font-semibold text-[#20362F]">
                            {order.id}
                          </p>

                          {issues.map((issue) => (
                            <p
                              key={issue}
                              className="mt-1 text-sm text-[#5B6B61]"
                            >
                              {t(issue)}
                            </p>
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </>
            ) : status === "processing" ? (
              <div
                role="status"
                className="flex flex-col items-center gap-4 py-12 text-center"
              >
                <Image
                  src="/icons/business/loader-circle.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="animate-spin"
                />

                <p className="text-sm font-medium text-[#20362F]">
                  {t("processingMessage")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <Image
                  src="/icons/business/search.svg"
                  alt=""
                  width={40}
                  height={40}
                />

                <p className="font-semibold text-[#20362F]">
                  {t("readyToCheck")}
                </p>

                <p className="max-w-xs text-sm leading-relaxed text-[#5B6B61]">
                  {t("initialInstructions")}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
