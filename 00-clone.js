#!/usr/bin/env node

// Clone the below two repositories
// - https://github.com/be5invis/Iosevka
// - https://github.com/be5invis/Sarasa-Gothic
// with depth 1

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repos = [
	'https://github.com/be5invis/Iosevka',
	'https://github.com/be5invis/Sarasa-Gothic',
];

repos.forEach((repo) => {
	const dir = repo.split('/').pop();

	// Check the direcotry exists or not
	// Only clone if the directory does not exist

	if (!fs.existsSync(dir)) {
		console.log(`${repo} does not exist. Cloning...`);
		execSync(`git clone ${repo} --depth 1`, {
			stdio: 'inherit'
		});
	}

	// Move to the directory and run npm install
	const subDir = path.join(process.cwd(), dir);

	console.log(`Running npm install in ${subDir}`);
	execSync(`npm install`, {
		cwd: subDir,
		stdio: 'inherit',
	});
});
