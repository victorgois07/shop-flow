import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Backdrop from "./components/Backdrop";
import "./index.css";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Backdrop show />}>
      <App />
    </Suspense>
  </StrictMode>
);
