import fs from "node:fs";

export type PathToCommand = {
	type: "to";
	path: string;
	withAll: boolean;
};

export function pathToCommandRefiner(nextFlags: string[]): PathToCommand {
	const pathTo = nextFlags[0];

	if (pathTo === undefined) {
		throw new Error("A destination path was expected.");
	}

	if (!fs.existsSync(pathTo)) {
		throw new Error(`The path: [${pathTo}] provided does not exist.`);
	}

	if (nextFlags[1] === "--all") {
		return { type: "to", path: pathTo, withAll: true };
	}

	return { type: "to", path: pathTo, withAll: false };
}
