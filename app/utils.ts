export function classNames(
	...classes: Array<string | boolean | null | undefined>
) {
	return classes.filter(Boolean).join(' ');
}

export function convertStringsToBooleans(obj: Record<string, any>): any {
	return Object.entries(obj).reduce((acc, [k, v]) => {
		return {
			...acc,
			[k]:
				typeof v === 'string' && ['true', 'false'].includes(v.toLowerCase())
					? v.toLowerCase() === 'true'
					: typeof v === 'object'
					? convertStringsToBooleans(v)
					: v,
		};
	}, {});
}
