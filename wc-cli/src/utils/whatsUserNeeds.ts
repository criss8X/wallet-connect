import fs from "node:fs";
import type { ComponentsJson } from "@/schemas/components.schema.js";
import type { PackageJson } from "@/schemas/package.schema.js";
import type { TsConfigJson } from "@/schemas/tsconfig.schema.js";
import type { EnumOf } from "@/types.js";
import { objectMapper } from "@/utils.js";
import { aliasToRelativePath } from "./aliases.js";

export const NeededDependencies = {
	WAGMI: "wagmi",
	TAILWINDCSS: "tailwindcss",
	CLSX: "clsx",
	CVA: "class-variance-authority",
} as const;

export type DependenceNeeded = EnumOf<typeof NeededDependencies>;

export function whatsDepsUserNeeds({
	dependencies,
	devDependencies,
}: PackageJson): DependenceNeeded[] {
	const allDeps = { ...dependencies, ...devDependencies };

	const depsNoInstalled = Object.values(NeededDependencies).filter(
		(depName) => !allDeps[depName],
	);

	return depsNoInstalled;
}

export const NeededShadcnComponents = {
	Avatar: "avatar",
	AlertDialog: "alert-dialog",
	Button: "button",
	Sonner: "sonner",
} as const;

type ComponentNeeded = EnumOf<typeof NeededShadcnComponents>;

export async function whatsComponentsUserNeeds(
	{ aliases }: ComponentsJson,
	{ paths }: TsConfigJson["compilerOptions"],
): Promise<ComponentNeeded[]> {
	const aliasAsRelativePath = objectMapper(aliases, (_, value) =>
		aliasToRelativePath(value, paths),
	);

	const { ui, components } = objectMapper(
		{
			components: aliasAsRelativePath.components,
			ui: aliasAsRelativePath.ui,
		},
		(_, value) => {
			if (
				value === null ||
				!fs.existsSync(value) ||
				!fs.statSync(value).isDirectory()
			) {
				return [];
			}

			return fs.readdirSync(value);
		},
	);

	const projectComponents = await Promise.all([
		Promise.resolve(ui.map(sanitizeComponentsPath)),
		Promise.resolve(components.map(sanitizeComponentsPath)),
	]).then(([a, b]) =>
		[...a, ...b].reduce(
			(acc, current) => {
				acc[current] = current;

				return acc;
			},
			{} as Record<string, string>,
		),
	);

	const componentsNeeded = Object.values(NeededShadcnComponents).filter(
		(compNeeded) => projectComponents[compNeeded] === undefined,
	);

	return componentsNeeded;
}

function sanitizeComponentsPath(pathOrRelativePath: string): string {
	const extractName =
		pathOrRelativePath.split("/").at(-1) || pathOrRelativePath;

	return extractName.split(".").at(0) || extractName;
}
