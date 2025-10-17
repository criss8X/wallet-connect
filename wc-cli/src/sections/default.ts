import { ComponentsJson } from "@/schemas/components.schema.js";
import { TsConfigJson } from "@/schemas/tsconfig.schema.js";
import { aliasToRelativePath } from "@/utils/aliases.js";
import { copyConnectWalletTo } from "@/utils/copier.js";
import type { DefaultEnv } from "@/utils/environment.js";
import {
	whatsComponentsUserNeeds,
	whatsDepsUserNeeds,
} from "@/utils/whatsUserNeeds.js";
import { objectMapper } from "@/utils.js";

export async function defaultInstallation({
	componentsJson,
	packageJson,
	rootDir,
	srcDir,
	tsConfigJson,
}: DefaultEnv) {
	// const isCopied = copyConnectWalletTo({
	// 	componentsJson,
	// 	to: componentsPath ?? srcDir ?? rootDir,
	// });
	// if (isCopied) {
	// }
}
