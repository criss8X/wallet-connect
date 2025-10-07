import type { ComponentsJson } from "@/schemas/componentsJson.js";
import type { PackageJson } from "@/schemas/packageJson.js";

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
	{ aliases }: ComponentsJson,
) {
	const depsNoInstalled = Object.entries(NeededDependencies).filter(
		([key]) => !dependencies[key] && !devDependencies[key],
	);
}
