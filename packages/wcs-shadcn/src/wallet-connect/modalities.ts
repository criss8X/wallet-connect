import fs from "node:fs";
import path from "node:path";
import {
	containsComponent,
	decodeAliasPath,
	getComponentJson,
	getEssentialPaths,
	installNeededComps,
	pathJoinAndValidate,
} from "../constants.js";
import { IOBooleanQuestion } from "../IO.js";
import { chainSelectorTemplate } from "../templates/chainSelector.js";
import { connectWalletTemplate } from "../templates/connectWallet.js";
import { useAccountActions } from "../templates/useAccountActions.js";

const ChainSelectorNeeded = {
	button: ["button", "Button"],
	alertDialog: ["alert-dialog", "AlertDialog"],
	sonner: ["sonner", "Sonner"],
};

export function installCompDirect(rootDir: string) {
	const src = path.join(rootDir, "src");
	const hooks = path.join(src, "hooks");
	const components = path.join(src, "components");
	const ui = path.join(components, "ui");

	if (!fs.existsSync(src)) {
		fs.mkdirSync(src);
	}

	if (!fs.existsSync(components)) {
		fs.mkdirSync(components);
	}

	if (!fs.existsSync(ui)) {
		fs.mkdirSync(ui);
	}

	if (!fs.existsSync(hooks)) {
		fs.mkdirSync(hooks);
	}

	writeComponentTo({
		pathTo: components,
		srcPath: src,
		hooks: "@/hooks",
		ui: "@/components/ui",
	});
}

export async function normalInstallation(rootDir: string) {
	const componentsJson = getComponentJson(rootDir);

	const { componentsPath, uiPath, srcPath } = getEssentialPaths(
		rootDir,
		componentsJson,
	);

	const pathToFindComps = uiPath ?? componentsPath;

	if (pathToFindComps === null) {
		const isContinue = await IOBooleanQuestion(
			"Components folder not found. Do you still want to continue?",
		);

		if (!isContinue) {
			throw new Error("Could not install the `wallet-connect` component.");
		}

		installNeededComps({ button: true, alertDialog: true, sonner: true });

		writeComponentTo({
			pathTo: pathJoinAndValidate(srcPath, "components") ?? srcPath,
			srcPath,
			...componentsJson.aliases,
		});

		return;
	}

	const result = containsComponent(pathToFindComps, ChainSelectorNeeded);
	installNeededComps(result);

	writeComponentTo({
		pathTo: componentsPath ?? srcPath,
		srcPath,
		...componentsJson.aliases,
	});

	const isContinue = await IOBooleanQuestion(
		"Do you want to install the following missing libraries? y/n",
	);

	if (!isContinue) {
		return;
	}
}

function writeComponentTo({
	pathTo,
	srcPath,
	hooks,
	ui,
}: {
	pathTo: string;
	srcPath: string;
	ui: string;
	hooks: string;
}) {
	const chainSelectorDestPath = path.join(pathTo, "ChainSelector.tsx");
	const connectWalletDestPath = path.join(pathTo, "ConnectWallet.tsx");

	const chainSelector = chainSelectorTemplate({
		alertDialogImport: ui.concat("/alert-dialog"),
		buttonImport: ui.concat("/button"),
	});

	const connectWallet = connectWalletTemplate({
		alertDialogImport: ui.concat("/alert-dialog"),
		buttonImport: ui.concat("/button"),
		avatarImport: ui.concat("/avatar"),
		useAccountActionsImport: hooks.concat("/useAccountActions"),
	});

	fs.writeFileSync(chainSelectorDestPath, chainSelector);
	fs.writeFileSync(connectWalletDestPath, connectWallet);

	// Hooks
	const pathForHooks =
		decodeAliasPath(srcPath, hooks) ?? path.join(srcPath, "hooks");

	if (!fs.existsSync(pathForHooks)) {
		fs.mkdirSync(pathForHooks);
	}

	fs.writeFileSync(
		path.join(pathForHooks, "useAccountActions.ts"),
		useAccountActions(),
	);
}
