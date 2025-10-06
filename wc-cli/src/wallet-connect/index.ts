import { installCompDirect, normalInstallation } from "./modalities.js";

export function setupWalletConnect(rootDir: string, args: string[]) {
	if (args.length === 0) {
		return normalInstallation(rootDir);
	}

	const [first, second, three] = args;

	switch (first) {
		case "--direct":
			return installCompDirect(rootDir);

		case "-in": {
			if (second === "--direct") {
				return installCompDirect(rootDir);
			} else if (second !== undefined && three === "--direct") {
				return installCompDirect(second ?? rootDir);
			}

			return normalInstallation(second ?? rootDir);
		}
	}

	throw new Error("Incorrect command, please check the command.");
}
