// src/components/HeaderFloatingSolid.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import { useCart } from "./CardContext";
import { useWishlist } from "../contexts/wishlistContext";


/* ----------------------- Mobile Drawer (Portal) ----------------------- */
function MobileNavDrawer({ open, onClose, isTransparent, wishCount = 0 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] md:hidden">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
        aria-label="Close menu"
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className="absolute left-0 top-0 h-full w-[82vw] max-w-[340px]
                   bg-[var(--paper,#fff)] text-[color:var(--ink,#4B3A32)]
                   shadow-2xl animate-[slideIn_.25s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-[color:var(--line-strong,#9F917F)]/60">
          <span className="font-extrabold tracking-tight">Menu</span>
          <button onClick={onClose} aria-label="Close" className="p-2 -mr-2"
                  style={{ color: isTransparent ? "#fff" : "currentColor" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.25">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-2 py-2">
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            // leaving Wishlist inside the drawer menu is fine; header icon handles top bar
            { label: "Wishlist", href: "/wishlist" },
            { label: "Contact Us", href: "/contact" },
            { label: "Admin Dashboard", href: "/admin" },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="relative block rounded-lg px-3 py-3 text-[15px] font-semibold tracking-[.04em] uppercase hover:bg:black/[.04]"
            >
              {item.label}
              {item.label === "Wishlist" && wishCount > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[18px] h-[18px] rounded-full bg-[color:var(--ink,#4B3A32)] text-white text-[11px] leading-[18px] text-center px-1">
                  {wishCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      <style>{`@keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
    </div>,
    document.body
  );
}

/* ======================== Header (Mobile + Desktop) ======================== */
export default function HeaderFloatingSolid({ logoSrc }) {
  const { items, count, inc, dec, remove, open, setOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  /* ------------------- shared state ------------------- */
  const [phase, setPhase] = useState(isHome ? "overlay" : "solid"); // overlay | hidden | solid
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll when drawer/cart open
  useEffect(() => {
    const anyOpen = drawerOpen || open;
    const b = document.body;
    const prev = b.style.overflow;
    b.style.overflow = anyOpen ? "hidden" : "";
    return () => (b.style.overflow = prev);
  }, [drawerOpen, open]);

  // Close drawer on route change
  useEffect(() => setDrawerOpen(false), [pathname]);

  // Desktop header shows from md (≥768px). Align scroll phase only for home.
  useEffect(() => {
    if (!isHome) { setPhase("solid"); return; }
    const TOP_Y = 10, SOLID_SHOW_Y = 240;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y <= TOP_Y) setPhase("overlay");
      else if (y < SOLID_SHOW_Y) setPhase("hidden");
      else setPhase("solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* ------------------- MOBILE header (md:hidden) ------------------- */
  const mobileRef = useRef(null);
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const mql = window.matchMedia("(min-width: 768px)");

    let raf = 0;
    const setHead = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (mql.matches) return; // desktop will handle
        const h = Math.round(el.getBoundingClientRect().height);
        if (h > 0) document.documentElement.style.setProperty("--head", `${h}px`);
      });
    };

    setHead();
    const ro = new ResizeObserver(setHead);
    ro.observe(el);
    window.addEventListener("resize", setHead, { passive: true });
    el.addEventListener("transitionend", setHead);
    mql.addEventListener?.("change", setHead);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHead);
      el.removeEventListener("transitionend", setHead);
      mql.removeEventListener?.("change", setHead);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ------------------- DESKTOP header (hidden md:block) ------------------- */
  const headerRef = useRef(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const mql = window.matchMedia("(min-width: 768px)");

    let raf = 0;
    const setHead = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!mql.matches) return; // mobile will handle
        const h = Math.round(el.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--head", `${h}px`);
      });
    };

    setHead();
    const ro = new ResizeObserver(setHead);
    ro.observe(el);
    window.addEventListener("scroll", setHead, { passive: true });
    window.addEventListener("resize", setHead, { passive: true });
    el.addEventListener("transitionend", setHead);
    mql.addEventListener?.("change", setHead);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", setHead);
      window.removeEventListener("resize", setHead);
      el.removeEventListener("transitionend", setHead);
      mql.removeEventListener?.("change", setHead);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  /* ------------------- shared UI bits ------------------- */
  const ROW_H = "h-14", PADX = "px-7";
  const isOverlay = phase === "overlay";
  const isHidden  = phase === "hidden";
  const isTransparentPhase = isHome && (isOverlay || isHidden);

  const outerBorder = isTransparentPhase
    ? "border-white/30"
    : "border-[color:var(--line-strong,#9F917F)]";
  const divider = isTransparentPhase
    ? "border-white/20"
    : "border-[color:var(--line-strong,#9F917F)]";
  const text = isTransparentPhase
    ? "text-white"
    : "text-[color:var(--ink,#4B3A32)]";

  const LogoSpan = (
    <span className={`${text} text-xl font-extrabold tracking-tight`}>YaCart</span>
  );

  const CartButton = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`${ROW_H} ${PADX} relative grid place-items-center`}
      aria-label="Open cart"
    >
      <FiShoppingCart className={`${text} text-[20px]`} />
      {count > 0 && (
        <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full text-[11px] leading-[18px] text-white bg-[color:var(--ink,#4B3A32)] text-center">
          {count}
        </span>
      )}
    </button>
  );

  // NEW: Wishlist icon button (desktop)
  const WishlistIconButtonDesktop = (
    <Link
      to="/wishlist"
      className={`${ROW_H} ${PADX} relative grid place-items-center border-l ${divider}`}
      aria-label="Open wishlist"
    >
      <FiHeart className={`${text} text-[20px]`} />
      {wishCount > 0 && (
        <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full text-[11px] leading-[18px] text-white bg-[color:var(--ink,#4B3A32)] text-center">
          {wishCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* ========== MOBILE HEADER ========== */}
      <div
        ref={mobileRef}
        className="md:hidden sticky top-0 z-[90] bg-[var(--paper,#fff)]"
      >
        <div className="h-[6px] bg-[color:var(--edge,#3D2F28)]" />
        <div className="border-b border-[color:var(--line-strong,#9F917F)]">
          <div className="flex items-center justify-between">
            {/* left: hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="h-14 px-5 grid place-items-center text-neutral-900"
            >
              <FiMenu className="text-[22px]" />
            </button>

            {/* center: brand — force black on mobile */}
            <Link to="/" className="h-14 px-5 inline-flex items-center">
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-6 object-contain" />
              ) : (
                <span className="text-neutral-900 text-lg font-extrabold tracking-tight">
                  YaCart
                </span>
              )}
            </Link>

            {/* right: wishlist + cart + profile */}
            <div className="flex items-center text-neutral-900">
              {/* NEW: Wishlist icon (mobile) */}
              <Link
                to="/wishlist"
                aria-label="Open wishlist"
                className="h-14 px-5 relative grid place-items-center"
              >
                <FiHeart className="text-[20px]" />
                {wishCount > 0 && (
                  <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full text-[11px] leading-[18px] text-white bg-neutral-900 text-center">
                    {wishCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open cart"
                className="h-14 px-5 relative grid place-items-center"
              >
                <FiShoppingCart className="text-[20px]" />
                {count > 0 && (
                  <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full text-[11px] leading-[18px] text-white bg-neutral-900 text-center">
                    {count}
                  </span>
                )}
              </button>
              <Link to="/profile" aria-label="Profile" className="h-14 px-5 grid place-items-center">
                <FiUser className="text-[20px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP HEADER (md+) ========== */}
      <header
        ref={headerRef}
        className={`hidden md:block fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform
                    ${isHidden ? "-translate-y-full" : "translate-y-0"} pointer-events-none`}
      >
        {/* top edge strip */}
        <div className="h-[6px] bg-[color:var(--edge,#3D2F28)] pointer-events-auto" />
        <div className="mx-4 md:mx-6 lg:mx-8 mt-2 pointer-events-auto">
          <div
            className={`border ${outerBorder}`}
            style={isTransparentPhase ? { backgroundColor: "transparent" } : { backgroundColor: "var(--paper)" }}
          >
            <div className="flex items-center justify-between">
              <div className={`border-r ${divider}`}>
                <Link to="/" className={`${ROW_H} ${PADX} inline-flex items-center shrink-0`} aria-label="Logo">
                  {logoSrc ? <img src={logoSrc} alt="Logo" className="h-6 object-contain" /> : LogoSpan}
                </Link>
              </div>

              {/* desktop nav — Wishlist text REMOVED */}
              <nav className="hidden md:flex items-center">
                {[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: "Contact Us", href: "/contact" },
                ].map((item, i, arr) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`${ROW_H} ${PADX} inline-flex items-center 
                                border-l ${divider} ${i === arr.length - 1 ? `border-r ${divider}` : ""}
                                text-[15px] font-semibold tracking-[0.04em] uppercase ${text} hover:opacity-80`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* desktop right controls: Wishlist icon near cart */}
              <div className="hidden md:flex items-center">
                <div className={`border-l ${divider}`}>{WishlistIconButtonDesktop}</div>
                <div className={`border-l ${divider}`}>{CartButton}</div>
                <Link to="/profile" className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`} aria-label="Profile">
                  <FiUser className={`${text} text-[20px]`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileNavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isTransparent={false}
        wishCount={wishCount}
      />

      {/* Cart sidebar */}
      <CartSidebar
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
      />
    </>
  );
}
