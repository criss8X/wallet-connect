type AnyLocale<L> = {
	es: L;
	en: L;
};

export function getLocalesByLang<L>(locales: AnyLocale<L>, lang?: string): L {
	assertTypes(locales.en, locales.es);

	return lang === "es" ? locales.es : locales.en;
}

function assertTypes(a: unknown, b: unknown) {
	if (typeof a === typeof b) {
		return;
	}

	throw new Error(`Locales with diff problem: a !== b look: A: ${a}, B: ${b}`);
}
