// src/components/shop/productsData.js
import P1 from "../../assets/stock-1.jpg";
import P2 from "../../assets/table.png";
import P3 from "../../assets/tap.png";
import P4 from "../../assets/sttack-3.png";
import P5 from "../../assets/sttack-2.jpeg";
import P6 from "../../assets/sttack-1.png";
import P7 from "../../assets/lamp.png";
import P8 from "../../assets/chair.png";

export const PRODUCTS = [
  { id: "p1", slug: "plush-white-chair",    title: "Plush White Chair",    price: 520, img: P1, cat: "chairs",  rating: 4.6, reviews: 36 },
  { id: "p2", slug: "tripod-table-lamp",    title: "Tripod table lamp",    price: 344, img: P2, cat: "lamps",   rating: 4.4, reviews: 21 },
  { id: "p3", slug: "hexagonal-table",      title: "Hexagonal table",      price: 450, img: P3, cat: "tables",  rating: 4.7, reviews: 18 },
  { id: "p4", slug: "designer-glass-table", title: "Designer Glass Table", price: 220, img: P4, cat: "tables",  rating: 4.2, reviews: 12 },
  { id: "p5", slug: "rattan-lounge-chair",  title: "Rattan Lounge Chair",  price: 399, img: P5, cat: "chairs",  rating: 4.5, reviews: 28 },
  { id: "p6", slug: "minimal-side-table",   title: "Minimal Side Table",   price: 149, img: P6, cat: "tables",  rating: 4.1, reviews: 9  },
  { id: "p7", slug: "soft-cushion-sofa",    title: "Soft Cushion Sofa",    price: 890, img: P7, cat: "sofas",   rating: 4.8, reviews: 42 },
  { id: "p8", slug: "nordic-floor-lamp",    title: "Nordic Floor Lamp",    price: 189, img: P8, cat: "lamps",   rating: 4.3, reviews: 14 },
  // duplicate a few to fill rows (same images, different ids/slugs)
  { id: "p9", slug: "woven-chair",          title: "Woven Chair",          price: 450, img: P8, cat: "chairs",  rating: 4.5, reviews: 11 },
  { id: "p10", slug: "round-table",         title: "Round Table",          price: 320, img: P3, cat: "tables",  rating: 4.2, reviews: 7  },
  { id: "p11", slug: "paxous-chair",        title: "Paxous Chair",         price: 220, img: P5, cat: "chairs",  rating: 4.0, reviews: 5  },
  { id: "p12", slug: "plush-white-chair-2", title: "Plush White Chair",    price: 120, img: P1, cat: "chairs",  rating: 4.1, reviews: 4  },
];

export const CATS = [
  { key: "all",    label: "All" },
  { key: "chairs", label: "Chairs" },
  { key: "sofas",  label: "Sofas" },
  { key: "tables", label: "Tables" },
  { key: "lamps",  label: "Floor Lamps" },
];
