// src/App.jsx
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  Link,
} from "react-router-dom";

/* ---------- User-side components ---------- */
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductOverview";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import YawayPortfolio from "./components/Portfolio";

/* ---------- Admin-side components ---------- */
import AdminHeader from "./components/Admin/Header";
import AdminSidebar from "./components/Admin/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import ProductDetailsAdmin from "./components/Admin/Products/ProductDetails";
import ProductCreate from "./components/Admin/Products/CreateProduct";
import OrderList from "./components/Admin/Orders/OrderList";
import ProductList from "./components/Admin/Products/ProductList";
import OrderDetails from "./components/Admin/Orders/OrderDetails";
import InvoiceList from "./components/Admin/Invoice/InvoiceList";
import InvoiceDetails from "./components/Admin/Invoice/InvoiceDetails";

/* ------------- Scroll to top on route change ------------- */
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

/* ---------------- User layout (shop) ---------------- */
function ShopLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      <main className="relative">
        <Outlet />

        {isHome && <AdminCtaButton />}
      </main>
      <Footer />
    </>
  );
}

function AdminCtaButton() {
  return (
    <Link
      to="/admin"
      className="btn-shine fixed bottom-24 md:bottom-10 right-4 md:right-8 z-40
                 inline-flex items-center gap-3 rounded-full
                 bg-gradient-to-r from-orange-500 via-orange-600 to-slate-900
                 text-white px-4 md:px-5 py-2.5 text-sm font-semibold
                 shadow-xl shadow-orange-500/40 border border-orange-300/60
                 hover:from-orange-400 hover:via-orange-500 hover:to-slate-900
                 active:scale-[0.97] transition-transform transition-colors"
      aria-label="Go to admin dashboard"
    >
      {/* Pulsing icon */}
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute inline-flex h-8 w-8 rounded-full bg-orange-400/50 animate-ping" />
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-600 text-[11px] font-black">
          AD
        </span>
      </span>

      <div className="flex flex-col items-start leading-tight">
        <span className="hidden sm:inline text-[11px] uppercase tracking-wide text-orange-100/90">
          Admin portal
        </span>
        <span className="text-xs sm:text-sm">Open dashboard</span>
      </div>

      {/* Professional arrow icon */}
      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10">
        <svg
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 text-white"
          aria-hidden="true"
        >
          <path
            d="M6 14L14 6M8 6h6v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

/* ---------------- Admin layout ---------------- */
function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-white">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      </div>

      {/* Sidebar + content, both under the header */}
      <div className="flex">
        {/* Sidebar container:
            - width 0 on mobile (no white space)
            - collapsible widths on md+ */}
        <aside
          className={[
            "sticky top-14 z-30 h-[calc(100vh-56px)] bg-white transition-all duration-200 overflow-hidden",
            "w-0 md:border-r md:border-orange-100",
            sidebarOpen ? "md:w-64" : "md:w-20",
          ].join(" ")}
        >
          <AdminSidebar sidebarOpen={sidebarOpen} />
        </aside>

        {/* Scrollable content only */}
        <main className="flex-1 h-[calc(100vh-56px)] overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ---------------- 404 ---------------- */
function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center bg-[#F6F2EC] px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-[#3B312A]">
          Page not found
        </h1>
        <p className="mt-3 text-[#7a6d61]">
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ---------- USER / SHOP ROUTES ---------- */}
        <Route element={<ShopLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/portfolio" element={<YawayPortfolio />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin */}
          <Route index element={<Dashboard />} />

          {/* /admin/products/list */}
          <Route path="products/list" element={<ProductList />} />
          <Route
            path="products/details"
            element={<ProductDetailsAdmin title="Product Details" />}
          />
          <Route
            path="products/create"
            element={<ProductCreate title="Create New Product" />}
          />

          {/* /admin/orders/list */}
          <Route path="orders/list" element={<OrderList />} />
          <Route
            path="orders/details"
            element={<OrderDetails title="Order Details" />}
          />

          {/* /admin/invoices */}
          <Route path="invoices/list" element={<InvoiceList />} />
          <Route path="invoices/details" element={<InvoiceDetails />} />

          {/* 404 for /admin/* */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
