// src/components/ShopGram.jsx
import React, { useEffect, useId } from "react";

/* Replace with your local images */
import G1 from "../assets/chhair.jpg";
import G2 from "../assets/chhair-1.jpg";
import G3 from "../assets/chhair-6.jpg";
import G4 from "../assets/chhair-4.jpg";
import G5 from "../assets/chhair-5.jpg";
import G6 from "../assets/chhair-6.jpg";
import G7 from "../assets/chhair-7.jpg";
import G8 from "../assets/chhair-6.jpg";
import G9 from "../assets/chhair-4.jpg";
import G10 from "../assets/chhair-3.jpg";
import G11 from "../assets/chhair-5.jpg";
import G12 from "../assets/chhair-6.jpg";

const IMAGES = [G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, G11, G12];

export default function ShopGram() {
  const uid = useId();

  /* ---------- keyframes (unique per instance) ---------- */
  useEffect(() => {
    const id = `shopgram-kf-${uid}`;
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes shopgram-move-${uid} {
        from { transform: translateX(0); }
        to   { transform: translateX(calc(-1 * var(--strip-width-${uid}))); }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [uid]);

  /* ---------- measure strip A to set distance + duration ---------- */
  useEffect(() => {
    const wrap = document.querySelector(`[data-wrap="${uid}"]`);
    const stripA = wrap?.querySelector(`[data-strip-a="${uid}"]`);
    if (!wrap || !stripA) return;

    const ro = new ResizeObserver(() => {
      const w = Math.round(stripA.getBoundingClientRect().width);
      wrap.style.setProperty(`--strip-width-${uid}`, `${w}px`);
      const pxPerSec = 110;
      const dur = Math.max(6, w / pxPerSec);
      wrap.style.setProperty("--dur", `${dur}s`);
    });
    ro.observe(stripA);
    return () => ro.disconnect();
  }, [uid]);

  /* ---------- layout tuning ---------- */
  const CARD_W = 320;
  const CARD_H = 300;
  const SHOW_EDGE_FADE = false;

  return (
    <section className="w-full bg-[#F6EEE5] pb-0 mb-0">
      {/* Title block (gap below words only) */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-12 md:pt-16">
        <h2 className="text-center text-[36px] md:text-[44px] font-semibold leading-tight text-[#4B3A2E]">
          Shop Gram
        </h2>
        <p className="mt-3 text-center text-[16px] md:text-[18px] text-[#6A5A4F] mb-6 md:mb-8">
          Here's some of our most popular products people are in love with.
        </p>
      </div>

      {/* Viewport — NO gap below (attaches to next component) */}
      <div
        data-wrap={uid}
        className="relative mx-auto max-w-[1400px] overflow-hidden mb-0 pb-0"
        style={{
          ...(SHOW_EDGE_FADE && {
            WebkitMaskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 60px, rgba(0,0,0,1) calc(100% - 60px), rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 60px, rgba(0,0,0,1) calc(100% - 60px), rgba(0,0,0,0) 100%)",
          }),
          // fallback (overwritten after measure)
          [`--strip-width-${uid}`]: "1200px",
          "--dur": "46s",
        }}
      >
        <div
          className="whitespace-nowrap"
          style={{
            display: "inline-flex",
            animation: `shopgram-move-${uid} var(--dur) linear infinite`,
          }}
        >
          <Strip uid={uid} dataAttr="a" images={IMAGES} cardW={CARD_W} cardH={CARD_H} />
          <Strip uid={uid} dataAttr="b" images={IMAGES} cardW={CARD_W} cardH={CARD_H} ariaHidden />
        </div>
      </div>
      {/* no spacer here */}
    </section>
  );
}

/* ---------- Sub-strip ---------- */
function Strip({ uid, dataAttr, images, cardW, cardH, ariaHidden = false }) {
  return (
    <div
      data-strip-a={dataAttr === "a" ? uid : undefined}
      aria-hidden={ariaHidden}
      className="flex flex-nowrap"
      style={{ gap: "0px", lineHeight: 0 }}
    >
      {images.map((src, i) => (
        <div
          key={`${dataAttr}-${i}`}
          className="relative overflow-hidden shrink-0"
          style={{ width: `${cardW}px`, height: `${cardH}px` }}
        >
          <img
            src={src}
            alt=""
            draggable="false"
            loading="lazy"
            className="absolute inset-0 block w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
