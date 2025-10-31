// src/pages/Cart.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { useCart } from "../components/CardContext"; // ensure path

/* ---------- palette tuned to screenshots ---------- */
const UI = {
  paper: "#F3ECE4",       // page bg
  tableHead: "#E9E0D7",   // header row bg
  rowBg: "rgba(255,255,255,0.78)",
  stroke: "rgba(0,0,0,0.08)",
  text: "#2B241F",
  dim: "#7F7166",
  brown: "#4B3A32",
  redDot: "#EA5C5C",
};

const money = (n) => `$${n.toFixed(2)}`;
const SHIPPING = [
  { id: "flat",   label: "Flat rate",    price: 20 },
  { id: "pickup", label: "Local pickup", price: 25 },
  { id: "free",   label: "Free shipping", price: 0 },
];

export default function Cart() {
  const { items, inc, dec, remove, subtotal } = useCart();
  const [ship, setShip] = useState("flat");
  const total = useMemo(() => {
    const s = SHIPPING.find((x) => x.id === ship)?.price || 0;
    return subtotal + s;
  }, [ship, subtotal]);

  if (!items.length) {
    return (
      <main style={{ background: UI.paper }}>
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 text-center">
          <h1 className="text-3xl font-semibold" style={{ color: UI.text }}>
            Your Cart
          </h1>
          <p className="mt-3" style={{ color: UI.dim }}>
            No items added yet.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block px-6 py-3 text-white"
            style={{ background: UI.brown }}
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: UI.paper }}>
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pt-38 pb-14">
        {/* Two-column layout with fixed right width to match reference */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ===== LEFT: Table ===== */}
          <section
            className="overflow-hidden"
            style={{ background: "transparent", border: `1px solid ${UI.stroke}` }}
          >
            {/* header */}
            <div
              className="hidden md:grid items-center"
              style={{
                gridTemplateColumns: "1.1fr 0.5fr 0.6fr 0.4fr",
                padding: "14px 24px",
                background: UI.tableHead,
                color: UI.dim,
                borderBottom: `1px solid ${UI.stroke}`,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                fontSize: "14px",
              }}
            >
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span className="text-right">Remove</span>
            </div>

            {/* rows */}
            <ul className="divide-y" style={{ borderColor: UI.stroke }}>
              {items.map((it) => (
                <li
                  key={it.id}
                  className="grid gap-4 px-5 md:px-6 py-6"
                  style={{
                    gridTemplateColumns: "1fr",
                    background: UI.rowBg,
                  }}
                >
                  <div
                    className="grid items-center gap-4"
                    style={{
                      gridTemplateColumns: "1.1fr 0.5fr 0.6fr 0.4fr",
                    }}
                  >
                    {/* product */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className="shrink-0 overflow-hidden"
                        style={{
                          width: 86,
                          height: 86,
                          background: "#F7F5F2",
                          border: `1px solid ${UI.stroke}`,
                        }}
                      >
                        <img
                          src={it.img}
                          alt={it.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="truncate" style={{ color: UI.text }}>
                        {it.title}
                      </p>
                    </div>

                    {/* price */}
                    <div style={{ color: UI.text }}>{money(it.price)}</div>

                    {/* qty (exact box like shot) */}
                    <div>
                      <div
                        className="inline-flex items-center select-none"
                        style={{ background: "#EFE8E1", height: 48 }}
                      >
                        <button
                          onClick={() => dec(it.id)}
                          className="grid place-items-center"
                          style={{
                            width: 42,
                            height: 48,
                            border: `1px solid ${UI.stroke}`,
                            background: "rgba(255,255,255,0.6)",
                          }}
                          aria-label="Decrease"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-10 text-center">{it.qty}</span>
                        <button
                          onClick={() => inc(it.id)}
                          className="grid place-items-center"
                          style={{
                            width: 42,
                            height: 48,
                            border: `1px solid ${UI.stroke}`,
                            background: "rgba(255,255,255,0.6)",
                          }}
                          aria-label="Increase"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* remove (right aligned) with tiny red dot accent beside column area like screenshot) */}
                    <div className="flex items-center justify-end gap-3">
                      <span
                        className="inline-block rounded-full"
                        style={{
                          width: 10,
                          height: 10,
                          background: UI.redDot,
                        }}
                        aria-hidden
                      />
                      <button
                        onClick={() => remove(it.id)}
                        className="inline-flex items-center gap-2"
                        style={{ color: UI.dim }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = UI.brown)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = UI.dim)}
                        aria-label={`Remove ${it.title}`}
                        title="Remove"
                      >
                        <FiX />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* coupon + update row */}
            <div
              className="px-5 md:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{
                background: UI.rowBg,
                borderTop: `1px solid ${UI.stroke}`,
              }}
            >
              <div className="flex w-full sm:max-w-md">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="flex-1 h-12 px-4 focus:outline-none"
                  style={{
                    background: "#fff",
                    border: `1px solid ${UI.stroke}`,
                    color: UI.text,
                  }}
                />
                <button
                  className="h-12 px-6 text-white"
                  style={{ background: UI.brown }}
                >
                  Apply
                </button>
              </div>
              <button
                className="h-12 px-6"
                style={{
                  background: "#fff",
                  border: `1px solid ${UI.stroke}`,
                }}
              >
                Update Cart
              </button>
            </div>
          </section>

          {/* ===== RIGHT: Sticky summary card (exact sizing, shadow, button) ===== */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div
              className="overflow-hidden"
              style={{
                width: 360,
                background: "#fff",
                border: `1px solid ${UI.stroke}`,
                boxShadow: "0 18px 28px rgba(0,0,0,0.08)",
              }}
            >
              {/* header row with subtotal */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${UI.stroke}` }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: UI.text }}
                >
                  Subtotal
                </h2>
                <div className="text-xl font-semibold" style={{ color: UI.text }}>
                  {money(subtotal)}
                </div>
              </div>

              {/* shipping options */}
              <div
                className="px-6 py-5"
                style={{ borderBottom: `1px solid ${UI.stroke}` }}
              >
                <p className="text-[15px] font-medium" style={{ color: UI.text }}>
                  Shipping
                </p>
                <div className="mt-3 space-y-3">
                  {SHIPPING.map((m) => (
                    <label key={m.id} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={m.id}
                        checked={ship === m.id}
                        onChange={() => setShip(m.id)}
                        className="accent-[color:var(--ink,#4B3A32)]"
                      />
                      <span style={{ color: UI.text }}>
                        {m.label}: {money(m.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* total */}
              <div className="px-6 py-5 flex items-center justify-between">
                <span className="text-lg" style={{ color: UI.text }}>
                  Total
                </span>
                <span className="text-2xl font-semibold" style={{ color: UI.text }}>
                  {money(total)}
                </span>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Link
                  to="/checkout"
                  className="block w-full text-center py-3 text-white"
                  style={{ background: UI.brown }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
