import type { Aliases, ComponentsJson } from "@/schemas/components.schema.js";
import type { TsConfigJson, TsConfigPaths } from "@/schemas/tsconfig.schema.js";
import type { MakeNullObject } from "@/types.js";
import { objectMapper, resolveFolder } from "@/utils.js";

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
	if (Object.keys(paths).length === 0) {
		return null;
	}

	// If the value to decrypt has the default alias, then decrypt quickly.
	if (value.startsWith("@/")) {
		const relativePath = paths["@/"]?.findAndMap((path) =>
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
		return null;
	}

	return possiblePaths.findAndMap((path) =>
		resolveFolder(rootDir, path.replaceAll("*", "")),
	);
}

export type DecodedAliases = MakeNullObject<Aliases>;

export function decodeAliases(
	rootDir: string,
	{ compilerOptions: { paths } }: TsConfigJson,
	{ aliases }: ComponentsJson,
): DecodedAliases {
	return objectMapper(aliases, (_, value) =>
		aliasToRelativePath({ paths, value, rootDir }),
	);
}
