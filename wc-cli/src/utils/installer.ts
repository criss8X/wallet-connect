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
	// Improve terminal log
	// Implement ora spinner

	for (const dependence of deps) {
		const scriptToInstall =
			SCRIPT_BY_PACKAGE_MANAGER[packageManager](dependence);

		// run installation
	}
}

export async function installComponentsNeeded(
	components: ComponentNeeded[],
	packageManager: PackageManager,
) {
	// Improve terminal log
	// Implement ora spinner

	for (const component of components) {
		const scriptToAddComponent =
			COMPONENT_SCRIPT_BUILDER[packageManager](component);

		// run addition of this component to the project.
	}
}
