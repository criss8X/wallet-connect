#!/usr/bin/env node

import { setupWalletConnect } from "./wallet-connect/index.js";

const [, , cmd, name, ...args] = process.argv;

switch (cmd) {
	case "add": {
		add(name, args);
		break;
	}
}

async function add(nameOfComponent: string, args: string[]) {
	const rootDir = process.cwd();

	switch (nameOfComponent) {
		case "wallet-connect": {
			return await setupWalletConnect(rootDir, args);
		}

		default: {
			throw new Error(`The component ${nameOfComponent} was not found.`);
		}
	}
}
