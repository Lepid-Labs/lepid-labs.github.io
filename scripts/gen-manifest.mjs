// Write a Weft manifest for a project root, using @weft/core from a checkout.
//
//   node scripts/gen-manifest.mjs <weft-checkout> <project-root>
//
// The checkout must have built packages/core (scripts/build.sh does). The
// project root holds a weft.config.yaml; the manifest lands in its docsDir.
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [weftArg, rootArg] = process.argv.slice(2);
if (!weftArg || !rootArg) {
	console.error("usage: gen-manifest.mjs <weft-checkout> <project-root>");
	process.exit(1);
}

const weftDir = resolve(weftArg);
const rootDir = resolve(rootArg);
const core = (file) => pathToFileURL(resolve(weftDir, "packages/core/dist", file)).href;

const { loadConfig } = await import(core("config.js"));
const { WeftService } = await import(core("service.js"));

const config = await loadConfig(rootDir);
const service = new WeftService(config);
const manifest = await service.rebuild();
const written = await service.writeManifest();

console.log(`Indexed ${manifest.nodes.length} documents, ${manifest.edges.length} edges`);
for (const path of written) console.log(`  ${path}`);
