import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const galleryImages = [
  "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const ProductDetails = () => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const incQty = () => setQuantity((q) => Math.min(99, q + 1));
  const decQty = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top bar: back + actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/products/list")}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500"
        >
          <span className="text-base">←</span>
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-orange-200 hover:text-orange-600">
            Edit
          </button>

          <div className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-xs text-white px-3 py-1.5">
            <span>Published</span>
            <span className="text-[10px] opacity-80">▾</span>
          </div>
        </div>
      </div>

      {/* Main top section */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
        {/* Left: gallery */}
        <div className="space-y-3">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={activeImage}
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {galleryImages.map((src) => {
              const active = src === activeImage;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={[
                    "h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden border",
                    active
                      ? "border-orange-400 ring-2 ring-orange-200"
                      : "border-slate-200 hover:border-orange-200",
                  ].join(" ")}
                >
                  <img
                    src={src}
                    alt="Thumb"
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: product info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-emerald-50 text-emerald-600 px-2 py-0.5 font-medium">
              NEW
            </span>
            <span className="rounded-full bg-emerald-50 text-emerald-600 px-2 py-0.5 font-medium">
              in stock
            </span>
          </div>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Cloud Lounge Sofa
            </h1>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="text-amber-400 text-base leading-none">★</span>
              <span className="font-semibold text-slate-700">4.8</span>
              <span>(318 reviews)</span>
            </div>
          </div>

          <div className="text-2xl font-semibold text-slate-900">
            $1,290.00
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
            Modern deep-seat sofa with soft foam cushions and a low profile
            silhouette. Perfect for cozy evenings, open spaces and minimalist
            living rooms.
          </p>

          {/* Options */}
          <div className="space-y-4">
            {/* Color */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Color</span>
                <span className="text-slate-400">Mint • Sand • Charcoal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-emerald-400 ring-2 ring-offset-2 ring-emerald-200" />
                <span className="h-7 w-7 rounded-full bg-orange-200" />
                <span className="h-7 w-7 rounded-full bg-slate-700" />
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Size</span>
                <span className="text-slate-400">3 options</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["2-seater", "3-seater", "L-shape"].map((size, i) => {
                  const active = i === 1;
                  return (
                    <button
                      key={size}
                      type="button"
                      className={[
                        "px-3 py-1.5 rounded-lg text-xs border",
                        active
                          ? "bg-slate-900 text-white border-slate-900"
                          : "border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-600",
                      ].join(" ")}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Quantity</span>
              </div>
              <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white text-sm">
                <button
                  type="button"
                  onClick={decQty}
                  className="h-9 w-9 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                >
                  −
                </button>
                <div className="w-10 text-center text-slate-800 font-medium">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={incQty}
                  className="h-9 w-9 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="flex-1 min-w-[140px] rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-medium text-white py-2.5">
              Add to cart
            </button>
            <button className="flex-1 min-w-[140px] rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-orange-200 hover:text-orange-600 py-2.5 bg-white">
              Buy now
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
            <button className="hover:text-orange-500">Compare</button>
            <button className="hover:text-orange-500">Favorite</button>
            <button className="hover:text-orange-500">Share</button>
          </div>
        </div>
      </section>

      {/* Benefits row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          title="100% original"
          text="All furniture is inspected and verified before shipping."
        />
        <FeatureCard
          title="10 days replacement"
          text="Free replacement for major defects or damage in transit."
        />
        <FeatureCard
          title="2 year warranty"
          text="Frame and stitching covered under extended warranty."
        />
      </section>

      {/* Tabs + content */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        {/* Tabs */}
        <div className="border-b border-slate-100 px-5 pt-3">
          <div className="flex gap-6 text-sm">
            <button
              className={[
                "py-2 relative",
                activeTab === "description"
                  ? "text-slate-900 font-medium"
                  : "text-slate-400",
              ].join(" ")}
              onClick={() => setActiveTab("description")}
            >
              Description
              {activeTab === "description" && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-orange-500" />
              )}
            </button>
            <button
              className={[
                "py-2 relative",
                activeTab === "reviews"
                  ? "text-slate-900 font-medium"
                  : "text-slate-400",
              ].join(" ")}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (18)
              {activeTab === "reviews" && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-orange-500" />
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 text-sm text-slate-600 space-y-6">
          {activeTab === "description" ? (
            <>
              {/* Specs table */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Specifications
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <SpecRow label="Category" value="Living Room Sofa" />
                  <SpecRow label="Material" value="Solid wood frame, fabric" />
                  <SpecRow label="Warranty" value="24 months" />
                  <SpecRow label="Dimensions" value="220 x 95 x 80 cm" />
                  <SpecRow label="Ships from" value="Warehouse A – India" />
                </div>
              </div>

              {/* Details */}
              <SectionBlock title="Product details">
                <Bullet>
                  Soft deep-seat cushions with removable, washable covers.
                </Bullet>
                <Bullet>
                  FSC-certified wood frame with reinforced corner blocks.
                </Bullet>
                <Bullet>
                  High-resilience foam layered with soft fiber for comfort.
                </Bullet>
                <Bullet>
                  Matching ottoman and side table available in same collection.
                </Bullet>
              </SectionBlock>

              <SectionBlock title="Benefits">
                <Bullet>
                  Neutral tones that blend easily with most interior styles.
                </Bullet>
                <Bullet>Compact footprint with generous seating depth.</Bullet>
                <Bullet>
                  Durable fabric with stain-resistant coating suitable for
                  everyday use.
                </Bullet>
              </SectionBlock>

              <SectionBlock title="Delivery and returns">
                <Bullet>Delivered pre-assembled to most metro cities.</Bullet>
                <Bullet>Standard delivery: 4–5 business days.</Bullet>
                <Bullet>Free returns within 10 days for manufacturing defects.</Bullet>
              </SectionBlock>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Reviews UI not wired yet. You can connect this tab to your
              reviews collection later.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, text }) => (
  <div className="flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 py-5 px-4">
    <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2 text-lg">
      ✓
    </div>
    <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
    <p className="text-xs text-slate-500">{text}</p>
  </div>
);

const SpecRow = ({ label, value }) => (
  <div className="grid grid-cols-[130px_minmax(0,1fr)] border-b last:border-b-0 border-slate-200">
    <div className="bg-slate-50 px-3 py-2.5 text-slate-500 font-medium">
      {label}
    </div>
    <div className="px-3 py-2.5 text-slate-700">{value}</div>
  </div>
);

const SectionBlock = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
      {children}
    </ul>
  </div>
);

const Bullet = ({ children }) => <li>{children}</li>;

export default ProductDetails;
