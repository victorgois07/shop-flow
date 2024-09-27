import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { build, preview } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let previewServer;

build({ build: { watch: {} } }).then((buildWatcher) => {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });

  buildWatcher.on("event", async ({ code }) => {
    if (code === "END") {
      previewServer =
        previewServer ||
        (await preview({
          preview: { port: process.env["VITE_PRODUCT_LISTING_PORT"] },
        }));

      console.log("\n");
      previewServer.printUrls();
    }
  });
});
