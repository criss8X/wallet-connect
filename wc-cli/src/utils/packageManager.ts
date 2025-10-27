import type { ComponentNeeded, DependenceNeeded } from "./whatsNeed.js";

export type PackageManager = "pnpm" | "npm" | "bun" | "yarn";

export async function detectPackageManager(): Promise<PackageManager> {
	const ua = process.env.npm_config_user_agent;

	return ua?.includes("pnpm")
		? "pnpm"
		: ua?.includes("yarn")
			? "yarn"
			: ua?.includes("bun")
				? "bun"
				: "npm";
}

type ScriptBuilder = (dep: DependenceNeeded, isDevMode?: boolean) => string;

export const SCRIPT_BY_PACKAGE_MANAGER: Record<PackageManager, ScriptBuilder> =
	{
		pnpm: (dep, _isDev) => `pnpm add ${dep}`,
		bun: (dep, _isDev) => `bun add ${dep}`,
		npm: (dep, _isDev) => `npm install ${dep}`,
		yarn: (dep, _isDev) => `yarn add ${dep}`,
	} as const;

type ComponentScriptBuilder = (component: ComponentNeeded) => string;

export const COMPONENT_SCRIPT_BUILDER: Record<
	PackageManager,
	ComponentScriptBuilder
> = {
	pnpm: (component) => `pnpm dlx shadcn@latest add ${component}`,
	bun: (component) => `bunx --bun shadcn@latest add ${component}`,
	npm: (component) => `npx shadcn@latest add ${component}`,
	yarn: (component) => `yarn shadcn@latest add ${component}`,
} as const;
