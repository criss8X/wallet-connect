import type { NoDepsEnv } from "@/detector.js";
import { aliasToRelativePath } from "@/utils/aliases.js";
import { copyConnectWalletTo } from "@/utils/copier.js";

function noDepsInstallation({
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
