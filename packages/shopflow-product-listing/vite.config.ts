import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import dotenv from "dotenv";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });

  return {
    plugins: [
      react(),
      federation({
        name: "shopflow-header",
        filename: "remoteEntry.js",
        exposes: {
          "./ProductList": "./src/components/ProductList",
        },
        shared: ["react", "react-dom", "tailwindcss"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: Number(process.env["VITE_PRODUCT_LISTING_PORT"]),
    },
    preview: {
      port: Number(process.env["VITE_PRODUCT_LISTING_PORT"]),
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  };
});
