# Slide

## Setup

## Carousel

### HTML

To set up a working carousel on your webpage, let's start by adding our HTML code right into the webpage, wherever you'd like to display the carousel.

```html
<div class="slide">
	<div id="alpha" class="slide__into">
		<img
			id="alpha-0"
			src="https://cdn2.thecatapi.com/images/5q5.jpg"
			class="slide__item"
		/>
		<img
			id="alpha-1"
			src="https://cdn2.thecatapi.com/images/b8.png"
			class="slide__item"
		/>
		<img
			id="alpha-2"
			src="https://cdn2.thecatapi.com/images/9qc.jpg"
			class="slide__item"
		/>
	</div>
</div>
```

What you'll need in order for the carousel to work are the following:

| Classes               | Description                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `class="slide"`       | This is used to hold the carousel along with any controls such as navigational buttons or thumbnails.                                 |
| `class="slide__into"` | This is used to hold all of the slides in the carousel. This namespace should be used as a descendant of the `class="slide"` element. |
| `class="slide__item"` | This is used to identify each slide. This namespace should be used as a direct child of the `class="slide__into"` element.            |

### CSS

Secondly, let's link to `slide.css` using the following link element.

```html
<link rel="stylesheet" href="slide/css/slide.css" />
```

This stylesheet is responbile for providng strucutre to the carousel. Depending on where your carousel lives on your webpage should decide whether this stylesheet needs to go in the `<head>` tag or in the `<body>`.

If the carousel HTML is parsed before this stylesheet is parsed, the webpage may incur layout shifting.

### Result

With the boilerplate carousel HTML and the `slide.css` stylesheet added, the carousel should be scrollable from the first slide to the last slide.

This is a low-level primitive where the only functionality it offers is to simply scroll. It doesn't require any other stylesheets or JavaScript to function.

You may progressively enhance the carousel by using additional stylesheets and JavaScript.

## Thumbnails

### HTML

Let's start by adding the HTML template that will lay out the thumbnails to our carousel.

```html
<nav class="slide__thumbnails">
	<a href="#alpha-0" class="slide__thumbnail" data-slide-index="0">
		<img src="https://cdn2.thecatapi.com/images/5q5.jpg" />
	</a>
	<a href="#alpha-1" class="slide__thumbnail" data-slide-index="1">
		<img src="https://cdn2.thecatapi.com/images/b8.png" />
	</a>
	<a href="#alpha-2" class="slide__thumbnail" data-slide-index="2">
		<img src="https://cdn2.thecatapi.com/images/9qc.jpg" />
	</a>
</nav>
```

With just semantic HTML and CSS alone, the thumbnails should link to each slide by it's unique id. What you'll need in order for the thumbnails to work are the following:

| Classes                     | Description                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `class="slide__thumbnails"` | This is used to hold the thumbnails. This namespace should be used as a descendant of the `class="slide"` element.                         |
| `class="slide__thumbnail"`  | This is used to hold the individual thumbnail. This namespace should be used as a direct child of the `class="slide__thumbnails"` element. |

| Attributes                                        | Description                                                                                                                                                    | Example                |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `id="{Replace With Unique ID}"`                   | This is used to identify each slide. Replace `{Replace With Unique ID}` with your own unique ID.                                                               | `id="alpha-0"`         |
| `href="#{Replace With Matching ID}"`              | This is used to link the thumbnail to the slide. Replace `{Replace With Matching ID}` with the matching ID of the slide.                                       | `href="#alpha-0"`      |
| `data-slide-index="{Replace With Unique Number}"` | This is used to identify each slide based on it's index value. It is required to include this attribute when `slide.js` and `slide.thumbnails.js` is involved. | `data-slide-index="0"` |

### CSS

Secondly, let's link to `slide.thumbnails.css` using the following link element.

```html
<link rel="stylesheet" href="slide/css/components/slide.thumbnails.css" />
```

### Result

Let's test by interacting with the thumbnails. What should happen is if you interact with a thumbnail that isn't already showing the slide on screen, the slide should then display on screen using simple jump-link behavior.

## Progressive Enhacement

### HTML

Let's add a `<noscript>` element right after the `<link>` elements that request `slide.css` and `.slide.thumbnails.css`.

```html
<noscript>
	<style>
		.slide__js {
			display: none;
		}
	</style>
</noscript>
```

This allows graceful degradation for our carousel whenever a user has JavaScript disabled in their browser and hides any links/buttons that would only work if JavaScript is enabled.

### JavaScript

Let's request the `slide.js` script into our HTML file. The script is not a critical resource so we can add the `<script>` at the bottom of the HTML document.

Secondly, let's request the `slide.thumbnails.js` script into the HTML document. Add the script right after the `slide.js` script.

Finally, let's create a new JavaScript file and add to the HTML document. You can name this file whatever you'd like - for this tutorial, I'm going to name it `my-carousel.js`.

```html
<script defer src="slide/js/slide.js"></script>
<script defer src="slide/js/components/slide.thumbnails.js"></script>
<script defer src="js/my-carousel.js"></script>
```

| Attributes | Description                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defer`    | This is used to hint to the browser that it can defer the downloading of the JavaScript files until after the HTML document has been completely parsed. |

## Controls

### HTML

Let's start by adding the HTML template that will display our next and previous buttons.

```html
<nav class="slide__nav slide__js">
	<button class="slide__prev" type="button">
		Prev
	</button>
	<button class="slide__play" type="button">
		Play
	</button>
	<button class="slide__pause" type="button">
		Pause
	</button>
	<button class="slide__next" type="button">
		Next
	</button>
</nav>
```

By adding a `<nav>` element with `<button>` elements, we're describing a navigation of buttons. Unlike the thumbnails, we don't need to use `<a>` to link directly to a slide by it's unique ID. Instead, we will use JavaScript to control the carousel through the `Slide.into` method.

| Classes                | Description                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `class="slide__nav"`   | This is used to hold the buttons that will control the carousel. This namespace should be used as a descendant of the `class="slide"` element. |
| `class="slide__prev"`  | This is used to identify the previous button. This namespace should be used as a descendant of the `class="slide"` element.                    |
| `class="slide__next"`  | This is used to identify the next button. This namespace should be used as a descendant of the `class="slide"` element.                        |
| `class="slide__play"`  | This is used to identify the play button. This namespace should be used as a descendant of the `class="slide"` element.                        |
| `class="slide__pause"` | This is used to identify the pause button. This namespace should be used as a descendant of the `class="slide"` element.                       |

| Attributes      | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `type="button"` | This is used to describe the button's behavior. It should not submit a form or prevent it's default behavior. |

### JavaScript

Next, let's open the `my-carousel.js` JavaScript file and let's add the template.

```javascript
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
```

### Result

The carousel should now be able to:

-   Play through each slide automatically using the `play` button
-   Pause on the current slide using the `pause` button
-   Forward to the next slide using the `next` button
-   Reverse to the last slide using the `prev` button
-   Jump to a specific slide using the `thumbnail` buttons
