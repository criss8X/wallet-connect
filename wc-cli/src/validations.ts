import { blue } from "colorette";
import type { PackageJson } from "@/schemas/packageJson.js";

export const NeededDependencies = {
	WAGMI: "wagmi",
	TAILWINDCSS: "tailwindcss",
	CLSX: "clsx",
	CVA: "class-variance-authority",
} as const;

const NeededShadcnComponents = {};

// package.json contains needed dependencies?
function checkPackageJson({ dependencies, devDependencies }: PackageJson) {
	for (const [_key, value] of Object.entries(NeededDependencies)) {
		if (dependencies[value] || devDependencies[value]) {
			continue;
		}

		console.error(`No tienes instalada la librería  ${value}`);
		console.log("Desea instalarla? ", blue("Y/n"));
	}
}
