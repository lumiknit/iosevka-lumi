#!/usr/bin/env node

const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

// First, copy built iosevka-lumi's TTF to /Sarasa-Gothic/sources/
// Traverse /iosevka-lumi
const iosevkaLumiDir = path.join(process.cwd(), 'iosevka-lumi');
const sarasaGothicDir = path.join(process.cwd(), 'Sarasa-Gothic');
const sourcesDir = path.join(sarasaGothicDir, 'sources');

for (const d of fs.readdirSync(iosevkaLumiDir)) {
	// Copy the subdirectory recursively
	const dst = path.join(sourcesDir, d);
	if (fs.existsSync(dst)) {
		console.log(`${dst} already exists. Skipping...`);
		continue;
	}

	const src = path.join(iosevkaLumiDir, d, 'TTF');
	console.log(`Copying ${src} to ${dst}`);
	fs.cpSync(src, dst, { recursive: true });
}

// Back-up Sarasa-Gothic's original config.json
const configJson = path.join(sarasaGothicDir, 'config.json');
const configJsonBak = path.join(sarasaGothicDir, 'config.json.bak');

if (!fs.existsSync(configJsonBak)) {
	console.log(`Backing up ${configJson} to ${configJsonBak}`);
	fs.copyFileSync(configJson, configJsonBak);
} else {
	console.log(`${configJsonBak} already exists. Skipping...`);
}

// Copy iosevka-lumi's config.json to Sarasa-Gothic
const lumiConfigJson = path.join(".", "sarasa-config.temp.json");
fs.copyFileSync(lumiConfigJson, configJson);

// Run Sarasa-Gothic's build script
const script = `npm run build ttf`;
console.log(`RUN: ${script}`);
exec(script, {
	cwd: sarasaGothicDir,
	stdio: 'inherit',
});
