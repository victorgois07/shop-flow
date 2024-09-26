import chalk from "chalk";
import concurrently from "concurrently";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definindo cores diferentes para cada pacote
const packageColors = {
  "shopflow-cart": "green",
  "shopflow-header": "blue",
  "shopflow-footer": "magenta",
  "shopflow-product-listing": "cyan",
};

const packages = [
  { name: "shopflow-cart", port: process.env.VITE_CART_PORT },
  { name: "shopflow-header", port: process.env.VITE_HEADER_PORT },
  { name: "shopflow-footer", port: process.env.VITE_FOOTER_PORT },
  {
    name: "shopflow-product-listing",
    port: process.env.VITE_PRODUCT_LISTING_PORT,
  },
];

async function runBuild(pkg) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${__dirname}/worker.mjs`, {
      workerData: { pkg, taskType: "build" },
    });

    worker.on("message", (msg) => {
      const color = chalk[packageColors[pkg.name] || "white"];
      console.log(color(`[${pkg.name}] ${msg}`));
    });

    worker.on("error", (err) => {
      const color = chalk.red;
      console.error(color(`[${pkg.name}] Erro: ${err.message}`));
      reject(err);
    });

    worker.on("exit", (code) => {
      const color = chalk[packageColors[pkg.name] || "white"];
      if (code !== 0) {
        console.error(color(`[${pkg.name}] saiu com código ${code}`));
        reject(new Error(`Worker ${pkg.name} exited with code ${code}`));
      } else {
        console.log(color(`[${pkg.name}] build concluído com sucesso`));
        resolve();
      }
    });
  });
}

async function runPreview(pkg) {
  console.log(chalk.yellow(`[${pkg.name}] Iniciando preview...`));
  return concurrently(
    [
      {
        command: `pnpm --filter ${pkg.name} preview --port ${pkg.port}`,
        name: `${pkg.name}-preview`,
        prefixColor: packageColors[pkg.name],
      },
    ],
    {
      prefix: "name",
      killOthers: ["failure"],
      restartTries: 3,
    }
  ).result.catch((err) => {
    console.error(
      chalk.red(`Erro no preview do pacote ${pkg.name}: ${err.message}`)
    );
  });
}

async function runBuildAndPreview(pkg) {
  try {
    await runBuild(pkg);
    await runPreview(pkg);
  } catch (error) {
    console.error(
      chalk.red(
        `Erro durante a execução do pacote ${pkg.name}: ${error.message}`
      )
    );
  }
}

async function runAllPackages() {
  const tasks = packages.map((pkg) => runBuildAndPreview(pkg));
  await Promise.all(tasks);
}

async function runMainDev() {
  console.log(chalk.blue(`Iniciando o dev do main...`));
  return concurrently([
    {
      command: `pnpm --filter main dev --port ${process.env.VITE_MAIN_PORT}`,
      name: "main",
      prefixColor: "blue",
    },
  ]).result;
}

async function runDevAndWatch() {
  try {
    console.log(
      chalk.green("Iniciando o build e preview para todos os pacotes...")
    );
    await Promise.all(runAllPackages(), runMainDev());
  } catch (error) {
    console.error(chalk.red(`Erro durante a execução: ${error.message}`));
  }
}

runDevAndWatch();
