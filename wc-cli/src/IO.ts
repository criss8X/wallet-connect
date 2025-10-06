import { createInterface } from "node:readline/promises";

export async function IOBooleanQuestion(question: string): Promise<boolean> {
	const INTERFACE = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const answer = await INTERFACE.question(`${question} (y/n): `);

	INTERFACE.close();

	const answerProcessed = answer.trim().toLowerCase();
	if (answerProcessed === "y") {
		return true;
	} else if (answerProcessed === "n") {
		return false;
	}

	return await IOBooleanQuestion(question);
}
