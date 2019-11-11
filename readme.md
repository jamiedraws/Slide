# Setup

## Overview

Slide carousel, nicknamed Slide, is a free-to-use library designed with discipline along with a mission in UX for both the audience and the author.

## Mission, Vision, Value

The mission of Slide is to provide a pleasant user experience that is designed using a simple, clear and minimal code base. Slide focuses on progressive enhancement and opens itself for extension.

In order to support this mission, it is Slide's vision to aim for best practices of both web accessibility and web performance in its design.

Should you choose to use Slide as your carousel, you will be able to:

- Lay out your HTML structure freely
- Opt-in with the presentation and functionality you need
- Control the duration, delay and transition using CSS
- Program freely in a private scope
- Describe your content exactly how you need it

These values support Slide's mission and vision. Slide is free of 3rd party dependencies and aims to be as clear and as simplified as possible.

If this sounds like the kind of carousel that you'd like to use, please make sure you acknowledge the standards of using Slide in your project.

## Standards

In order to attain Slide's mission, there are standards that an author should strive for. The standards are as follows in that Slide should:

- Operate as a basic carousel without any JavaScript
- Operate as a basic carousel when JavaScript is disabled
- Render and animate within a 60 FPS threshold
- Degrade gracefully when resources are absent

Most importantly though, Slide should never by any means:

- Violate any of the web accessibility guidelines
- Offer any mechanism to the user that won't work
- Block the user from completing their objective

If you have objections to any of the standards, Slide may not be the right carousel to suit your needs.

Otherwise, if you acknowledge and are willing to meet these standards head on, let's waste no time in setting up Slide in your project.

# Carousel

## HTML

To set up a working carousel on your webpage, let's start by adding our HTML code right into the webpage, wherever you'd like to display the carousel.

```html
<div class="slide">
	<div id="alpha" class="slide__into">
		<img
			id="alpha-0"
			src="images/led-music-instruments.jpg"
			class="slide__item"
			alt="woman standing watching LED light musical instrument"
		/>
		<img
			id="alpha-1"
			src="images/woman-holding-heart.jpg"
			class="slide__item"
			alt="woman holding lit heart"
		/>
		<img
			id="alpha-2"
			src="images/hot-air-balloons.jpg"
			class="slide__item"
			alt="man taking photo of hot air balloons"
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

## CSS

Secondly, let's link to `slide.css` and `slide.ui.css` using the following link element.

```html
<link rel="stylesheet" href="slide/css/slide.css" />
<link rel="stylesheet" href="slide/css/components/slide.ui.css" />
```

| Stylesheets    | Description                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slide.css`    | This stylesheet is responbile for providng strucutre to the carousel. Depending on where your carousel lives on your webpage should decide whether this stylesheet needs to go in the `<head>` or in the `<body>` element. |
| `slide.ui.css` | This is used to theme our carousel along with navigational controls.                                                                                                                                                       |

If the HTML is parsed before this stylesheet is parsed, the webpage may incur layout shifting.

## Result

With the HTML template and the `slide.css` stylesheet added, the carousel should be scrollable from the first slide to the last slide.

This is the basic functionality the carousel has to offer. It doesn't require any other stylesheets or JavaScript to function.

However, you may progressively enhance the carousel by using additional stylesheets and JavaScript.

# Thumbnails

## HTML

Let's start by adding the HTML template that will lay out the thumbnails to our carousel.

```html
<nav class="slide__thumbnails">
	<a
		href="#alpha-0"
		class="slide__thumbnail"
		title="Select the first slide"
		data-slide-index="0"
	>
		<span>1</span>
	</a>
	<a
		href="#alpha-1"
		class="slide__thumbnail"
		title="Select the second slide"
		data-slide-index="1"
	>
		<span>2</span>
	</a>
	<a
		href="#alpha-2"
		class="slide__thumbnail"
		title="Select the last slide"
		data-slide-index="2"
	>
		<span>3</span>
	</a>
</nav>
```

With just semantic HTML and CSS alone, the thumbnails should link to each slide by it's unique ID. What you'll need in order for the thumbnails to work are the following:

| Classes                     | Description                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `class="slide__thumbnails"` | This is used to hold the thumbnails. This namespace should be used as a descendant of the `class="slide"` element.                         |
| `class="slide__thumbnail"`  | This is used to hold the individual thumbnail. This namespace should be used as a direct child of the `class="slide__thumbnails"` element. |

| Attributes                                        | Description                                                                                                                                                    | Example                |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `id="{Replace With Unique ID}"`                   | This is used to identify each slide. Replace `{Replace With Unique ID}` with your own unique ID.                                                               | `id="alpha-0"`         |
| `href="#{Replace With Matching ID}"`              | This is used to link the thumbnail to the slide. Replace `{Replace With Matching ID}` with the matching ID of the slide.                                       | `href="#alpha-0"`      |
| `data-slide-index="{Replace With Unique Number}"` | This is used to identify each slide based on it's index value. It is required to include this attribute when `slide.js` and `slide.thumbnails.js` is involved. | `data-slide-index="0"` |

## CSS

Secondly, let's link to `slide.thumbnails.css` using the following link element.

```html
<link rel="stylesheet" href="slide/css/components/slide.thumbnails.css" />
```

## Result

Let's test by interacting with the thumbnails. What should happen is if you interact with a thumbnail that isn't already showing the slide on screen, the slide should then display on screen using native browser semantics.

