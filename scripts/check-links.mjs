// Fail if any root-relative or relative link in the built site points at a
// file that is not there. Usage: node scripts/check-links.mjs _site
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const root = resolve(process.argv[2] ?? "_site");
const pages = [];
const walk = (dir) => {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p);
		else if (name.endsWith(".html")) pages.push(p);
	}
};
walk(root);

const attr = /\b(?:href|src)="([^"#?]+)[^"]*"/g;
let broken = 0;
for (const page of pages) {
	const html = readFileSync(page, "utf8");
	for (const [, url] of html.matchAll(attr)) {
		if (/^(https?:|mailto:|data:|\/\/)/.test(url)) continue;
		const target = url.startsWith("/") ? join(root, url) : resolve(dirname(page), url);
		const ok = existsSync(target) || existsSync(join(target, "index.html"));
		if (!ok) {
			broken++;
			console.error(`${relative(root, page)}: ${url}`);
		}
	}
}
console.log(`${pages.length} pages checked, ${broken} broken links`);
process.exit(broken ? 1 : 0);
