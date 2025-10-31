import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import { useCart } from "../components/CardContext";

/* ----------------------- Mobile Drawer (Portal) ----------------------- */
function MobileNavDrawer({ open, onClose, isTransparent }) {
  // close on Esc
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
        className="
          absolute left-0 top-0 h-full w-[82vw] max-w-[340px]
          bg-[var(--paper,#fff)] text-[color:var(--ink,#4B3A32)]
          shadow-2xl
          animate-[slideIn_.25s_ease-out_forwards]
        "
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-[color:var(--line-strong,#9F917F)]/60">
          <span className="font-extrabold tracking-tight">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 -mr-2"
            style={{ color: isTransparent ? "#fff" : "currentColor" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-2 py-2">
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Wishlist", href: "/wishlist" },
            { label: "Contact Us", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="
                block rounded-lg px-3 py-3 text-[15px] font-semibold tracking-[.04em] uppercase
                hover:bg-black/[.04]
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <style>{`
        @keyframes slideIn { from { transform: translateX(-100%);} to { transform: translateX(0);} }
      `}</style>
    </div>,
    document.body
  );
}

/* ======================== Header ======================== */
export default function HeaderFloatingSolid({ logoSrc }) {
  const { items, count, inc, dec, remove, open, setOpen } = useCart();

  const ROW_H = "h-14", PADX = "px-7";
  const TOP_Y = 10, SOLID_SHOW_Y = 240;

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [phase, setPhase] = useState(isHome ? "overlay" : "solid"); // 'overlay' | 'hidden' | 'solid'
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll when overlays open (drawer or cart)
  useEffect(() => {
    const anyOpen = drawerOpen || open;
    const b = document.body;
    const prev = b.style.overflow;
    b.style.overflow = anyOpen ? "hidden" : "";
    return () => (b.style.overflow = prev);
  }, [drawerOpen, open]);

  // Close drawer on route change
  useEffect(() => setDrawerOpen(false), [pathname]);

  // Only attach scroll behavior on Home; on other pages force solid
  useEffect(() => {
    if (!isHome) {
      setPhase("solid");
      return;
    }
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

  const isOverlay = phase === "overlay";
  const isHidden = phase === "hidden";

  // Transparent ONLY on Home while overlay/hidden phases
  const isTransparentPhase = isHome && (isOverlay || isHidden);

  // ⬇️ Keep header visible if drawer/cart is open (overrides 'hidden')
  const headerHidden = isHidden && !drawerOpen && !open;

  const outerBorder = isTransparentPhase
    ? "border-white/30"
    : "border-[color:var(--line-strong,#9F917F)]";
  const divider = isTransparentPhase
    ? "border-white/20"
    : "border-[color:var(--line-strong,#9F917F)]";
  const text = isTransparentPhase
    ? "text-white"
    : "text-[color:var(--ink,#4B3A32)]";

  const Logo = (
    <Link to="/" className={`${ROW_H} ${PADX} inline-flex items-center shrink-0`} aria-label="Logo">
      {logoSrc ? (
        <img src={logoSrc} alt="Logo" className="h-6 object-contain" />
      ) : (
        <span className={`${text} text-xl font-extrabold tracking-tight`}>YaCart</span>
      )}
    </Link>
  );

  const Nav = (
    <nav className="hidden md:flex items-center">
      {[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Wishlist", href: "/wishlist" },
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
  );

  const CartButton = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`${ROW_H} ${PADX} relative grid place-items-center border-l ${divider}`}
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

  return (
    <>
      <header
  className={`hidden md:block fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform
              ${phase === "hidden" ? "-translate-y-full" : "translate-y-0"} pointer-events-none`}
>
        <div className="h-[6px] bg-[color:var(--edge,#3D2F28)] pointer-events-auto" />
        <div className="mx-4 md:mx-6 lg:mx-8 mt-2 pointer-events-auto">
          <div
            className={`border ${outerBorder}`}
            style={isTransparentPhase ? { backgroundColor: "transparent" } : { backgroundColor: "var(--paper)" }}
          >
            <div className="flex items-center justify-between">
              <div className={`border-r ${divider}`}>{Logo}</div>
              {Nav}
              {/* Right controls */}
              <div className="hidden md:flex items-center">
                {CartButton}
                <Link to="/account" className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`} aria-label="Account">
                  <FiUser className={`${text} text-[20px]`} />
                </Link>
              </div>
              {/* Mobile controls */}
              <div className="md:hidden flex items-center">
                {CartButton}
                <Link to="/account" className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`} aria-label="Account">
                  <FiUser className={`${text} text-[20px]`} />
                </Link>
                <button
                  type="button"
                  onClick={() => setDrawerOpen((v) => !v)}
                  aria-expanded={drawerOpen}
                  aria-label={drawerOpen ? "Close menu" : "Open menu"}
                  className={`${ROW_H} ${PADX} grid place-items-center border-l ${divider}`}
                >
                  {/* burger / close */}
                  <svg
                    className={`${drawerOpen ? "hidden" : "block"}`}
                    width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke={isTransparentPhase ? "white" : "currentColor"}
                    strokeWidth="2.25" strokeLinecap="round"
                  >
                    <path d="M6 7h12" /><path d="M4 13h16" />
                  </svg>
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
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <MobileNavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isTransparent={isTransparentPhase}
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
