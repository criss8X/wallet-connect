import { bold, magenta } from "colorette";
import { runCommand, spinner } from "@/utils/utils.js";
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
	console.log("Press \x1b[100m\x1b[97m ESC \x1b[0m to exit.");
	console.log();
	console.log("---- Dependencies Installation ----");

	for (const dependence of deps) {
		const loader = spinner(`Installing ${magenta(bold(dependence))}`);

		const scriptToInstall =
			SCRIPT_BY_PACKAGE_MANAGER[packageManager](dependence);

		try {
			await runCommand(scriptToInstall, packageManager);

			loader.succeed();
		} catch {
			loader.fail();
		}
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

		try {
			await runCommand(scriptToAddComponent, packageManager);

			loader.succeed();
		} catch {
			loader.fail();
		}
	}
}
