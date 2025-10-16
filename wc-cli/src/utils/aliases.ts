import fs from "node:fs";
import path from "node:path";
import type { TsConfigPaths } from "@/schemas/tsconfig.schema.js";
import { pathJoinAndValidate } from "@/utils.js";

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
			pathJoinAndValidate(rootDir, path.replaceAll("*", "")),
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
		pathJoinAndValidate(rootDir, path.replaceAll("*", "")),
	);
}

// From alias remove * or '**' and '.'
export function sanitizeAlias(alias: string): {
	relativePath: string;
	absolutePath: string;
} {
	const rootDir = process.cwd();

	if (fs.existsSync(path.join(rootDir, alias))) {
		return {
			relativePath: alias,
			absolutePath: path.join(rootDir, alias),
		};
	}

	let sanitized = alias;

	if (sanitized.endsWith("*")) {
		const newAliasSanitized = sanitized.replaceAll("*", "");

		sanitized = newAliasSanitized;
	}

	const absolutePath = path.join(rootDir, sanitized);

	if (!fs.existsSync(absolutePath)) {
		throw new Error(
			`The alias: ${alias} cannot be resolved, alias not found for: ${sanitized}`,
		);
	}

	return {
		absolutePath,
		relativePath: sanitized,
	};
}
