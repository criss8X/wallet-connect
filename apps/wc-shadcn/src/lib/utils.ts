import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function safeAsyncFunc<T>(func: () => Promise<T>) {
	return async () => {
		try {
			return await func();
		} catch (error) {
			console.error(error);
		}
	};
}
