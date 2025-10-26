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
		paths: tsConfigJson.compilerOptions.paths,
		value: componentsJson.aliases.components,
	});

	await copyConnectWalletTo({
		to: componentsPath ?? srcDir ?? rootDir,
		aliases: componentsJson.aliases,
	});
}