> ### Accessibility Tip
>
> Describing the relationship for each thumbnail `<a>` element allows a user to understand what their action would do. [This meets the success criterion for WCAG 4.1.2 Name, Role, Value - Level A](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html "Read the full definition of Name, Role, Value Success Criterion").
>
> ---
>
> Users can also tab through each thumbnail with their keyboard and select a slide to display without the use of a mouse. [This functionality meets the success criterion for WCAG 2.2.1. Keyboard - Level A](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html "Read the full definition of Keyboard Success Criterion").

# Progressive Enhacement

## HTML

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

> ### User-Experience Tip
>
> As a user-experience best practice, never offer the user any feature they cannot use.

## JavaScript

Let's request the `slide.js` script into our HTML document. The script is not a critical resource so we can add the `<script>` at the bottom of the document.

Secondly, let's request the `slide.thumbnails.js` script into the HTML document. Add the script right after the `slide.js` script.

Finally, let's create a new JavaScript file and add to the HTML document. You can name this file whatever you'd like - for this example, let's name it `my-carousel.js`.

```html
<script defer src="slide/js/slide.js"></script>
<script defer src="slide/js/components/slide.thumbnails.js"></script>
<script defer src="slide/js/components/slide.a11y.js"></script>
<script defer src="js/my-carousel.js"></script>
```

| Scripts               | Description                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slide.js`            | This is the core mechanism that establishes a relationship with the carousel. This also exposes the global `Slide` object and provides two methods `Slide.into` and `Slide.proto`. |
| `slide.thumbnails.js` | This attaches thumbnail functionality to the carousel's prototype.                                                                                                                 |
| `slide.a11y.js`       | This attaches functionality aimed for accessibility to the carousel's prototype.                                                                                                   |

> ### Performance Tip
>
> The `defer` keyword is used to hint to the browser that it can download the JavaScript resource after the HTML document has been completely parsed.

# Controls

## HTML

Let's start by adding the HTML template that will display the basic controls for a carousel.

```html
<div class="slide__js">
	<nav class="slide__nav">
		<button
			aria-label="Select the previous slide"
			class="slide__prev"
			type="button"
		>
			Prev
		</button>
		<button
			aria-label="Play through all slides"
			class="slide__play"
			type="button"
		>
			Play
		</button>
		<button
			aria-label="Pause on the current slide"
			class="slide__pause"
			type="button"
		>
			Pause
		</button>
		<button
			aria-label="Select the next slide"
			class="slide__next"
			type="button"
		>
			Next
		</button>
	</nav>
</div>
```

By adding a `<nav>` element with `<button>` elements, we're describing a navigation of buttons. Unlike the thumbnails, we don't need to use `<a>` to link directly to a slide by it's unique ID. Instead, we will use JavaScript to control the carousel through the `Slide.into` method.

| Classes                | Description                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `class="slide__nav"`   | This is used to hold the buttons that will control the carousel. This namespace should be used as a descendant of the `class="slide"` element. |
| `class="slide__prev"`  | This is used to identify the previous button. This namespace should be used as a descendant of the `class="slide"` element.                    |
| `class="slide__next"`  | This is used to identify the next button. This namespace should be used as a descendant of the `class="slide"` element.                        |
| `class="slide__play"`  | This is used to identify the play button. This namespace should be used as a descendant of the `class="slide"` element.                        |
| `class="slide__pause"` | This is used to identify the pause button. This namespace should be used as a descendant of the `class="slide"` element.                       |

| Attributes                                      | Description                                                                                                                                                                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type="button"`                                 | This is used to describe the button's behavior. It should not submit a form or prevent it's default behavior.                                                                                                       |
| `aria-label="{Replace With Descriptive Label}"` | This text is annouced by screen readers and supported by assistive technology. It is recommended for web accessibility. Replace `{Replace With Descriptive Label}` with a description that's related to the button. |

## JavaScript

Next, let's open the `my-carousel.js` JavaScript file and let's add the template.

```javascript
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
```

The `Slide.into` method takes the HTML element that represents the carousel and observes it.

| Parameters     | Description                                                                                                                                                                                                                                     | Status   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `Node Element` | This node element must represent the carousel itself. It does not need to represent the carousel's slides, nor the carousel's navigational controls.                                                                                            | Required |
| `Object`       | This object is used to initialize any properties or methods that share a relationship with the carousel `Node Element`. It will be attached to the carousel object and it can be accessible from the callback `Function`.                       | Required |
| `Function`     | This callback function is used to interact with the carousel object and program it as desired. In this function scope also is the carousel API where properties or methods that are defined using the `Slide.proto` method are also accessible. | Required |

## Result

The carousel should now be able to:

- Play through each slide automatically using the `play` button
- Pause on the current slide using the `pause` button
- Forward to the next slide using the `next` button
- Reverse to the last slide using the `prev` button
- Jump to a specific slide using the `thumbnail` buttons

> ### Accessibility Tip
>
> Describing controls using the `<button>` element allows a user to operate the controls using a keyboard alone. They can navigate each button using a tab key and select the button using an enter key. [This functionality meets the success criterion for WCAG 2.2.1. Keyboard - Level A](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html "Read the full definition of Keyboard Success Criterion").
>
> ---
>
> Offering a control to `pause` a carousel that autoplays allows a user to consume content without being restricted to a time limit. [This functionality meets the success criterion for WCAG 2.2.2. Pause, Stop, Hide - Level A](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html "Read the full definition of Pause, Stop, Hide Success Criterion").
