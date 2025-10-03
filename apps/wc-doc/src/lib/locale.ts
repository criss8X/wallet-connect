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

export function getMdLocalesByLang(md: string, lang?: string) {
	const [es, en] = md.split("<END_OF_SPANISH_LOCALE_MD_0x0>");

	return lang === "es" ? es : en;
}

type ParseLocalesObject<T extends object> = {
	[k in keyof T]: string;
};

export function parseMdLocalesObject<T extends object>(obj: T, lang?: string) {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			acc[key as keyof T] = getMdLocalesByLang(value, lang).trim();

			return acc;
		},
		{} as ParseLocalesObject<T>,
	);
}
