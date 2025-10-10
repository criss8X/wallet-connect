import type { ComponentsJson } from "@/schemas/componentsJson.js";

export const MOCK_COMPONENTS_JSON_ALL_ALIASES: ComponentsJson = {
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

export const MOCK_COMPONENTS_JSON_NO_ALIASES: ComponentsJson = {
	tailwind: { css: "" },
	tsx: true,
	aliases: {} as ComponentsJson["aliases"],
};
