// src/pages/ProductDetails.jsx
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../components/Data/ProductData";
import { useCart } from "../components/CardContext";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center h-7 px-3 text-[12px] rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
      {children}
    </span>
  );
}

function StarsRow({ value=4.5, reviews=0 }) {
  const full = Math.floor(value), half = value - full >= .5;
  return (
    <div className="flex items-center gap-2 text-[#7a6d61]">
      <div className="inline-flex">
        {Array.from({length:5}).map((_,i)=>{
          const type = i<full ? "full" : i===full && half ? "half" : "empty";
          return (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24"
                 fill={type === "empty" ? "none" : "currentColor"}
                 stroke="currentColor" strokeWidth={type === "empty" ? 1.5 : 0}>
              {type === "half" ? (
                <>
                  <defs>
                    <linearGradient id={`half${i}`} x1="0" x2="1">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path d="M12 .7l3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.2-6.3 3.2 1.2-7-5-4.9 7-.9L12 .7Z" fill={`url(#half${i})`} />
                  <path d="M12 .7l3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.2-6.3 3.2 1.2-7-5-4.9 7-.9L12 .7Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                </>
              ) : (
                <path d="M12 .7l3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.2-6.3 3.2 1.2-7-5-4.9 7-.9L12 .7Z"/>
              )}
            </svg>
          );
        })}
      </div>
      <span className="text-[13px]">({reviews} Reviews)</span>
    </div>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const { add } = useCart?.() || { add: () => {} };

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const images = useMemo(() => [product.img, product.img, product.img, product.img], [product]);

  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("beige");

  const addToCart = () => add ? add({ ...product, qty }) : null;

  const related = useMemo(() => {
    return PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0,4);
  }, [product]);

  return (
    <section className="w-full bg-[#F6F2EC]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-8 md:pt-12 pb-14">
        {/* Breadcrumb */}
        <div className="text-[13px] text-[#7a6d61]">
          <Link to="/" className="hover:underline">Home</Link> ·{" "}
          <span className="capitalize">{product.cat}</span> ·{" "}
          <span className="text-[#3B312A]">{product.title}</span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_420px]">
          {/* LEFT: images */}
          <div className="grid grid-cols-[96px_1fr] gap-5">
            <div className="flex flex-col gap-4">
              {images.map((src, i) => (
                <button key={i}
                        onClick={()=>setActive(i)}
                        className={`aspect-[3/4] bg-[#EFE8E1] ring-1 ring-black/5 overflow-hidden ${
                          active===i ? "outline outline-2 outline-[#3B312A]" : ""
                        }`}>
                  <img src={src} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            <div className="aspect-[4/3] md:aspect-[5/4] bg-[#EFE8E1] ring-1 ring-black/5 overflow-hidden">
              <img src={images[active]} alt={product.title} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* RIGHT: info */}
          <div className="min-w-0">
            <h1 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-[#3B312A]">
              {product.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <Badge>In Stock</Badge>
              <StarsRow value={product.rating} reviews={product.reviews} />
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-[#7a6d61] line-through text-[18px]">${(product.price * 1.35).toFixed(2)}</span>
              <span className="text-[30px] font-extrabold text-[#3B312A]">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Colors */}
            <div className="mt-6">
              <div className="text-[14px] text-[#3B312A] font-medium">Color :</div>
              <div className="mt-2 flex items-center gap-3">
                {["beige","grey","charcoal","brick"].map(c => (
                  <button key={c}
                    onClick={()=>setColor(c)}
                    aria-label={c}
                    className={`w-7 h-7 rounded-full border border-black/10 ${color===c?"ring-2 ring-[#3B312A]":""}`}
                    style={{
                      background: c==="beige"?"#EAD8C8":c==="grey"?"#D5D5D5":c==="charcoal"?"#3B3B3B":"#9b4545"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Qty + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center border border-black/10 bg-white h-11">
                <button className="w-10 h-11" onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
                <div className="w-12 text-center">{qty}</div>
                <button className="w-10 h-11" onClick={()=>setQty(q=>q+1)}>+</button>
              </div>

              <button
                onClick={addToCart}
                className="h-11 px-6 bg-white border border-black/10 shadow-sm text-[14px] uppercase font-semibold"
              >
                Add To Cart
              </button>

              <button
                onClick={addToCart}
                className="h-11 px-7 bg-[#3B312A] text-white text-[14px] uppercase font-semibold"
              >
                Buy Now
              </button>
            </div>

            {/* Meta */}
            <div className="mt-6 space-y-2 text-[14px] text-[#7a6d61]">
              <div><span className="text-[#3B312A]">SKU:</span> NTB7SDVX44</div>
              <div><span className="text-[#3B312A]">Category:</span> {product.cat[0].toUpperCase()+product.cat.slice(1)}</div>
              <div><span className="text-[#3B312A]">Tag:</span> Modern</div>
            </div>
          </div>
        </div>

        {/* Tabs (simple) */}
        <div className="mt-12 border-t border-[#E2D7C8]" />
        <div className="mt-6 flex gap-8 text-[#7a6d61]">
          <a href="#desc" className="pb-2 border-b-2 border-[#3B312A] text-[#3B312A]">Description</a>
          <a href="#add"  className="pb-2">Additional information</a>
          <a href="#rev"  className="pb-2">Reviews ({product.reviews})</a>
        </div>

        <div id="desc" className="mt-6 max-w-3xl text-[#3B312A] leading-7">
          <h3 className="text-[24px] font-extrabold mb-2">Product Description</h3>
          <p>
            Clean modern lines with comfortable proportions. Durable fabric with a soft hand,
            powder-coated frame, and timeless palette designed to blend in beautifully.
          </p>
        </div>

        {/* Related */}
        <h3 className="mt-14 text-[22px] font-extrabold tracking-tight text-[#3B312A]">
          Related Product
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map(r => (
            <Link key={r.id} to={`/product/${r.slug}`} className="bg-[#F2EDE7] ring-1 ring-black/5 block">
              <div className="aspect-[4/3] bg-[#EFE8E1] overflow-hidden">
                <img src={r.img} alt={r.title} className="w-full h-full object-contain" />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="text-[15px] text-[#2d241e]">{r.title}</div>
                <div className="text-[15px] text-[#2d241e]/80">${r.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
