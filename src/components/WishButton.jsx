import React from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function WishButton({ active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B312A]"
    >
      {active ? <FaHeart size={18} className="text-[#C7423A]" /> : <FiHeart size={18} className="text-[#3B312A]" />}
    </button>
  );
}
