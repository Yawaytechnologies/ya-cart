import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import CartSidebar from "./CartSidebar";
import { useCart } from "../components/CardContext";

/* Minimal left drawer (no portal; sticks with page) */
function Drawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1300] md:hidden">
      <button className="absolute inset-0 bg-black/55" onClick={onClose} aria-label="Close menu" />
      <aside
        className="absolute left-0 top-0 h-full w-[82vw] max-w-[340px] bg-white text-neutral-900 shadow-2xl
                   animate-[slideIn_.25s_ease-out_forwards]"
        role="dialog" aria-modal="true" aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-200">
          <span className="font-extrabold tracking-tight">Menu</span>
          <button onClick={onClose} aria-label="Close" className="p-2 -mr-2">
            <FiX size={22} />
          </button>
        </div>
        <nav className="px-2 py-2">
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Wishlist", href: "/wishlist" },
            { label: "Contact Us", href: "/contact" },
          ].map((it) => (
            <Link
              key={it.href}
              to={it.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-3 text-[15px] font-semibold tracking-[.04em] uppercase hover:bg-black/[.04]"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </aside>
      <style>{`@keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
    </div>
  );
}

/* --- Sticky mobile header (NO portal) --- */
export default function MobileHeaderSticky({ logoSrc }) {
  const { pathname } = useLocation();
  const { items, count, inc, dec, remove, open, setOpen } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // lock body scroll when drawer/cart open
  useEffect(() => {
    const any = drawerOpen || open;
    const b = document.body, prev = b.style.overflow;
    b.style.overflow = any ? "hidden" : "";
    return () => (b.style.overflow = prev);
  }, [drawerOpen, open]);

  // close drawer on route change
  useEffect(() => setDrawerOpen(false), [pathname]);

  return (
    <>
      {/* Sticky container must be INSIDE the scrolling element */}
      <div className="md:hidden sticky top-0 z-[1200]">
        {/* optional top strip */}
        <div className="h-[6px] bg-[#3D2F28]" />
        <div className="bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="h-14 px-5 grid place-items-center text-neutral-900"
            >
              <FiMenu className="text-[22px]" />
            </button>

            <Link to="/" className="h-14 px-5 inline-flex items-center">
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-6 object-contain" />
              ) : (
                <span className="text-neutral-900 text-lg font-extrabold tracking-tight">YaCart</span>
              )}
            </Link>

            <div className="flex items-center text-neutral-900">
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
              <Link to="/account" aria-label="Account" className="h-14 px-5 grid place-items-center">
                <FiUser className="text-[20px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
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
