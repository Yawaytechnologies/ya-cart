// src/pages/Admin/OrderList.jsx
import React, { useState } from "react";

const STATUS_COLORS = {
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Refunded: "bg-rose-50 text-rose-600",
  Cancelled: "bg-slate-100 text-slate-600",
};

const TABS = [
  { label: "All", key: "all" },
  { label: "Pending", key: "Pending" },
  { label: "Completed", key: "Completed" },
  { label: "Cancelled", key: "Cancelled" },
  { label: "Refunded", key: "Refunded" },
];

const SAMPLE_ORDERS = [
  {
    id: "#6010",
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    avatar: "https://i.pravatar.cc/100?img=1",
    date: "25 Nov 2025",
    time: "7:50 AM",
    items: 6,
    price: "$484.15",
    status: "Refunded",
  },
  {
    id: "#6011",
    name: "Lucian Obrien",
    email: "ashlynn.ohara62@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=3",
    date: "24 Nov 2025",
    time: "6:50 AM",
    items: 1,
    price: "$83.74",
    status: "Completed",
  },
  {
    id: "#60110",
    name: "Soren Durham",
    email: "vergie.block82@hotmail.com",
    avatar: "https://i.pravatar.cc/100?img=4",
    date: "14 Nov 2025",
    time: "9:50 PM",
    items: 5,
    price: "$400.41",
    status: "Pending",
  },
  {
    id: "#60111",
    name: "Cortez Herring",
    email: "vito.hudson@hotmail.com",
    avatar: "https://i.pravatar.cc/100?img=5",
    date: "13 Nov 2025",
    time: "8:50 PM",
    items: 1,
    price: "$83.74",
    status: "Completed",
  },
  {
    id: "#60112",
    name: "Brycen Jimenez",
    email: "tyrel.greenholt@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=6",
    date: "12 Nov 2025",
    time: "7:50 PM",
    items: 6,
    price: "$484.15",
    status: "Refunded",
  },
];

const ROWS_PER_PAGE = 5;

export default function OrderList() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const filteredOrders =
    activeTab === "all"
      ? SAMPLE_ORDERS
      : SAMPLE_ORDERS.filter((o) => o.status === activeTab);

  const totalPages = Math.ceil(filteredOrders.length / ROWS_PER_PAGE);
  const start = (page - 1) * ROWS_PER_PAGE;
  const visibleRows = filteredOrders.slice(start, start + ROWS_PER_PAGE);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">List</h1>
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span>Order</span>
          <span>/</span>
          <span className="text-orange-500 font-medium">List</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2 overflow-x-auto">
        {TABS.map((tab) => {
          const count =
            tab.key === "all"
              ? SAMPLE_ORDERS.length
              : SAMPLE_ORDERS.filter((o) => o.status === tab.key).length;

          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                active
                  ? "text-slate-900 border-b-2 border-orange-500"
                  : "text-slate-500 hover:text-orange-600"
              }`}
            >
              {tab.label}
              <span
                className={`text-[11px] px-2 py-[2px] rounded-full ${
                  active ? "bg-orange-100 text-orange-700" : "bg-slate-100"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <FakeInput label="Start date" icon="calendar" />
        <FakeInput label="End date" icon="calendar" />
        <FakeInput
          label="Search customer or order number..."
          icon="search"
          className="md:col-span-2"
        />
      </div>

      {/* Desktop TABLE view */}
      <div className="hidden md:block">
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2 text-xs text-slate-500 grid grid-cols-[24px_1.2fr_1.4fr_1fr_1fr_1fr_40px] gap-4">
            <div></div>
            <div>Order</div>
            <div>Customer</div>
            <div>Date</div>
            <div>Items</div>
            <div className="text-right">Price</div>
            <div className="text-right">Status</div>
          </div>

          {/* Rows */}
          {visibleRows.map((row) => (
            <div
              key={row.id}
              className="px-4 py-3 grid grid-cols-[24px_1.2fr_1.4fr_1fr_1fr_1fr_40px] gap-4 items-center text-sm hover:bg-orange-50/40"
            >
              <div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 rounded border-slate-300"
                />
              </div>

              {/* Order ID */}
              <div className="text-orange-600 font-medium">{row.id}</div>

              {/* Customer */}
              <div className="flex items-center gap-3">
                <img
                  src={row.avatar}
                  className="h-9 w-9 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <div className="text-slate-700">{row.name}</div>
                  <div className="text-xs text-slate-400">{row.email}</div>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-slate-600">
                <div>{row.date}</div>
                <div className="text-slate-400">{row.time}</div>
              </div>

              {/* Items */}
              <div>{row.items}</div>

              {/* Price */}
              <div className="text-right font-semibold text-slate-800">
                {row.price}
              </div>

              {/* Status */}
              <div className="flex justify-end">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[row.status]}`}
                >
                  {row.status}
                </span>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
            <span>
              {start + 1}–{Math.min(start + ROWS_PER_PAGE, filteredOrders.length)} of{" "}
              {filteredOrders.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-2 py-1 rounded border border-slate-200 hover:bg-orange-50 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-2 py-1 rounded border border-slate-200 hover:bg-orange-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CARD view */}
      <div className="space-y-3 md:hidden">
        {visibleRows.map((row) => (
          <div
            key={row.id}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
          >
            {/* Top row: ID + status */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-slate-400">Order ID</p>
                <p className="text-sm font-semibold text-orange-600">
                  {row.id}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_COLORS[row.status]}`}
              >
                {row.status}
              </span>
            </div>

            {/* Customer */}
            <div className="mt-3 flex gap-3">
              <img
                src={row.avatar}
                className="h-10 w-10 rounded-full object-cover"
                alt={row.name}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {row.name}
                </p>
                <p className="text-xs text-slate-400 truncate">{row.email}</p>
              </div>
            </div>

            {/* Date + items */}
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div>
                <p className="text-[11px] text-slate-400">Date</p>
                <p>{row.date}</p>
                <p className="text-[11px] text-slate-400">{row.time}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Items</p>
                <p className="font-medium">{row.items}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">Total</span>
              <span className="text-base font-semibold text-slate-900">
                {row.price}
              </span>
            </div>

            {/* Bottom row: checkbox + dummy actions */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
                <span>Select</span>
              </label>

              <button className="h-7 px-3 rounded-full bg-slate-50 text-slate-500 text-[11px]">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shared pagination for mobile too */}
      <div className="md:hidden bg-white border border-slate-100 rounded-2xl px-4 py-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          {start + 1}–
          {Math.min(start + ROWS_PER_PAGE, filteredOrders.length)} of{" "}
          {filteredOrders.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 py-1 rounded border border-slate-200 hover:bg-orange-50 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 rounded border border-slate-200 hover:bg-orange-50 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* Fake UI inputs */
const FakeInput = ({ label, icon, className }) => (
  <div
    className={`flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ${className}`}
  >
    <span className="text-slate-400">
      {icon === "calendar" ? "📅" : "🔍"}
    </span>
    <span className="text-slate-400 text-sm">{label}</span>
  </div>
);
