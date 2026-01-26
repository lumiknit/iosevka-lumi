#!/usr/bin/env bun

import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

// First, copy built iosevka-lumi's TTF to /Sarasa-Gothic/sources/
// Traverse /iosevka-lumi
const iosevkaLumiDir = path.join(process.cwd(), "iosevka-lumi");
const sarasaGothicDir = path.join(process.cwd(), "Sarasa-Gothic");
const sourcesDir = path.join(sarasaGothicDir, "sources");

for (const d of fs.readdirSync(iosevkaLumiDir)) {
  // Copy the subdirectory recursively
  const dst = path.join(sourcesDir, d);
  if (fs.existsSync(dst)) {
    console.log(`${dst} already exists. Skipping...`);
    continue;
  }

  const src = path.join(iosevkaLumiDir, d, "TTF");
  console.log(`Copying ${src} to ${dst}`);
  fs.cpSync(src, dst, { recursive: true });
}

// Also, copy semi-extended foonts for LumiExt and KnitExt
const weightMap: ReadonlyArray<[string, string]> = [
  ["SemiExtended", "Regular"],
  ["SemiExtendedBold", "Bold"],
  ["SemiExtendedItalic", "Italic"],
  ["SemiExtendedBoldItalic", "BoldItalic"],
];

for (const p of ["Lumi", "Knit"]) {
  const extDir = path.join(sourcesDir, `IosevkaQp${p}Ext`);
  if (fs.existsSync(extDir)) {
    console.log(`${extDir} already exists. Skipping...`);
  } else {
    fs.mkdirSync(extDir);
  }

  const srcDir = path.join(iosevkaLumiDir, `IosevkaQp${p}`, "TTF");
  for (const [src, dst] of weightMap) {
    const srcFile = path.join(srcDir, `IosevkaQp${p}-${src}.ttf`);
    const dstFile = path.join(extDir, `IosevkaQp${p}Ext-${dst}.ttf`);
    if (fs.existsSync(dstFile)) {
      console.log(`${dstFile} already exists. Skipping...`);
      continue;
    }
    console.log(`Copying ${srcFile} to ${dstFile}`);
    fs.copyFileSync(srcFile, dstFile);
  }
}

// Back-up Sarasa-Gothic's original config.json
const configJson = path.join(sarasaGothicDir, "config.json");
const configJsonBak = path.join(sarasaGothicDir, "config.json.bak");

if (!fs.existsSync(configJsonBak)) {
  console.log(`Backing up ${configJson} to ${configJsonBak}`);
  fs.copyFileSync(configJson, configJsonBak);
} else {
  console.log(`${configJsonBak} already exists. Skipping...`);
}

for (const configName of ["sans", "serif"]) {
  const tmpConfigPath = path.join(
    "templates",
    `sarasa-config.${configName}.json`
  );
  fs.copyFileSync(tmpConfigPath, configJson);

  const script = `bun run build ttf`;
  console.log(`RUN: ${script}`);
  execSync(script, {
    cwd: sarasaGothicDir,
    stdio: "inherit",
  });
}
