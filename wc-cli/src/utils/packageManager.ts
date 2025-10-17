import type { ComponentNeeded, DependenceNeeded } from "./whatsNeed.js";

export type PackageManager = "pnpm" | "npm" | "bun" | "yarn";

export async function detectPackageManager(): Promise<PackageManager> {
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

type ScriptBuilder = (dep: DependenceNeeded, isDevMode?: boolean) => string;

// TODO: Check if these scripts builder are right.
export const SCRIPT_BY_PACKAGE_MANAGER: Record<PackageManager, ScriptBuilder> =
	{
		pnpm: (dep, _isDev) => `pnpm add ${dep}`,
		bun: (dep, _isDev) => `bun install ${dep}`,
		npm: (dep, _isDev) => `npm install ${dep}`,
		yarn: (dep, _isDev) => `yarn add ${dep}`,
	} as const;

type ComponentScriptBuilder = (component: ComponentNeeded) => string;

export const COMPONENT_SCRIPT_BUILDER: Record<
	PackageManager,
	ComponentScriptBuilder
> = {
	pnpm: (component) => `pnpm dlx shadcn@latest add ${component}`,
	// TODO: Put installation scripts for this builder.
	bun: (component) => `bun install ${component}`,
	npm: (component) => `npm install ${component}`,
	yarn: (component) => `yarn add ${component}`,
} as const;
