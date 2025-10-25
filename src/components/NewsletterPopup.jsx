import React, { useEffect, useRef, useState } from "react";

export default function NewsletterPopup({
  imageSrc,
  brand = "YaKart",
  delayMs = 10000,          // ⬅️ show after 10s (change as needed)
  oncePerSession = false,   // set true to show only once per tab session
}) {
  const [open, setOpen] = useState(false);  // ⬅️ start closed, open after delay
  const emailRef = useRef(null);

  // Start the delay timer on load/refresh
  useEffect(() => {
    const KEY = "newsletter_popup_seen_session";
    if (oncePerSession && sessionStorage.getItem(KEY)) return;

    const t = setTimeout(() => {
      setOpen(true);
      if (oncePerSession) sessionStorage.setItem(KEY, "1");
    }, Math.max(0, delayMs));

    return () => clearTimeout(t);
  }, [oncePerSession, delayMs]);

  // focus + lock scroll when opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => emailRef.current?.focus(), 60);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, [open]);

  const close = () => setOpen(false);
  const onSubscribe = (e) => {
    e.preventDefault();
    // TODO: send emailRef.current.value to your API
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" onClick={close} aria-label="Close" />

      {/* Card — sized/positioned to match your reference */}
      <div className="relative mx-4 w-[94vw] max-w-[1020px] rounded-md bg-white shadow-2xl overflow-hidden animate-[popIn_.25s_ease-out]">
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-700/80 hover:text-slate-900 z-10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left image */}
          <div className="bg-neutral-200/40">
            <img src={imageSrc} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
          </div>

          {/* Right content */}
          <div className="px-10 md:px-12 py-12 md:py-14 flex flex-col">
            {/* Brand row */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-amber-800/90 grid place-items-center text-white text-[10px] font-bold">Y</div>
              <div className="text-[22px] font-semibold tracking-wide text-[#5A4A3F]">{brand}</div>
            </div>

            {/* Headline */}
            <h2 className="text-[50px] md:text-[56px] leading-[1] font-extrabold text-[#5A4A3F]">SAVE 15%</h2>
            <p className="mt-3 text-[20px] md:text-[22px] tracking-[.12em] text-[#5A4A3F]/85">ON TODAYS ORDER</p>

            <p className="mt-8 text-[13px] tracking-wide text-slate-500">SIGN UP BELOW FOR DISCOUNT CODE</p>

            {/* Form */}
            <form onSubmit={onSubscribe} className="mt-6">
              <label className="block">
                <input
                  ref={emailRef}
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-5 py-3.5 text-[15px] outline-none ring-0 focus:border-slate-300"
                />
              </label>
              <button
                type="submit"
                className="mt-4 w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold tracking-wide text-white"
                style={{ background: "#5A4A3F" }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Enter animation */}
      <style>{`
        @keyframes popIn { from { transform: translateY(6px) scale(.985); opacity: 0 } to { transform: none; opacity: 1 } }
      `}</style>
    </div>
  );
}
