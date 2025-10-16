import fs from "node:fs";
import path from "node:path";
import type { TsConfigJson } from "@/schemas/tsconfig.schema.js";

export function aliasToRelativePath(
	value: string,
	paths: TsConfigJson["compilerOptions"]["paths"],
): string | null {
	if (value.startsWith("@/")) {
		const relativePath =
			typeof paths["@/"] === "string" ? paths["@/"] : paths["@/"][0];

		return relativePath.concat(value.slice(2)).replaceAll("*", "");
	}

	const relativePath = paths[value] ?? paths[`${value}/`];

	if (relativePath === undefined) {
		// TODO: Translate
		console.error(`El alias ${value} no se encuentra en el tsconfig.json`);

		return null;
	}

	const finalResult =
		typeof relativePath === "string" ? relativePath : relativePath[0];

	return finalResult.replaceAll("*", "");
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
		// TODO: Translate
		throw new Error(
			`El alias ${alias} no se pudo resolver, al parecer no existe ${sanitized}`,
		);
	}

	return {
		absolutePath,
		relativePath: sanitized,
	};
}
