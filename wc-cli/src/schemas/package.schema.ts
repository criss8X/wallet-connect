import z from "zod";

// Just validate important data.
export const PACKAGE_JSON_SCHEMA = z.object({
	dependencies: z.record(z.string(), z.string()).default({}),
	devDependencies: z.record(z.string(), z.string()).default({}),
});
