if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
	HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

if (!Number.isNaN) {
	Object.defineProperty(Number, "isNaN", {
		value: function(value) {
			let val = value;
			return val !== value;
		}
	});
}
