import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import dotenv from "dotenv";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });

  return {
    plugins: [
      react(),
      svgr(),
      federation({
        name: "shopflow-cart",
        filename: "remoteEntry.js",
        exposes: {
          "./Cart": "./src/components/Cart",
          "./CartItem": "./src/components/CartItem",
        },
        shared: ["react", "react-dom", "shopflow-shared", "tailwindcss"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: Number(process.env["VITE_CART_PORT"]),
    },
    preview: {
      port: Number(process.env["VITE_CART_PORT"]),
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  };
});
