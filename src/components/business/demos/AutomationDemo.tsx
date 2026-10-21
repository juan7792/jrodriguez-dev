
"use client";

type Order = {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
};

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "Acme Corp",
    product: "Laptop",
    quantity: 2,
    unitPrice: 850,
  },
  {
    id: "ORD-002",
    customer: "Bright Studio",
    product: "Monitor",
    quantity: 3,
    unitPrice: 240,
  },
  {
    id: "ORD-003",
    customer: "",
    product: "Keyboard",
    quantity: 5,
    unitPrice: 45,
  },
  {
    id: "ORD-004",
    customer: "Acme Corp",
    product: "Laptop",
    quantity: 2,
    unitPrice: 850,
  },
  {
    id: "ORD-005",
    customer: "North Labs",
    product: "Mouse",
    quantity: -2,
    unitPrice: 30,
  },
  {
    id: "ORD-006",
    customer: "Green Tech",
    product: "Monitor",
    quantity: 4,
    unitPrice: 240,
  },
];

export default function AutomationDemo() {
  return (
    <main className="business-theme min-h-screen bg-[#FAF8F3] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-xl border border-[#DCE7DE] bg-white">
            {/* Header */}
            <div className="border-b border-[#DCE7DE] p-6">
                <h2 className="text-xl font-semibold text-[#20362F]">
                Order Processing
                </h2>

                <p className="mt-2 text-sm text-[#5B6B61]">
                Here's a sample list of orders received by a business.
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                <thead className="bg-[#F5F7F4] text-[#20362F]">
                    <tr>
                    <th className="px-5 py-3 font-semibold">Order ID</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Product</th>
                    <th className="px-5 py-3 font-semibold">Quantity</th>
                    <th className="px-5 py-3 font-semibold">Unit Price</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-[#DCE7DE]">
                    {orders.map((order) => (
                    <tr
                        key={order.id}
                        className="text-[#20362F] transition-colors hover:bg-[#FAF8F3]"
                    >
                        <td className="whitespace-nowrap px-5 py-4 font-medium">
                        {order.id}
                        </td>

                        <td className="px-5 py-4">
                        {order.customer || "—"}
                        </td>

                        <td className="px-5 py-4">
                        {order.product}
                        </td>

                        <td className="px-5 py-4">
                        {order.quantity}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                        ${order.unitPrice.toFixed(2)}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="border-t border-[#DCE7DE] px-6 py-4">
                <p className="text-xs text-[#5B6B61]">
                6 sample orders · Demo data
                </p>
            </div>
        </div>
        </div>
    </main>
  );
}
