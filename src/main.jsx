import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routers/routes";
import Providers from "./Authentication/Providers/Providers";
import { CartProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </Providers>
  </StrictMode>,
);
