import fs from "node:fs";

export type PathToCommand = {
	type: "to";
	path: string;
	withAll: boolean;
};

export function pathToCommandRefiner(nextFlags: string[]): PathToCommand {
	const pathTo = nextFlags[0];

	if (pathTo === undefined) {
		throw new PathToNotFoundError();
	}

	if (!fs.existsSync(pathTo)) {
		throw new PathToNotValidError(pathTo);
	}

	if (nextFlags[1] === "--all") {
		return { type: "to", path: pathTo, withAll: true };
	}

	return { type: "to", path: pathTo, withAll: false };
}

// Errors
class PathToNotFoundError extends Error {
	message: string = "A destination path was expected.";
}

class PathToNotValidError extends Error {
	message: string;

	constructor(pathTo: string) {
		super();
		this.message = `The path: [${pathTo}] provided does not exist.`;
	}
}
