#!/usr/bin/env node
import { getEnvironment } from "@/detector.js";
import { INTERFACE } from "@/IO.js";
import { defaultInstallation } from "@/sections/default.js";

export const ENVIRONMENT = getEnvironment();
await startCli();

INTERFACE.close();

async function startCli() {
	switch (ENVIRONMENT.kind) {
		case "default":
			return defaultInstallation(ENVIRONMENT.data);

		case "noDeps":
			return;

		case "toPathProvided":
			return;
	}
}
