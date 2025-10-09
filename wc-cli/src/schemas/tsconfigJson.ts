import z from "zod";

const pathValueSchema = z.string().or(z.array(z.string()));

const TSCONIFG_COMPILER_OPTS = z.object({
	baseUrl: z.string(),
	paths: z.record(z.string(), pathValueSchema),
});

export type TsConfigJson = z.infer<typeof TSCONIFG_COMPILER_OPTS>;

export function validateTsConfigJson(rawData: unknown): TsConfigJson {
	const { success, data } = TSCONIFG_COMPILER_OPTS.safeParse(rawData);

	if (!success) {
		throw new Error(
			"You do not have a valid tsconfig.json in your project. Please initialize a typescript project.",
		);
	}

	return data;
}
