import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function NewsletterPopup({
  imageSrc,
  brand = "YaKart",
  delayMs = 10000,
  oncePerSession = false,
  mobileScaleBias = 0.92, // ⬅️ tweak this (0.88–1) to make a little smaller/bigger on phones
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  const emailRef = useRef(null);
  const cardRef = useRef(null);

  // robust scroll lock
  const lockedRef = useRef(false);
  const prevBodyRef = useRef({ overflow: "", position: "", top: "", width: "" });
  const scrollYRef = useRef(0);

  const lockScroll = () => {
    if (lockedRef.current) return;
    const b = document.body;
    prevBodyRef.current = {
      overflow: b.style.overflow,
      position: b.style.position,
      top: b.style.top,
      width: b.style.width,
    };
    scrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    b.style.overflow = "hidden";
    b.style.position = "fixed";
    b.style.top = `-${scrollYRef.current}px`;
    b.style.width = "100%";
    lockedRef.current = true;
  };
  const unlockScroll = () => {
    if (!lockedRef.current) return;
    const b = document.body;
    const prev = prevBodyRef.current;
    b.style.overflow = prev.overflow || "";
    b.style.position = prev.position || "";
    b.style.top = prev.top || "";
    b.style.width = prev.width || "";
    window.scrollTo(0, scrollYRef.current || 0);
    lockedRef.current = false;
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const KEY = "newsletter_popup_seen_session";
    if (oncePerSession && sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      if (oncePerSession) sessionStorage.setItem(KEY, "1");
    }, Math.max(0, delayMs));
    return () => clearTimeout(t);
  }, [oncePerSession, delayMs]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const t = setTimeout(() => emailRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => unlockScroll(), []);

  const close = () => setOpen(false);
  const onSubscribe = (e) => {
    e.preventDefault();
    // TODO: send emailRef.current.value to your API
    close();
  };

  /* ---------- Auto-fit with extra phone shrink ---------- */
  useEffect(() => {
    if (!open) return;
    const fit = () => {
      const el = cardRef.current;
      if (!el) return;

      const margin = 16;
      const avail = (window.visualViewport?.height || window.innerHeight) - margin * 2;
      const h = el.getBoundingClientRect().height;

      let s = Math.min(1, Math.max(0.78, avail / h)); // auto-fit
      if (window.innerWidth <= 480) s = s * mobileScaleBias; // ⬅️ small nudge on phones
      setScale(Number(s.toFixed(3)));
    };
    fit();

    const img = cardRef.current?.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", fit, { once: true });
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, [open, imageSrc, mobileScaleBias]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] grid place-items-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nlp_title"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        onClick={close}
        aria-label="Close"
      />

      {/* Card (slightly narrower; scaled to fit) */}
      <div
        ref={cardRef}
        className="
          relative mt-20  w-[min(92vw,1020px)]
          rounded-xl bg-white shadow-lg sm:shadow-2xl overflow-hidden
          animate-[popIn_.25s_ease-out]
        "
        style={{ transform: `scale(${scale})`, transformOrigin: "center center", willChange: "transform" }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-slate-700/80 hover:text-slate-900 z-10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image — a touch shorter on phones */}
          <div className="bg-neutral-200/40">
            <div className="relative h-[min(32svh,210px)] md:h-auto md:min-h-[420px]">
              <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          {/* Content — tighter spacing & fonts */}
          <div className="px-4 sm:px-7 md:px-12 py-5 sm:py-8 md:py-12 flex flex-col">
            <div className="flex items-center gap-2 mb-3 sm:mb-5">
              <div className="w-6 h-6 rounded-full bg-amber-800/90 grid place-items-center text-white text-[10px] font-bold">Y</div>
              <div className="text-[17px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide text-[#5A4A3F]">
                {brand}
              </div>
            </div>

            <h2 id="nlp_title" className="font-extrabold text-[#5A4A3F] leading-[1] text-[clamp(22px,7vw,52px)]">
              SAVE 15%
            </h2>
            <p className="mt-1.5 sm:mt-2 tracking-[.12em] text-[#5A4A3F]/85 text-[clamp(11px,3.2vw,20px)]">
              ON TODAYS ORDER
            </p>

            <p className="mt-4 sm:mt-5 text-[12px] sm:text-[13px] tracking-wide text-slate-500">
              SIGN UP BELOW FOR DISCOUNT CODE
            </p>

            <form onSubmit={onSubscribe} className="mt-3 sm:mt-4">
              <label className="block">
                <input
                  ref={emailRef}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="Email Address"
                  className="
                    w-full rounded-xl border border-slate-200 bg-slate-50/70
                    px-4 py-3 sm:px-5 sm:py-3.5 text-[15px]
                    outline-none ring-0 focus:border-slate-300
                  "
                />
              </label>
              <button
                type="submit"
                className="mt-3 sm:mt-4 w-full rounded-xl px-6 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold tracking-wide text-white"
                style={{ background: "#5A4A3F" }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn { from { transform: translateY(6px) scale(.985); opacity: 0 } to { transform: none; opacity: 1 } }
      `}</style>
    </div>,
    document.body
  );
}
