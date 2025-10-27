import type { Aliases, ComponentsJson } from "@/schemas/components.schema.js";
import type { TsConfigJson, TsConfigPaths } from "@/schemas/tsconfig.schema.js";
import type { MakeNullObject } from "@/types.js";
import { objectMapper, resolvePath } from "@/utils/utils.js";

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
		const relativePath = (paths["@/"] || []).findAndMap((path) =>
			resolvePath(rootDir, path.replaceAll("*", "")),
		);

		return relativePath?.concat(value.slice(2)) || null;
	}

	// If it's a custom value, review and look if has be defined in the `tsconfig.json` file.
	const possiblePaths = paths[value] ?? paths[`${value}/`] ?? [];

	return possiblePaths.findAndMap((path) =>
		resolvePath(rootDir, path.replaceAll("*", "")),
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
