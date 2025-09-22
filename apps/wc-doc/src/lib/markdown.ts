<<<<<<< HEAD
// Regex for bold sentences and line breaks.
const MD_REGEX_CM = /\*\*(.*?)\*\*|\n/g;

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
		}

		return `<${bold} class="highlight">${match.slice(2, -2)}</${bold}>`;
=======
const HIGHLIGHT_REGEX = /\*{2}(.*?)\*{2}/gms;

export function parseHighlightsFromParagraph(paragraph: string): string {
	return paragraph.replace(HIGHLIGHT_REGEX, (match) => {
		return `<em class="bg-blue-900/50 px-1 not-italic">${match.slice(2, -2)}</em>`;
>>>>>>> 52edd2f (feat: Implement getting started basic)
	});
}
