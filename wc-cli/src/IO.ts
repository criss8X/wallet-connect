import { createInterface } from "node:readline/promises";

export const INTERFACE = createInterface({
	input: process.stdin,
	output: process.stdout,
});

export async function IOBooleanQuestion(question: string): Promise<boolean> {
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
