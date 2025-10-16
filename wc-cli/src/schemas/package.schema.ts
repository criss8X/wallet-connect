import z from "zod";

// Just validate important data.
export const PACKAGE_JSON_SCHEMA = z.object({
	dependencies: z.record(z.string(), z.string()),
	devDependencies: z.record(z.string(), z.string()),
});

export type PackageJson = z.infer<typeof PACKAGE_JSON_SCHEMA>;

export function validatePackageJson(rawData: unknown): PackageJson {
	const { success, data } = PACKAGE_JSON_SCHEMA.safeParse(rawData);

	if (!success) {
		throw new Error("You do not have a valid package.json in your project.");
	}

	return data;
}
