#!/usr/bin/env node
import { INTERFACE } from "@/IO.js";
import { getEnvironment } from "./detector.js";

export const ENVIRONMENT = getEnvironment();
await startCli();

INTERFACE.close();

async function startCli() {
	console.log({ ENVIRONMENT });
}
