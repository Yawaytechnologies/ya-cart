// src/components/CartSidebar.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

/**
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - items: [{ id, title, price, qty, img }]
 *  - onInc: (id) => void
 *  - onDec: (id) => void
 *  - onRemove: (id) => void
 */
export default function CartSidebar({
  open,
  onClose,
  items = [],
  onInc = () => {},
  onDec = () => {},
  onRemove = () => {},
}) {
  const navigate = useNavigate();

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const FREE_AT = 50;
  const pct = Math.min(100, Math.round((subtotal / FREE_AT) * 100));

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Navigate to /cart and jump to top
  const goToCartTop = () => {
    onClose();
    navigate("/cart");
    // ensure this runs after route change paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
  };

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-[88vw] max-w-[420px] bg-white text-neutral-900 shadow-xl
                    transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-200">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="p-2 rounded hover:bg-neutral-100">
            <FiX size={20} />
          </button>
        </div>

        {/* Free shipping meter */}
        <div className="px-4 py-3 border-b border-neutral-200">
          <p className="text-sm">
            Free Shipping for all orders over <span className="font-semibold">$50</span>
          </p>
          <div className="mt-2 h-2 rounded bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-[linear-gradient(90deg,#F6C16A,#D7921E)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          {subtotal < FREE_AT && (
            <p className="mt-2 text-xs text-neutral-600">
              Add ${Math.max(0, FREE_AT - subtotal).toFixed(2)} more to unlock free shipping.
            </p>
          )}
        </div>

        {/* Items */}
        <div className="overflow-y-auto max-h-[calc(100vh-14rem)] divide-y divide-neutral-200">
          {items.length === 0 ? (
            <div className="p-6 text-neutral-600">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="p-4 flex gap-3">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-16 h-16 rounded object-cover bg-neutral-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{it.title}</p>
                      <p className="text-sm text-neutral-500">${it.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => onRemove(it.id)}
                      className="p-2 rounded hover:bg-neutral-100 shrink-0"
                      aria-label="Remove"
                      title="Remove"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  {/* qty controls */}
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => onDec(it.id)}
                      className="w-8 h-8 grid place-items-center rounded border border-neutral-300 hover:bg-neutral-50"
                      aria-label="Decrease"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="min-w-[2ch] text-center text-sm">{it.qty}</span>
                    <button
                      onClick={() => onInc(it.id)}
                      className="w-8 h-8 grid place-items-center rounded border border-neutral-300 hover:bg-neutral-50"
                      aria-label="Increase"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Actions */}
        <div className="absolute bottom-0 inset-x-0 border-t border-neutral-200 bg-white">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm">Subtotal:</span>
            <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="px-4 pb-4 space-y-2">
            {/* Use a button to navigate, then jump to top */}
            <button
              onClick={goToCartTop}
              className="w-full py-3 text-center rounded-full bg-[color:var(--ink,#4B3A32)] text-white hover:opacity-90"
            >
              View Cart
            </button>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full py-3 text-center rounded-full border border-neutral-300 hover:bg-neutral-50"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
