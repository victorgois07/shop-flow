import chalk from "chalk";
import concurrently from "concurrently";
import dotenv from "dotenv";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = [
  { name: "shopflow-cart", port: process.env.VITE_CART_PORT },
  { name: "shopflow-header", port: process.env.VITE_HEADER_PORT },
  { name: "shopflow-footer", port: process.env.VITE_FOOTER_PORT },
  {
    name: "shopflow-product-listing",
    port: process.env.VITE_PRODUCT_LISTING_PORT,
  },
];

function runPackageTask(pkg, taskType) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${__dirname}/worker.mjs`, {
      workerData: { pkg, taskType },
    });

    worker.on("message", (msg) => {
      console.log(chalk.green(`[${pkg.name}] ${msg}`));
    });

    worker.on("error", (err) => {
      console.error(chalk.red(`[${pkg.name}] Erro: ${err.message}`));
      reject(err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(chalk.red(`[${pkg.name}] saiu com código ${code}`));
        reject(new Error(`Worker ${pkg.name} exited with code ${code}`));
      } else {
        console.log(
          chalk.green(`[${pkg.name}] ${taskType} concluído com sucesso`)
        );
        resolve();
      }
    });
  });
}

// Função para rodar o dev do main em paralelo
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

// Função para iniciar o processo de build e preview em paralelo
async function runBuildAndPreview() {
  const buildTasks = packages.map((pkg) => runPackageTask(pkg, "build"));
  const previewTasks = packages.map((pkg) => runPackageTask(pkg, "preview"));

  // Executar todas as tarefas em paralelo
  await Promise.all([...buildTasks, ...previewTasks]);

  console.log(
    chalk.green("Todas as tarefas de build e preview foram concluídas!")
  );
}

// Função para rodar o dev e preview em paralelo
async function runDevAndPreview() {
  try {
    // Perguntar ao usuário o que ele quer executar
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "tasks",
        message: "Selecione as tarefas a executar:",
        choices: [
          {
            name: "Build e Preview de todos os pacotes",
            value: "buildPreview",
          },
          { name: "Dev do main", value: "devMain" },
        ],
      },
    ]);

    if (answers.tasks.length === 0) {
      console.log(chalk.yellow("Nenhuma tarefa selecionada. Saindo..."));
      return;
    }

    if (
      answers.tasks.includes("buildPreview") &&
      answers.tasks.includes("devMain")
    ) {
      console.log(chalk.yellow("Executando todas as tarefas em paralelo..."));
      await Promise.all([runBuildAndPreview(), runMainDev()]);
    }

    if (answers.tasks.includes("buildPreview")) {
      await runBuildAndPreview();
    }

    if (answers.tasks.includes("devMain")) {
      await runMainDev();
    }
  } catch (error) {
    console.error(chalk.red(`Erro durante a execução: ${error.message}`));
  }
}

runDevAndPreview();
