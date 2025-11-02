#!/usr/bin/env node
import { defaultInstallation } from "@commands/default.js";
import { noDepsInstallation } from "@commands/noDeps.js";
import { defaultAndPathTo, pathTo } from "@commands/pathTo.js";
import { getEnvironment } from "@/controller/index.js";

async function startCli() {
	const { kind, data } = await getEnvironment();

	switch (kind) {
		case "default":
			return await defaultInstallation(data);

		case "noDeps":
			return await noDepsInstallation(data);

		case "pathTo":
			return await pathTo(data);

		case "defaultAndPathTo":
			return await defaultAndPathTo(data);
	}
}

startCli()
	.then(() => {
		setImmediate(() => process.exit(0));
	})
	.catch((err) => {
		console.error("❌ Error:", err);
		setImmediate(() => process.exit(1));
	});
