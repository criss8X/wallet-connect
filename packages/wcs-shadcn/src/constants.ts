import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
	type ComponentsJson,
	type PackageJson,
	validateComponentsJson,
	validatePackageJson,
} from "./validations.js";

export const ShadcnCompScripts: Record<string, string> = {
	button: "shadcn@latest add button",
	alertDialog: "shadcn@latest add alert-dialog",
	sonner: "shadcn@latest add sonner",
};

export type ShadcnComp = keyof typeof ShadcnCompScripts;

export function getComponentJson(dir: string) {
	const componentsJsonPath = path.join(dir, "components.json");

	if (!fs.existsSync(componentsJsonPath)) {
		throw new Error(
			"The project does not have shadcn installed. Please install shadcn before continuing.",
		);
	}

	const componentsJsonData = fs.readFileSync(componentsJsonPath, "utf-8");
	const data = validateComponentsJson(JSON.parse(componentsJsonData));

	const { tsx } = data;

	if (!tsx) {
		throw new Error(
			"This component is only compatible with React projects using TypeScript.",
		);
	}

	return data;
}

export function getPackageJson(dir: string) {
	const packageJsonPath = path.join(dir, "package.json");

	if (!fs.existsSync(packageJsonPath)) {
		throw new Error(
			"The project does not have shadcn installed. Please install shadcn before continuing.",
		);
	}

	const packageJsonData = fs.readFileSync(packageJsonPath, "utf-8");
	const data = validatePackageJson(JSON.parse(packageJsonData));

	return data;
}

export function pathJoinAndValidate(
	parent: string,
	child: string,
): string | null {
	if (!fs.existsSync(parent)) {
		throw new Error(`The path ${parent} does not exist.`);
	}

	const stat = fs.statSync(parent);

	if (!stat.isDirectory()) {
		throw new Error(`The path ${parent} is not a directory.`);
	}

	const joinResult = path.join(parent, child);

	if (!fs.existsSync(joinResult)) {
		return null;
	}

	return joinResult;
}

export function decodeAliasPath(pathForAlias: string, alias: string) {
	return alias.startsWith("@/")
		? pathJoinAndValidate(pathForAlias, alias.slice(2))
		: null;
}

export type ObjectNeeded = {
	[key: string]: string[];
};

export type NeededResult<T extends ObjectNeeded> = {
	[key in keyof T]: boolean;
};

export function containsComponent<T extends ObjectNeeded>(
	path: string,
	comps: T,
): NeededResult<T> {
	const possibleComps = fs
		.readdirSync(path)
		.filter((file) => file.endsWith(".tsx"))
		.map((file) => file.replace(/\.tsx$/, ""));

	return Object.entries(comps).reduce(
		(acc, [key, possibilities]) => {
			const exists = possibilities.some((possibility) =>
				possibleComps.includes(possibility),
			);

			acc[key] = exists;
			return acc;
		},
		{} as Record<string, boolean>,
	) as NeededResult<T>;
}

export function containsPackages<T extends ObjectNeeded>(
	packageJson: PackageJson,
	packages: T,
): NeededResult<T> {
	const dependencies = Object.keys(packageJson.dependencies).concat(
		Object.keys(packageJson.devDependencies),
	);

	return Object.entries(packages).reduce(
		(acc, [key, possibilities]) => {
			const exists = possibilities.some((possibility) =>
				dependencies.includes(possibility),
			);

			acc[key] = exists;
			return acc;
		},
		{} as Record<string, boolean>,
	) as NeededResult<T>;
}

function runShadcnScript(compScript: string): boolean {
	const execPath = process.env.npm_execpath || "";

	const packageManagerScript = execPath.includes("pnpm")
		? "pnpm dlx"
		: execPath.includes("yarn")
			? "yarn"
			: execPath.includes("bun")
				? "bunx --bun"
				: "npx";

	try {
		execSync(`${packageManagerScript} ${compScript}`, { stdio: "inherit" });
		return true;
	} catch {
		return false;
	}
}

export function installNeededComps(obj: Record<string, boolean>) {
	const keys = Object.entries(obj);

	let errorCount: number | null = null;
	for (const [key, isInstalled] of keys) {
		if (isInstalled) {
			continue;
		}

		const compScript = ShadcnCompScripts[key];

		if (compScript === undefined) {
			console.error(`No script found for: ${key}`);

			throw new Error("An unexpected error has occurred.");
		}

		console.log(`Installing the component \`${key}\`.`);
		const success = runShadcnScript(compScript);

		if (!success) {
			errorCount = (errorCount ?? 0) + 1;
		}
	}

	if (errorCount === null) {
		return;
	}

	const msg =
		errorCount === 0
			? "All required components were installed successfully."
			: `Failed to install ${errorCount} components.`;

	console.log(msg);
}

export type EssentialsPaths = {
	srcPath: string;
	componentsPath: string | null;
	uiPath: string | null;
	libPath: string | null;
	hooksPath: string | null;
};

export function getEssentialPaths(
	rootDir: string,
	{ aliases }: ComponentsJson,
): EssentialsPaths {
	const srcPath = pathJoinAndValidate(rootDir, "src");

	if (!srcPath) {
		throw new Error("The project does not have a `src` directory.");
	}

	const [components, ui, lib, hooks] = Object.entries(aliases).map(
		([_, value]) => decodeAliasPath(srcPath, value),
	);

	const componentsPath =
		components ?? pathJoinAndValidate(srcPath, "components");

	const uiPath =
		ui ??
		pathJoinAndValidate(srcPath, "ui") ??
		(componentsPath && pathJoinAndValidate(componentsPath, "ui"));

	const libPath = lib ?? pathJoinAndValidate(srcPath, "lib");
	const hooksPath = hooks ?? pathJoinAndValidate(srcPath, "hooks");

	return { srcPath, componentsPath, uiPath, libPath, hooksPath };
}
