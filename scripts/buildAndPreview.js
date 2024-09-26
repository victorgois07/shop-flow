const concurrently = require("concurrently");

concurrently(
  [
    { command: "pnpm build:packages", name: "build", prefixColor: "blue" },
    { command: "pnpm preview:packages", name: "preview", prefixColor: "green" },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
)
  .result.then(() => {
    console.log("Build and preview completed successfully!");
  })
  .catch((err) => {
    console.error("Build or preview failed:", err);
  });
