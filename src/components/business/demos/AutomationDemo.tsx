"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AutomationDemoWelcome from "./AutomationDemoWelcome";

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [guidedMode, setGuidedMode] = useState(false);
  type ProcessingStatus = "idle" | "processing" | "completed" | "resetting";

  const [status, setStatus] = useState<ProcessingStatus>("idle");

  const [corrections, setCorrections] = useState({
    customer: "",
    quantity: "",
  });

  const [currentOrders, setCurrentOrders] = useState<Order[]>(orders);

  const processed = status === "completed" || status === "resetting";
  const showHighlights = processed;


  
  useEffect(() => {
    if (status !== "processing" && status !== "resetting") return;

    const timer = window.setTimeout(() => {
      if (status === "resetting") {
        setCurrentOrders(orders);
        setCorrections({
          customer: "",
          quantity: "",
        });
        setStatus("idle");
      } else {
        setStatus("completed");
      }
    }, status === "processing" ? 1000 : 200);

    return () => window.clearTimeout(timer);
  }, [status]);

  function handleProcess() {
    if (status === "completed") {
      setStatus("resetting");
    } else if (status === "idle") {
      setStatus("processing");
    }
  }

  function handleCustomerChange(value: string) {
    if (value.length > 50) return;

    setCorrections((previous) => ({
      ...previous,
      customer: value,
    }));
  }

  function handleQuantityChange(value: string) {
    if (value !== "" && !/^[1-9]\d{0,3}$/.test(value)) return;

    setCorrections((previous) => ({
      ...previous,
      quantity: value,
    }));
  }

  
  function handleReprocess() {
    if (status !== "completed" || !customerValid || !quantityValid) return;

    setCurrentOrders((previous) =>
      previous.map((order) => {
        if (order.id === "ORD-003") {
          return {
            ...order,
            customer: corrections.customer.trim(),
          };
        }

        if (order.id === "ORD-005") {
          return {
            ...order,
            quantity: Number(corrections.quantity),
          };
        }

        return order;
      })
    );

    setStatus("processing");
  }

  const customerValid =
    corrections.customer.trim().length > 0 &&
    corrections.customer.trim().length <= 50;

  const quantityValid =
    /^[1-9]\d{0,3}$/.test(corrections.quantity);

  const results = currentOrders.map((order) => ({
    order,
    issues: getOrderIssues(order),
  }));

  const readyCount = results.filter(
    (result) => result.issues.length === 0
  ).length;

  const attentionCount = orders.length - readyCount;

  return (
    <main className="business-theme flex-1 bg-[#FAF8F3] px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Desktop: table and results side by side */}
        <div
          className={`grid grid-cols-1 items-stretch gap-4
            transition-opacity duration-200 ease-in-out
            xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]
            ${status === "resetting" ? "opacity-0" : "opacity-100"}
          `}
        >

          {/* Left panel: Orders */}
          <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#DCE7DE] bg-white">

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
                        {order.id === "ORD-003" && showHighlights ? (
                          <span className={`inline-block rounded px-2 py-1 font-medium ${
                            issues.includes("missingCustomer")
                              ? "bg-amber-100 text-amber-900"
                              : "bg-[#E8F4EA] text-[#287A60]"
                          }`}>
                            {order.customer || "—"}
                          </span>
                        ) : (
                          order.customer || "—"
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {order.product}
                      </td>

                      <td className="px-4 py-4">
                        {order.id === "ORD-005" && showHighlights ? (
                          <span className={`inline-block rounded px-2 py-1 font-medium ${
                            issues.includes("invalidQuantity")
                              ? "bg-amber-100 text-amber-900"
                              : "bg-[#E8F4EA] text-[#287A60]"
                          }`}>
                            {order.quantity}
                          </span>
                        ) : (
                          order.quantity
                        )}
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
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#DCE7DE] px-6 py-4">
              <p className="text-xs text-[#5B6B61]">
                {t("sampleOrders", { count: orders.length })}
              </p>
          
              <button
                type="button"
                onClick={handleProcess}
                disabled={status === "processing" || status === "resetting"}
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
                    : status === "resetting"
                      ? t("resetting")
      : t("reset")}
              </button>
            </div>
          </div>

          {/* Right panel: Processing Results */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#DCE7DE] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#20362F]">
              {t("resultsTitle")}
            </h2>

            
            {status === "completed" || status === "resetting" ? (
              <div className="flex flex-1 flex-col">
                {/* Summary */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#E8F4EA] px-4 py-3">
                    <p className="text-3xl font-bold text-[#287A60]">
                      {readyCount}
                    </p>
                    <p className="mt-1 text-sm text-[#20362F]">
                      {t("readyCount")}
                    </p>
                  </div>

                  <div className="rounded-lg bg-amber-50 px-4 py-3">
                    <p className="text-3xl font-bold text-amber-800">
                      {attentionCount}
                    </p>
                    <p className="mt-1 text-sm text-[#20362F]">
                      {t("attentionCount")}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#5B6B61]">
                  {attentionCount > 0
                    ? t("resultsDescription")
                    : t("allReady")}
                </p>

                {attentionCount > 0 && (
                  <div className="mt-3 space-y-2">
                    {results
                      .filter(({ issues }) => issues.length > 0)
                      .map(({ order, issues }) => (
                        <div
                          key={order.id}
                          className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3"
                        >
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="shrink-0 font-semibold text-[#20362F]">
                              {order.id}
                            </span>
                            {issues.map((issue) => (
                              <span key={issue} className="text-xs text-amber-800">
                                {t(issue)}
                              </span>
                            ))}
                          </div>
                          
                          {order.id === "ORD-003" && (
                            <input
                              type="text"
                              value={corrections.customer}
                              maxLength={50}
                              onChange={(e) => handleCustomerChange(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleReprocess();
                                }
                              }}
                              placeholder="Enter customer name"
                              aria-label="Customer name for ORD-003"
                              className="mt-2 w-full rounded-lg border border-[#DCE7DE] bg-white px-3 py-2 text-sm text-[#20362F] outline-none focus:border-[#287A60]"
                            />
                          )}

                          {order.id === "ORD-005" && (
                            <input
                              type="text"
                              inputMode="numeric"
                              value={corrections.quantity}
                              onChange={(e) => handleQuantityChange(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleReprocess();
                                }
                              }}
                              placeholder="Enter quantity (1–9999)"
                              aria-label="Quantity for ORD-005"
                              className="mt-2 w-full rounded-lg border border-[#DCE7DE] bg-white px-3 py-2 text-sm text-[#20362F] outline-none focus:border-[#287A60]"
                            />
                          )}

                        </div>
                      ))}
                  </div>
                )}

                {attentionCount > 0 && (
                  <div className="mt-auto flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleReprocess}
                      disabled={!customerValid || !quantityValid}
                      className="inline-flex min-h-11 w-44 items-center justify-center gap-2 rounded-lg !bg-[#287A60] px-4 text-sm font-semibold !text-white transition-colors hover:!bg-[#20664E] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {t("reprocess")} →
                    </button>
                  </div>
                )}
              </div>
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
      {showWelcome && (
        <AutomationDemoWelcome
          onStartGuided={() => {
            setGuidedMode(true);
            setShowWelcome(false);
          }}
          onExploreFreely={() => {
            setGuidedMode(false);
            setShowWelcome(false);
          }}
        />
      )}
    </main>
  );
}
