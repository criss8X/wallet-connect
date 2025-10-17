import type { TsConfigPaths } from "@/schemas/tsconfig.schema.js";
import { resolveFolder } from "@/utils.js";

type AliasToRelativePathProps = {
	value: string;
	rootDir: string;
	paths: TsConfigPaths;
};

export function aliasToRelativePath({
	paths,
	rootDir,
	value,
}: AliasToRelativePathProps): string | null {
	// If the value to decrypt has the default alias, then decrypt quickly.
	if (value.startsWith("@/")) {
		const relativePath = paths["@/"].findAndMap((path) =>
			resolveFolder(rootDir, path.replaceAll("*", "")),
		);

		if (!relativePath) {
			return null;
		}

		return relativePath.concat(value.slice(2));
	}

	// If it's a custom value, review and look if has be defined in the `tsconfig.json` file.
	const possiblePaths = paths[value] ?? paths[`${value}/`];

	if (possiblePaths.length === 0) {
		console.error(`El alias ${value} not found in \`tsconfig.json\` file.`);

		return null;
	}

	return possiblePaths.findAndMap((path) =>
		resolveFolder(rootDir, path.replaceAll("*", "")),
	);
}
