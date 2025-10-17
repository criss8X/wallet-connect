import { copyConnectWalletTo } from "@/components/connectWallet.js";
import { decodeAliases } from "@/utils/aliases.js";
import type { DefaultEnv } from "@/utils/environment.js";
import {
	installComponentsNeeded,
	installDepsNeeded,
} from "@/utils/installer.js";
import {
	type ComponentNeeded,
	type DependenceNeeded,
	whatsComponentsNeed,
	whatsDepsNeed,
} from "@/utils/whatsNeed.js";

export async function defaultInstallation({
	componentsJson,
	packageJson,
	rootDir,
	srcDir,
	tsConfigJson,
	packageManager,
}: DefaultEnv) {
	const aliasesDecoded = decodeAliases(rootDir, tsConfigJson, componentsJson);

	const [depsNeed, componentsNeed] = await Promise.all([
		whatsDepsNeed(packageJson),
		whatsComponentsNeed(aliasesDecoded),
	]);

	console.log(displayNeeds({ depsNeed, componentsNeed }));

	await installDepsNeeded(depsNeed, packageManager);
	await installComponentsNeeded(componentsNeed, packageManager);

	// Implement ora spinner
	await copyConnectWalletTo({
		to: aliasesDecoded.components ?? srcDir ?? rootDir,
		aliases: componentsJson.aliases,
	});
	// stop ora spinner
}

type DisplayNeedsProps = {
	depsNeed: DependenceNeeded[];
	componentsNeed: ComponentNeeded[];
};

function displayNeeds({ depsNeed, componentsNeed }: DisplayNeedsProps): string {
	return "";
}
