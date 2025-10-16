export type EnumOf<T extends object> = T[keyof T];

export type Fn<R = void> = () => R;
export type AsyncFn<R = void> = () => Promise<R>;

export type DynamicFn<isAsync extends boolean, R = void> = isAsync extends true
	? AsyncFn<R>
	: Fn<R>;
