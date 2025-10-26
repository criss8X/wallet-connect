import z from "zod";

const pathValueSchema = z.array(z.string());

export const TSCONIFG_JSON_SCHEMA = z.object({
	compilerOptions: z.object({
		baseUrl: z.string(),
		paths: z.record(z.string(), pathValueSchema).default({}),
	}),
});

export type TsConfigJson = z.infer<typeof TSCONIFG_JSON_SCHEMA>;

export type TsConfigPaths = TsConfigJson["compilerOptions"]["paths"];
