// src/pages/Admin/InvoiceDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const INVOICE_DATA = {
  "INV-1991": {
    id: "INV-1991",
    status: "Paid",
    statusTone:
      "bg-orange-50 text-orange-700 border border-orange-100",
    createdAt: "24 Nov 2025 6:50 am",
    dueDate: "11 Dec 2025",
    from: {
      name: "Lucian Obrien",
      address: "147 Rohan Drive Suite 819, Burlington, VT / 82021",
      phone: "+1 416-555-0198",
    },
    to: {
      name: "Deja Brady",
      address:
        "18605 Thompson Circle Apt. 086, Idaho Falls, WV / 55037",
      phone: "+44 20 7946 0958",
    },
    items: [
      {
        idx: 1,
        name: "Urban Explorer Sneakers",
        desc: "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
        qty: 11,
        unitPrice: 83.74,
      },
      {
        idx: 2,
        name: "Classic Leather Loafers",
        desc: "She eagerly opened the gift, her eyes sparkling with excitement.",
        qty: 10,
        unitPrice: 97.14,
      },
      {
        idx: 3,
        name: "Mountain Trekking Boots",
        desc: "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
        qty: 7,
        unitPrice: 68.71,
      },
    ],
    summary: {
      subtotal: 2373.51,
      shipping: -52.17,
      discount: -85.21,
      taxes: 68.76,
      total: 2304.84,
    },
    notes:
      "We appreciate your business. Should you need us to add VAT or extra notes let us know!",
    supportEmail: "support@minimalis.co",
  },
};

/* ---------- Small SVG icons (professional, no emoji) ---------- */

