#!/usr/bin/env node
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || "4173";
const serveMain = path.join(__dirname, "node_modules", "serve", "build", "main.js");
const dist = path.join(__dirname, "dist");

const child = spawn(
  process.execPath,
  [serveMain, dist, "--no-port-switching", "--listen", `tcp://0.0.0.0:${port}`],
  {
    stdio: "inherit",
    cwd: __dirname,
    env: process.env,
  }
);

child.on("exit", (code) => process.exit(code ?? 0));
