// src/components/DiscoverByCategory.jsx
import React from "react";
import {
  PiCouchLight,         // Sofas
  PiBedLight,           // Beds
  PiTableLight,         // Tables
  PiChairLight,         // Chairs
  PiLampPendantLight,   // Lights
} from "react-icons/pi";

/**
 * Props:
 * - activeIndex?: number   // which tile shows the red dot (e.g., 1 for "Beds")
 * - onSelect?: (label)=>void
 */
export default function DiscoverByCategory({ activeIndex = -1, onSelect }) {
  const items = [
    { label: "Sofas",  Icon: PiCouchLight },
    { label: "Beds",   Icon: PiBedLight },
    { label: "Tables", Icon: PiTableLight },
    { label: "Chairs", Icon: PiChairLight },
    { label: "Lights", Icon: PiLampPendantLight },
    { label: "Stands", Icon: PiTableLight }, // close match to your round stand
  ];

  return (
    <section className="w-full bg-[#F8F4ED]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#8A7060]">
          [ Shop Smart, Shop Sorted ]
        </p>

        <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-[#4B382E]">
          Discover by Category
        </h2>

        {/* Tiles */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {items.map(({ label, Icon }, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelect?.(label)}
              className="relative flex flex-col items-center justify-center h-40
                         rounded-md border border-[#E7DDCF] bg-[#F8F4ED]/60
                         px-6 transition-all
                         hover:bg-[#E8E3DB] hover:border-[#DCCFBE]
                         focus:outline-none focus:ring-2 focus:ring-[#D7C8B7]/60"
            >
              {/* red dot indicator (like your screenshot) */}
              {activeIndex === idx && (
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: "#FF8A73",
                    boxShadow: "0 0 0 3px rgba(248,244,237,1)", // halo on cream bg
                  }}
                />
              )}

              <Icon
                className="text-[42px] md:text-[48px]"
                style={{ color: "#5C4336" }}
                aria-hidden="true"
              />
              <span className="mt-5 text-sm md:text-base font-medium text-[#6B5A4E]">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* full-width bottom hairline same as reference */}
      <div className="w-full border-t border-[#E7DDCF]" />
    </section>
  );
}
