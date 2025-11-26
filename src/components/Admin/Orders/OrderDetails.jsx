// src/pages/Admin/OrderDetails.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockOrder = {
  id: "#6011",
  status: "Completed",
  date: "24 Nov 2025",
  time: "6:50 am",
  customer: {
    name: "Lucian Obrien",
    email: "ashlynn.ohara62@gmail.com",
    ip: "192.158.1.38",
    avatar: "https://i.pravatar.cc/120?img=3",
  },
  product: {
    name: "Urban Explorer Sneakers",
    sku: "16H9U0RD",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    qty: 1,
    price: 83.74,
  },
  summary: {
    subtotal: 83.74,
    shipping: -10,
    discount: -10,
    taxes: 10,
    total: 73.74,
  },
  delivery: {
    shipBy: "DHL",
    speed: "Standard",
    tracking: "SPX037739199373",
  },
  shippingAddress:
    "19034 Verna Unions Apt. 164\nHonolulu, HI 97835\nUnited States",
  phone: "365-374-4961",
  payment: {
    brand: "Mastercard",
    last4: "5678",
  },
  historyLeft: [
    { label: "Delivery successful", date: "24 Nov 2025 6:50 am" },
    { label: "Transporting [2]", date: "24 Nov 2025 6:50 am" },
    { label: "Transporting [1]", date: "24 Nov 2025 6:50 am" },
    { label: "The shipping unit has picked up the goods", date: "24 Nov 2025 6:50 am" },
    { label: "Order has been created", date: "24 Nov 2025 6:50 am" },
  ],
  historyRight: [
    "Order placed",
    "Payment time",
    "Picking goods",
    "Delivery time for the carrier",
    "Completion time",
  ],
};

const statusOptions = ["Completed", "Pending", "Refunded", "Cancelled"];

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const order = mockOrder;
  const displayId = orderId ? `#${orderId}` : order.id;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-7">
      {/* Top bar: back + header actions */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-2 text-sm text-slate-400 hover:text-orange-500 flex items-center gap-1"
          >
            <span className="text-base">←</span>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-900">
              Order {displayId}
            </h1>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              {order.status}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1.5">
            {order.date} {order.time}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* status select pill */}
          <select className="text-sm rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm">
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-orange-300 hover:text-orange-700">
            🖨 Print
          </button>

          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            ✎ Edit
          </button>
        </div>
      </div>

      {/* Main grid: left big column / right side cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Details + History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">
                Details
              </h2>
              <button className="text-sm text-slate-400 hover:text-orange-500">
                ✎
              </button>
            </div>

            <div className="flex items-center justify-between gap-6 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-slate-100 overflow-hidden">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-base font-medium text-slate-900">
                    {order.product.name}
                  </p>
                  <p className="text-sm text-slate-500">{order.product.sku}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 text-base">
                <span className="text-slate-600">x{order.product.qty}</span>
                <span className="font-semibold text-slate-900">
                  ${order.product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* summary */}
            <div className="mt-5 space-y-2 text-base">
              <SummaryRow label="Subtotal" value={order.summary.subtotal} />
              <SummaryRow label="Shipping" value={order.summary.shipping} negative />
              <SummaryRow label="Discount" value={order.summary.discount} negative />
              <SummaryRow label="Taxes" value={order.summary.taxes} />

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-base font-semibold">
                <span className="text-slate-900">Total</span>
                <span className="text-slate-900">
                  ${order.summary.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* History card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-5">
              History
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {/* Timeline on left */}
              <div className="space-y-4">
                {order.historyLeft.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="pt-1.5">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                      </span>
                    </div>
                    <div>
                      <p className="text-sm md:text-base text-slate-900">
                        {item.label}
                      </p>
                      <p className="text-xs md:text-sm text-slate-500">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}

                <button className="mt-1 text-sm text-slate-400 hover:text-orange-500">
                  Show more ▾
                </button>
              </div>

              {/* Side summary card */}
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-sm md:text-base text-slate-600 space-y-2">
                <p className="font-semibold mb-1.5">Order timeline</p>
                {order.historyRight.map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Customer / Delivery / Shipping / Payment */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">
                Customer
              </h2>
              <button className="text-sm text-slate-400 hover:text-orange-500">
                ✎
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={order.customer.avatar}
                alt={order.customer.name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-medium text-slate-900">
                  {order.customer.name}
                </p>
                <p className="text-sm text-slate-600">
                  {order.customer.email}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  IP address: {order.customer.ip}
                </p>
              </div>
            </div>

            <button className="mt-2 text-xs font-semibold text-rose-500 hover:text-rose-600">
              + Add to blacklist
            </button>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-sm md:text-base">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">
                Delivery
              </h2>
              <button className="text-sm text-slate-400 hover:text-orange-500">
                ✎
              </button>
            </div>

            <DetailRow label="Ship by" value={order.delivery.shipBy} />
            <DetailRow label="Speed" value={order.delivery.speed} />
            <DetailRow
              label="Tracking No."
              value={order.delivery.tracking}
              link
            />
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-sm md:text-base">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">
                Shipping
              </h2>
              <button className="text-sm text-slate-400 hover:text-orange-500">
                ✎
              </button>
            </div>

            <p className="text-[11px] md:text-xs uppercase tracking-[0.14em] text-slate-400 mb-1.5">
              Address
            </p>
            <p className="text-sm md:text-base text-slate-700 whitespace-pre-line mb-4">
              {order.shippingAddress}
            </p>

            <p className="text-[11px] md:text-xs uppercase tracking-[0.14em] text-slate-400 mb-1.5">
              Phone number
            </p>
            <p className="text-sm md:text-base text-slate-700">
              {order.phone}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-sm md:text-base">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">
                Payment
              </h2>
              <button className="text-sm text-slate-400 hover:text-orange-500">
                ✎
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-slate-900">
                  •••• •••• •••• {order.payment.last4}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {order.payment.brand}
                </p>
              </div>
              <span className="inline-flex h-7 w-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper components */

const SummaryRow = ({ label, value, negative }) => (
  <div className="flex items-center justify-between text-sm md:text-base">
    <span className="text-slate-600">{label}</span>
    <span
      className={
        negative ? "text-rose-500 font-medium" : "text-slate-900 font-medium"
      }
    >
      {negative ? "-" : ""}
      ${Math.abs(value).toFixed(2)}
    </span>
  </div>
);

const DetailRow = ({ label, value, link }) => (
  <div className="mb-3">
    <p className="text-[11px] md:text-xs uppercase tracking-[0.14em] text-slate-400 mb-0.5">
      {label}
    </p>
    {link ? (
      <a
        href="#"
        className="text-sm md:text-base text-sky-600 hover:text-sky-500 underline underline-offset-2"
      >
        {value}
      </a>
    ) : (
      <p className="text-sm md:text-base text-slate-700">{value}</p>
    )}
  </div>
);

export default OrderDetails;
