import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { CartProvider } from "./components/CardContext.jsx";
import { BrowserRouter } from "react-router-dom";
import WishlistProvider from "./components/WishlistContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
);
