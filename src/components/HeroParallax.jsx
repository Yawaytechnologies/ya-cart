import React, { useEffect, useRef } from "react";
import Stack1 from "../assets/sttack-1.png";    // LEFT small
import Stack2 from "../assets/sttttack-2.jpg";  // LEFT big
import Stack3 from "../assets/sttack-3.png";    // RIGHT small
import Stack4 from "../assets/sttack-4.jpg";    // RIGHT big
import Rotate from "../assets/Rotate.svg";
import Stock  from "../assets/stttack-1.jpg";   // center image under CTA


export default function HeroStackedShowcase({
  strength = 0.98,
  leftBigSpeed = 0.24,
  leftSmallSpeed = 0.36,
  rightBigSpeed = 0.24,
  rightSmallSpeed = 0.36,
  centerImageSpeed = 0.38,
  disableOnRRM = true,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Respect reduced motion
    if (disableOnRRM && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      for (const el of root.querySelectorAll("[data-parallax]")) el.style.transform = "";
      return;
    }

    const items = Array.from(root.querySelectorAll("[data-parallax]"));
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight || 1;

      for (const el of items) {
        const speed = parseFloat(el.getAttribute("data-speed") || "0.25");
        const rect = el.getBoundingClientRect();
        const dist = rect.top + rect.height / 2 - vh / 2;
        const y = dist * strength * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [strength, disableOnRRM]);

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-[#f6efe7] text-[#2b241f]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* top spacer only */}
        <div className="py-16 md:py-24 lg:py-32" />

        {/* ===== LEFT STACK — per-tile parallax ===== */}
        <div className="pointer-events-none absolute left-[60px] top-[250px] md:top-[260px] lg:top-[130px] hidden select-none md:block">
          <div className="relative" style={{ width: 360, height: 480 }}>
            {/* BIG */}
            <div className="relative z-[2]" data-parallax data-speed={leftBigSpeed}>
              <Tile className="w-[300px] h-[360px] md:w-[320px] md:h-[380px] lg:w-[270px] lg:h-[380px]">
                <img src={Stack2} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </Tile>
            </div>
            {/* SMALL */}
            <div
              className="absolute left-[160px] -top-[90px] md:left-[180px] md:-top-[100px] lg:left-[190px] lg:-top-[130px] z-[1]"
              data-parallax
              data-speed={leftSmallSpeed}
            >
              <Tile className="w-[180px] h-[160px] md:w-[190px] md:h-[170px] lg:w-[240px] lg:h-[240px]">
                <img src={Stack1} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </Tile>
            </div>
          </div>
        </div>

        {/* ===== RIGHT STACK — per-tile parallax ===== */}
        <div className="pointer-events-none absolute -right-[60px] top-[250px] md:top-[260px] lg:top-[150px] hidden select-none md:block">
          <div className="relative" style={{ width: 360, height: 480 }}>
            {/* BIG */}
            <div className="relative z-[2]" data-parallax data-speed={rightBigSpeed}>
              <Tile className="w-[300px] h-[360px] md:w-[320px] md:h-[380px] lg:w-[270px] lg:h-[380px]">
                <img src={Stack4} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </Tile>
            </div>
            {/* SMALL */}
            <div
              className="absolute right-[290px] -top-[90px] md:right-[180px] md:-top-[100px] lg:right-[260px] lg:-top-[160px] z-[1]"
              data-parallax
              data-speed={rightSmallSpeed}
            >
              <Tile className="w-[180px] h-[160px] md:w-[190px] md:h-[170px] lg:w-[240px] lg:h-[280px]">
                <img src={Stack3} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </Tile>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="relative z-10 mx-auto -mt-[18px] md:-mt-[78px] mb-6 flex h-[126px] w-[126px] items-center justify-center">
          <img
            src={Rotate}
            alt="YACART HOT COLLECTION"
            className="h-full w-full animate-spin select-none pointer-events-none"
            style={{ animationDuration: "18s" }}
            draggable={false}
          />
        </div>

        {/* Headline + CTA */}
        <div className="relative z-10 mx-auto max-w-[min(88vw,580px)] text-center px-4">
          <h1 className="font-semibold leading-[1.08] tracking-[-0.01em] text-[clamp(28px,3vw,46px)]">
            Furniture inspired by our land & resources — clear lines that reflect a
            patient, mastered gesture.
          </h1>
          <button className="mt-7 inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-6 py-3 text-sm font-medium backdrop-blur transition hover:translate-y-[-1px] hover:shadow-md">
            More About Us <span className="ml-2">→</span>
          </button>
        </div>

        {/* === Center image under CTA (fills width; no bottom spacer afterwards) === */}
        <div
          className="relative z-10 mx-auto mt-10 md:mt-12 lg:mt-14 max-w-3xl"
          data-parallax
          data-speed={centerImageSpeed}
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <img
              src={Stock}
              alt="Featured furniture collection"
              className="block w-full h-[240px] md:h-[320px] lg:h-[360px] object-cover"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 768px, (min-width: 768px) 640px, 100vw"
            />
          </div>
        </div>

        {/* no bottom spacer here */}
      </div>

      {/* Optional thin divider so the next section snaps right up */}
      {/* <div className="w-full border-t border-[#C8BEB2]" /> */}
    </section>
  );
}

/* ---------- Helpers ---------- */
function Tile({ className = "", children, ...props }) {
  return (
    <div {...props} className={`relative overflow-hidden bg-white will-change-transform ${className}`}>
      {children}
    </div>
  );
}
