#!/usr/bin/env node
import { getEnvironment } from "@/controller/index.js";
import { defaultInstallation } from "./sections/default.js";
import { noDepsInstallation } from "./sections/noDeps.js";
import { defaultAndPathTo, pathTo } from "./sections/pathTo.js";

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
