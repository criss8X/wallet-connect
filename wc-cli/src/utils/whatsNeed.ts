import fs from "node:fs";
import type { PackageJson } from "@/schemas/package.schema.js";
import type { EnumOf } from "@/types.js";
import { objectMapper } from "@/utils.js";
import type { DecodedAliases } from "./aliases.js";

export const NeededDependencies = {
	WAGMI: "wagmi",
	VIEM: "viem",
	TANSTACK_QUERY: "@tanstack/react-query",
	CLSX: "clsx",
	CVA: "class-variance-authority",
} as const;

export type DependenceNeeded = EnumOf<typeof NeededDependencies>;

export function whatsDepsNeed({
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

export type ComponentNeeded = EnumOf<typeof NeededShadcnComponents>;

export async function whatsComponentsNeed(
	decodedAliases: DecodedAliases,
): Promise<ComponentNeeded[]> {
	const { ui, components } = objectMapper(
		{
			components: decodedAliases.components,
			ui: decodedAliases.ui,
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
