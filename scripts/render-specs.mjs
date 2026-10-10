// Render every spec's Markdown source into a static page beside it.
//
//   node scripts/render-specs.mjs <weft-checkout> <site-dir>
//
// A spec version is <site>/spec/<name>/v<semver>/, holding either index.md or
// sections/*.md. Sections are joined in name order, a blank line apart, into the
// index.md that is published, and sections/ is removed, so <site-dir> must be
// the assembled copy (_site), never the source tree. The page is
// scripts/spec-page.html filled with the rendered body, a contents list, and a
// title and description taken from the H1 and the first paragraph after it. The .md
// stays published next to the page as its source. The Markdown pipeline comes
// from Weft's ui package, so this repository installs nothing.
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [weftArg, siteArg] = process.argv.slice(2);
if (!weftArg || !siteArg) {
	console.error("usage: render-specs.mjs <weft-checkout> <site-dir>");
	process.exit(1);
}

const site = resolve(siteArg);
const template = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "spec-page.html"), "utf8");
const require = createRequire(resolve(weftArg, "packages/ui/package.json"));
const load = (name) => import(pathToFileURL(require.resolve(name)).href);

const { unified } = await load("unified");
const { default: remarkParse } = await load("remark-parse");
const { default: remarkGfm } = await load("remark-gfm");
const { default: remarkRehype } = await load("remark-rehype");
const { default: rehypeSlug } = await load("rehype-slug");
const { default: rehypeStringify } = await load("rehype-stringify");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const text = (n) => (n.type === "text" ? n.value : (n.children ?? []).map(text).join(""));
const el = (tagName, className, children) => ({ type: "element", tagName, properties: { className: [className] }, children });

// Theme classes on tables and code blocks, a scroll wrapper so wide tables
// never widen the page, and the headings the contents list is built from.
const decorate = (found) => () => (tree) => {
	const visit = (node) => {
		if (!node.children) return;
		node.children = node.children.map((c) => {
			if (c.type !== "element") return c;
			if (c.tagName === "pre") c.properties.className = ["nb-pre"];
			if (c.tagName === "table" && node.tagName !== "div") {
				c.properties.className = ["nb-table"];
				return el("div", "spec__scroll", [c]);
			}
			if (/^h[1-3]$/.test(c.tagName)) found.push({ depth: Number(c.tagName[1]), id: c.properties.id, text: text(c) });
			return c;
		});
		node.children.forEach(visit);
	};
	visit(tree);
	const h1 = tree.children.findIndex((c) => c.tagName === "h1");
	found.lead = tree.children.slice(h1 + 1).find((c) => c.tagName === "p");
};

// H2s, plus the numbered H3 clauses beneath them; FAQ questions and example
// headings stay out so the list fits a sidebar.
const contents = (headings) => {
	const items = [];
	for (const h of headings) {
		const link = `<a href="#${h.id}">${escape(h.text)}</a>`;
		if (h.depth === 2) items.push({ link, clauses: [] });
		else if (h.depth === 3 && /^\d+\./.test(h.text) && items.length) items.at(-1).clauses.push(link);
	}
	const list = (links) => `<ul>${links.map((l) => `<li>${l}</li>`).join("")}</ul>`;
	return list(items.map(({ link, clauses }) => link + (clauses.length ? list(clauses) : "")));
};

// The index.md of one version directory, joined from its sections if it has them.
const source = (dir) => {
	const index = join(dir, "index.md");
	const parts = join(dir, "sections");
	const single = existsSync(index);
	if (!existsSync(parts)) {
		if (!single) throw new Error(`${dir}: needs index.md or sections/`);
		return index;
	}
	if (single) throw new Error(`${dir}: has both index.md and sections/`);
	const files = readdirSync(parts).filter((n) => n.endsWith(".md")).sort();
	if (!files.length) throw new Error(`${parts}: holds no .md files`);
	writeFileSync(index, files.map((n) => readFileSync(join(parts, n), "utf8")).join("\n"));
	rmSync(parts, { recursive: true });
	return index;
};

const sources = [];
const walk = (dir) => {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (!statSync(p).isDirectory()) continue;
		if (/^v\d+\.\d+\.\d+$/.test(name)) sources.push(source(p));
		else walk(p);
	}
};
walk(join(site, "spec"));

for (const src of sources) {
	const found = [];
	const body = String(
		await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype)
			.use(rehypeSlug)
			.use(decorate(found))
			.use(rehypeStringify)
			.process(readFileSync(src, "utf8")),
	);
	const title = found.find((h) => h.depth === 1)?.text;
	if (!title || !found.lead) throw new Error(`${src}: needs an H1 followed by a paragraph`);
	const values = {
		title: escape(title),
		description: escape(text(found.lead).replace(/\s+/g, " ").trim()),
		path: `/${relative(site, dirname(src))}/`,
		toc: contents(found),
		content: body,
	};
	const out = join(dirname(src), "index.html");
	writeFileSync(out, template.replace(/\{\{(\w+)\}\}/g, (_, k) => values[k]));
	console.log(`  ${relative(site, out)}`);
}
console.log(`Rendered ${sources.length} spec page${sources.length === 1 ? "" : "s"}`);
