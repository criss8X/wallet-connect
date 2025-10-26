import { argv } from "node:process";
import { type PathToCommand, pathToCommandRefiner } from "./pathToRefiner.js";

type DefaultCommand = {
	type: "default";
};

type NoDepsCommand = {
	type: "noDeps";
};

type CommandArgsResult = DefaultCommand | NoDepsCommand | PathToCommand;

export function decodeCommandArgs(): CommandArgsResult {
	const [_a, _b, flag, ...nextFlags] = argv;

	switch (flag) {
		case "--noDeps":
			return { type: "noDeps" };

		case "-to":
			return pathToCommandRefiner(nextFlags);

		default:
			return { type: "default" };
	}
}
