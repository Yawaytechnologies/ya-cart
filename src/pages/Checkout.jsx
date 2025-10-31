// src/pages/Checkout.jsx
import React, { useMemo, useState } from "react";
import { useCart } from "../components/CardContext"; // <- make sure path is correct

/* --- Palette tuned to your cart visuals --- */
const UI = {
  paper: "#F5F0E9",
  block: "#FFFFFF",
  stroke: "rgba(0,0,0,0.10)",
  headStroke: "rgba(0,0,0,0.12)",
  soft: "#EFE9E2",
  text: "#2B241F",
  dim: "#807468",
  brown: "#4B3A32",
};

const fmt = (n) => `$${n.toFixed(2)}`;
const SHIPPING = [
  { id: "flat",   label: "Flat rate",    price: 20 },
  { id: "pickup", label: "Local pickup", price: 25 },
  { id: "free",   label: "Free shipping", price: 0 },
];

export default function Checkout() {
  const { items, subtotal } = useCart();

  const [ship, setShip]   = useState("flat");
  const [pay, setPay]     = useState("bank");
  const [agree, setAgree] = useState(false);

  const shipCost = useMemo(
    () => SHIPPING.find((s) => s.id === ship)?.price ?? 0,
    [ship]
  );
  const total = subtotal + shipCost;

  return (
    <main className="min-h-screen" style={{ background: UI.paper }}>
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pt-8 pb-16">
        {/* Notices */}
        <div className="space-y-4">
          <div
            className="text-sm px-5 py-3"
            style={{ border: `1px dashed ${UI.headStroke}`, color: UI.text, background: "#F7F3EE" }}
          >
            Returning customer? <button className="underline">Click here to login</button>
          </div>
          <div
            className="text-sm px-5 py-3"
            style={{ border: `1px dashed ${UI.headStroke}`, color: UI.text, background: "#F7F3EE" }}
          >
            Have a coupon? <button className="underline">Click here to enter your code</button>
          </div>
        </div>

        {/* Grid: Billing / Order */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          {/* LEFT: Billing */}
          <section
            className="p-6 md:p-8"
            style={{ background: UI.block, border: `1px solid ${UI.stroke}` }}
          >
            <h2 className="text-2xl md:text-[28px] font-semibold" style={{ color: UI.text }}>
              Billing Details
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="First Name" required />
              <Field label="Last Name" required />
              <Field label="Company name (optional)" colSpan />
              <Select
                label="Country / Region"
                options={["United States (US)", "India", "United Kingdom"]}
                colSpan
              />
              <Field label="Street address" placeholder="House Number And Street Name" colSpan />
              <Field label="" placeholder="Apartment, Suite, Unit, Etc. (Optional)" colSpan />
              <Field label="Town / City" />
              <div className="grid grid-cols-2 gap-5">
                <Select label="State / County" options={["New York US", "California US", "Texas US"]} />
                <Field label="Postcode ZIP" />
              </div>
              <Field label="Phone" required />
              <Field label="Email address" required type="email" colSpan />
            </div>

            <div className="mt-6 space-y-3">
              <Checkbox label="Create an account?" />
              <Checkbox label="Ship to a different address?" />
            </div>

            <div className="mt-6">
              <Label>Order notes (optional)</Label>
              <textarea
                className="w-full min-h-[140px] px-4 py-3 focus:outline-none"
                style={{ background: UI.soft, border: `1px solid ${UI.stroke}`, color: UI.text }}
                placeholder="Notes About Your Order, E.G. Special Notes For Delivery."
              />
            </div>
          </section>

          {/* RIGHT: Order summary (sticky) */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div style={{ background: UI.block, border: `1px solid ${UI.stroke}` }}>
              {/* Title */}
              <div className="px-6 py-5 border-b" style={{ borderColor: UI.stroke }}>
                <h3 className="text-xl font-semibold" style={{ color: UI.text }}>
                  Your Order
                </h3>
              </div>

              {/* Items */}
              <div className="px-6">
                <div
                  className="grid grid-cols-[1fr_auto] py-4 text-sm font-medium"
                  style={{ color: UI.dim, borderBottom: `1px solid ${UI.stroke}` }}
                >
                  <span>Product</span>
                  <span>Total</span>
                </div>

                {items.map((it) => (
                  <div
                    key={it.id}
                    className="grid grid-cols-[1fr_auto] py-4 text-[15px]"
                    style={{ borderBottom: `1px solid ${UI.stroke}`, color: UI.text }}
                  >
                    <span>
                      {it.title} <span className="text-[#9b8f84]">x {it.qty}</span>
                    </span>
                    <span>{fmt(it.price * it.qty)}</span>
                  </div>
                ))}

                {/* Subtotal */}
                <div
                  className="grid grid-cols-[1fr_auto] py-4"
                  style={{ borderBottom: `1px solid ${UI.stroke}`, color: UI.text }}
                >
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">{fmt(subtotal)}</span>
                </div>

                {/* Shipping radios */}
                <div className="py-4 space-y-3" style={{ borderBottom: `1px solid ${UI.stroke}` }}>
                  <div className="text-[15px] font-medium" style={{ color: UI.text }}>
                    Shipping
                  </div>
                  {SHIPPING.map((m) => (
                    <label key={m.id} className="flex items-center gap-3 text-[15px]" style={{ color: UI.text }}>
                      <input
                        type="radio"
                        name="shipping"
                        value={m.id}
                        checked={ship === m.id}
                        onChange={() => setShip(m.id)}
                        className="accent-[var(--ink,#4B3A32)]"
                      />
                      <span>
                        {m.label}: {fmt(m.price)}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Total */}
                <div
                  className="grid grid-cols-[1fr_auto] py-4 text-lg"
                  style={{ borderBottom: `1px solid ${UI.stroke}`, color: UI.text }}
                >
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-2xl">{fmt(total)}</span>
                </div>

                {/* Payment methods */}
                <div className="py-4 space-y-3 text-[15px]" style={{ color: UI.text }}>
                  <Radio id="bank"  label="Direct Bank Transfer" checked={pay === "bank"}  onChange={() => setPay("bank")} />
                  <Radio id="cheque" label="Cheque Payment"       checked={pay === "cheque"} onChange={() => setPay("cheque")} />
                  <Radio id="cod"    label="Cash on Delivery"     checked={pay === "cod"}   onChange={() => setPay("cod")} />
                  <Radio
                    id="paypal"
                    checked={pay === "paypal"}
                    onChange={() => setPay("paypal")}
                    label={
                      <span className="inline-flex items-center gap-2">
                        PayPal <BrandLogos />
                      </span>
                    }
                  />
                  <div className="pl-6">
                    <button className="underline text-[14px]">What is PayPal?</button>
                  </div>
                </div>

                {/* Agree + CTA */}
                <div className="py-5 border-t" style={{ borderColor: UI.stroke }}>
                  <label className="flex items-center gap-3 text-[15px]" style={{ color: UI.text }}>
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="accent-[var(--ink,#4B3A32)]"
                    />
                    I have read and agree to the website.
                  </label>

                  <button
                    disabled={!agree || !items.length}
                    className="w-full mt-4 h-[48px] text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: UI.brown }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ===================== small UI helpers ===================== */
function Label({ children }) {
  return (
    <label className="block mb-2 text-[15px] font-medium" style={{ color: UI.text }}>
      {children}
    </label>
  );
}

function Field({ label = "", placeholder = label, type = "text", required = false, colSpan = false }) {
  return (
    <div className={colSpan ? "md:col-span-2" : ""}>
      {label && (
        <Label>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-12 px-4 focus:outline-none"
        style={{ background: UI.soft, border: `1px solid ${UI.stroke}`, color: UI.text }}
      />
    </div>
  );
}

function Select({ label, options = [], colSpan = false }) {
  return (
    <div className={colSpan ? "md:col-span-2" : ""}>
      <Label>{label}</Label>
      <select
        className="w-full h-12 px-4 appearance-none focus:outline-none"
        style={{
          backgroundColor: UI.soft,
          border: `1px solid ${UI.stroke}`,
          color: UI.text,
          // single chevron icon
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='%2378746a' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "18px 18px",
          paddingRight: "42px",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label }) {
  return (
    <label className="flex items-center gap-3 text-[15px]" style={{ color: UI.text }}>
      <input type="checkbox" className="accent-[var(--ink,#4B3A32)]" />
      {label}
    </label>
  );
}

function Radio({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center gap-3">
      <input id={id} type="radio" name="payment" checked={checked} onChange={onChange} className="accent-[var(--ink,#4B3A32)]" />
      <span>{label}</span>
    </label>
  );
}

/* ===================== Payment brand SVGs ===================== */
function BrandLogos() {
  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <VisaLogo />
      <MastercardLogo />
      <AmexLogo />
      <DiscoverLogo />
      <PayPalWordmark />
    </span>
  );
}

function VisaLogo({ w = 36, h = 22 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 60 38" role="img" aria-label="Visa">
      <rect width="60" height="38" rx="3" fill="#1A1F71" />
      <path fill="#fff" d="M12.6 26.8l3-15.6h4l-3 15.6h-4zm17.2-15.6h3.8l2.3 15.6h-3.6l-.3-3.1h-4.4l-.9 3.1h-3.4l6.5-15.6zm1.5 9.3l-.5-5.3-1.9 5.3h2.4zm10.7-9.3c1.6 0 3 .3 3.8.6l-.6 3c-.7-.3-1.8-.6-3.1-.6-1.7 0-3.1.7-3.1 1.8 0 .8 1 1.3 2.3 2 2.1 1.1 4 2.5 4 5.3 0 3.8-3.5 6-8.2 6-2 0-4.2-.5-5.4-1.1l.7-3.2a11 11 0 004.6 1c1.8 0 3.6-.7 3.6-2 0-.9-.9-1.6-2.4-2.3-2.1-1.1-3.8-2.5-3.8-5.1 0-3.5 3.2-5.4 7.6-5.4zM9.3 11.2h4.2L10 26.8H6L3.5 13.9c-.2-1.1-.9-2-1.9-2.5A12 12 0 000 10.5v-.3h6.8c.9 0 1.6.6 1.8 1.5l.7 3.9L9.3 11.2z"/>
    </svg>
  );
}
function MastercardLogo({ w = 36, h = 22 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 60 38" role="img" aria-label="Mastercard">
      <rect width="60" height="38" rx="3" fill="#fff" stroke="#DADADA"/>
      <circle cx="26" cy="19" r="9" fill="#EB001B"/>
      <circle cx="34" cy="19" r="9" fill="#F79E1B"/>
      <path d="M29 10a9 9 0 000 18 9 9 0 000-18z" fill="#FF5F00"/>
    </svg>
  );
}
function AmexLogo({ w = 36, h = 22 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 60 38" role="img" aria-label="American Express">
      <rect width="60" height="38" rx="3" fill="#2E77BC" />
      <text x="30" y="24" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif">
        AMEX
      </text>
    </svg>
  );
}
function DiscoverLogo({ w = 36, h = 22 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 60 38" role="img" aria-label="Discover">
      <rect width="60" height="38" rx="3" fill="#fff" stroke="#DADADA"/>
      <circle cx="38" cy="19" r="8" fill="#F58220"/>
      <text x="18" y="22" fill="#231F20" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif">
        DISC
      </text>
    </svg>
  );
}
function PayPalWordmark({ w = 44, h = 22 }) {
  return (
    <svg width={w} height={h} viewBox="0 0 84 42" role="img" aria-label="PayPal">
      <rect width="84" height="42" rx="3" fill="#fff" stroke="#DADADA"/>
      <path fill="#003087" d="M24 30h8c6 0 10-3 10-9 0-5-3-8-9-8h-6l-3 17z"/>
      <path fill="#009CDE" d="M31 13h6c2 0 4 .4 5.3 1.2-1.4 7.5-6.3 9.2-11.3 9.2H28l3-10.4z"/>
      <text x="56" y="26" fill="#003087" fontSize="14" fontFamily="Arial,Helvetica,sans-serif" fontWeight="700">PayPal</text>
    </svg>
  );
}
