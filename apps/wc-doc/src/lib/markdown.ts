// Regex for bold sentences and line breaks.
const MD_REGEX_CM = /\*\*(.*?)\*\*|\n|\(.*\)\[.*\]/g;

type ParserOptions = {
	bold?: "strong" | "b" | "em";
	lineBreak?: "br";
};

export function parseMinimalMdToHtml(
	md: string,
	{ bold, lineBreak }: ParserOptions = { bold: "em", lineBreak: "br" },
): string {
	return md.replace(MD_REGEX_CM, (match) => {
		if (match === "\n") {
			return `<${lineBreak} />`;
		} else if (match.startsWith("(") && match.endsWith("]")) {
			const { nameOfLink, hrefOfLink } = decodeLinkCase(match);

			return `<a href="{${hrefOfLink}}" class="text-blue-500 hover:underline">${nameOfLink}</a>`;
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

	const hrefOfLink = match.slice(endOfName + 1, -2);

	return { nameOfLink, hrefOfLink };
}
