export const page_th = (a: number | undefined) =>
	void 0 === a ? '#' : a % 4 > 0 ? (a - (a % 4)) / 4 + 1 : a / 4;