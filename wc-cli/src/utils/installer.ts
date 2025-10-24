import { execSync } from "node:child_process";
import { bold, magenta } from "colorette";
import ora from "ora";
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
		const loader = ora(`Installing ${magenta(bold(dependence))}`).start();

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
		const loader = ora(`Installing ${magenta(bold(component))}`).start();

		const scriptToAddComponent =
			COMPONENT_SCRIPT_BUILDER[packageManager](component);

		execSync(scriptToAddComponent);

		loader.succeed();
	}
}
