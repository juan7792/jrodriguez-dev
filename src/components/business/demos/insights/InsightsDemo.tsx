"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    categories,
    getInsights,
    SALES_CURRENCY,
    SAMPLE_END_DATE,
    type CategoryFilter,
    type InsightsPeriod,
} from "./insightsData";

const periods: InsightsPeriod[] = ["30d", "6m", "year"];

const panelClass =
    "min-w-0 rounded-xl border border-[#DCE7DE] bg-white p-4";

export default function InsightsDemo() {
    const t = useTranslations("BusinessInsightsDemo");
    const locale = useLocale();

    const [period, setPeriod] = useState<InsightsPeriod>("30d");
    const [category, setCategory] = useState<CategoryFilter>("all");

    const insights = useMemo(
        () => getInsights(period, category),
        [period, category]
    );

    const currencyFormatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: SALES_CURRENCY,
        maximumFractionDigits: 0,
    });

    const averageFormatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: SALES_CURRENCY,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const numberFormatter = new Intl.NumberFormat(locale);

    const percentageFormatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
    });

    const shareFormatter = new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
    });

    const compactFormatter = new Intl.NumberFormat(locale, {
        notation: "compact",
        maximumFractionDigits: 1,
    });

    function money(cents: number) {
        return currencyFormatter.format(cents / 100);
    }

    function formatDate(date: string, monthly = false) {
        return new Intl.DateTimeFormat(locale, {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            ...(monthly ? {} : { day: "numeric" }),
        }).format(new Date(`${date}T00:00:00Z`));
    }

    function formatAxisDate(date: string) {
        return new Intl.DateTimeFormat(locale, {
            timeZone: "UTC",
            month: "short",
            ...(insights.granularity === "day" ? { day: "numeric" } : {}),
        }).format(new Date(`${date}T00:00:00Z`));
    }

    const summaryCards = [
        {
            key: "revenue",
            label: t("totalSales"),
            value: money(insights.summary.revenueCents),
            change: insights.changes.revenue,
        },
        {
            key: "orders",
            label: t("orders"),
            value: numberFormatter.format(insights.summary.orders),
            change: insights.changes.orders,
        },
        {
            key: "average",
            label: t("averageOrder"),
            value: averageFormatter.format(
                insights.summary.averageOrderCents / 100
            ),
            change: insights.changes.averageOrder,
        },
    ];

    const maxCategoryRevenue = Math.max(
        1,
        ...insights.categorySales.map((item) => item.revenueCents)
    );

    const highestProduct = insights.productSales[0];

    const lowestProduct =
        insights.productSales[insights.productSales.length - 1];

    return (
        <main className="business-theme flex-1 bg-[#FAF8F3] px-4 py-5 sm:py-6">
            <div className="mx-auto max-w-7xl space-y-4">
                {/* Heading and compact filters */}
                <header className="space-y-3">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-semibold tracking-tight text-[#20362F]">
                                    {t("title")}
                                </h1>

                                <span className="rounded-full border border-[#C9E5CF] bg-[#E8F4EA] px-2.5 py-1 text-xs font-semibold text-[#287A60]">
                                    {t("sampleBadge")}
                                </span>
                            </div>

                            <p className="mt-1 max-w-xl text-xs leading-relaxed text-[#5B6B61]">
                                {t("description")}
                            </p>
                        </div>

                        <div
                            role="group"
                            aria-label={t("filters")}
                            className="flex shrink-0 flex-wrap items-end gap-3"
                        >
                            <fieldset>
                                <legend className="sr-only">
                                    {t("periodLabel")}
                                </legend>

                                <div className="flex flex-wrap gap-1 rounded-lg border border-[#DCE7DE] bg-white p-1">
                                    {periods.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            aria-pressed={period === option}
                                            onClick={() => setPeriod(option)}
                                            className={`min-h-10 rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287A60] ${period === option
                                                ? "!bg-[#287A60] !text-white"
                                                : "bg-transparent text-[#20362F] hover:bg-[#E8F4EA]"
                                                }`}
                                        >
                                            {t(`periods.${option}`)}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <label
                                    htmlFor="insights-category"
                                    className="sr-only"
                                >
                                    {t("categoryLabel")}
                                </label>

                                <select
                                    id="insights-category"
                                    value={category}
                                    onChange={(event) => {
                                        const selected = categories.find(
                                            (item) => item === event.target.value
                                        );

                                        setCategory(selected ?? "all");
                                    }}
                                    className="min-h-12 max-w-full rounded-lg border border-[#DCE7DE] bg-white px-3 py-2 text-sm text-[#20362F] outline-none focus:border-[#287A60] focus:ring-2 focus:ring-[#287A60]/20"
                                >
                                    <option value="all">
                                        {t("allCategories")}
                                    </option>

                                    {categories.map((item) => (
                                        <option key={item} value={item}>
                                            {t(`categories.${item}`)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-[#5B6B61]">
                        <p className="font-medium text-[#20362F]">
                            {formatDate(insights.ranges.current.start)}
                            {" – "}
                            {formatDate(insights.ranges.current.end)}
                        </p>

                        <p>
                            {t("comparisonRange", {
                                start: formatDate(insights.ranges.previous.start),
                                end: formatDate(insights.ranges.previous.end),
                            })}
                        </p>
                    </div>
                </header>

                {/* Compact summary cards */}
                <section aria-label={t("summaryTitle")}>
                    <div className="grid gap-3 md:grid-cols-3">
                        {summaryCards.map((card) => (
                            <div key={card.key} className={panelClass}>
                                <h2 className="text-xs font-medium text-[#5B6B61]">
                                    {card.label}
                                </h2>

                                <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-[#20362F]">
                                    {card.value}
                                </p>

                                <p
                                    className={`mt-1 text-xs font-semibold ${card.change === null || card.change === 0
                                        ? "text-[#5B6B61]"
                                        : card.change > 0
                                            ? "text-[#287A60]"
                                            : "text-amber-800"
                                        }`}
                                >
                                    {card.change === null
                                        ? t("noComparison")
                                        : t("change", {
                                            value: percentageFormatter.format(card.change),
                                        })}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main chart and category comparison at equal height */}
                <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <section
                        aria-labelledby="insights-timeline-title"
                        className={`${panelClass} flex flex-col`}
                    >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h2
                                id="insights-timeline-title"
                                className="text-base font-semibold text-[#20362F]"
                            >
                                {t("timelineTitle")}
                            </h2>

                            <p className="text-xs text-[#5B6B61]">
                                {t(
                                    insights.granularity === "month"
                                        ? "monthlySales"
                                        : "dailySales"
                                )}
                                {" · "}
                                {SALES_CURRENCY}
                            </p>
                        </div>

                        <p className="sr-only">
                            {t("timelineDescription")}
                        </p>

                        <div className="mt-3 overflow-x-auto">
                            <div className="h-48 min-w-[480px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={insights.timeline}
                                        accessibilityLayer
                                        margin={{
                                            top: 8,
                                            right: 8,
                                            left: 0,
                                            bottom: 4,
                                        }}
                                    >
                                        <CartesianGrid
                                            vertical={false}
                                            stroke="#E6ECE7"
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatAxisDate}
                                            tick={{ fill: "#5B6B61", fontSize: 11 }}
                                            tickLine={false}
                                            axisLine={false}
                                            minTickGap={24}
                                            tickMargin={8}
                                        />

                                        <YAxis
                                            tickFormatter={(value: number) =>
                                                compactFormatter.format(value / 100)
                                            }
                                            tick={{ fill: "#5B6B61", fontSize: 11 }}
                                            tickLine={false}
                                            axisLine={false}
                                            width={52}
                                            domain={[0, "auto"]}
                                        />

                                        <Tooltip
                                            position={{ x: 64, y: 8 }}
                                            isAnimationActive={false}
                                            cursor={{ fill: "#E8F4EA" }}
                                            labelFormatter={(label) =>
                                                formatDate(
                                                    String(label),
                                                    insights.granularity === "month"
                                                )
                                            }
                                            formatter={(value) => [
                                                money(Number(value ?? 0)),
                                                t("totalSales"),
                                            ]}
                                            contentStyle={{
                                                border: "1px solid #287A60",
                                                borderRadius: 12,
                                                backgroundColor: "#FFFFFF",
                                                padding: "12px 16px",
                                                boxShadow: "0 8px 24px rgba(32, 54, 47, 0.2)",
                                            }}
                                            labelStyle={{
                                                color: "#5B6B61",
                                                fontSize: 12,
                                                marginBottom: 6,
                                            }}
                                            itemStyle={{
                                                color: "#287A60",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                padding: 0,
                                            }}
                                        />

                                        <Bar
                                            dataKey="revenueCents"
                                            name={t("totalSales")}
                                            fill="#287A60"
                                            radius={[3, 3, 0, 0]}
                                            maxBarSize={40}
                                            isAnimationActive={false}
                                        />

                                        {insights.highestSales && (
                                            <ReferenceLine
                                                x={insights.highestSales.date}
                                                stroke="#20362F"
                                                strokeDasharray="4 4"
                                            />
                                        )}

                                        {insights.lowestSales &&
                                            insights.lowestSales.date !==
                                            insights.highestSales?.date && (
                                                <ReferenceLine
                                                    x={insights.lowestSales.date}
                                                    stroke="#B7791F"
                                                    strokeDasharray="4 4"
                                                />
                                            )}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Inline extremes instead of separate cards */}
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#DCE7DE] pt-3 text-xs">
                            {insights.highestSales && (
                                <p className="text-[#5B6B61]">
                                    <span className="font-semibold text-[#287A60]">
                                        {t(
                                            insights.granularity === "month"
                                                ? "highestMonth"
                                                : "highestDay"
                                        )}
                                        {": "}
                                        {money(insights.highestSales.revenueCents)}
                                    </span>

                                    {" · "}

                                    {formatDate(
                                        insights.highestSales.date,
                                        insights.granularity === "month"
                                    )}
                                </p>
                            )}

                            {insights.lowestSales && (
                                <p className="text-[#5B6B61]">
                                    <span className="font-semibold text-amber-800">
                                        {t(
                                            insights.granularity === "month"
                                                ? "lowestMonth"
                                                : "lowestDay"
                                        )}
                                        {": "}
                                        {money(insights.lowestSales.revenueCents)}
                                    </span>

                                    {" · "}

                                    {formatDate(
                                        insights.lowestSales.date,
                                        insights.granularity === "month"
                                    )}
                                </p>
                            )}
                        </div>
                    </section>

                    <section
                        aria-labelledby="insights-categories-title"
                        className={`${panelClass} flex flex-col`}
                    >
                        <h2
                            id="insights-categories-title"
                            className="text-base font-semibold text-[#20362F]"
                        >
                            {t("categoryTitle")}
                        </h2>

                        <p className="mt-1 text-xs text-[#5B6B61]">
                            {t("categoryDescription")}
                        </p>

                        <div className="flex flex-1 flex-col justify-center gap-5 py-4">
                            {insights.categorySales.map((item) => {
                                const share =
                                    insights.summary.revenueCents > 0
                                        ? (item.revenueCents /
                                            insights.summary.revenueCents) *
                                        100
                                        : 0;

                                return (
                                    <div key={item.category}>
                                        <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                                            <h3 className="font-medium text-[#20362F]">
                                                {t(`categories.${item.category}`)}
                                            </h3>

                                            <span className="font-semibold text-[#20362F]">
                                                {money(item.revenueCents)}
                                            </span>
                                        </div>

                                        <div
                                            aria-hidden="true"
                                            className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#E8F4EA]"
                                        >
                                            <div
                                                className="h-full rounded-full bg-[#287A60]"
                                                style={{
                                                    width: `${(item.revenueCents / maxCategoryRevenue) *
                                                        100
                                                        }%`,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-1 text-xs text-[#5B6B61]">
                                            {t("salesShare", {
                                                value: shareFormatter.format(share),
                                            })}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Full-width compact product table */}
                <section
                    aria-labelledby="insights-products-title"
                    className={panelClass}
                >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h2
                            id="insights-products-title"
                            className="text-base font-semibold text-[#20362F]"
                        >
                            {t("productsTitle")}
                        </h2>

                        <p className="text-xs text-[#5B6B61]">
                            {t("productsDescription")}
                        </p>
                    </div>

                    <div className="mt-2 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-[#DCE7DE] text-xs text-[#5B6B61]">
                                    <th scope="col" className="py-2 pr-4 font-medium">
                                        {t("product")}
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 py-2 text-right font-medium"
                                    >
                                        {t("orders")}
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 pl-3 text-right font-medium"
                                    >
                                        {t("totalSales")}
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#DCE7DE]">
                                {insights.productSales.map((item) => (
                                    <tr key={item.productId}>
                                        <th
                                            scope="row"
                                            className="py-2 pr-4 font-medium text-[#20362F]"
                                        >
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span>{item.name}</span>

                                                {item.productId ===
                                                    highestProduct?.productId && (
                                                        <span className="rounded-full bg-[#E8F4EA] px-2 py-0.5 text-xs font-normal text-[#287A60]">
                                                            {t("highestRevenue")}
                                                        </span>
                                                    )}

                                                {insights.productSales.length > 1 &&
                                                    item.productId ===
                                                    lowestProduct?.productId && (
                                                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-normal text-amber-800">
                                                            {t("lowestRevenue")}
                                                        </span>
                                                    )}
                                            </div>
                                        </th>

                                        <td className="px-3 py-2 text-right text-[#5B6B61]">
                                            {numberFormatter.format(item.orders)}
                                        </td>

                                        <td className="whitespace-nowrap py-2 pl-3 text-right font-semibold text-[#20362F]">
                                            {money(item.revenueCents)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs leading-relaxed text-[#5B6B61]">
                    <p>{t("sampleNote")}</p>

                    <p>
                        {t("sampleReference", {
                            date: formatDate(SAMPLE_END_DATE),
                        })}
                    </p>
                </div>
            </div>
        </main>
    );
}