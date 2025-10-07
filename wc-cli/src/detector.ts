import fs from "node:fs";
import path from "node:path";
import { argv } from "node:process";
import {
	type ComponentsJson,
	validateComponentsJson,
} from "@/schemas/componentsJson.js";
import {
	type PackageJson,
	validatePackageJson,
} from "@/schemas/packageJson.js";

type PackageManager = "pnpm" | "npm" | "bun" | "yarn";

function detectPackageManager(): PackageManager {
	const ua = process.env.npm_config_user_agent;

	if (ua === undefined) {
		return "npm";
	}

	return ua.includes("pnpm")
		? "pnpm"
		: ua.includes("yarn")
			? "yarn"
			: ua.includes("bun")
				? "bun"
				: "npm";
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
	const [, , first, flag, flag2OrData] = argv;

	if (first !== "setup") {
		throw new Error("Command not found, try `setup`");
	}

	if (flag === undefined) {
		// is `wcs setup`
		return { type: "setup" };
	}

	if (flag === "--noDeps") {
		// is `wcs setup --no-deps`
		return { type: "noDeps" };
	} else if (flag === "-to") {
		if (flag2OrData === undefined) {
			throw new Error("Se esperaba una ubicación de destino.");
		}

		return { type: "to", path: flag2OrData };
	}

	throw new Error(
		"Invalid command, you can try `wcs setup` or `wcs setup -noDeps`",
	);
}

function getPackageJson(): PackageJson {
	const packageJsonPath = path.join(process.cwd(), "package.json");

	if (!fs.existsSync(packageJsonPath)) {
		throw new Error(
			"The project does not have shadcn installed. Please install shadcn before continuing.",
		);
	}

	const packageJsonData = fs.readFileSync(packageJsonPath, "utf-8");
	return validatePackageJson(JSON.parse(packageJsonData));
}

function getComponentsJson(): ComponentsJson {
	const componentsJsonPath = path.join(process.cwd(), "components.json");

	if (!fs.existsSync(componentsJsonPath)) {
		throw new Error("You do not have a valid package.json in your project.");
	}

	const packageJsonData = fs.readFileSync(componentsJsonPath, "utf-8");
	return validateComponentsJson(JSON.parse(packageJsonData));
}

export type DefaultEnv = {
	packageManager: PackageManager;
	packageJson: PackageJson;
	componentsJson: ComponentsJson;
};

export type NoDepsEnv = {
	packageManager: PackageManager;
	componentsJson: ComponentsJson;
};

export type ToPathProviderEnv = {
	packageManager: PackageManager;
	destPath: string;
};

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

export function getEnvironment(): AnyEnvironment {
	const packageManager = detectPackageManager();
	const commandArgs = decodeCommandArgs();

	switch (commandArgs.type) {
		case "setup":
			return {
				kind: "default",
				data: {
					packageManager,
					packageJson: getPackageJson(),
					componentsJson: getComponentsJson(),
				},
			};

		case "noDeps":
			return {
				kind: "noDeps",
				data: { packageManager, componentsJson: getComponentsJson() },
			};

		case "to":
			return {
				kind: "toPathProvided",
				data: {
					destPath: commandArgs.path,
					packageManager,
				},
			};
	}
}
