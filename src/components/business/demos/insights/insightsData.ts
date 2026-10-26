export type InsightsPeriod = "30d" | "6m" | "year";

export type SalesCategory =
    | "electronics"
    | "office"
    | "accessories";

export type CategoryFilter = "all" | SalesCategory;

export type Product = {
    id: string;
    name: string;
    category: SalesCategory;
    unitPriceCents: number;
};

// Each record represents one product's sales on one day.
// Orders are separate purchases; revenue includes all units sold.
export type SalesRecord = {
    date: string;
    productId: string;
    category: SalesCategory;
    orders: number;
    revenueCents: number;
};

export const SAMPLE_YEAR = 2025;
export const SAMPLE_END_DATE = `${SAMPLE_YEAR}-12-31`;
export const SALES_CURRENCY = "USD";

export const categories: SalesCategory[] = [
    "electronics",
    "office",
    "accessories",
];

export const products: Product[] = [
    {
        id: "laptop",
        name: "Laptop",
        category: "electronics",
        unitPriceCents: 85000,
    },
    {
        id: "monitor",
        name: "Monitor",
        category: "electronics",
        unitPriceCents: 24000,
    },
    {
        id: "keyboard",
        name: "Keyboard",
        category: "office",
        unitPriceCents: 4500,
    },
    {
        id: "desk-lamp",
        name: "Desk Lamp",
        category: "office",
        unitPriceCents: 6500,
    },
    {
        id: "mouse",
        name: "Mouse",
        category: "accessories",
        unitPriceCents: 3000,
    },
    {
        id: "usb-hub",
        name: "USB Hub",
        category: "accessories",
        unitPriceCents: 5500,
    },
];

const DAY_MS = 24 * 60 * 60 * 1000;

// Fixed patterns keep the sample data identical on every visit.
const monthlyDemand = [
    0.8, 0.85, 0.95, 1, 1.05, 0.95,
    0.85, 0.9, 1.1, 1.15, 1.5, 1.35,
];

const baseDailyOrders = [2, 4, 7, 3, 9, 5];

function createSampleSales(): SalesRecord[] {
    const records: SalesRecord[] = [];

    const start = Date.UTC(SAMPLE_YEAR - 1, 0, 1);
    const end = Date.UTC(SAMPLE_YEAR, 11, 31);

    for (
        let timestamp = start, dayIndex = 0;
        timestamp <= end;
        timestamp += DAY_MS, dayIndex += 1
    ) {
        const date = new Date(timestamp);
        const dateKey = date.toISOString().slice(0, 10);

        const yearGrowth =
            date.getUTCFullYear() === SAMPLE_YEAR ? 1.12 : 1;

        const weekday = date.getUTCDay();
        const weekdayDemand =
            weekday === 0 ? 0.6 : weekday === 6 ? 0.75 : 1;

        products.forEach((product, productIndex) => {
            const variation =
                0.7 + ((dayIndex * 17 + productIndex * 13) % 11) / 10;

            const orders = Math.max(
                0,
                Math.round(
                    baseDailyOrders[productIndex] *
                    monthlyDemand[date.getUTCMonth()] *
                    weekdayDemand *
                    yearGrowth *
                    variation
                )
            );

            const extraUnits =
                orders === 0
                    ? 0
                    : (dayIndex + productIndex) % (orders + 1);

            const unitsSold = orders + extraUnits;

            records.push({
                date: dateKey,
                productId: product.id,
                category: product.category,
                orders,
                revenueCents: unitsSold * product.unitPriceCents,
            });
        });
    }

    return records;
}

export const salesData: SalesRecord[] = createSampleSales();

export type DateRange = {
    start: string;
    end: string;
};

export type SalesSummary = {
    revenueCents: number;
    orders: number;
    averageOrderCents: number;
};

export type SalesTotals = {
    revenueCents: number;
    orders: number;
};

export type SalesChartPoint = SalesTotals & {
    date: string;
};

export type CategorySales = SalesTotals & {
    category: SalesCategory;
};

export type ProductSales = SalesTotals & {
    productId: string;
    name: string;
    category: SalesCategory;
};

function toDateKey(timestamp: number): string {
    return new Date(timestamp).toISOString().slice(0, 10);
}

function toTimestamp(date: string): number {
    return Date.parse(`${date}T00:00:00Z`);
}

// Annual comparisons use calendar years.
// Shorter periods use the same number of days immediately before.
export function getPeriodRanges(period: InsightsPeriod): {
    current: DateRange;
    previous: DateRange;
} {
    if (period === "year") {
        return {
            current: {
                start: `${SAMPLE_YEAR}-01-01`,
                end: SAMPLE_END_DATE,
            },
            previous: {
                start: `${SAMPLE_YEAR - 1}-01-01`,
                end: `${SAMPLE_YEAR - 1}-12-31`,
            },
        };
    }

    if (period === "6m") {
        return {
            current: {
                start: `${SAMPLE_YEAR}-07-01`,
                end: SAMPLE_END_DATE,
            },
            previous: {
                start: `${SAMPLE_YEAR}-01-01`,
                end: `${SAMPLE_YEAR}-06-30`,
            },
        };
    }

    const end = toTimestamp(SAMPLE_END_DATE);
    const start = end - 29 * DAY_MS;
    const previousEnd = start - DAY_MS;
    const previousStart = previousEnd - 29 * DAY_MS;

    return {
        current: {
            start: toDateKey(start),
            end: toDateKey(end),
        },
        previous: {
            start: toDateKey(previousStart),
            end: toDateKey(previousEnd),
        },
    };
}

