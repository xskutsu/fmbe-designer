const esbuild = require("esbuild");
const { spawn } = require("node:child_process");
const isWatch = process.argv.includes("--watch");
const isRun = process.argv.includes("--run");
const banner = `
// 2026 (C) AGPL-3.0-or-later
// https://github.com/xskutsu/fmbeve
`.trim();

(async function () {
	console.log("Starting building...");
	const context = await esbuild.context({
		bundle: true,
		target: "es2024",
		sourcemap: false,
		sourcesContent: false,
		banner: {
			js: banner
		},
		entryPoints: [
			"./src/index.ts",
			"./src/sw.ts"
		],
		format: "iife",
		outdir: "public/js/",
		platform: "browser",
		minify: true,
		tsconfig: "./tsconfig.json"
	});
	console.log("Esbuild contexts established.");
	if (isWatch) {
		console.log("Starting watch...");
		await context.watch();
		console.log("Wathcing for changes in client and server.");
	} else {
		await context.rebuild();
		await context.dispose();
		console.log("Build complete.");
	}
})();
