import {
	COMPONENTS_JSON_SCHEMA,
	type ComponentsJson,
} from "@/schemas/components.schema.js";
import {
	PACKAGE_JSON_SCHEMA,
	type PackageJson,
} from "@/schemas/package.schema.js";
import {
	TSCONIFG_JSON_SCHEMA,
	type TsConfigJson,
} from "@/schemas/tsconfig.schema.js";
import {
	detectPackageManager,
	type PackageManager,
} from "@/utils/packageManager.js";
import useFile from "@/utils/useFile.js";
import { resolveFolder, spinner } from "@/utils/utils.js";
import { decodeCommandArgs } from "./refiner.js";

export type EnvironmentMeta = {
	packageManager: PackageManager;
	rootDir: string;
	srcDir?: string;
};

export type DefaultEnv = {
	packageJson: PackageJson;
	componentsJson: ComponentsJson;
	tsConfigJson: TsConfigJson;
} & EnvironmentMeta;

export type NoDepsEnv = {
	componentsJson: ComponentsJson;
	tsConfigJson: TsConfigJson;
} & EnvironmentMeta;

export type PathToEnv = {
	destPath: string;
} & EnvironmentMeta;

export type DefaultAndPathToEnv = {
	destPath: string;
} & DefaultEnv;

type EnvironmentKind = "default" | "noDeps" | "pathTo" | "defaultAndPathTo";

type EnvironmentOf<T extends EnvironmentKind> = T extends "default"
	? DefaultEnv
	: T extends "noDeps"
		? NoDepsEnv
		: T extends "pathTo"
			? PathToEnv
			: T extends "defaultAndPathTo"
				? DefaultAndPathToEnv
				: never;

type Environment<T extends EnvironmentKind> = {
	kind: T;
	data: EnvironmentOf<T>;
};

type AnyEnvironment =
	| Environment<"default">
	| Environment<"noDeps">
	| Environment<"pathTo">
	| Environment<"defaultAndPathTo">;

async function getEssentialData(rootDir: string) {
	const [packageJson, tsConfigJson, componentsJson] = await Promise.all([
		useFile(rootDir, "package.json").parse(PACKAGE_JSON_SCHEMA),
		useFile(rootDir, "tsconfig.json").parse(TSCONIFG_JSON_SCHEMA),
		useFile(rootDir, "components.json").parse(COMPONENTS_JSON_SCHEMA),
	]);

	return {
		packageJson,
		tsConfigJson,
		componentsJson,
	};
}

export async function getEnvironment(): Promise<AnyEnvironment> {
	const environmentLoader = spinner("Loading environment...");

	const rootDir = process.cwd();
	const srcDir = resolveFolder(rootDir, "src");
	const packageManager = await detectPackageManager();
	const commandArgs = decodeCommandArgs();

	const { componentsJson, packageJson, tsConfigJson } =
		await getEssentialData(rootDir);

	// Stop environment loader
	environmentLoader.stop();

	switch (commandArgs.type) {
		case "default": {
			if (packageJson === null) {
				throw new PackageJsonError();
			} else if (!componentsJson) {
				throw new ComponentsJsonError();
			} else if (!tsConfigJson) {
				throw new TsConfigJsonError();
			}

			return {
				kind: "default",
				data: {
					componentsJson,
					packageJson,
					packageManager,
					rootDir,
					tsConfigJson,
					srcDir: srcDir ?? undefined,
				},
			};
		}

		case "noDeps": {
			if (!componentsJson) {
				throw new ComponentsJsonError();
			} else if (!tsConfigJson) {
				throw new TsConfigJsonError();
			}

			return {
				kind: "noDeps",
				data: {
					rootDir,
					tsConfigJson,
					componentsJson,
					packageManager,
					srcDir: srcDir ?? undefined,
				},
			};
		}

		case "to": {
			if (!commandArgs.withAll) {
				return {
					kind: "pathTo",
					data: {
						rootDir,
						packageManager,
						srcDir: srcDir ?? undefined,
						destPath: commandArgs.path,
					},
				};
			}

			if (packageJson === null) {
				throw new PackageJsonError();
			} else if (!componentsJson) {
				throw new ComponentsJsonError();
			} else if (!tsConfigJson) {
				throw new TsConfigJsonError();
			}

			return {
				kind: "defaultAndPathTo",
				data: {
					rootDir,
					packageManager,
					srcDir: srcDir ?? undefined,
					destPath: commandArgs.path,
					componentsJson,
					packageJson,
					tsConfigJson,
				},
			};
		}
	}
}

// Errors
class PackageJsonError extends Error {
	message: string = "A valid `package.json` was not found.";
}

class TsConfigJsonError extends Error {
	message: string = "The `tsconfig.json` file was not found.";
}

class ComponentsJsonError extends Error {
	message: string =
		"The project must use shadcn and have a `components.json` file.";
}
