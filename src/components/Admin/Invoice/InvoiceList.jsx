// src/pages/Admin/InvoiceList.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ROWS_PER_PAGE = 5;

const invoices = [
  {
    id: "INV-1001",
    orderId: "#6010",
    customer: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    date: "25 Nov 2025",
    time: "7:50 am",
    items: 6,
    total: 484.15,
    status: "Refunded",
  },
  {
    id: "INV-1002",
    orderId: "#6011",
    customer: "Lucian Obrien",
    email: "ashlynn.ohara62@gmail.com",
    date: "24 Nov 2025",
    time: "6:50 am",
    items: 1,
    total: 83.74,
    status: "Completed",
  },
  {
    id: "INV-1003",
    orderId: "#6012",
    customer: "Soren Durham",
    email: "vergie.block82@hotmail.com",
    date: "14 Nov 2025",
    time: "9:50 pm",
    items: 5,
    total: 400.41,
    status: "Pending",
  },
  {
    id: "INV-1004",
    orderId: "#6013",
    customer: "Cortez Herring",
    email: "vito.hudson@hotmail.com",
    date: "13 Nov 2025",
    time: "8:50 pm",
    items: 1,
    total: 83.74,
    status: "Completed",
  },
  {
    id: "INV-1005",
    orderId: "#6014",
    customer: "Brycen Jimenez",
    email: "tyrel.greenholt@gmail.com",
    date: "12 Nov 2025",
    time: "7:50 pm",
    items: 6,
    total: 484.15,
    status: "Refunded",
  },
  {
    id: "INV-1006",
    orderId: "#6015",
    customer: "Kade Leannon",
    email: "kade.leannon@example.com",
    date: "11 Nov 2025",
    time: "5:10 pm",
    items: 3,
    total: 212.3,
    status: "Completed",
  },
  {
    id: "INV-1007",
    orderId: "#6016",
    customer: "Aubrey Weiss",
    email: "aubrey.weiss@example.com",
    date: "10 Nov 2025",
    time: "9:40 am",
    items: 2,
    total: 130.0,
    status: "Pending",
  },
  {
    id: "INV-1008",
    orderId: "#6017",
    customer: "Maximo Hahn",
    email: "maximo.hahn@example.com",
    date: "09 Nov 2025",
    time: "11:30 am",
    items: 4,
    total: 340.99,
    status: "Completed",
  },
  {
    id: "INV-1009",
    orderId: "#6018",
    customer: "Ivy Shelton",
    email: "ivy.shelton@example.com",
    date: "08 Nov 2025",
    time: "4:25 pm",
    items: 2,
    total: 156.2,
    status: "Cancelled",
  },
  {
    id: "INV-1010",
    orderId: "#6019",
    customer: "Logan Fuller",
    email: "logan.fuller@example.com",
    date: "07 Nov 2025",
    time: "3:05 pm",
    items: 1,
    total: 75.5,
    status: "Pending",
  },
];

const tabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "refunded", label: "Refunded" },
];

