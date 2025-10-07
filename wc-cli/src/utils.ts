import fs from "node:fs";
import path from "node:path";
import z from "zod";

const typeOfPathsSchema = z.string().or(z.array(z.string()));

export function getBaseAliasFromTsConfig(dirToFind: string): string {
	const tsconfigJson = resolveFile(dirToFind, "tsconfig.json");

	if (tsconfigJson === null) {
		// TODO: Translate
		throw new Error(
			"No se encontró ningún tsconfig.json en el proyecto. Es un proyecto typescript válido?",
		);
	}

	const tsconfigInJson = JSON.parse(tsconfigJson);
	const paths = tsconfigInJson.compilerOptions.paths;
	const baseAlias = typeOfPathsSchema.safeParse(paths["@/*"]);

	if (!baseAlias.success) {
		console.error(`More info about this error: ${baseAlias.error.message}`);

		// TODO: Translate
		throw new Error(
			"El formato del `tsconfig.json` es erróneo, no se pudo resolver el alias base.",
		);
	}

	if (typeof baseAlias.data === "string") {
		return baseAlias.data;
	}

	const possibleBaseAlias = baseAlias.data[0];

	return sanitizeAlias(possibleBaseAlias);
}

// From alias remove * or '**' and '.'
export function sanitizeAlias(alias: string): string {
	if (fs.existsSync(alias)) {
		// TODO: Remove this warn in production.
		console.warn(`Ya el alias existía, no hubo que sanitizarlo, ${alias}`);
		return alias;
	}

	let sanitized = alias;

	if (sanitized.startsWith(".")) {
		const newAliasSanitized = sanitized.replace(".", "");

		if (fs.existsSync(newAliasSanitized)) {
			sanitized = newAliasSanitized;
		}
	}

	if (sanitized.endsWith("*")) {
		const newAliasSanitized = sanitized.replaceAll("*", "");

		if (fs.existsSync(newAliasSanitized)) {
			sanitized = newAliasSanitized;
		}
	}

	return sanitized;
}

export function resolveFile(parent: string, child: string): string | null {
	const joined = path.join(parent, child);

	if (!fs.existsSync(joined)) {
		console.error(`The file ${child} is not exists.`);

		return null;
	}

	const stat = fs.statSync(joined);

	if (!stat.isFile()) {
		console.error(`The path ${joined} is not a file.`);

		return null;
	}

	return joined;
}
