import type { ComponentsJson } from "@/schemas/componentsJson.js";
import type { TsConfigJson } from "@/schemas/tsconfigJson.js";
import { whatsDepsUserNeedsTest } from "@/test/userNeeds.test.js";
import { aliasToRelativePath } from "@/utils/aliases.js";
import { whatsComponentsUserNeeds } from "@/utils/whatsUserNeeds.js";
import { objectMapper } from "@/utils.js";

function _testFirstScene() {
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
}

const componentsJson: ComponentsJson = {
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

const tsconfigJson: TsConfigJson = {
	baseUrl: ".",
	paths: {
		"@/": ["./src/*"],
		"@components/": ["./src/components/*"],
	},
};

const result = await whatsComponentsUserNeeds(componentsJson, tsconfigJson);

console.log({ result });
