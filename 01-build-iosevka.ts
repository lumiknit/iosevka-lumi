#!/usr/bin/env bun

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const pascalToCamel = (str: string): string => {
  const t: string[] = [];
  for (const s of str.split("-")) {
    if (s.length < 1) continue;
    const capitalized = `${s[0]!.toUpperCase()}${s.slice(1)}`;
    t.push(capitalized);
  }
  return t.join("");
};

const targets = ["qp-lumi", "term-lumi", "qp-knit", "term-knit"] as const;

const subDir = path.join(process.cwd(), "Iosevka");

for (const t of targets) {
  // Copy <TARGET>.toml to Iosevka/private-build-plans.toml
  console.log(`Copying ${t}.toml to private-build-plans.toml`);
  fs.copyFileSync(
    `./templates/${t}.toml`,
    path.join(subDir, "private-build-plans.toml")
  );

  // Build target
  const script = `bun run build -- contents::Iosevka${pascalToCamel(t)}`;
  console.log(`RUN: ${script}`);
  execSync(script, {
    cwd: subDir,
    stdio: "inherit",
  });
}

// Copy Iosevka/dist directory to the top level
console.log("Copying Iosevka/dist to the top level");
fs.renameSync(path.join(subDir, "dist"), "iosevka-lumi");
