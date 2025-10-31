// src/components/StoreBenefits.jsx
import React from "react";

/* Exact content & layout like the screenshot.
   - Pure Tailwind (no external icons needed — inline SVG).
   - Responsive: stacks on mobile, 3 columns on md+.
*/
export default function StoreBenefits() {
  const items = [
    {
      title: "Fast & free shipping",
      desc:
        "Every single order ships for free. No minimums, no tiers, no fine print whatsoever.",
      Icon: BoxIcon,
    },
    {
      title: "Secure payment",
      desc:
        "Pay with the world's most popular and secure payment methods.",
      Icon: CardIcon,
    },
    {
      title: "Flexible & Easy Return",
      desc:
        "Not happy? Return it within 30 days for a full refund.",
      Icon: RefreshIcon,
    },
  ];

  return (
    <section className="w-full bg-[#FBF5EE]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="grid items-start gap-12 md:grid-cols-3 md:gap-10">
          {items.map(({ title, desc, Icon }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto mb-6 h-12 w-12 text-[#3E3127]" />
              <h3 className="text-[26px] leading-tight md:text-[28px] font-semibold text-[#3E3127]">
                {title}
              </h3>
              <p className="mx-auto mt-4 max-w-[420px] text-[18px] leading-8 text-[#5a4a3f]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Optional thin divider so the next section snaps right up */}
      <div className="w-full border-t border-[#C8BEB2]" />
    </section>
  );
}

/* ------- Inline SVG icons (stroke, warm tone) ------- */

function BoxIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7.5l-9-4.5-9 4.5 9 4.5 9-4.5Z" />
      <path d="M3 7.5V17a2 2 0 0 0 1.1 1.8l7.9 3.7 7.9-3.7A2 2 0 0 0 21 17V7.5" />
      <path d="M12 12v10" />
    </svg>
  );
}

function CardIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 9h20" />
      <path d="M16.5 15.5l1.75 1.75L21 14.5" />
    </svg>
  );
}

function RefreshIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 1-15.3 6.4M3 12A9 9 0 0 1 18.3 5.6" />
      <path d="M3 12v-4M3 8h4" />
      <path d="M21 12v4m0-4h-4" />
    </svg>
  );
}
