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
          shopflowCart: "http://localhost:3001/assets/remoteEntry.js",
          shopflowFooter: "http://localhost:3003/assets/remoteEntry.js",
          shopflowProductListing: "http://localhost:3004/assets/remoteEntry.js",
          shopflowHeader: "http://localhost:3002/assets/remoteEntry.js",
        },
        shared: ["react", "react-dom", "shopflow-shared"],
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
