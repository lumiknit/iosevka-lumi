#!/usr/bin/env node

const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const pascalToCamel = (str) => {
	const t = [];
	for (const s of str.split('-')) {
		// Make first letter uppercase
		t.push(s.replace(/^./, s[0].toUpperCase()));
	}
	// Join and return
	return t.join('');
}

const targets = [
	"qp-lumi",
	"term-lumi",
	"qp-knit",
	"term-knit",
];

const subDir = path.join(process.cwd(), 'Iosevka');

for (const t of targets) {
	// Copy <TARGET>.toml to Iosevka/private-build-plans.toml
	console.log(`Copying ${t}.toml to private-build-plans.toml`);
	fs.copyFileSync(`${t}.toml`, path.join(subDir, 'private-build-plans.toml'));

	// Build target
	const script = `npm run build -- contents::Iosevka${pascalToCamel(t)}`;
	console.log(`RUN: ${script}`);
	exec(script, {
		cwd: subDir,
		stdio: 'inherit',
	});
}

// Copy Iosevka/dist directory to the top level
console.log('Copying Iosevka/dist to the top level');
fs.renameSync(path.join(subDir, 'dist'), 'iosevka-lumi');
