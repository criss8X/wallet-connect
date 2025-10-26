import { bold } from "colorette";
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

	await copyConnectWalletTo({
		to: aliasesDecoded.components ?? srcDir ?? rootDir,
		aliases: componentsJson.aliases,
	});
}

type DisplayNeedsProps = {
	depsNeed: DependenceNeeded[];
	componentsNeed: ComponentNeeded[];
};

export function displayNeeds({
	depsNeed,
	componentsNeed,
}: DisplayNeedsProps): string {
	let content = bold("We will install the dependencies:");

	content += "\n";
	content += depsNeed.map((dep) => `- ${dep}`).join("\n");

	content += "\n\n";

	content += bold("And the shadcn components:");
	content += "\n";
	content += componentsNeed.map((comp) => `- ${comp}`).join("\n");

	return content;
}
