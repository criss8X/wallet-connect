import type { ComponentsJson } from "@/schemas/componentsJson.js";
import type { TsConfigJson } from "@/schemas/tsconfigJson.js";
import { aliasToRelativePath } from "@/utils/aliases.js";
import { objectMapper } from "@/utils.js";

// This scene just is for test.
const { aliases }: ComponentsJson = {
	tailwind: { css: "" },
	tsx: true,
	aliases: {
		components: "@components",
		hooks: "@/hooks",
		lib: "@/lib",
		ui: "@/components/ui",
		utils: "@/utils",
	},
};

const { paths }: TsConfigJson = {
	baseUrl: ".",
	paths: {
		"@/": ["./src/*"],
		"@components/": ["./src/components/*"],
	},
};

const aliasAsRelativePath = objectMapper(aliases, (_, value) =>
	aliasToRelativePath(value, paths),
);

console.log(aliasAsRelativePath);
