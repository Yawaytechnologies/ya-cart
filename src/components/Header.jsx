// src/components/HeaderFloatingSolid.jsx
import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function HeaderFloatingSolid({ cartCount = 3, logoSrc }) {
  const ROW_H = "h-14";
  const PADX  = "px-7";

  // tweak these
  const TOP_Y = 10;           // <= this => overlay transparent
  const SOLID_SHOW_Y = 240;   // >= this => solid header shows while still scrolling down

  // phases by scroll position only (simple & robust)
  // 'overlay' | 'hidden' | 'solid'
  const [phase, setPhase] = useState("overlay");

  // mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y <= TOP_Y) setPhase("overlay");
      else if (y < SOLID_SHOW_Y) setPhase("hidden");
      else setPhase("solid");
    };
    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isOverlay = phase === "overlay";
  const isHidden  = phase === "hidden";

  // ✅ Transparent during both overlay + moving-up (hidden) phases
  const isTransparentPhase = isOverlay || isHidden;

  // COLORS:
  // ⮑ Outer border is ALWAYS visible; color changes by mode.
  const outerBorder = isTransparentPhase ? "border-white/30" : "border-[color:var(--line,#D9CFC2)]";
  // ⮑ Inner vertical dividers visible in BOTH modes; color changes by mode.
  const divider     = isTransparentPhase ? "border-white/20" : "border-[color:var(--line,#D9CFC2)]";
  // ⮑ Text/icons switch color by mode.
  const text        = isTransparentPhase ? "text-white" : "text-[color:var(--ink,#4B3A32)]";

  const Logo = (
    <a href="/" className={`${ROW_H} ${PADX} inline-flex items-center shrink-0`} aria-label="Logo">
      {logoSrc ? (
        <img src={logoSrc} alt="Logo" className="h-6 object-contain" />
      ) : (
        <>
          <span className={`${text} text-xl font-extrabold tracking-tight`}>YaKart</span>
            
        </>
      )}
    </a>
  );

  const Nav = (
    <nav className="hidden md:flex items-center">
      {[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Contact Us", href: "/contact" },
      ].map((item, i, arr) => (
        <a
          key={item.label}
          href={item.href}
          className={`${ROW_H} ${PADX} inline-flex items-center 
                      border-l ${divider} ${i === arr.length - 1 ? `border-r ${divider}` : ""}
                      text-[15px] font-semibold tracking-[0.04em] uppercase ${text} hover:opacity-80`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  const RightDesktop = (
    <div className="hidden md:flex items-center">
      <a
        href="/cart"
        className={`${ROW_H} ${PADX} relative grid place-items-center border-l ${divider}`}
        aria-label="Cart"
      >
        <FiShoppingCart className={`${text} text-[20px]`} />
        {cartCount > 0 && (
          <span
            className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 inline-flex items-center justify-center text-[12px] font-bold text-white"
            style={{ background: "rgba(75,58,50,0.95)", borderRadius: "2px", lineHeight: 1 }}
          >
            {cartCount}
          </span>
        )}
      </a>
      <a
        href="/account"
        className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`}
        aria-label="Account"
      >
        <FiUser className={`${text} text-[20px]`} />
      </a>
    </div>
  );

  const RightMobile = (
    <div className="md:hidden flex items-center">
      {/* Cart */}
      <a
        href="/cart"
        className={`${ROW_H} ${PADX} relative grid place-items-center border-l ${divider}`}
        aria-label="Cart"
      >
        <FiShoppingCart className={`${text} text-[20px]`} />
        {cartCount > 0 && (
          <span
            className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 inline-flex items-center justify-center text-[12px] font-bold text-white"
            style={{ background: "rgba(75,58,50,0.95)", borderRadius: "2px", lineHeight: 1 }}
          >
            {cartCount}
          </span>
        )}
      </a>

      {/* Profile */}
      <a
        href="/account"
        className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`}
        aria-label="Account"
      >
        <FiUser className={`${text} text-[20px]`} />
      </a>

      {/* Two-stroke mobile opener / X */}
      <button
        type="button"
        onClick={() => setDrawerOpen((v) => !v)}
        aria-expanded={drawerOpen}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
        className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`}
      >
        {/* OPEN icon (short top, long bottom) */}
        <svg
          className={`${drawerOpen ? "hidden" : "block"}`}
          width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke={isTransparentPhase ? "white" : "currentColor"}
          strokeWidth="2.25" strokeLinecap="round"
        >
          <path d="M6 7h10" />
          <path d="M3 13h18" />
        </svg>
        {/* CLOSE icon (X) */}
        <svg
          className={`${drawerOpen ? "block" : "hidden"}`}
          width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke={isTransparentPhase ? "white" : "currentColor"}
          strokeWidth="2.25" strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform
                    ${isHidden ? "-translate-y-full" : "translate-y-0"} pointer-events-none`}
      >
        {/* dark hairline on very top */}
        <div className="h-[6px] bg-[color:var(--edge,#3D2F28)] pointer-events-auto" />

        {/* same boxed layout in both modes; only background + colors switch */}
        <div className="mx-4 md:mx-6 lg:mx-8 mt-2 pointer-events-auto">
          <div
            className={`border ${outerBorder}`}
            style={
              isTransparentPhase
                ? { backgroundColor: "transparent" }   // TOP + MOVING-UP: transparent
                : { backgroundColor: "var(--paper)" }  // COMING DOWN: solid (no transparency)
            }
          >
            <div className="flex items-center justify-between">
              {/* logo + a line after logo */}
              <div className={`border-r ${divider}`}>{Logo}</div>

              {/* nav (desktop only) */}
              {Nav}

              {/* right side: desktop OR mobile */}
              {RightDesktop}
              {RightMobile}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-60 md:hidden ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        {/* Dim backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />
        {/* Slide-in panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-[84vw] max-w-sm bg-white text-slate-900 transition-transform duration-300
                      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200">
            <a href="/" className="inline-flex items-center gap-2">
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-6 object-contain" />
              ) : (
                <>
                  <span className="text-xl font-extrabold tracking-tight">Ya</span>
                  <span className="text-xl font-semibold tracking-tight">Kart</span>
                </>
              )}
            </a>
            <button
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="w-10 h-10 grid place-items-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>
             <br></br>
          <nav className="px-4">
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Contact Us", href: "/contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3 text-[17px] border-b border-slate-200"
                onClick={() => setDrawerOpen(false)}
              >
                <span>{item.label}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="px-4 py-4 flex gap-3">
            <a href="/account" className="px-4 py-2 border border-slate-300 hover:bg-slate-50">Account</a>
            <a href="/cart" className="px-4 py-2 border border-slate-300 hover:bg-slate-50">Cart ({cartCount})</a>
          </div>
        </aside>
      </div>
    </>
  );
}
