import { aliasToRelativePath } from "@/utils/aliases.js";
import { copyConnectWalletTo } from "@/utils/copier.js";
import type { DefaultEnv } from "@/utils/packageManager.js";
import {
	whatsComponentsUserNeeds,
	whatsDepsUserNeeds,
} from "@/utils/whatsUserNeeds.js";

export async function defaultInstallation({
	componentsJson,
	packageJson,
	_packageManager,
	rootDir,
	srcDir,
	tsConfigJson,
}: DefaultEnv) {
	const [depsUserNeeds, _compsUserNeeds] = await Promise.all([
		Promise.resolve(whatsDepsUserNeeds(packageJson)),
		Promise.resolve(whatsComponentsUserNeeds(componentsJson, tsConfigJson)),
	]);

	// TODO: Hacer algo interactivo que se valla mostrando con forme va pasando lo que se esta instalando.
	const _dependencesNeededDisplay = depsUserNeeds.reduce(
		(acc, value) => acc.concat(`\n${value}`),
		"Se instalarán las siguientes dependencias:",
	);

	const componentsPath = aliasToRelativePath(
		componentsJson.aliases.components,
		tsConfigJson.paths,
	);

	const isCopied = copyConnectWalletTo({
		componentsJson,
		to: componentsPath ?? srcDir ?? rootDir,
	});

	if (isCopied) {
	}
}
