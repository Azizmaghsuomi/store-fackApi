import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Providers from "./providers/Providers.jsx";
import router from "./constants/router.jsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router}></RouterProvider>
    </Providers>
  </StrictMode>
);
