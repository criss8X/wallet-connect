import z from "zod";

const ALIAS_SCHEMA = z.string();

const ALIASES_SCHEMA = z.object({
	components: ALIAS_SCHEMA,
	utils: ALIAS_SCHEMA,
	ui: ALIAS_SCHEMA,
	lib: ALIAS_SCHEMA,
	hooks: ALIAS_SCHEMA,
});

export const COMPONENTS_JSON_SCHEMA = z.object({
	aliases: ALIASES_SCHEMA,
});