const InvoiceList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // status counts for badges
  const statusCounts = useMemo(() => {
    const base = {
      all: invoices.length,
      pending: 0,
      completed: 0,
      cancelled: 0,
      refunded: 0,
    };
    for (const inv of invoices) {
      const s = inv.status.toLowerCase();
      if (s in base) base[s] += 1;
    }
    return base;
  }, []);

  const filtered = useMemo(() => {
    let list = invoices;

    if (activeTab !== "all") {
      list = list.filter(
        (inv) => inv.status.toLowerCase() === activeTab
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.orderId.toLowerCase().includes(q) ||
          inv.customer.toLowerCase().includes(q) ||
          inv.email.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filtered.slice(start, start + ROWS_PER_PAGE);
  }, [filtered, currentPage]);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  };

  const handleRowClick = (id) => {
    // Adapt this when you wire dynamic details
    navigate("/admin/invoices/details");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Title + breadcrumb */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">List</h1>
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span>Invoice</span>
          <span>/</span>
          <span className="text-orange-500 font-medium">List</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          const count = statusCounts[tab.key] ?? 0;

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

      {/* Filters row */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <FilterField label="Start date" icon="📅" />
        <FilterField label="End date" icon="📅" />
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search invoice, order, customer, or email..."
              className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 border-none outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block">
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Table head */}
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-400">
            <div className="grid grid-cols-[26px_minmax(0,1.4fr)_minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_40px] gap-4 items-center">
              <div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
              </div>
              <div>Invoice</div>
              <div>Customer</div>
              <div>Date</div>
              <div className="text-right">Items</div>
              <div className="text-right">Price</div>
              <div className="text-right">Status</div>
            </div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-slate-100">
            {pageItems.map((inv) => (
              <div
                key={inv.id}
                className="px-4 py-3.5 hover:bg-orange-50/40 transition cursor-pointer"
                onClick={() => handleRowClick(inv.id)}
              >
                <div className="grid grid-cols-[26px_minmax(0,1.4fr)_minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_40px] gap-4 items-center text-sm">
                  {/* Checkbox */}
                  <div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Invoice id */}
                  <div className="text-sm font-medium text-sky-600 hover:text-sky-500">
                    {inv.id}
                  </div>

                  {/* Customer */}
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {inv.customer}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {inv.email}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-slate-600">
                    <p>{inv.date}</p>
                    <p className="text-xs text-slate-400">{inv.time}</p>
                  </div>

                  {/* Items */}
                  <div className="text-right text-sm text-slate-700">
                    {inv.items}
                  </div>

                  {/* Price */}
                  <div className="text-right text-sm font-semibold text-slate-900">
                    ${inv.total.toFixed(2)}
                  </div>

                  {/* Status + kebab */}
                  <div className="flex items-center justify-end gap-2">
                    <StatusPill status={inv.status} />
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 text-lg leading-none"
                    >
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {pageItems.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-slate-400">
                No invoices match your filters.
              </div>
            )}
          </div>

          {/* Desktop footer/pagination */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-slate-100 text-xs text-slate-500">
            <div>
              {filtered.length === 0 ? (
                "0–0 of 0"
              ) : (
                <>
                  <span className="font-medium">
                    {(currentPage - 1) * ROWS_PER_PAGE + 1}
                  </span>{" "}
                  –{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filtered.length}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`h-8 px-3 rounded-lg border text-sm ${
                  currentPage === 1
                    ? "border-slate-200 text-slate-300 cursor-default"
                    : "border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/60"
                }`}
              >
                Prev
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                className={`h-8 px-3 rounded-lg border text-sm ${
                  currentPage === pageCount
                    ? "border-slate-200 text-slate-300 cursor-default"
                    : "border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/60"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="space-y-3 md:hidden">
        {pageItems.map((inv) => (
          <div
            key={inv.id}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
            onClick={() => handleRowClick(inv.id)}
          >
            {/* Top row: invoice + status */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] text-slate-400">Invoice</p>
                <p className="text-sm font-semibold text-sky-600">
                  {inv.id}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Order {inv.orderId}
                </p>
              </div>
              <StatusPill status={inv.status} />
            </div>

            {/* Customer */}
            <div className="mt-3">
              <p className="text-xs text-slate-400">Customer</p>
              <p className="text-sm font-medium text-slate-900">
                {inv.customer}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {inv.email}
              </p>
            </div>

            {/* Date + items */}
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div>
                <p className="text-[11px] text-slate-400">Date</p>
                <p>{inv.date}</p>
                <p className="text-[11px] text-slate-400">{inv.time}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Items</p>
                <p className="font-medium">{inv.items}</p>
              </div>
            </div>

            {/* Total */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">Total</span>
              <span className="text-base font-semibold text-slate-900">
                ${inv.total.toFixed(2)}
              </span>
            </div>

            {/* Bottom row: checkbox + action */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <label
                className="inline-flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
                <span>Select</span>
              </label>

              <button
                className="h-7 px-3 rounded-full bg-slate-50 text-slate-500 text-[11px]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(inv.id);
                }}
              >
                View invoice
              </button>
            </div>
          </div>
        ))}

        {pageItems.length === 0 && (
          <div className="text-center text-sm text-slate-400 py-6">
            No invoices match your filters.
          </div>
        )}
      </div>

      {/* Mobile pagination bar */}
      <div className="md:hidden bg-white border border-slate-100 rounded-2xl px-4 py-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          {filtered.length === 0 ? (
            "0–0 of 0"
          ) : (
            <>
              {(currentPage - 1) * ROWS_PER_PAGE + 1}–
              {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length}
            </>
          )}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="px-2 py-1 rounded border border-slate-200 hover:bg-orange-50 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={currentPage === pageCount}
            onClick={() => goToPage(currentPage + 1)}
            className="px-2 py-1 rounded border border-slate-200 hover:bg-orange-50 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----- helpers ----- */

const StatusPill = ({ status }) => {
  const s = status.toLowerCase();
  let cls =
    "bg-slate-100 text-slate-600 border border-slate-200";

  if (s === "completed") {
    cls = "bg-emerald-50 text-emerald-600 border border-emerald-100";
  } else if (s === "pending") {
    cls = "bg-amber-50 text-amber-700 border border-amber-100";
  } else if (s === "refunded") {
    cls = "bg-rose-50 text-rose-600 border border-rose-100";
  } else if (s === "cancelled") {
    cls = "bg-slate-50 text-slate-500 border border-slate-200";
  }

  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold " +
        cls
      }
    >
      {status}
    </span>
  );
};

const FilterField = ({ label, icon }) => (
  <button className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-600 min-w-[160px] hover:border-orange-200 hover:bg-orange-50/40 hover:text-orange-700">
    <span className="text-slate-400 flex items-center gap-2">
      <span className="text-base leading-none">{icon}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </span>
  </button>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <circle
      cx="11"
      cy="11"
      r="5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
    />
    <line
      x1="14.8"
      y1="14.8"
      x2="18"
      y2="18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export default InvoiceList;
