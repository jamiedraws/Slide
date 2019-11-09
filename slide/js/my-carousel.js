Slide.into(
	document.querySelector(".slide__into"),
	{
		prevButton: document.querySelector(".slide__prev"),
		nextButton: document.querySelector(".slide__next"),
		playButton: document.querySelector(".slide__play"),
		pauseButton: document.querySelector(".slide__pause"),
		thumbnails: document.querySelector(".slide__thumbnails")
	},
	function() {
		const self = this;

		self.prevButton.addEventListener("click", function() {
			self.prev();
		});

		self.nextButton.addEventListener("click", function() {
			self.next();
		});

		self.playButton.addEventListener("click", function() {
			self.play();
		});

		self.pauseButton.addEventListener("click", function() {
			self.pause();
		});

		self.thumbnails.addEventListener("click", function(event) {
			event.preventDefault();
			const thumbnail = event.target;
			const index = parseInt(thumbnail.dataset.slideIndex);
			self.goto(index);
		});

		self.watch(function(index, finish) {
			self.selectThumbnail(index);
			finish();
		});
	}
);
