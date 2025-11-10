// src/components/StickyShop.jsx
import React from "react";
import { useCart } from "./CardContext"; // local path (avoid duplicate modules)
import { useWishlist } from "../contexts/wishlistContext";
import WishButton from "./WishButton"; // shared heart UI
import { PRODUCTS } from "./Data/ProductData"; // same IDs as Products page

import LeftHero from "../assets/popupp.jpeg";

export default function StickyShop() {
  const { add } = useCart();
  const { isWished, toggle } = useWishlist();

  const addToCart = (p) => add(p, 1);

  return (
    <section className="w-full bg-[#F6F2EC]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-16 pt-8 lg:pt-0">
        <div className="grid lg:grid-cols-2 items-start gap-8 lg:gap-12">
          {/* LEFT – sticky hero */}
          <div className="lg:sticky lg:top-[var(--head,110px)]">
            <div className="h-[calc(100vh-var(--head,110px))] min-h-[480px] overflow-hidden">
              <img
                src={LeftHero}
                alt="Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT – products */}
          <div className="grid gap-8 sm:grid-cols-2 content-start">
            {PRODUCTS.map((p) => {
              const wished = isWished(p.id);
              return (
                <article
                  key={p.id}
                  className="group bg-[#F2EDE7] overflow-hidden ring-1 ring-black/5"
                >
                  <div className="relative">
                    <div className="aspect-[4/3] bg-[#EFE8E1] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-contain transform-gpu transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:rotate-[1deg]"
                      />
                    </div>

                    {/* ♥ Favorite (global wishlist) */}
                    <WishButton
                      active={wished}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(p); // pass full product; IDs match app-wide
                      }}
                    />

                    {/* Desktop hover CTA */}
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="absolute inset-x-3 bottom-3 hidden md:inline-flex h-10 items-center justify-center
                                 bg-white/90 backdrop-blur text-[12px] tracking-wide font-medium uppercase
                                 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 shadow-sm rounded-none
                                 border border-black/10"
                      aria-label={`Add ${p.title} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* meta */}
                  <div className="flex items-baseline justify-between px-4 py-3">
                    <h3 className="text-[14px] md:text-[15px] text-[#1b1b1b]">
                      {p.title}
                    </h3>
                    <span className="text-[14px] md:text-[15px] text-[#1b1b1b]/80">
                      ${p.price}
                    </span>
                  </div>

                  {/* Mobile CTA – full width */}
                  <div className="md:hidden px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="block w-full h-10 rounded-none border border-black/10 bg-white
                                 text-[12px] font-semibold uppercase tracking-wide shadow-sm
                                 active:translate-y-[1px] transition"
                      aria-label={`Add ${p.title} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              );
            })}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
