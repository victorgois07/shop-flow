import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import dotenv from "dotenv";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  return {
    plugins: [
      react(),
      federation({
        name: "shopflowApp",
        remotes: {
          shopflowCart: process.env["VITE_CART_REMOTE"] as string,
          shopflowFooter: process.env["VITE_FOOTER_REMOTE"] as string,
          shopflowProductListing: process.env[
            "VITE_PRODUCT_LISTING_REMOTE"
          ] as string,
          shopflowHeader: process.env["VITE_HEADER_REMOTE"] as string,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: Number(process.env["VITE_MAIN_PORT"]),
    },
    preview: {
      port: Number(process.env["VITE_MAIN_PORT"]),
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  };
});
