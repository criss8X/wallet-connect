import type { ComponentsJson } from "@/schemas/components.schema.js";
import type { PackageJson } from "@/schemas/package.schema.js";

export const NeededDependencies = {
	WAGMI: "wagmi",
	TAILWINDCSS: "tailwindcss",
	CLSX: "clsx",
	CVA: "class-variance-authority",
} as const;

export const NeededShadcnComponents = {
	Avatar: "avatar",
	AlertDialog: "alert-dialog",
	Button: "button",
	Sonner: "sonner",
};

// package.json contains needed dependencies or components?
export function whatsUserNeeds(
	{ dependencies, devDependencies }: PackageJson,
	_componentsJson: ComponentsJson,
): { depsNoInstalled: string[]; componentsNoInstalled: string[] } {
	const allDeps = { ...dependencies, ...devDependencies };

	const depsNoInstalled = Object.values(NeededDependencies).filter(
		(depName) => !allDeps[depName],
	);

	// The ComponentsJson schema only contains path aliases, not a list of installed components.
	// A file system check is required to verify component installation.
	const componentsNoInstalled: string[] = [];

	return {
		depsNoInstalled,
		componentsNoInstalled,
	};
}
