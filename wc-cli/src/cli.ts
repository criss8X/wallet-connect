#!/usr/bin/env node
import { getEnvironment } from "@/utils/environment.js";

await startCli();

async function startCli() {
	const { kind, data } = await getEnvironment();

	switch (kind) {
		case "default":
			return;

		case "noDeps":
			return;

		case "toPathProvided":
			return;
	}
}
