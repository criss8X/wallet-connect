import type { TsConfigJson } from "@/schemas/tsconfigJson.js";

export const MOCK_TSCONFIG_JSON_MISSING_PATHS: TsConfigJson = {
	baseUrl: ".",
	paths: {
		"@/": ["./src/*"],
		"@components/": ["./src/components/*"],
	},
};

export const MOCK_TSCONFIG_JSON_ALL_PATHS: TsConfigJson = {
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
