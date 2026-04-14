#!/usr/bin/env node
/**
 * Serves this directory on 0.0.0.0:$PORT for Railway, or :3333 locally.
 * Invokes `serve` via Node (no shell) so paths with spaces work on Windows.
 */
const { spawn } = require("child_process");
const path = require("path");

const port = process.env.PORT || "3333";
const root = __dirname;
const serveMain = path.join(root, "node_modules", "serve", "build", "main.js");

const child = spawn(
  process.execPath,
  [serveMain, ".", "--no-port-switching", "--listen", `tcp://0.0.0.0:${port}`],
  {
    stdio: "inherit",
    cwd: root,
    env: process.env,
  }
);

child.on("exit", (code) => process.exit(code ?? 0));
