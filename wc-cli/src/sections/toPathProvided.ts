import fs from "node:fs";
import { copyConnectWalletTo } from "@/utils/copier.js";
import type { ToPathProviderEnv } from "@/utils/packageManager.js";

export function toPathProvided({
	destPath,
	rootDir,
	srcDir,
}: ToPathProviderEnv) {
	const to = fs.existsSync(destPath) ? destPath : srcDir;

	copyConnectWalletTo({ to: to ?? rootDir });
}
