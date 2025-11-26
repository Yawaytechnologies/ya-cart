// src/pages/Admin/ProductList.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const products = [
  {
    name: "Oak Panel Bed Frame",
    category: "Bedroom • Furniture",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$899.00",
    status: "Published",
    statusTone: "bg-orange-50 text-orange-600",
    image:
      "https://images.pexels.com/photos/37347/bed-bedroom-furniture.jpg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Cloud Lounge Sofa",
    category: "Living Room • Sofa",
    stockText: "low stock",
    stockTone: "text-amber-500",
    stockBar: "bg-amber-400",
    price: "$1,290.00",
    status: "Published",
    statusTone: "bg-orange-50 text-orange-600",
    image:
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Marble Top Coffee Table",
    category: "Living Room • Table",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$329.00",
    status: "Draft",
    statusTone: "bg-slate-100 text-slate-600",
    image:
      "https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Walnut Writing Desk",
    category: "Office • Desk",
    stockText: "out of stock",
    stockTone: "text-rose-500",
    stockBar: "bg-rose-400",
    price: "$640.00",
    status: "Draft",
    statusTone: "bg-slate-100 text-slate-600",
    image:
      "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Velvet Accent Chair",
    category: "Living Room • Chair",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$249.00",
    status: "Published",
    statusTone: "bg-orange-50 text-orange-600",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Minimalist Bookcase",
    category: "Living Room • Storage",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$420.00",
    status: "Draft",
    statusTone: "bg-slate-100 text-slate-600",
    image:
      "https://images.pexels.com/photos/2716399/pexels-photo-2716399.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Dining Table Set",
    category: "Dining • Furniture",
    stockText: "low stock",
    stockTone: "text-amber-500",
    stockBar: "bg-amber-400",
    price: "$1,080.00",
    status: "Published",
    statusTone: "bg-orange-50 text-orange-600",
    image:
      "https://images.pexels.com/photos/37347/bed-bedroom-furniture.jpg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "SoftEdge Kids Bunk Bed",
    category: "Kids Room • Bed",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$760.00",
    status: "Published",
    statusTone: "bg-orange-50 text-orange-600",
    image:
      "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Entryway Storage Bench",
    category: "Hallway • Storage",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$189.00",
    status: "Draft",
    statusTone: "bg-slate-100 text-slate-600",
    image:
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Round Side Table",
    category: "Living Room • Table",
    stockText: "in stock",
    stockTone: "text-emerald-500",
    stockBar: "bg-emerald-500",
    price: "$120.00",
    status: "Published",
    statusTone: "bg-orange-50 text-orange-600",
    image:
      "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(products.length / PAGE_SIZE);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-5">
      {/* Page title + add button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">List</h1>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <span>Dashboard</span>
            <span>/</span>
            <span>Product</span>
            <span>/</span>
            <span className="text-orange-500 font-medium">List</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-sm font-medium text-white px-4 py-2.5 shadow-sm"
        >
          <span className="text-base leading-none">＋</span>
          <span>Add product</span>
        </button>
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        <div className="flex flex-1 flex-wrap gap-2.5">
          <FakeSelect label="Stock" />
          <FakeSelect label="Publish" />

          <div className="flex-1 min-w-[200px] max-w-sm">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              <span className="text-slate-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 border-none outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <HeaderAction>Columns</HeaderAction>
          <HeaderAction>Filter</HeaderAction>
          <HeaderAction>Export</HeaderAction>
          <HeaderAction>Settings</HeaderAction>
        </div>
      </div>

      {/* Desktop TABLE view */}
      <div className="hidden md:block">
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Table head */}
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-400">
            <div className="grid grid-cols-[24px_minmax(0,3.5fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.4fr)] gap-4 items-center">
              <div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
              </div>
              <div>Product</div>
              <div>Stock</div>
              <div className="text-right">Price</div>
              <div className="text-right">Publish</div>
            </div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-slate-100">
            {pageItems.map((p) => (
              <div
                key={p.name}
                className="px-4 py-3.5 hover:bg-orange-50/40 transition cursor-pointer"
                onClick={() => navigate("/admin/products/details")}
              >
                <div className="grid grid-cols-[24px_minmax(0,3.5fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.4fr)] gap-4 items-center text-sm">
                  {/* Checkbox */}
                  <div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-orange-50 overflow-hidden flex items-center justify-center">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-[11px] font-semibold text-orange-500">
                          IMG
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 hover:text-orange-600">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-400">{p.category}</p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full ${p.stockBar}`}
                          style={{ width: "70%" }}
                        />
                      </div>
                      <span className={p.stockTone}>{p.stockText}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right text-sm font-semibold text-slate-800">
                    {p.price}
                  </div>

                  {/* Publish status + kebab */}
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${p.statusTone}`}
                    >
                      {p.status}
                    </span>
                    <button
                      className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 text-lg leading-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        // open menu here later
                      }}
                    >
                      ···
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile CARD view */}
      <div className="space-y-3 md:hidden">
        {pageItems.map((p) => (
          <div
            key={p.name}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
            onClick={() => navigate("/admin/products/details")}
          >
            <div className="flex gap-3">
              <div className="h-16 w-16 rounded-xl bg-orange-50 overflow-hidden flex items-center justify-center shrink-0">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[11px] font-semibold text-orange-500">
                    IMG
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {p.category}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${p.statusTone}`}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Stock */}
                <div className="mt-3 flex items-center gap-2 text-[11px]">
                  <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${p.stockBar}`}
                      style={{ width: "70%" }}
                    />
                  </div>
                  <span className={p.stockTone}>{p.stockText}</span>
                </div>

                {/* Price row */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Price</span>
                  <span className="text-base font-semibold text-slate-900">
                    {p.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom row: checkbox + kebab */}
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
                className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 text-lg leading-none"
                onClick={(e) => {
                  e.stopPropagation();
                  // open menu here later
                }}
              >
                ···
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Pagination footer (both views) */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs text-slate-500">
        <div>
          Showing{" "}
          <span className="font-medium">
            {(page - 1) * PAGE_SIZE + 1}
          </span>{" "}
          –{" "}
          <span className="font-medium">
            {Math.min(page * PAGE_SIZE, products.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium">{products.length}</span> products
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className={`px-2.5 py-1 rounded-lg border text-xs ${
              page === 1
                ? "border-slate-200 text-slate-300 cursor-default"
                : "border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/60"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: pageCount }).map((_, i) => {
            const pageNumber = i + 1;
            const isActive = pageNumber === page;
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`min-w-[32px] h-8 rounded-lg text-xs font-medium ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-600 hover:bg-orange-50/60 hover:text-orange-600"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === pageCount}
            className={`px-2.5 py-1 rounded-lg border text-xs ${
              page === pageCount
                ? "border-slate-200 text-slate-300 cursor-default"
                : "border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/60"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* small helpers */

const FakeSelect = ({ label }) => (
  <button className="inline-flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-600 min-w-[130px] hover:border-orange-200 hover:bg-orange-50/40 hover:text-orange-700">
    <span>{label}</span>
    <span className="text-[11px] text-slate-400">▾</span>
  </button>
);

const HeaderAction = ({ children }) => (
  <button className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/60">
    {children}
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

export default ProductList;
