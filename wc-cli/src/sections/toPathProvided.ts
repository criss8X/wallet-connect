import fs from "node:fs";
import { copyConnectWalletTo } from "@/components/connectWallet.js";
import type { ToPathProviderEnv } from "@/utils/environment.js";

export async function toPathProvided({ destPath }: ToPathProviderEnv) {
	if (!fs.existsSync(destPath)) {
		// TODO: Ask to user about if wants use root path as a destination path.
		throw new Error(
			`The path: ${destPath} is not valid or not found, try another path.`,
		);
	}

	await copyConnectWalletTo({ to: destPath });
}
