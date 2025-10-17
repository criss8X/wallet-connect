#!/usr/bin/env node
import { getEnvironment } from "@/utils/environment.js";
import { defaultInstallation } from "./sections/default.js";
import { noDepsInstallation } from "./sections/noDeps.js";
import { toPathProvided } from "./sections/toPathProvided.js";

await startCli();

async function startCli() {
	const { kind, data } = await getEnvironment();

	switch (kind) {
		case "default":
			return defaultInstallation(data);

		case "noDeps":
			return noDepsInstallation(data);

		case "toPathProvided":
			return toPathProvided(data);
	}
}
