import { aliasToRelativePath } from "@/utils/aliases.js";
import { copyConnectWalletTo } from "@/utils/copier.js";
import type { NoDepsEnv } from "@/utils/packageManager.js";

function _noDepsInstallation({
	componentsJson,
	tsConfigJson,
	rootDir,
	srcDir,
}: NoDepsEnv) {
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
