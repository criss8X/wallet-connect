import fs from "node:fs";
import type { ZodType } from "zod";
import { resolveFile } from "@/utils/utils.js";

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
	const file = resolveFile(parent, child);

	if (file === null) {
		return new FileHandler();
	}

	try {
		const fileContent = fs.readFileSync(file, { encoding: "utf-8" });

		return new FileHandler(fileContent);
	} catch {
		return new FileHandler();
	}
}
