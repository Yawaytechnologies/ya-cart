// src/pages/profile.helpers.js

/* ---------------- utils ---------------- */
export const cx = (...cls) => cls.filter(Boolean).join(" ");
export const currency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(Number(n || 0));

export const buildIndex = (list = []) => {
  const norm = (s) => (s || "").toString().trim().toLowerCase();
  const byId = new Map(list.map((p) => [p.id, p]));
  const bySlug = new Map(list.map((p) => [p.slug, p]));
  const byTitle = new Map(list.map((p) => [norm(p.title), p]));
  return { byId, bySlug, byTitle, norm };
};

/* ---------------- mock user + orders ---------------- */
export const MOCK_USER = {
  name: "Jaya Prakash",
  email: "jaya@yawaytech.com",
  phone: "+91 98765 43210",
  joinedAt: "2024-05-12T09:22:00Z",
};

export const MOCK_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    line1: "12, Lake View Street",
    line2: "Anna Nagar",
    city: "Chennai",
    state: "TN",
    zip: "600040",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Studio",
    line1: "Plot 7, IV Main Road",
    line2: "OMR",
    city: "Chennai",
    state: "TN",
    zip: "600097",
    country: "India",
    isDefault: false,
  },
];

/* Use your real id/slug/title values from ProductData */
export const MOCK_ORDERS = [
  {
    id: "YA-10428",
    date: "2025-10-25",
    status: "processing",
    total: 520,
    items: [{ productId: "p1", slug: "plush-white-chair", title: "Plush White Chair", qty: 1 }],
  },
  {
    id: "YA-10401",
    date: "2025-10-11",
    status: "shipped",
    total: 493,
    items: [
      { slug: "tripod-table-lamp", title: "Tripod table lamp", qty: 1 },
      { title: "Minimal Side Table", qty: 1 },
    ],
  },
  {
    id: "YA-10377",
    date: "2025-09-28",
    status: "delivered",
    total: 450,
    items: [{ slug: "hexagonal-table", title: "Hexagonal table", qty: 1 }],
  },
];

/* NAV meta (icons are wired in Profile.jsx) */
export const NAV = [
  { key: "overview", label: "Overview" },
  { key: "orders", label: "Orders" },
  { key: "addresses", label: "Addresses" },
  { key: "wishlist", label: "Wishlist", href: "/wishlist" },
  { key: "security", label: "Security" },
];
