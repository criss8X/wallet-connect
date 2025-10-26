#!/usr/bin/env node
import { defaultInstallation } from "@commands/default.js";
import { noDepsInstallation } from "@commands/noDeps.js";
import { defaultAndPathTo, pathTo } from "@commands/pathTo.js";
import { getEnvironment } from "@/controller/index.js";

await startCli();

async function startCli() {
	const { kind, data } = await getEnvironment();

	switch (kind) {
		case "default":
			return defaultInstallation(data);

		case "noDeps":
			return noDepsInstallation(data);

		case "pathTo":
			return pathTo(data);

		case "defaultAndPathTo":
			return defaultAndPathTo(data);
	}
}
