
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, CATS } from "../components/Data/ProductData";
import { useCart } from "../components/CardContext";

function Stars({ value = 4.5 }) {
  const full = Math.floor(value), half = value - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const type = i < full ? "full" : i === full && half ? "half" : "empty";
        return (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24"
               fill={type === "empty" ? "none" : "currentColor"}
               stroke="currentColor" strokeWidth={type === "empty" ? 1.5 : 0}
               className="text-[#7a6d61]">
            {type === "half" ? (
              <>
                <defs>
                  <linearGradient id="half" x1="0" x2="1">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M12 .7l3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.2-6.3 3.2 1.2-7-5-4.9 7-.9L12 .7Z" fill="url(#half)" />
                <path d="M12 .7l3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.2-6.3 3.2 1.2-7-5-4.9 7-.9L12 .7Z" fill="none" stroke="currentColor" strokeWidth="1" />
              </>
            ) : (
              <path d="M12 .7l3.1 6.3 7 .9-5 4.9 1.2 7-6.3-3.2-6.3 3.2 1.2-7-5-4.9 7-.9L12 .7Z"/>
            )}
          </svg>
        );
      })}
    </div>
  );
}

function Card({ p, onAdd }) {
  return (
    <article className="group bg-[#F2EDE7] ring-1 ring-black/5">
      <Link to={`/product/${p.slug}`} className="block relative">
        <div className="aspect-[4/3] bg-[#EFE8E1] overflow-hidden">
          <img
            src={p.img}
            alt={p.title}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[1deg]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] text-[#2d241e]">{p.title}</h3>
          <span className="text-[15px] text-[#2d241e]/80">${p.price}</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="text-[12px] text-[#7a6d61]">
            <Stars value={p.rating} /> <span className="ml-1">({p.reviews})</span>
          </div>

          <button
            onClick={() => onAdd(p)}
            className="mt-2 md:mt-0 inline-flex h-9 px-4 items-center justify-center uppercase text-[12px] font-medium bg-white shadow-sm border border-black/10 hover:bg-white/90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const { add } = useCart?.() || { add: () => {} }; // your CardContext likely has add()/inc() etc.
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("newest");

  const data = useMemo(() => {
    let list = PRODUCTS.filter(p => (cat === "all" ? true : p.cat === cat));
    if (sort === "price-asc") list = list.slice().sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") list = list.slice().sort((a,b)=>b.price-a.price);
    if (sort === "name") list = list.slice().sort((a,b)=>a.title.localeCompare(b.title));
    return list;
  }, [cat, sort]);

  const counts = useMemo(() => {
    const c = { all: PRODUCTS.length, chairs:0, sofas:0, tables:0, lamps:0 };
    PRODUCTS.forEach(p => { c[p.cat]++; });
    return c;
  }, []);

  return (
    <section className="w-full bg-[#F6F2EC]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-14">
        {/* Title row */}
        <h1 className="text-[34px] md:text-[40px] font-extrabold tracking-tight text-[#3B312A]">
          Our products
        </h1>

        {/* Filters + Sort */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {CATS.map(c => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`h-10 rounded-full px-5 text-[14px] border
                  ${cat === c.key
                    ? "bg-[#3B312A] text-white border-[#3B312A]"
                    : "bg-transparent text-[#3B312A] border-[#3B312A]/30 hover:border-[#3B312A]"
                  }`}
              >
                {c.label} ({counts[c.key] ?? 0})
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2">
            <span className="text-[14px] text-[#7a6d61]">Sort by</span>
            <select
              value={sort}
              onChange={e=>setSort(e.target.value)}
              className="h-10 bg-white border border-[#3B312A]/30 px-3 text-[14px]"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map(p => (
            <Card key={p.id} p={p} onAdd={(it)=>add ? add(it) : null} />
          ))}
        </div>

        {/* Spacer bottom */}
        <div className="h-16" />
      </div>
    </section>
  );
}
