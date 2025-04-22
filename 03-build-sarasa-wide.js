#!/usr/bin/env node

const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

// First, copy built iosevka-lumi's TTF to /Sarasa-Gothic/sources/
// Traverse /iosevka-lumi
const iosevkaLumiDir = path.join(process.cwd(), 'iosevka-lumi');
const sarasaGothicDir = path.join(process.cwd(), 'Sarasa-Gothic');
const sourcesDir = path.join(sarasaGothicDir, 'sources');

// Create IosevkaQpLumiExt directory in sarasa sources
const iosevkaQpLumiExtDir = path.join(sourcesDir, 'IosevkaQpLumiExt');
if (fs.existsSync(iosevkaQpLumiExtDir)) {
	console.log(`${iosevkaQpLumiExtDir} already exists. Skipping...`);
} else {
	fs.mkdirSync(iosevkaQpLumiExtDir);
}

// Copy IosevkaQpLumi/IosevkaQpLumi-SemiExtended... to IosevkaQpLumiExt/IosevkaQpLumiExt-...
const weightMap = [
	['SemiExtended', 'Regular'],
	['SemiExtendedBold', 'Bold'],
	['SemiExtendedItalic', 'Italic'],
	['SemiExtendedBoldItalic', 'BoldItalic'],
];
const srcDir = path.join(sourcesDir, 'IosevkaQpLumi');
for (const [src, dst] of weightMap) {
	const srcFile = path.join(srcDir, `IosevkaQpLumi-${src}.ttf`);
	const dstFile = path.join(iosevkaQpLumiExtDir, `IosevkaQpLumiExt-${dst}.ttf`);
	if (fs.existsSync(dstFile)) {
		console.log(`${dstFile} already exists. Skipping...`);
		continue;
	}
	console.log(`Copying ${srcFile} to ${dstFile}`);
	fs.copyFileSync(srcFile, dstFile);
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
const lumiConfigJson = path.join(".", "sarasa-config.wide.json");
fs.copyFileSync(lumiConfigJson, configJson);

// Run Sarasa-Gothic's build script
const script = `npm run build ttf`;
console.log(`RUN: ${script}`);
exec(script, {
	cwd: sarasaGothicDir,
	stdio: 'inherit',
});
