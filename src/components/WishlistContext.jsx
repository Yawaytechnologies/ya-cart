import React, { useEffect, useMemo, useState } from "react";
import { WishlistContext } from "../contexts/wishlistContext";

const LS_KEY = "ya_wishlist_v1";

const getId = (p) => p?.id ?? p?.sku ?? p?._id;
const normalize = (p) => ({
  id: getId(p),
  title: p.title ?? p.name ?? "Untitled",
  price: Number(p.price ?? 0),
  img: p.img ?? p.image ?? (Array.isArray(p.images) ? p.images[0] : undefined),
  slug: p.slug ?? String(getId(p) || ""),
  data: p,
});

// ✅ default export: component ONLY
export default function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const idSet = useMemo(() => new Set(items.map((x) => x.id)), [items]);

  const add = (p) => {
    const id = getId(p);
    if (!id || idSet.has(id)) return;
    setItems((prev) => [normalize(p), ...prev]);
  };

  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  const toggle = (p) => {
    const id = getId(p);
    if (!id) return;
    setItems((prev) =>
      prev.some((x) => x.id === id)
        ? prev.filter((x) => x.id !== id)
        : [normalize(p), ...prev]
    );
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      add,
      remove,
      toggle,
      clear,
      isWished: (id) => idSet.has(id),
    }),
    [items, idSet]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
