import fs from "node:fs";
import type { ToPathProviderEnv } from "@/detector.js";
import { copyConnectWalletTo } from "@/utils/copier.js";

export function toPathProvided({
	destPath,
	rootDir,
	srcDir,
}: ToPathProviderEnv) {
	const to = fs.existsSync(destPath) ? destPath : srcDir;

	copyConnectWalletTo({ to: to ?? rootDir });
}
