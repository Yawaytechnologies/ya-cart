/* eslint react-refresh/only-export-components: ["warn", { "allowConstantExport": true }] */
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);     // [{id,title,price,img,qty}]
  const [open, setOpen] = useState(false);    // slide-over visibility

  const add = useCallback((product, qty = 1) => {
    setItems((arr) => {
      const id = product.id ?? product.title;
      const i = arr.findIndex((x) => x.id === id);
      if (i >= 0) {
        const next = [...arr];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...arr, { id, title: product.title, price: product.price, img: product.img, qty }];
    });
  }, []);

  const inc = useCallback((id) => setItems((arr) => arr.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))), []);
  const dec = useCallback((id) => setItems((arr) => arr.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))), []);
  const remove = useCallback((id) => setItems((arr) => arr.filter((x) => x.id !== id)), []);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, add, inc, dec, remove, count, subtotal, open, setOpen }),
    [items, add, inc, dec, remove, count, subtotal, open]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

// export hook as a constant (allowed by the rule config above)
export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
