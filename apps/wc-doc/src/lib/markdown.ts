// Regex for bold sentences and line breaks.
const MD_REGEX_CM = /\*\*(.*?)\*\*|\n|\(.*\)\[.*\]/g;

type ParserOptions = {
	bold?: "strong" | "b" | "em";
	lineBreak?: "br";
};

type ParseMinimalObject<T extends object> = {
	[k in keyof T]: string;
};

export function parseMinimalMdObject<T extends Record<string, string>>(
	obj: T,
	options: ParserOptions = { bold: "em", lineBreak: "br" },
) {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			acc[key as keyof T] = parseMinimalMdToHtml(value, options);
			return acc;
		},
		{} as ParseMinimalObject<T>,
	);
}

export function parseMinimalMdToHtml(
	md: string,
	{ bold, lineBreak }: ParserOptions = { bold: "em", lineBreak: "br" },
): string {
	return md.replace(MD_REGEX_CM, (match) => {
		if (match === "\n") {
			return `<${lineBreak} />`;
		} else if (match.startsWith("(") && match.endsWith("]")) {
			const { nameOfLink, hrefOfLink } = decodeLinkCase(match);

			return `<a href="${hrefOfLink}" target="_blank" class="text-blue-500 hover:underline">${nameOfLink}</a>`;
		}

		return `<${bold} class="highlight">${match.slice(2, -2)}</${bold}>`;
	});
}

function decodeLinkCase(match: string) {
	const endOfName = match.indexOf(")", 1);

	const nameOfLink = match.slice(1, endOfName);

	if (!nameOfLink || match.at(endOfName + 1) !== "[") {
		throw new Error(`${match} Is not a markdown link valid!!!`);
	}

	const hrefOfLink = match.slice(endOfName + 2, -1);

	return { nameOfLink, hrefOfLink };
}
