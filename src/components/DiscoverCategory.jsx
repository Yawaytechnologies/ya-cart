// src/components/DiscoverCategory.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  PiCouchLight,
  PiBedLight,
  PiTableLight,
  PiChairLight,
  PiLampPendantLight,
} from "react-icons/pi";

export default function DiscoverCategory({ onSelect }) {
  const items = [
    { label: "Sofas",  Icon: PiCouchLight },
    { label: "Beds",   Icon: PiBedLight },
    { label: "Tables", Icon: PiTableLight },
    { label: "Chairs", Icon: PiChairLight },
    { label: "Lights", Icon: PiLampPendantLight },
    { label: "Stands", Icon: PiTableLight },
  ];

  const gridRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <p
          className={`text-xs md:text-sm tracking-[0.2em] uppercase text-[#8A7060]
                      transform-gpu transition-all ease-out
                      ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ transitionDuration: "500ms" }}
        >
          [ Shop Smart, Shop Sorted ]
        </p>

        <h2
          className={`mt-3 text-3xl md:text-5xl font-semibold text-[#4B382E]
                      transform-gpu transition-all ease-out
                      ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDuration: "550ms", transitionDelay: revealed ? "120ms" : "0ms" }}
        >
          Discover by Category
        </h2>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-2"
        >
          {items.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => onSelect?.(item.label)}
              className={`group relative flex flex-col items-center justify-center
                          aspect-square w-full rounded-none border bg-[#F4F1EA]
                          transition-all ease-out transform-gpu will-change-transform
                          duration-100 hover:-translate-y-2 md:hover:-translate-y-3
                          hover:bg-[#E9E1D4] hover:shadow-lg md:hover:shadow-xl
                          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                borderColor: "#C8BEB2",
                transitionDuration: revealed ? "500ms" : "200ms",
                transitionDelay: revealed ? `${idx * 90}ms` : "0ms",
              }}
            >
              <item.Icon
                className="text-[42px] md:text-[48px] transition-transform duration-150 group-hover:-translate-y-0.5"
                style={{ color: "#5C4336" }}
                aria-hidden="true"
              />
              <span className="mt-4 text-sm md:text-base font-medium text-[#6B5A4E]">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-[#C8BEB2]" />
    </section>
  );
}
