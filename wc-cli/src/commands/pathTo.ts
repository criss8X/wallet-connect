import { displayNeeds } from "@commands/default.js";
import { decodeAliases } from "@utils/aliases.js";
import {
	installComponentsNeeded,
	installDepsNeeded,
} from "@utils/installer.js";
import { whatsComponentsNeed, whatsDepsNeed } from "@utils/whatsNeed.js";
import { bgBlackBright } from "colorette";
import { copyConnectWalletTo } from "@/components/connectWallet.js";
import type { DefaultAndPathToEnv, PathToEnv } from "@/controller/index.js";
import { processWrapper } from "@/utils/utils.js";

export async function pathTo({ destPath }: PathToEnv) {
	await copyConnectWalletTo({ to: destPath });
}

export async function defaultAndPathTo({
	componentsJson,
	destPath,
	packageJson,
	packageManager,
	rootDir,
	tsConfigJson,
}: DefaultAndPathToEnv) {
	const aliasesDecoded = decodeAliases(rootDir, tsConfigJson, componentsJson);

	const [depsNeed, componentsNeed] = await Promise.all([
		whatsDepsNeed(packageJson),
		whatsComponentsNeed(aliasesDecoded),
	]);

	if (depsNeed.length !== 0 || componentsNeed.length !== 0) {
		console.log(displayNeeds({ depsNeed, componentsNeed }));

		console.log();
		console.log(`Press ${bgBlackBright("ESC")} to cancel`);
		console.log();
	}
	await processWrapper(async () => {
		await installDepsNeeded(depsNeed, packageManager);
		await installComponentsNeeded(componentsNeed, packageManager);
	});

	await copyConnectWalletTo({
		to: destPath,
		aliases: componentsJson.aliases,
	});
}
