import type { DefaultEnv } from "@/detector.js";
import { whatsDepsUserNeeds } from "@/utils/whatsUserNeeds.js";

export function defaultInstallation({
	componentsJson,
	packageJson,
	packageManager,
	tsConfigJson,
}: DefaultEnv) {
	const depsUserNeeds = whatsDepsUserNeeds(packageJson);
}
