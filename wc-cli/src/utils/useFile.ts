import fs from "node:fs";
import path from "node:path";
import type { ZodType } from "zod";

class FileHandler {
	private content?: string;

	constructor(contentOfFile?: string) {
		this.content = contentOfFile;
	}

	parse<T>(schema: ZodType<T>): T | null {
		if (this.content === undefined) {
			return null;
		}

		const { success, data } = schema.safeParse(JSON.parse(this.content));

		if (!success) {
			return null;
		}

		return data;
	}
}

export default function useFile(parent: string, child: string): FileHandler {
	const file = path.join(parent, child);

	try {
		const fileContent = fs.readFileSync(file, { encoding: "utf-8" });

		return new FileHandler(fileContent);
	} catch {
		return new FileHandler();
	}
}
