// src/components/StickyShop.jsx
import React from "react";
import { useCart } from "../components/CardContext";

import LeftHero from "../assets/popupp.jpeg";
import P1 from "../assets/stock-1.jpg";
import P2 from "../assets/table.png";
import P3 from "../assets/tap.png";
import P4 from "../assets/sttack-3.png";
import P5 from "../assets/sttack-2.jpeg";
import P6 from "../assets/sttack-1.png";
import P7 from "../assets/lamp.png";
import P8 from "../assets/chair.png";

const PRODUCTS = [
  { id: "p1", title: "Plush White Chair",    price: 520, img: P1 },
  { id: "p2", title: "Tripod Table Lamp",    price: 344, img: P2 },
  { id: "p3", title: "Hexagonal Table",      price: 450, img: P3 },
  { id: "p4", title: "Designer Glass Table", price: 220, img: P4 },
  { id: "p5", title: "Rattan Lounge Chair",  price: 399, img: P5 },
  { id: "p6", title: "Minimal Side Table",   price: 149, img: P6 },
  { id: "p7", title: "Soft Cushion Sofa",    price: 890, img: P7 },
  { id: "p8", title: "Nordic Floor Lamp",    price: 189, img: P8 },
];

export default function StickyShop() {
  const { add, setOpen } = useCart();

  return (
    <section className="w-full bg-[#F6F2EC]">
      {/* important: no lg top-padding here that would push the sticky down */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-16 pt-8 lg:pt-0">
        <div className="grid lg:grid-cols-2 items-start gap-8 lg:gap-12">
          {/* LEFT — sticky under header, fills viewport below it */}
          <div className="lg:sticky lg:top-[var(--head,110px)]">
            <div className="h-[calc(100vh-var(--head,110px))] min-h-[480px] overflow-hidden">
              <img src={LeftHero} alt="Collection" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* RIGHT — normal flow; window scroll moves it */}
          <div className="grid gap-8 sm:grid-cols-2 content-start">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="group bg-[#F2EDE7] overflow-hidden ring-1 ring-black/5">
                <div className="relative">
                  <div className="aspect-[4/3] bg-[#EFE8E1] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-contain transform-gpu transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:rotate-[1deg]"
                    />
                  </div>
                  <button
                    className="absolute inset-x-3 bottom-3 h-10 bg-white/90 backdrop-blur text-[12px] tracking-wide font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm rounded-none"
                    onClick={() => { add(p, 1); setOpen(true); }}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="flex items-baseline justify-between px-4 py-3">
                  <h3 className="text-[14px] md:text-[15px] text-[#1b1b1b]">{p.title}</h3>
                  <span className="text-[14px] md:text-[15px] text-[#1b1b1b]/80">${p.price}</span>
                </div>
              </article>
            ))}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
