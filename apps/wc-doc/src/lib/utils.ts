export function getUrlWithBase(url: string): string {
	const newUrl = url.startsWith("/") ? url : `/${url}`;

	return `/wallet-connect${newUrl}`;
}
