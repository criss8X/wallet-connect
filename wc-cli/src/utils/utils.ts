import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import ora, { type Ora } from "ora";
import type { PackageManager } from "./packageManager.js";

export function resolvePath(parent: string, child: string): string | null {
	const joined = path.join(parent, child);

	if (!fs.existsSync(joined)) {
		return null;
	}

	return joined;
}

type ObjectMapperReturnType<T extends object, K> = {
	[k in keyof T]: K;
};

export function objectMapper<T extends object, K>(
	obj: T,
	mapper: <Key extends keyof T>(key: Key, value: T[Key]) => K,
): ObjectMapperReturnType<T, K> {
	const newObject = {} as ObjectMapperReturnType<T, K>;

	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			const typedKey = key as keyof T;

			newObject[typedKey] = mapper(typedKey, obj[typedKey]);
		}
	}

	return newObject;
}

export function ifEndsWithSlash(path: string): string {
	return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function spinner(msg: string): Ora {
	return ora({
		text: msg,
		spinner: "dots",
	}).start();
}

export async function runCommand(
	command: string,
	packageManager: PackageManager,
) {
	return new Promise<void>((resolve, reject) => {
		const install = spawn(packageManager, command.split(" "), {
			cwd: process.cwd(),
			stdio: "ignore",
		});

		install.on("close", (code) => {
			if (code === 0) {
				return resolve();
			}

			reject(new Error(`failed with code ${code}`));
		});
	});
}

export async function processWrapper(fn: () => Promise<void>) {
	readline.emitKeypressEvents(process.stdin);

	if (process.stdin.isTTY) {
		process.stdin.setRawMode(true);
	}

	const onKeypress = (_: string, key: { name: string }) => {
		if (key.name === "escape") {
			throw new Error("Cancelled by user");
		}
	};

	process.stdin.on("keypress", onKeypress);

	await fn();

	process.stdin.removeListener("keypress", onKeypress);
}
