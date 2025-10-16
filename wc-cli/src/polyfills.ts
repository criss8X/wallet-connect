if (!Array.prototype.findAndMap) {
	Array.prototype.findAndMap = function (callbackfn) {
		let i = 0;

		while (i < this.length) {
			const resultAndMap = callbackfn(this[i], i, this);

			if (resultAndMap !== undefined) {
				return resultAndMap;
			}

			i++;
		}

		return undefined;
	};
}
