Slide.proto({
	updateSlideVisibility: function(index) {
		for (var i = 0; i < this.countChildren(); i++) {
			const state = i === index ? "false" : "true";
			this.children[i].setAttribute("aria-hidden", state);
		}
	},
	observeLiveRegion: function() {
		const state = this.isAuto() ? "off" : "polite";
		this.parent.setAttribute("aria-live", state);
	}
});
