import fs from "node:fs";

export type PathToCommand = {
	type: "to";
	path: string;
	withDependencies?: boolean;
};

export function pathToCommandRefiner(nextFlags: string[]): PathToCommand {
	const pathTo = nextFlags[0];

	if (pathTo === undefined) {
		throw new PathToNotFoundError();
	}

	if (!fs.existsSync(pathTo)) {
		throw new PathToNotValidError(pathTo);
	}

	if (nextFlags[1] === "--deps") {
		return { type: "to", path: pathTo, withDependencies: true };
	}

	return { type: "to", path: pathTo };
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
