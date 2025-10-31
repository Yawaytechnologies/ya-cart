import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header";                     // desktop header (md+)
import MobileHeaderOverlay from "./components/MobileHeader"; // ← portal-based mobile header
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";

/* ---------------- 404 ---------------- */
function NotFound() {
  return (
    <main className="min-h-[50vh] grid place-items-center bg-[#F6F2EC] px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-[#3B312A]">Page not found</h1>
        <p className="mt-3 text-[#7a6d61]">The page you’re looking for doesn’t exist.</p>
      </div>
    </main>
  );
}

/* ------------- Scroll to top on route change ------------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // use instant to avoid fighting your hero animations
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      {/* Desktop header only on md+ */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile header — portal to <body>, transparent at top then solid after 140px */}
      

      <ScrollToTop />

      {/* Mark the page container as the scroll root (mobile header listens to this if present).
          If your page scrolls on <body>, this attribute is harmless. */}
      <div id="page" className="min-h-screen overflow-auto" data-scroll-root>
        <MobileHeaderOverlay  logoSrc="/logo.svg" />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}
