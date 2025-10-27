import z from "zod";

export const TSCONIFG_JSON_SCHEMA = z.object({
	compilerOptions: z.object({
		baseUrl: z.string(),
		paths: z.record(z.string(), z.array(z.string())).default({}),
	}),
});

export type TsConfigJson = z.infer<typeof TSCONIFG_JSON_SCHEMA>;

export type TsConfigPaths = TsConfigJson["compilerOptions"]["paths"];
