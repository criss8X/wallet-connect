import { copyConnectWalletTo } from "@/components/connectWallet.js";
import { aliasToRelativePath } from "@/utils/aliases.js";
import type { NoDepsEnv } from "@/utils/environment.js";

export async function noDepsInstallation({
	componentsJson,
	tsConfigJson,
	rootDir,
	srcDir,
}: NoDepsEnv) {
	const componentsPath = aliasToRelativePath({
		rootDir,
		value: componentsJson.aliases.components,
		paths: tsConfigJson.compilerOptions.paths,
	});

	// Implement ora spinner
	await copyConnectWalletTo({
		to: componentsPath ?? srcDir ?? rootDir,
		aliases: componentsJson.aliases,
	});
	// stop ora spinner
}
