import fs from "node:fs";
import type { PackageJson } from "@/schemas/package.schema.js";
import type { EnumOf } from "@/types.js";
import { objectMapper } from "@/utils/utils.js";
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

	return Object.values(NeededDependencies).filter(
		(depName) => !allDeps[depName],
	);
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
			try {
				if (value === null) {
					return [];
				}

				return fs.readdirSync(value);
			} catch {
				return [];
			}
		},
	);

	const projectComponents = await Promise.all([
		Promise.resolve(ui.map(sanitizeAndPutKeys)),
		Promise.resolve(components.map(sanitizeAndPutKeys)),
	])
		.then(([a, b]) => a.concat(b))
		.then((entries) => Object.fromEntries(entries));

	console.log({ projectComponents });

	const componentsNeeded = Object.values(NeededShadcnComponents).filter(
		(compNeeded) => projectComponents[compNeeded] === undefined,
	);

	return componentsNeeded;
}

function sanitizeAndPutKeys(pathOrRelativePath: string): string[] {
	const extractName =
		pathOrRelativePath.split("/").at(-1) || pathOrRelativePath;

	const nameWithoutExtension = extractName.split(".").at(0) || extractName;
	const sanitizedName = nameWithoutExtension.toLowerCase().replaceAll(" ", "-");

	return [sanitizedName, sanitizedName];
}
