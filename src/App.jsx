// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header"; // desktop header (md+)
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductOverview";
import Home from "./pages/Home";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
/* ------------- Scroll to top on route change ------------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/* ---------------- 404 ---------------- */
function NotFound() {
  return (
    <main className="min-h-[50vh] grid place-items-center bg-[#F6F2EC] px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-[#3B312A]">Page not found</h1>
        <p className="mt-3 text-[#7a6d61]">
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      {/* Fixed desktop header (the component itself is `hidden md:block`) */}
      <Header />

      <ScrollToTop />

      {/* Let the BODY do the scrolling. No overflow wrappers here. */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
         
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
