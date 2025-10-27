import z from "zod";

const ALIAS_SCHEMA = z.string();

const ALIASES_SCHEMA = z.object({
	components: ALIAS_SCHEMA,
	utils: ALIAS_SCHEMA,
	ui: ALIAS_SCHEMA,
	lib: ALIAS_SCHEMA,
	hooks: ALIAS_SCHEMA,
});

export type Aliases = z.infer<typeof ALIASES_SCHEMA>;

export const COMPONENTS_JSON_SCHEMA = z.object({
	aliases: ALIASES_SCHEMA,
});

export type ComponentsJson = z.infer<typeof COMPONENTS_JSON_SCHEMA>;
