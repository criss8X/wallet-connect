import type { DefaultEnv } from "@/detector.js";

export function defaultInstallation({
	componentsJson,
	packageJson,
	packageManager,
}: DefaultEnv) {
	checkPackageJson({ dependencies: {}, devDependencies: {} });
}
