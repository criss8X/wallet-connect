import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/cli.ts"],
	format: ["esm"],
	clean: true,
	bundle: true,
	treeshake: true,
	sourcemap: false,
	target: "node18",
	minify: true,
});