export function filterSales(
    range: DateRange,
    category: CategoryFilter = "all"
): SalesRecord[] {
    return salesData.filter(
        (record) =>
            record.date >= range.start &&
            record.date <= range.end &&
            (category === "all" || record.category === category)
    );
}

export function calculateSummary(
    records: SalesRecord[]
): SalesSummary {
    const totals = records.reduce<SalesTotals>(
        (summary, record) => ({
            revenueCents: summary.revenueCents + record.revenueCents,
            orders: summary.orders + record.orders,
        }),
        {
            revenueCents: 0,
            orders: 0,
        }
    );

    return {
        ...totals,
        averageOrderCents:
            totals.orders > 0
                ? totals.revenueCents / totals.orders
                : 0,
    };
}

// Returns percentage points: 12 means a 12% increase.
// A zero baseline cannot produce a meaningful percentage increase.
export function calculatePercentageChange(
    current: number,
    previous: number
): number | null {
    if (previous === 0) {
        return current === 0 ? 0 : null;
    }

    return ((current - previous) / previous) * 100;
}

// Include every day or month, even when its sales total is zero.
export function buildSalesTimeline(
    records: SalesRecord[],
    range: DateRange,
    granularity: "day" | "month"
): SalesChartPoint[] {
    const buckets = new Map<string, SalesChartPoint>();

    const start = toTimestamp(range.start);
    const end = toTimestamp(range.end);

    for (
        let timestamp = start;
        timestamp <= end;
        timestamp += DAY_MS
    ) {
        const date = toDateKey(timestamp);
        const key =
            granularity === "month"
                ? `${date.slice(0, 7)}-01`
                : date;

        if (!buckets.has(key)) {
            buckets.set(key, {
                date: key,
                revenueCents: 0,
                orders: 0,
            });
        }
    }

    for (const record of records) {
        const key =
            granularity === "month"
                ? `${record.date.slice(0, 7)}-01`
                : record.date;

        const bucket = buckets.get(key);

        if (bucket) {
            bucket.revenueCents += record.revenueCents;
            bucket.orders += record.orders;
        }
    }

    return Array.from(buckets.values());
}

export function calculateCategorySales(
    records: SalesRecord[],
    category: CategoryFilter = "all"
): CategorySales[] {
    const selectedCategories =
        category === "all" ? categories : [category];

    return selectedCategories
        .map((categoryId) => {
            const totals = calculateSummary(
                records.filter((record) => record.category === categoryId)
            );

            return {
                category: categoryId,
                revenueCents: totals.revenueCents,
                orders: totals.orders,
            };
        })
        .sort(
            (a, b) =>
                b.revenueCents - a.revenueCents ||
                a.category.localeCompare(b.category)
        );
}

export function calculateProductSales(
    records: SalesRecord[],
    category: CategoryFilter = "all"
): ProductSales[] {
    const selectedProducts = products.filter(
        (product) =>
            category === "all" || product.category === category
    );

    return selectedProducts
        .map((product) => {
            const totals = calculateSummary(
                records.filter((record) => record.productId === product.id)
            );

            return {
                productId: product.id,
                name: product.name,
                category: product.category,
                revenueCents: totals.revenueCents,
                orders: totals.orders,
            };
        })
        .sort(
            (a, b) =>
                b.revenueCents - a.revenueCents ||
                a.productId.localeCompare(b.productId)
        );
}

// One entry point for the dashboard.
// Every block uses the same period and category filters.
export function getInsights(
    period: InsightsPeriod = "30d",
    category: CategoryFilter = "all"
) {
    const ranges = getPeriodRanges(period);

    const currentRecords = filterSales(ranges.current, category);
    const previousRecords = filterSales(ranges.previous, category);

    const summary = calculateSummary(currentRecords);
    const previousSummary = calculateSummary(previousRecords);

    const granularity = period === "30d" ? "day" : "month";

    const timeline = buildSalesTimeline(
        currentRecords,
        ranges.current,
        granularity
    );

    const categorySales = calculateCategorySales(
        currentRecords,
        category
    );

    const productSales = calculateProductSales(
        currentRecords,
        category
    );

    const highestSales = timeline.reduce<SalesChartPoint | null>(
        (highest, point) =>
            highest === null || point.revenueCents > highest.revenueCents
                ? point
                : highest,
        null
    );

    const lowestSales = timeline.reduce<SalesChartPoint | null>(
        (lowest, point) =>
            lowest === null || point.revenueCents < lowest.revenueCents
                ? point
                : lowest,
        null
    );

    return {
        ranges,
        granularity,
        summary,
        previousSummary,
        changes: {
            revenue: calculatePercentageChange(
                summary.revenueCents,
                previousSummary.revenueCents
            ),
            orders: calculatePercentageChange(
                summary.orders,
                previousSummary.orders
            ),
            averageOrder: calculatePercentageChange(
                summary.averageOrderCents,
                previousSummary.averageOrderCents
            ),
        },
        timeline,
        categorySales,
        productSales,
        highestSales,
        lowestSales,
    };
}