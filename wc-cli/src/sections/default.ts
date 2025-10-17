import fs from "node:fs/promises";
import { getConnectWalletCode } from "@/components/connectWallet.js";
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
}: DefaultEnv) {
	const aliasesDecoded = decodeAliases(rootDir, tsConfigJson, componentsJson);

	const [depsNeed, componentsNeed] = await Promise.all([
		whatsDepsNeed(packageJson),
		whatsComponentsNeed(aliasesDecoded),
	]);

	console.log(displayNeeds({ depsNeed, componentsNeed }));

	await installDepsNeeded(depsNeed);
	await installComponentsNeeded(componentsNeed);

	// Implement ora spinner
	const connectWalletCode = getConnectWalletCode(componentsJson?.aliases);

	await fs.writeFile(
		aliasesDecoded.components ?? srcDir ?? rootDir,
		connectWalletCode,
	);
	// stop ora spinner
}

type DisplayNeedsProps = {
	depsNeed: DependenceNeeded[];
	componentsNeed: ComponentNeeded[];
};

function displayNeeds({ depsNeed, componentsNeed }: DisplayNeedsProps): string {
	return "";
}
