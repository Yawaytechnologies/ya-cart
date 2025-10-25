import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

/* Images */
import hero1 from "../assets/hero-1.jpeg";
import hero2 from "../assets/hero-2.jpeg";
import hero3 from "../assets/hero-3.jpeg";

export default function ShopHeroPage() {
  const slides = [
    { img: hero1, kicker: "SHOP SMART, SHOP SORTED", line1: "Discover Living",   line2: "Room Chair" },
    { img: hero2, kicker: "SHOP SMART, SHOP SORTED", line1: "Modern Room",       line2: "Tables Await" },
    { img: hero3, kicker: "SHOP SMART, SHOP SORTED", line1: "Find Your Perfect", line2: "Room Bed" },
  ];

  const [active, setActive] = useState(0);
  const copyRefs = useRef([]);

  // BG slow zoom-out while visible
  const ZOOM_START   = 1.42;
  const ZOOM_ACTIVE  = 1.02;
  const ZOOM_SECONDS = 7.0;
  const zoomTransition = { duration: ZOOM_SECONDS, ease: [0.16, 0.84, 0.22, 1] };

  const playCopy = (idx, swiper) => {
    copyRefs.current.forEach((el) => {
      if (!el) return;
      el.classList.remove("play");
      el.querySelectorAll(".hero-line, .hero-cta").forEach((node) => {
        node.style.animation = "none";
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        node.offsetHeight;
        node.style.animation = "";
      });
    });
    const el = copyRefs.current[idx];
    if (el) requestAnimationFrame(() => el.classList.add("play"));
  };

  return (
    <main className="relative w-full min-h-screen bg-black">
      <section className="relative w-full h-[115svh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          rewind={true}
          speed={1200}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{ delay: ZOOM_SECONDS * 1000, disableOnInteraction: false }}
          navigation={{ enabled: true, prevEl: ".shop-hero-prev", nextEl: ".shop-hero-next" }}
          onInit={(sw) => {
            const idx = sw.realIndex ?? sw.activeIndex ?? 0;
            setActive(idx);
            playCopy(idx, sw);
          }}
          onSlideChange={(sw) => {
            const idx = sw.realIndex ?? sw.activeIndex ?? 0;
            setActive(idx);
            playCopy(idx, sw);
          }}
          className="w-full h-full"
        >
          {slides.map((s, i) => {
            const isActive = active === i;
            return (
              <SwiperSlide key={i} className="!h-[115svh] bg-black">
                <div className="relative w-full h-[115svh] overflow-hidden">
                  {/* Background: slow zoom-out on active */}
                  <div className="absolute inset-0">
                    <motion.img
                      src={s.img}
                      alt=""
                      initial={{ scale: ZOOM_START }}
                      animate={{ scale: isActive ? ZOOM_ACTIVE : ZOOM_START }}
                      transition={zoomTransition}
                      className="w-full h-full object-cover transform-gpu will-change-transform [backface-visibility:hidden]"
                      style={{ transformOrigin: "center center" }}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  </div>

                  {/* Text — slides down once on activation, then stays */}
                  <div
                    ref={(el) => (copyRefs.current[i] = el)}
                    className="hero-copy relative z-10 h-full max-w-[1100px] mx-auto px-4 flex flex-col items-center justify-center text-center"
                  >
                    <p className="hero-line delay-0 text-white/80 text-[12px] md:text-[13px] tracking-[0.25em] uppercase mb-6">
                      [ {s.kicker} ]
                    </p>

                    <h2 className="hero-line delay-1 text-white font-light leading-[0.95] text-5xl md:text-7xl lg:text-8xl">
                      {s.line1}
                    </h2>

                    <h2 className="hero-line delay-2 text-white font-extrabold leading-[0.95] text-5xl md:text-7xl lg:text-8xl mt-2">
                      {s.line2}
                    </h2>

                    <div className="hero-cta delay-3 mt-10">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center px-8 py-3 text-[16px] font-medium"
                        style={{ background: "var(--paper, #E9E1D4)", color: "var(--ink, #4B3A32)" }}
                      >
                        Discover
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous slide"
            className="shop-hero-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-[60] pointer-events-auto
                       w-12 h-12 md:w-14 md:h-14 grid place-items-center
                       border border-white/60 bg-black/10 backdrop-blur-[1px]
                       text-white/90 hover:text-white hover:border-white hover:bg-black/20 transition"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next slide"
            className="shop-hero-next absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-[60] pointer-events-auto
                       w-12 h-12 md:w-14 md:h-14 grid place-items-center
                       border border-white/60 bg-black/10 backdrop-blur-[1px]
                       text-white/90 hover:text-white hover:border-white hover:bg-black/20 transition"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </Swiper>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/20" />

        {/* MUCH SLOWER text enter animations */}
        <style>{`
          /* Hidden pre-state until 'play' is added to this slide's copy */
          .hero-copy:not(.play) .hero-line { opacity: 0; transform: translateY(-56px); }
          .hero-copy:not(.play) .hero-cta  { opacity: 0; transform: translateY(56px); }

          /* Slow animations on activation */
          .hero-copy.play .hero-line { animation: dropIn 2000ms cubic-bezier(.18,.8,.2,1) both; }
          .hero-copy.play .hero-cta  { animation: riseIn 2000ms cubic-bezier(.18,.8,.2,1) both; }

          /* Longer stagger */
          .hero-copy.play .delay-0 { animation-delay:   0ms; }
          .hero-copy.play .delay-1 { animation-delay: 300ms; }
          .hero-copy.play .delay-2 { animation-delay: 600ms; }
          .hero-copy.play .delay-3 { animation-delay: 900ms; }

          @keyframes dropIn {
            from { opacity: 0; transform: translateY(-72px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes riseIn {
            from { opacity: 0; transform: translateY(72px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-copy:not(.play) .hero-line,
            .hero-copy:not(.play) .hero-cta  { opacity: 1; transform: none; }
            .hero-copy.play .hero-line,
            .hero-copy.play .hero-cta  { animation: none; }
          }
        `}</style>
      </section>
    </main>
  );
}
