#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --allow-env

// Clone the below two repositories
// - https://github.com/be5invis/Iosevka
// - https://github.com/be5invis/Sarasa-Gothic
// with depth 1

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repos = [
  "https://github.com/be5invis/Iosevka",
  "https://github.com/be5invis/Sarasa-Gothic",
];

repos.forEach((repo) => {
  const dir = repo.split("/").pop();
  if (!dir) {
    throw new Error(`Invalid repository URL: ${repo}`);
  }

  // Check the directory exists or not
  // Only clone if the directory does not exist

  if (!fs.existsSync(dir)) {
    console.log(`${repo} does not exist. Cloning...`);
    execSync(`git clone ${repo} --depth 1`, {
      stdio: "inherit",
    });
  }

  // Move to the directory and run deno install
  const subDir = path.join(process.cwd(), dir);

  console.log(`Running deno install in ${subDir}`);
  execSync(`deno install`, {
    cwd: subDir,
    stdio: "inherit",
  });
});
