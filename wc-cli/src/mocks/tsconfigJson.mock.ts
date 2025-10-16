import type { TsConfigJson } from "@/schemas/tsconfig.schema.js";

export const MOCK_TSCONFIG_JSON_MISSING_PATHS: TsConfigJson["compilerOptions"] =
	{
		baseUrl: ".",
		paths: {
			"@/": ["./src/*"],
			"@components/": ["./src/components/*"],
		},
	};

export const MOCK_TSCONFIG_JSON_ALL_PATHS: TsConfigJson["compilerOptions"] = {
	baseUrl: ".",
	paths: {
		"@/": ["./src/*"],
		"@components/": ["./src/components/*"],
		"@components/ui/": ["./src/components/ui/*"],
		"@/hooks/": ["./src/hooks/*"],
		"@/lib/": ["./src/lib/*"],
		"@/utils/": ["./src/utils/*"],
	},
};
