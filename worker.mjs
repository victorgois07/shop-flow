import { exec } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { parentPort, workerData } from "worker_threads";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function execCommand(command) {
  return new Promise((resolve, reject) => {
    const process = exec(command);

    process.stdout.on("data", (data) => {
      parentPort.postMessage(data.toString());
    });

    process.stderr.on("data", (data) => {
      parentPort.postMessage(data.toString());
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

const { pkg, taskType } = workerData;

const command =
  taskType === "build"
    ? `pnpm --filter ${pkg.name} build`
    : `pnpm --filter ${pkg.name} preview --port ${pkg.port}`;

execCommand(command)
  .then(() => {
    parentPort.postMessage(`${taskType} para ${pkg.name} concluído`);
  })
  .catch((err) => {
    parentPort.postMessage(
      `Erro ao executar ${taskType} para ${pkg.name}: ${err.message}`
    );
  });
