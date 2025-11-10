import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/wishlistContext";

import WishButton from "../components/WishButton";

export default function Wishlist() {
  const { items, remove, clear } = useWishlist();

  return (
    <main className="min-h-screen bg-[#F6F2EC] px-5 md:px-8 pb-10 pt-4 md:pt-[calc(var(--head,110px)+8px)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#3B312A]">Wishlist</h1>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="rounded-lg border border-[#3B312A]/20 px-3 py-2 text-sm text-[#F6F2EC] bg-[#3B312A]"
            >
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-[#7B6F66]">
            No items yet. Tap the ♥ on any product to add it here.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map(({ data }) => (
              <article
                key={data.id}
                className="group bg-[#F2EDE7] ring-1 ring-black/5 overflow-hidden"
              >
                <Link to={`/product/${data.slug}`} className="block relative">
                  <div className="aspect-[4/3] bg-[#EFE8E1] overflow-hidden">
                    <img
                      src={data.img}
                      alt={data.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <WishButton
                    active
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      remove(data.id);
                    }}
                  />
                </Link>
                <div className="px-4 pt-3 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] text-[#2d241e]">{data.title}</h3>
                    <span className="text-[15px] text-[#2d241e]/80">
                      ${data.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
