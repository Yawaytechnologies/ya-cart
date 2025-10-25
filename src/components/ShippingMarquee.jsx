// src/components/ShippingMarquee.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ShippingMarquee
 * - Infinite, gap-less, left-moving marquee.
 * - Self-contained: injects its own CSS/keyframes.
 */
export default function ShippingMarquee({
  items = ["Free Shipping for all orders over $500"],
  speed = 140,
  gap = 56,
  height = 50,
  background = "#E9E1D4",
  textStyle = { fontSize: 15, fontWeight: 600, letterSpacing: 0.2 },
  showBorders = true,
  borderColor = "#D9CFC2",          // <-- changed default to black
  borderWidth = 1,               // <-- new: control thickness (px)
}) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);

  const baseItems = useMemo(() => (items && items.length ? items : [" "]), [items]);
  const [copiesPerTrack, setCopiesPerTrack] = useState(2);
  const [durationSec, setDurationSec] = useState(20);
  const [ready, setReady] = useState(false);

  // Inject component-scoped CSS once
  useEffect(() => {
    if (!document.getElementById("smq-styles")) {
      const style = document.createElement("style");
      style.id = "smq-styles";
      style.textContent = `
        @keyframes smq-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .smq-wrap { position: relative; overflow: hidden; width: 100%; }
        .smq-inner { position: absolute; inset: 0; display: flex; align-items: center; will-change: transform; }
        .smq-track { display: flex; align-items: center; white-space: nowrap; flex: none; }
        .smq-measure { position: absolute; left: 0; top: 0; visibility: hidden; z-index: -1; display: flex; white-space: nowrap; }
        .smq-item { flex: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Compute repeats & duration from actual content width
  useEffect(() => {
    const calc = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      const containerW = container.clientWidth || 1;
      const groupW = measure.scrollWidth || 1; // width of one "group" (one copy)

      // Make one track wider than container => no dead zone
      const repeats = Math.max(2, Math.ceil(containerW / groupW) + 1);
      setCopiesPerTrack(repeats);

      // Distance traveled per loop = one track width
      const trackWidth = repeats * groupW;
      const secs = Math.max(4, Math.round((trackWidth / speed) * 100) / 100);
      setDurationSec(secs);

      setReady(true);
    };

    calc();

    // Resize observer (fallback to window resize)
    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(calc);
      if (containerRef.current) ro.observe(containerRef.current);
    } else {
      window.addEventListener("resize", calc);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", calc);
    };
  }, [baseItems, speed]);

  const Track = ({ hidden = false }) => (
    <ul className="smq-track" style={{ columnGap: `${gap}px` }} aria-hidden={hidden ? "true" : undefined}>
      {Array.from({ length: copiesPerTrack }).map((_, r) =>
        baseItems.map((it, i) => (
          <li key={`${r}-${i}`} className="smq-item" style={textStyle}>
            {typeof it === "string" ? <span>{it}</span> : it}
          </li>
        ))
      )}
    </ul>
  );

  return (
    <div
      ref={containerRef}
      className="smq-wrap"
      style={{
        height,
        background,
        borderTop:  showBorders ? `${borderWidth}px solid ${borderColor}` : "none",
        borderBottom: showBorders ? `${borderWidth}px solid ${borderColor}` : "none",
        boxSizing: "border-box",
      }}
    >
      {/* Hidden measurer (one copy) */}
      <ul ref={measureRef} className="smq-measure" style={{ columnGap: `${gap}px` }}>
        {baseItems.map((it, i) => (
          <li key={`m-${i}`} className="smq-item" style={textStyle}>
            {typeof it === "string" ? <span>{it}</span> : it}
          </li>
        ))}
      </ul>

      {/* Moving container with two identical tracks for seamless loop */}
      <div
        className="smq-inner"
        style={ready ? { animation: `smq-marquee ${durationSec}s linear infinite` } : undefined}
      >
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
