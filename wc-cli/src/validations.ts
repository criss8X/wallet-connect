import z from "zod";

const ALIASES_SCHEMA = z.object({
	components: z.string().nonempty(),
	ui: z.string().nonempty(),
	lib: z.string().nonempty(),
	hooks: z.string().nonempty(),
});

export type Aliases = z.infer<typeof ALIASES_SCHEMA>;

const COMPONENTS_JSON_SCHEMA = z.object(
	{
		style: z.literal("new-york"),
		rsc: z.boolean(),
		tsx: z.boolean(),
		tailwind: z.object({
			css: z.string().nonempty(),
			baseColor: z.literal(["gray", "neutral", "slate", "stone", "zinc"]),
			cssVariables: z.boolean(),
		}),
		aliases: ALIASES_SCHEMA,
	},
	"No valid `components.json` found, you must first install shadcn and initialize it.",
);

export type ComponentsJson = z.infer<typeof COMPONENTS_JSON_SCHEMA>;

export function validateComponentsJson(rawData: unknown): ComponentsJson {
	const { success, data, error } = COMPONENTS_JSON_SCHEMA.safeParse(rawData);

	if (!success) {
		const keysContainsError = error.issues.map(
			({ path }) => `\`${path.at(0)?.toString()}\``,
		);

		const errorMsg =
			keysContainsError.length === 1
				? error.issues[0].message
				: `In your components.json, the following keys have incorrect values: ${keysContainsError.join(", ")}`;

		throw new Error(errorMsg);
	}

	return data;
}

const PACKAGE_JSON_SCHEMA = z.object({
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
