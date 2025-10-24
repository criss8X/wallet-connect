import { argv } from "node:process";
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
import type { PackageManager } from "@/utils/packageManager.js";
import { detectPackageManager } from "@/utils/packageManager.js";
import { resolveFileAndValidate, resolveFolder, spinner } from "@/utils.js";

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

export type ToPathProviderEnv = {
	destPath: string;
} & EnvironmentMeta;

type EnvironmentKind = "default" | "noDeps" | "toPathProvided";

type EnvironmentOf<T extends EnvironmentKind> = T extends "default"
	? DefaultEnv
	: T extends "noDeps"
		? NoDepsEnv
		: T extends "toPathProvided"
			? ToPathProviderEnv
			: never;

type Environment<T extends EnvironmentKind> = {
	kind: T;
	data: EnvironmentOf<T>;
};

type AnyEnvironment =
	| Environment<"default">
	| Environment<"noDeps">
	| Environment<"toPathProvided">;

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

export async function getEnvironment(): Promise<AnyEnvironment> {
	const environmentLoader = spinner("Loading environment...");

	const rootDir = process.cwd();
	const srcDir = resolveFolder(rootDir, "src");
	const packageManager = await detectPackageManager();
	const commandArgs = decodeCommandArgs();

	const { componentsJson, packageJson, tsConfigJson } =
		await getEssentialData(rootDir);

	environmentLoader.stop();

	switch (commandArgs.type) {
		case "setup": {
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
					rootDir,
					packageJson,
					tsConfigJson,
					packageManager,
					componentsJson,
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

		case "to":
			return {
				kind: "toPathProvided",
				data: {
					rootDir,
					packageManager,
					srcDir: srcDir ?? undefined,
					destPath: commandArgs.path,
				},
			};
	}
}

type CommandArgsResult =
	| {
			type: "setup";
	  }
	| {
			type: "noDeps";
	  }
	| {
			type: "to";
			path: string;
	  };

function decodeCommandArgs(): CommandArgsResult {
	const [, , flag, flag2OrData] = argv;

	if (flag === undefined) {
		// is `wcs setup`
		return { type: "setup" };
	}

	if (flag === "--noDeps") {
		if (flag2OrData === "-to") {
		}

		// is `wcs setup --no-deps`
		return { type: "noDeps" };
	} else if (flag === "-to") {
		if (flag2OrData === undefined) {
			throw new Error("A destination path was expected.");
		}

		return { type: "to", path: flag2OrData };
	}

	throw new Error("Invalid command, you can try `-to {path/to}` `--noDeps`");
}

// #region Data decoder
async function getEssentialData(rootDir: string) {
	const [packageJson, tsConfigJson, componentsJson] = await Promise.all([
		resolveFileAndValidate([rootDir, "package.json"], PACKAGE_JSON_SCHEMA),
		resolveFileAndValidate([rootDir, "tsconfig.json"], TSCONIFG_JSON_SCHEMA),
		resolveFileAndValidate(
			[rootDir, "components.json"],
			COMPONENTS_JSON_SCHEMA,
		),
	]);

	return {
		packageJson,
		tsConfigJson,
		componentsJson,
	};
}
