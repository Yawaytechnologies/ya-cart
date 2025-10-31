// src/components/ReviewsMarqueeFixed.jsx
import React, { useEffect, useId } from "react";

export default function ReviewsMarqueeFixed({
  title = "CUSTOMER REVIEWS",
  speed = 28,   // px/sec
  gap = 32,     // px between cards
  pauseOnHover = true,
}) {
  const uid = useId();

  // keyframes per instance
  useEffect(() => {
    const id = `kf-${uid}`;
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes move-${uid} {
        from { transform: translateX(0); }
        to   { transform: translateX(calc(-1 * var(--chunk-${uid}))); }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [uid]);

  const REVIEWS = [
    { name: "Mark Lee", text: "I'm always impressed by Jordan's commitment – he listens, understands, and consistently exceeds expectations.", stars: 5, emoji: "🐼" },
    { name: "Farhan Firoz", text: "Noah made everything easy – his calm attitude and expertise kept the project on track and stress-free.", stars: 5, emoji: "🧔" },
    { name: "Paul Ray", text: "David brings a level of professionalism and passion that's rare – I couldn't be more pleased with the outcome.", stars: 5, emoji: "🧑🏾‍🎤" },
    { name: "James Fox", text: "Working with Amanda has been a joy – she's attentive, talented, and truly cares about delivering great results.", stars: 5, emoji: "🦊" },
  ];

  // measure exact width of strip A for a perfect loop
  useEffect(() => {
    const wrap = document.querySelector(`[data-wrap="${uid}"]`);
    const trackA = wrap?.querySelector(`[data-track-a="${uid}"]`);
    if (!wrap || !trackA) return;
    const ro = new ResizeObserver(() => {
      const w = trackA.getBoundingClientRect().width;
      wrap.style.setProperty(`--chunk-${uid}`, `${w}px`);
      const dur = Math.max(8, w / speed); // seconds
      wrap.style.setProperty("--dur", `${dur}s`);
    });
    ro.observe(trackA);
    return () => ro.disconnect();
  }, [uid, speed]);

  return (
    <section className="w-full bg-[#F6EEE5]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-16">
        <h2 className="text-[24px] md:text-[28px] font-semibold tracking-wide text-[#5A4638] mb-8">
          {title}
        </h2>

        <div
          data-wrap={uid}
          className={[
            "relative overflow-hidden",
            pauseOnHover ? "hover:[&_.track]:[animation-play-state:paused]" : "",
          ].join(" ")}
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 60px, rgba(0,0,0,1) calc(100% - 60px), rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 60px, rgba(0,0,0,1) calc(100% - 60px), rgba(0,0,0,0) 100%)",
            [`--chunk-${uid}`]: "1200px", // fallback until measured
            ["--dur"]: "12s",
          }}
        >
          <div
            className="track inline-flex items-stretch whitespace-nowrap"
            style={{ animation: `move-${uid} var(--dur) linear infinite` }}
          >
            {/* Strip A with paddingRight = gap -> ensures spacing at the seam */}
            <Strip
              uid={uid}
              dataAttr="a"
              reviews={REVIEWS}
              gap={gap}
              padEnd
            />
            {/* Duplicate strip */}
            <Strip
              uid={uid}
              dataAttr="b"
              reviews={REVIEWS}
              gap={gap}
              ariaHidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function Strip({ uid, dataAttr, reviews, gap, padEnd = false, ariaHidden = false }) {
  return (
    <div
      data-track-a={dataAttr === "a" ? uid : undefined}
      aria-hidden={ariaHidden}
      className="inline-flex items-stretch"
      style={{
        gap: `${gap}px`,
        ...(padEnd ? { paddingRight: `${gap}px` } : null), // <-- seam gap fix
      }}
    >
      {reviews.map((r, i) => (
        <ReviewCard key={`${dataAttr}-${i}`} review={r} />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const { name, text, stars = 5, emoji = "🙂" } = review;
  const STARS = "★★★★★".slice(0, Math.min(5, Math.max(0, stars)));

  return (
    <article
      className="
        min-w-[520px] max-w-[560px]
        bg-[#EFE6DC]
        ring-1 ring-black/5
        shadow-[0_4px_18px_rgba(0,0,0,0.06)]
        px-8 py-10
      "
    >
      <div className="text-[#B67761] text-xl mb-4" aria-hidden="true">
        {STARS}
      </div>

      {/* 2-line clamp to keep text inside */}
      <p
        className="text-[#3B2F28] text-[18px] leading-8 break-words"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
        title={text}
      >
        {text}
      </p>

      {/* Author pill (no overlap) */}
      <div
        className="
          mt-8 inline-flex items-center gap-3
          bg-white/85 rounded-full ring-1 ring-black/5
          px-4 py-2
          max-w-[70%]
        "
      >
        <span className="h-7 w-7 rounded-full grid place-items-center text-[14px] bg-[#F4D8C9] shrink-0">
          {emoji}
        </span>
        <span className="text-[#4A3C32] text-[15px] font-medium truncate">
          {name}
        </span>
      </div>
    </article>
  );
}
