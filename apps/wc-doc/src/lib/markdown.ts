const HIGHLIGHT_REGEX = /\*{2}(.*?)\*{2}/gms;

export function parseHighlightsFromParagraph(paragraph: string): string {
	return paragraph.replace(HIGHLIGHT_REGEX, (match) => {
		return `<em class="bg-blue-900/50 px-1 not-italic">${match.slice(2, -2)}</em>`;
	});
}
