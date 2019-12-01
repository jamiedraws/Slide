Slide.proto({
    onClick: function(button, action) {
        const self = this;
        self.getNodeElement(button, function() {
            button.addEventListener("click", function(event) {
                action.call(self, event);
            });
        });
    },
    hasNodeElement: function(element) {
        return element !== null;
    },
    getNodeElement: function(element, cb) {
        if (this.hasNodeElement(element) && typeof cb === "function") {
            cb(element);
        }
    },
    ui: function(container) {
        const self = this;

        // validate to ensure a container node element was passed
        self.validateNodeElement(container);

        // include essential carousel controls
        self.config({
            pauseButton: container.querySelector(".slide__pause"),
            playButton: container.querySelector(".slide__play"),
            prevButton: container.querySelector(".slide__prev"),
            nextButton: container.querySelector(".slide__next"),
            thumbnails: container.querySelector(".slide__thumbnails")
        });

        // add optional support for slide controls
        self.onClick(self.pauseButton, self.pause);
        self.onClick(self.playButton, self.play);
        self.onClick(self.prevButton, self.prev);
        self.onClick(self.nextButton, self.next);
        self.onClick(self.thumbnails, function(event) {
            event.preventDefault();
            const thumbnail = event.target;
            const index = parseInt(thumbnail.dataset.slideIndex);
            self.goto(index);
        });

        // add observer for each slide rotation
        self.watch(function(index) {
            // display the selected thumbnail button using CSS
            self.selectThumbnail(index);

            // allow screen reader to annouce current slide
            self.updateSlideVisibility(index);
            self.observeLiveRegion();
        });
    }
});
