import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import ora, { type Ora } from "ora";

export function resolveFile(parent: string, child: string): string | null {
	const joined = path.join(parent, child);

	if (!fs.existsSync(joined)) {
		console.error(`The file ${child} is not exists.`);

		return null;
	}

	const stat = fs.statSync(joined);

	if (!stat.isFile()) {
		console.error(`The path ${joined} is not a file.`);

		return null;
	}

	return joined;
}

export function resolveFolder(parent: string, child: string): string | null {
	if (!fs.existsSync(parent)) {
		throw new Error(`The path ${parent} does not exist.`);
	}

	const stat = fs.statSync(parent);

	if (!stat.isDirectory()) {
		throw new Error(`The path ${parent} is not a directory.`);
	}

	const joinResult = path.join(parent, child);

	if (!fs.existsSync(joinResult)) {
		return null;
	}

	return joinResult;
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

export async function runCommand(command: string) {
	return new Promise<void>((resolve, reject) => {
		exec(command, (error) => {
			if (error) {
				reject(new Error(`Error executing command: ${command}`));
			}

			resolve();
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
