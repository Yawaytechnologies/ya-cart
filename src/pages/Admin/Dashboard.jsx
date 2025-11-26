// src/pages/Admin/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* TOP: Team info + main hero + right card */}
      <section className="space-y-4">
        {/* Team / breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-orange-400/10 text-orange-500 font-semibold">
              T1
            </span>
            <div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <span className="font-medium">Team 1</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Free
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Best seller of the month you have done 57.6% more sales today.
              </p>
            </div>
          </div>

          <button className="hidden sm:inline-flex text-xs text-slate-400 items-center gap-1">
            <span>2023</span>
            <span className="text-slate-300">▾</span>
          </button>
        </div>

        {/* Hero + right promo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left hero card */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-r from-orange-900 via-rose-900 to-rose-950 text-white p-6 relative overflow-hidden shadow-sm">
            <div className="flex flex-col justify-between h-full gap-4 md:gap-0">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-orange-200/90 mb-2">
                  Congratulations 🎉
                </p>
                <h2 className="text-2xl font-semibold leading-tight">
                  Jaydon Frankie
                </h2>
                <p className="mt-2 text-sm text-orange-50/80 max-w-xs">
                  Best seller of the month you have done 57.6% more sales today.
                </p>
              </div>

              <button className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-400 text-sm font-medium px-4 py-2 mt-2 w-max shadow-lg shadow-orange-500/30">
                Go now
              </button>
            </div>

            {/* Fake illustration */}
            <div className="absolute right-4 bottom-0 hidden md:flex flex-col items-center justify-end h-full">
              <div className="h-32 w-40 rounded-t-full bg-gradient-to-t from-orange-400/40 to-transparent border border-orange-400/40 flex items-end justify-center pb-4">
                <div className="h-16 w-16 rounded-full bg-orange-400/90 border-4 border-orange-950" />
              </div>
            </div>
          </div>

          {/* Right promo card */}
          <div className="rounded-2xl bg-[url('/public/admin-shoes-placeholder.jpg')] bg-cover bg-center min-h-[170px] relative overflow-hidden shadow-sm bg-slate-900 text-white">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-orange-500/15 text-orange-200 px-2 py-0.5 uppercase tracking-[0.16em]">
                  New
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">
                  Elegance Stiletto Heels
                </p>
                <button className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-400 text-xs font-medium px-3 py-1.5 shadow-md shadow-orange-500/30">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product sold */}
        <MetricCard
          title="Product sold"
          value="765"
          change="+2.6%"
          subtitle="last week"
          changePositive
        />
        {/* Total balance */}
        <MetricCard
          title="Total balance"
          value="18,765"
          change="-0.1%"
          subtitle="last week"
        />
        {/* Sales profit */}
        <MetricCard
          title="Sales profit"
          value="4,876"
          change="+0.6%"
          subtitle="last week"
          changePositive
        />
      </section>

      {/* CHARTS: Sale by gender & Yearly sales */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sale by gender */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            Sale by gender
          </h3>
          <p className="text-xs text-slate-400 mb-4">2023</p>

          {/* Fake donut chart */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="h-48 w-48 rounded-full border-[18px] border-orange-400/80 border-t-transparent border-l-transparent border-r-amber-400/80 rotate-[-35deg]" />
              <div className="absolute inset-5 rounded-full border-[14px] border-amber-400/80 border-t-transparent border-r-transparent rotate-[25deg]" />
              <div className="absolute inset-10 rounded-full border-[12px] border-orange-500 border-b-transparent rotate-[65deg]" />
              <div className="absolute inset-16 rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400">Total</span>
                <span className="text-lg font-semibold text-slate-800">
                  2,324
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <LegendDot color="bg-orange-500" label="Mens" />
              <LegendDot color="bg-amber-400" label="Womens" />
              <LegendDot color="bg-rose-400" label="Kids" />
            </div>
          </div>
        </div>

        {/* Yearly sales */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Yearly sales
              </h3>
              <p className="text-xs text-slate-400">
                (+43%) than last year
              </p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
              2023 <span className="text-[10px]">▾</span>
            </button>
          </div>

          <div className="flex items-center gap-8 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-6 rounded-full bg-orange-500" />
              <span className="text-slate-500">Total income</span>
              <span className="font-semibold text-slate-800">1.23k</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-6 rounded-full bg-rose-400" />
              <span className="text-slate-500">Total expenses</span>
              <span className="font-semibold text-slate-800">6.79k</span>
            </div>
          </div>

          {/* Simple line chart (SVG) */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="relative h-40">
              <div className="absolute inset-0 border-l border-b border-slate-100" />
              <svg
                viewBox="0 0 260 120"
                className="absolute inset-2 w-[calc(100%-8px)] h-[calc(100%-8px)]"
                preserveAspectRatio="none"
              >
                {/* Expenses line */}
                <path
                  d="M5 80 C40 70 60 75 90 65 S140 60 170 80 220 70 255 75"
                  className="stroke-rose-400"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Income line */}
                <path
                  d="M5 100 C40 95 60 90 90 85 S140 70 170 60 220 95 255 85"
                  className="stroke-orange-500"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 mt-3">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SALES OVERVIEW + CURRENT BALANCE */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            Sales overview
          </h3>

          <ProgressRow
            label="Total profit"
            amount="$8,374"
            percent="10.1%"
            barClass="bg-orange-500"
            value={72}
          />
          <ProgressRow
            label="Total income"
            amount="$9,714"
            percent="13.6%"
            barClass="bg-orange-400"
            value={68}
          />
          <ProgressRow
            label="Total expenses"
            amount="$6,871"
            percent="28.2%"
            barClass="bg-amber-400"
            value={55}
          />
        </div>

        {/* Current balance */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Current balance
            </h3>
            <p className="text-2xl font-semibold text-slate-900">
              $187,650
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <BalanceRow label="Order total" value="$287,650" />
              <BalanceRow label="Earning" value="$25,500" />
              <BalanceRow label="Refunded" value="$1,600" />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button className="flex-1 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 py-2.5">
              Request
            </button>
            <button className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-400 text-xs font-medium text-white py-2.5">
              Transfer
            </button>
          </div>
        </div>
      </section>

      {/* BEST SALESMAN + LATEST PRODUCTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4">
        {/* Best salesman table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">
            Best salesman
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                  <th className="py-2 text-left font-medium">Seller</th>
                  <th className="py-2 text-left font-medium">Product</th>
                  <th className="py-2 text-left font-medium">Country</th>
                  <th className="py-2 text-right font-medium pr-2">Total</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {salesmen.map((row, idx) => (
                  <tr
                    key={row.name}
                    className={
                      idx !== salesmen.length - 1
                        ? "border-b border-slate-50"
                        : ""
                    }
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-[11px] font-semibold text-orange-500">
                          {row.initials}
                        </div>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-500">{row.product}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{row.flag}</span>
                        <span className="text-slate-500">{row.country}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right pr-2 font-semibold">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest products list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">
            Latest products
          </h3>

          <div className="space-y-3">
            {products.map((item) => (
              <div key={item.name} className="flex items-center gap-3 text-xs">
                <div className="h-9 w-9 rounded-xl bg-orange-50 flex items-center justify-center text-[10px] font-semibold text-orange-500">
                  IMG
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 text-[13px]">
                    {item.name}
                  </p>
                  <p className="text-slate-400 mt-0.5">
                    {item.price}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* -------- small subcomponents -------- */

const MetricCard = ({ title, value, change, subtitle, changePositive }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
    <div className="flex items-center justify-between text-xs text-slate-400">
      <span>{title}</span>
    </div>
    <div className="mt-3 flex items-end justify-between gap-2">
      <div>
        <p className="text-xl font-semibold text-slate-900">{value}</p>
        <div className="mt-1 flex items-center gap-2 text-[11px]">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 ${
              changePositive
                ? "bg-orange-50 text-orange-600"
                : "bg-rose-50 text-rose-500"
            }`}
          >
            <span>{changePositive ? "▲" : "▼"}</span>
            <span>{change}</span>
          </span>
          <span className="text-slate-400">{subtitle}</span>
        </div>
      </div>

      {/* tiny sparkline placeholder */}
      <div className="h-10 w-20">
        <div className="h-full w-full rounded-xl bg-gradient-to-t from-orange-100 via-orange-50 to-transparent border border-orange-100" />
      </div>
    </div>
  </div>
);

const LegendDot = ({ color, label }) => (
  <div className="flex items:center gap-1.5">
    <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
    <span className="text-slate-500">{label}</span>
  </div>
);

const ProgressRow = ({ label, amount, percent, barClass, value }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-xs mb-1">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-semibold">{amount}</span>
    </div>
    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`h-full ${barClass} rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
    <div className="flex justify-end text-[11px] text-slate-400">
      {percent}
    </div>
  </div>
);

const BalanceRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-400">{label}</span>
    <span className="text-slate-800 font-semibold">{value}</span>
  </div>
);

/* -------- static data -------- */

const salesmen = [
  {
    name: "Jayvion Simon",
    initials: "JS",
    product: "CAP",
    country: "Germany",
    flag: "🇩🇪",
    total: "$83.74",
  },
  {
    name: "Lucian Obrien",
    initials: "LO",
    product: "Branded shoes",
    country: "UK",
    flag: "🇬🇧",
    total: "$97.14",
  },
  {
    name: "Deja Brady",
    initials: "DB",
    product: "Headphone",
    country: "France",
    flag: "🇫🇷",
    total: "$68.71",
  },
  {
    name: "Harrison Stein",
    initials: "HS",
    product: "Cell phone",
    country: "Korea",
    flag: "🇰🇷",
    total: "$85.21",
  },
  {
    name: "Reece Chung",
    initials: "RC",
    product: "Earrings",
    country: "USA",
    flag: "🇺🇸",
    total: "$52.17",
  },
];

const products = [
  {
    name: "Urban Explorer Sneakers",
    price: "$83.74",
    badge: "",
  },
  {
    name: "Classic Leather Loafers",
    price: "$97.14 $97.14",
    badge: "",
  },
  {
    name: "Mountain Trekking Boots",
    price: "$68.71",
    badge: "",
  },
  {
    name: "Elegance Stiletto Heels",
    price: "$85.21 $85.21",
    badge: "",
  },
  {
    name: "Comfy Running Shoes",
    price: "$52.17",
    badge: "",
  },
];

export default Dashboard;
