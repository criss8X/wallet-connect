import z from "zod";

const TAILWIND_SCHEMA = z.object({
	css: z.string(),
	// baseColor: "neutral",
	// cssVariables: true,
	// prefix: "",
});

const ALIAS_SCHEMA = z.string().startsWith("@");

const ALIASES_SCHEMA = z.object({
	components: ALIAS_SCHEMA,
	utils: ALIAS_SCHEMA,
	ui: ALIAS_SCHEMA,
	lib: ALIAS_SCHEMA,
	hooks: ALIAS_SCHEMA,
});

export const COMPONENTS_JSON_SCHEMA = z.object({
	tsx: z.boolean(),
	tailwind: TAILWIND_SCHEMA,
	aliases: ALIASES_SCHEMA,
});

export type ComponentsJson = z.infer<typeof COMPONENTS_JSON_SCHEMA>;
export type Aliases = ComponentsJson["aliases"];

export function validateComponentsJson(rawData: unknown): ComponentsJson {
	const { success, data } = COMPONENTS_JSON_SCHEMA.safeParse(rawData);

	if (!success) {
		throw new Error(
			"You do not have a valid components.json in your project. Please initialize shadcn",
		);
	}

	return data;
}
