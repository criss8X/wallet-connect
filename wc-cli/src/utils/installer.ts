import { execSync } from "node:child_process";
import { bold, magenta } from "colorette";
import { spinner } from "@/utils.js";
import {
	COMPONENT_SCRIPT_BUILDER,
	type PackageManager,
	SCRIPT_BY_PACKAGE_MANAGER,
} from "./packageManager.js";
import type { ComponentNeeded, DependenceNeeded } from "./whatsNeed.js";

export async function installDepsNeeded(
	deps: DependenceNeeded[],
	packageManager: PackageManager,
) {
	if (deps.length === 0) {
		return;
	}

	console.log();
	console.log("---- Dependencies Installation ----");

	for (const dependence of deps) {
		const loader = spinner(`Installing ${magenta(bold(dependence))}`);

		const scriptToInstall =
			SCRIPT_BY_PACKAGE_MANAGER[packageManager](dependence);

		execSync(scriptToInstall);

		loader.succeed();
	}
}

export async function installComponentsNeeded(
	components: ComponentNeeded[],
	packageManager: PackageManager,
) {
	if (components.length === 0) {
		return;
	}

	console.log();
	console.log("---- Shadcn Components Installation ----");

	for (const component of components) {
		const loader = spinner(`Installing ${magenta(bold(component))}`);

		const scriptToAddComponent =
			COMPONENT_SCRIPT_BUILDER[packageManager](component);

		execSync(scriptToAddComponent);

		loader.succeed();
	}
}
