#!/usr/bin/env node
import { getEnvironment } from "@/controller/index.js";
import { defaultInstallation } from "./sections/default.js";
import { noDepsInstallation } from "./sections/noDeps.js";
import { toPath } from "./sections/toPathProvided.js";

await startCli();

async function startCli() {
	const { kind, data } = await getEnvironment();

	switch (kind) {
		case "default":
			return defaultInstallation(data);

		case "noDeps":
			return noDepsInstallation(data);

		case "toPath":
			return toPath(data);
	}
}
