import { copyConnectWalletTo } from "@/components/connectWallet.js";
import type { ToPathProviderEnv } from "@/utils/environment.js";

export async function toPath({ destPath }: ToPathProviderEnv) {
	await copyConnectWalletTo({ to: destPath });
}
