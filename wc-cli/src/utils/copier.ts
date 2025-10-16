import fs from "node:fs";
import { getConnectWalletCode } from "@/components/connectWallet.js";
import type { ComponentsJson } from "@/schemas/components.schema.js";

type CopyWalletConnectProps = {
	to: string;
	componentsJson?: ComponentsJson;
};

export function copyConnectWalletTo({
	to,
	componentsJson,
}: CopyWalletConnectProps): boolean {
	try {
		const connectWalletCode = getConnectWalletCode(componentsJson?.aliases);

		fs.writeFileSync(to, connectWalletCode);

		return true;
	} catch {
		return false;
	}
}
