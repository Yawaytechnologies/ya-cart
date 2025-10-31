// src/components/FooterYacart.jsx
import React from "react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

export default function FooterYacart() {
  return (
    <footer className="w-full bg-[var(--footer-bg)] text-[var(--footer-text)] ">
      <div className="mx-auto w-full max-w-7xl px-6">
        <br />
        <br />

        {/* LINKS GRID */}
        <div className="relative pt-6 md:pt-3">
          <span className="absolute inset-x-0 top-6 md:top-3 h-px bg-[var(--footer-line)]" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--footer-line)]" />

          <div className="grid gap-8 md:gap-12 md:grid-cols-4 md:divide-x md:divide-[var(--footer-line)]">
            {/* STORE */}
            <div className="py-12 font-body">
              <h4 className="text-[var(--footer-ink)] text-xl font-semibold uppercase tracking-wide">Store</h4>
              <ul className="mt-3 space-y-2.5 text-lg leading-[1.35]">
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Home</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">About</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Journal</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* SHOP */}
            <div className="py-12 font-body md:pl-6">
              <h4 className="text-[var(--footer-ink)] text-xl font-semibold uppercase tracking-wide">Shop</h4>
              <ul className="mt-3 space-y-2.5 text-lg leading-[1.35]">
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">All</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Lookbook</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Collections</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Featured</a></li>
              </ul>
            </div>

            {/* COLLECTIONS */}
            <div className="py-12 font-body md:pl-6">
              <h4 className="text-[var(--footer-ink)] text-xl font-semibold uppercase tracking-wide">Collections</h4>
              <ul className="mt-3 space-y-2.5 text-lg leading-[1.35]">
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Decors</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Furnitures</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Ceramic</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Lamps</a></li>
              </ul>
            </div>

            {/* HELP */}
            <div className="py-12 font-body md:pl-6">
              <h4 className="text-[var(--footer-ink)] text-xl font-semibold uppercase tracking-wide">Help</h4>
              <ul className="mt-3 space-y-2.5 text-lg leading-[1.35]">
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Contact</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Login &amp; Account</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Privacy Policy</a></li>
                <li><a className="hover:text-[var(--footer-ink)] transition-colors">Refund policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* WORDMARK + CART (static, no animation) */}
        <div className="py-6 md:py-8">
          <div
            className="relative z-10 flex items-center justify-center gap-3 sm:gap-4"
            style={{ ["--brandSize"]: "clamp(42px,11vw,160px)" }}
          >
            <span
              className="font-brand text-[var(--footer-ink)] leading-[0.9] tracking-tight select-none"
              style={{ fontSize: "var(--brandSize)" }}
            >
              YACART
            </span>

            <PiShoppingCartSimpleLight
              className="text-[var(--footer-ink)]"
              style={{ fontSize: "calc(var(--brandSize) * 0.9)" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="h-px w-full bg-[var(--footer-line)]" />

        {/* BOTTOM ROW */}
        <div className="flex flex-col items-center justify-between gap-3 py-4 text-base md:flex-row">
          <div className="opacity-95">
            <span>©YaCart</span>
            <span className="mx-3 opacity-50">|</span>
            <span>2025</span>
          </div>
          <div className="opacity-95">
            Design &amp; Dev: <span className="font-medium text-[var(--footer-ink)]">Yaway Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
