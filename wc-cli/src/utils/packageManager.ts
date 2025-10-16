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
