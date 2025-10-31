
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCart } from "../components/CardContext"; // ← add
import chair from "../assets/chair.png";
import lamp from "../assets/lamp.png";
import table from "../assets/table.png";
import tap from "../assets/tap.png";

const EASE = [0.22, 1, 0.36, 1];

const fadeUpStagger = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 } },
};
const childFadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

export default function TrendingThisSeason() {
  const { add } = useCart(); // ← use cart

  const items = [
    { id: "chair-1", title: "Plush White Chair", price: 520, img: chair },
    { id: "lamp-1",  title: "Tripod table lamp", price: 344, img: lamp },
    { id: "table-1", title: "Hexagonal table",   price: 450, img: table },
    { id: "tap-1",   title: "Designer Glass Table", price: 220, img: tap },
  ];

  return (
    <section className="bg-[var(--paper)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="pt-[72px] md:pt-[96px]"
          variants={fadeUpStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
        >
          <motion.div className="flex justify-center" variants={childFadeUp}>
            <span className="text-[12px] md:text-[13px] leading-none text-[var(--edge)]/75 tracking-[0.18em]">
              [HOT]
            </span>
          </motion.div>

          <motion.h2
            className="mt-4 text-center font-semibold text-[var(--ink)] text-[36px] md:text-[64px] leading-[1.05]"
            variants={childFadeUp}
          >
            <span className="relative inline-block">
              Trending This Season
              <span className="absolute -right-[18px] top-[0.58em] inline-block h-[12px] w-[12px] rounded-full bg-[var(--accent)]" />
            </span>
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-10 grid gap-[36px] sm:grid-cols-2 lg:grid-cols-4"
          variants={fadeUpStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
        >
          {items.map((p, idx) => (
            <motion.article
              key={p.id}
              className="group"
              variants={childFadeUp}
              transition={{ duration: 0.6, ease: EASE, delay: idx * 0.02 }}
            >
              {/* Card */}
              <div className="relative aspect-[5/6] overflow-hidden border border-[var(--line)] bg-[var(--paper)] soft-shadow">
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.06] group-hover:rotate-[-2deg]"
                  loading="lazy"
                />

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => add(p, 1)}   // ← add to cart
                  className="absolute left-1/2 -translate-x-1/2 bottom-6 px-6 sm:px-8 py-3 text-xs sm:text-sm md:text-[15px]
                             font-semibold uppercase tracking-[.08em] sm:tracking-[.12em] whitespace-nowrap leading-none
                             bg-[var(--light)] border border-[var(--line-strong)] text-[var(--edge)] shadow-sm
                             transition-all duration-300 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                  aria-label={`Add ${p.title} to cart`}
                >
                  ADD TO CART
                </button>
              </div>

              {/* caption + price */}
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-[var(--ink)] text-md md:text-xl">{p.title}</p>
                <p className="text-[var(--ink)] text-xl md:text-xl font-medium">${p.price}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="pb-[72px] md:pb-[96px]" />
      </div>
    </section>
  );
}