const IconEdit = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      d="M5 19h3l9-9-3-3-9 9v3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m14 5 2-2 3 3-2 2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPrint = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <rect
      x="6"
      y="8"
      width="12"
      height="10"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 6h8v2H8zM8 15h8M8 18h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      d="M12 4v10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="m8 11 4 4 4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 18h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconShare = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <circle
      cx="7"
      cy="12"
      r="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="17"
      cy="6"
      r="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="17"
      cy="18"
      r="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9 11l6-4M9 13l6 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const invoice =
    INVOICE_DATA[invoiceId || ""] || INVOICE_DATA["INV-1991"];

  if (!invoice) {
    return (
      <div className="w-full max-w-4xl mx-auto py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-base text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-4"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>
        <p className="text-slate-600 text-base">
          Invoice not found. Please go back to the invoice list.
        </p>
      </div>
    );
  }

  const { items, summary } = invoice;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top bar: back + breadcrumb + actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <button
            onClick={() => navigate(-1)}
            className="text-base text-slate-600 hover:text-slate-900 flex items-center gap-2"
          >
            <span className="text-xl leading-none">←</span>
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <span>Dashboard</span>
            <span>•</span>
            <span>Invoice</span>
            <span>•</span>
            <span className="text-orange-500 font-medium">
              {invoice.id}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status select (visual) */}
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700">
            <span>{invoice.status}</span>
            <span className="text-[11px] text-slate-400">▾</span>
          </button>

          {/* Icon actions */}
          <div className="flex items-center gap-1.5">
            <HeaderIconButton label="Edit">
              <IconEdit />
            </HeaderIconButton>
            <HeaderIconButton label="Print">
              <IconPrint />
            </HeaderIconButton>
            <HeaderIconButton label="Download">
              <IconDownload />
            </HeaderIconButton>
            <HeaderIconButton label="Share">
              <IconShare />
            </HeaderIconButton>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-8 space-y-7">
        {/* Header row: logo + status + id */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Peach logo */}
          <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-orange-300 via-orange-400 to-rose-400 text-white font-semibold text-lg">
            M
          </div>

          <div className="flex items-center gap-3 md:gap-4 md:ml-auto">
            <span
              className={
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold " +
                invoice.statusTone
              }
            >
              {invoice.status}
            </span>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Invoice
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-900">
                {invoice.id}
              </div>
            </div>
          </div>
        </div>

        {/* From / To / Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-5">
          {/* Invoice from / to */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1 text-sm sm:text-base">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-1">
                Invoice from
              </div>
              <div className="font-semibold text-slate-900">
                {invoice.from.name}
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                {invoice.from.address}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Phone: {invoice.from.phone}
              </p>
            </div>

            <div className="space-y-1 text-sm sm:text-base">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-1">
                Invoice to
              </div>
              <div className="font-semibold text-slate-900">
                {invoice.to.name}
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                {invoice.to.address}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Phone: {invoice.to.phone}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6 text-sm sm:text-base mt-2 md:mt-0">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-1">
                Date created
              </div>
              <div className="text-slate-900">
                {invoice.createdAt.split(" ").slice(0, 3).join(" ")}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">
                {invoice.createdAt.split(" ").slice(3).join(" ")}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-1">
                Due date
              </div>
              <div className="text-slate-900">
                {invoice.dueDate}
              </div>
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden">
          {/* Desktop head */}
          <div className="hidden md:grid grid-cols-[50px_minmax(0,4fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] bg-slate-50/70 text-xs font-medium text-slate-400 px-4 py-2.5">
            <div>#</div>
            <div>Description</div>
            <div className="text-right">Qty</div>
            <div className="text-right">Unit price</div>
            <div className="text-right">Total</div>
          </div>

          {/* Desktop rows */}
          <div className="hidden md:block divide-y divide-slate-100">
            {items.map((item) => {
              const total = item.qty * item.unitPrice;
              return (
                <div
                  key={item.idx}
                  className="grid grid-cols-[50px_minmax(0,4fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] px-4 py-3.5 text-sm sm:text-base items-start"
                >
                  <div className="text-xs text-slate-500">
                    {item.idx}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {item.name}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 line-clamp-1">
                      {item.desc}
                    </div>
                  </div>
                  <div className="text-right text-slate-700">
                    {item.qty}
                  </div>
                  <div className="text-right text-slate-700">
                    ${item.unitPrice.toFixed(2)}
                  </div>
                  <div className="text-right font-semibold text-slate-900">
                    ${total.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile layout */}
          <div className="md:hidden divide-y divide-slate-100">
            {items.map((item) => {
              const total = item.qty * item.unitPrice;
              return (
                <div
                  key={item.idx}
                  className="px-4 py-3 text-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      #{item.idx}
                    </span>
                    <span className="text-xs text-slate-500">
                      Qty: {item.qty}
                    </span>
                  </div>
                  <div className="font-medium text-slate-900">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.desc}
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5">
                    <span className="text-slate-500">
                      Unit: ${item.unitPrice.toFixed(2)}
                    </span>
                    <span className="font-semibold text-slate-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-end gap-4 md:gap-8">
          <div className="md:w-80 md:ml-auto space-y-1.5 text-sm sm:text-base">
            <SummaryRow label="Subtotal" value={summary.subtotal} />
            <SummaryRow
              label="Shipping"
              value={summary.shipping}
              negative
            />
            <SummaryRow
              label="Discount"
              value={summary.discount}
              negative
            />
            <SummaryRow label="Taxes" value={summary.taxes} />
            <div className="border-top border-slate-100 pt-2 mt-1" />
            <div className="border-t border-slate-100 pt-2 mt-1">
              <SummaryRow
                label="Total"
                value={summary.total}
                bold
                big
              />
            </div>
          </div>
        </div>

        {/* Notes + support */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs sm:text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-1">
              Notes
            </div>
            <p className="text-slate-600">{invoice.notes}</p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-1">
              Have a question?
            </div>
            <p className="text-slate-600">
              {invoice.supportEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- helper components ---- */

const HeaderIconButton = ({ children, label }) => (
  <button
    type="button"
    className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50/60 transition"
    aria-label={label}
  >
    {children}
  </button>
);

const SummaryRow = ({ label, value, negative, bold, big }) => {
  const isNegative = negative || value < 0;
  const formatted = `$${Math.abs(value).toFixed(2)}`;
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500 text-sm sm:text-base">
        {label}
      </span>
      <span
        className={[
          "text-sm sm:text-base",
          bold && "font-semibold",
          big && "text-base sm:text-lg",
          isNegative ? "text-rose-500" : "text-slate-900",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isNegative ? "-" : ""}
        {formatted}
      </span>
    </div>
  );
};

export default InvoiceDetails;
