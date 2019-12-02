Slide.proto({
    updateSlideVisibility: function(index) {
        const children = this.toArray(this.children);
        children.forEach(function(child, i) {
            const state = i === index ? "false" : "true";
            child.setAttribute("aria-hidden", state);
        });
    },
    observeLiveRegion: function() {
        const state = this.isAuto() ? "off" : "polite";
        this.parent.setAttribute("aria-live", state);
    }
});
