Slide.into(
	document.querySelector(".slide__into"),
	{
		pauseButton: document.querySelector(".slide__pause"),
		playButton: document.querySelector(".slide__play"),
		prevButton: document.querySelector(".slide__prev"),
		nextButton: document.querySelector(".slide__next"),
		thumbnails: document.querySelector(".slide__thumbnails")
	},
	function() {
		const self = this;

		// add support for previous slide button
		self.prevButton.addEventListener("click", function() {
			self.prev();
		});

		// add support for next slide button
		self.nextButton.addEventListener("click", function() {
			self.next();
		});

		// add support for autoplay button
		self.playButton.addEventListener("click", function() {
			self.play();
		});

		// add support for pause button
		self.pauseButton.addEventListener("click", function() {
			self.pause();
		});

		// add support for thumbnail button
		self.thumbnails.addEventListener("click", function(event) {
			event.preventDefault();
			const thumbnail = event.target;
			const index = parseInt(thumbnail.dataset.slideIndex);
			self.goto(index);
		});

		// add observer for each slide rotation
		self.watch(function(index, finish) {
			// display the selected thumbnail button using CSS
			self.selectThumbnail(index);

			// allow screen reader to annouce current slide
			self.updateSlideVisibility(index);
			self.observeLiveRegion();

			// finish the rotation task
			finish();
		});
	}
);
