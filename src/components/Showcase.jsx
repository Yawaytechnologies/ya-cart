// src/components/CenterParallaxShowcase.jsx
import React, { useEffect, useRef } from "react";
import Bg from "../assets/stock.jpg";
import CenterImg from "../assets/stock-1.jpg";

export default function CenterParallaxShowcase() {
  const rootRef = useRef(null);
  const bgWrapRef = useRef(null);
  const centerImgRef = useRef(null);

  // ======= FIXED PX SETTINGS (edit to taste) =======
  const SECTION_WIDTH_PX  = 1280; // section canvas width
  const SECTION_HEIGHT_PX = 800;  // section canvas height
  const CENTER_SIZE_PX    = 340;  // square frame (center image viewport)
  const MAX_SHIFT_PX      = 120;  // max vertical travel range
  const SPEED             = 1;  // <-- higher = faster response to scroll
  const BG_FIT_MODE       = "cover"; // "cover" or "contain"
  const BG_ZOOM           = 1;       // 1 = no zoom
  // ==================================================

  useEffect(() => {
    const root = rootRef.current;
    const bgWrap = bgWrapRef.current;
    const centerImg = centerImgRef.current;
    if (!root || !bgWrap || !centerImg) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // progress around section midpoint → clamp to [-1, 1]
      const progress =
        (vh / 2 - (rect.top + rect.height / 2)) / rect.height + 0.5;
      const centered = Math.max(-1, Math.min(1, (progress - 0.5) * 2));

      // apply SPEED multiplier
      const shift = centered * MAX_SHIFT_PX * SPEED;
      const val = `${shift}px`;

      // move background wrapper & the image INSIDE the fixed center frame
      bgWrap.style.setProperty("--shift", val);
      centerImg.style.setProperty("--shift", val);
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden"
      style={{
        width: `${SECTION_WIDTH_PX}px`,
        height: `${SECTION_HEIGHT_PX}px`,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* BACKGROUND (moves vertically by translating the wrapper) */}
      <div
        ref={bgWrapRef}
        className="absolute will-change-transform"
        style={{
          left: 0,
          top: 0,
          width: `${SECTION_WIDTH_PX}px`,
          height: `${SECTION_HEIGHT_PX}px`,
          transform: "translateY(var(--shift, 0px))",
          backgroundImage: `url(${Bg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: BG_FIT_MODE,
          ...(BG_ZOOM !== 1 && {
            backgroundSize:
              BG_FIT_MODE === "cover"
                ? `calc(100% * ${BG_ZOOM})`
                : `${BG_ZOOM * 100}% auto`,
          }),
          zIndex: 1,
        }}
      />

      {/* CENTER FRAME — fixed in the middle; acts as a mask */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${CENTER_SIZE_PX}px`,
          height: `${CENTER_SIZE_PX}px`,
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* CENTER IMAGE — slides inside the fixed frame (in sync with BG) */}
        <img
          ref={centerImgRef}
          src={CenterImg}
          alt="Featured product"
          draggable="false"
          style={{
            width: `${CENTER_SIZE_PX}px`,
            height: `${CENTER_SIZE_PX}px`,
            objectFit: "contain",
            display: "block",
            transform: "translateY(var(--shift, 0px))",
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
}
