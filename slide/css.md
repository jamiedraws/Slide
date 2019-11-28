# CSS

## Overview

While Slide provides a robust and simple JavaScript API, it shines in CSS and it is with CSS that drives Slide's animation and design.

# `Slide.scss` Module

```scss
.slide {
	$this: &;

	&__into {
		// flexbox model direction set on the x-axis

		// scroll snap api set on the x-axis

		// scroll behavior configuration
	}

	&__item {
		// flexbox model

		// scroll snap alignment
	}

	&__is-hidden {
		// hidden state
	}

	&--vertical {
		#{$this}__into {
			// flexbox model direction set on the y-axis

			// scroll snap api set on the y-axis
		}
	}

	& &__into--no-scroll {
		// no manual scrolling applied when user interaction
		// requires an automatic scroll
	}
}
```

| Selector                         | Description                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.slide`                         | This block represents the container of the Slide carousel along with thumbnails and navigational controls. There are no default styles placed on this selector so the author can provide styles. |
| `.slide__into`                   | This element represents the Slide carousel itself. It is composed of three major components - the layout of the slides, the scrolling mechanism and the animation properties.                    |
| `.slide__item`                   | This element represents the Slide item.                                                                                                                                                          |
| `.slide__is-hidden`              | This element represents a hidden slide using `display: none`.                                                                                                                                    |
| `.slide img`                     | This represets the image within Slide and sets default styling rules in order for it to scale.                                                                                                   |
| `.slide--vertical`               | This modifier represents a Slide that animates on the y-axis instead of the x-axis.                                                                                                              |
| `.slide--vertical .slide__into`  | This modifier element overrides the default element by reassigning the scrolling mechanism and the flexbox layout to follow the y-axis.                                                          |
| `.slide .slide__into--no-scroll` | This element modifier locks native scrolling from the user during an interaction that requires automatic scrolling.                                                                              |

# Scrolling/Swiping Gestures

Slide uses the Scroll Snap API to apply the scroll/swipe snapping gestures between slides using the browser's native technology.

This feature is enabled only when the `slide.js` resource is not applied to Slide.

| CSS Property            | Description                                                                                                       | Default Value |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------- |
| `scroll-snap-type`      | This tells the browser to snap along the x-axis and will rest on a snap point when the scroll action is finsihed. | `x mandatory` |
| `overscroll-behavior-x` | This tells the browser how to behave when the horizontal boundary of a scrolling area is reached.                 | `contain`     |

> ### Progressive Enhancement
>
> Browsers that do not support the Scroll Snap API will gracefully fallback to it's native scrolling behavior.

# Smooth Scrolling Behavior

Slide utilizes the `scroll-behavior` property to control the animation while interacting with the thumbnails, so long as the thumbnail's `href` value points to the slide `id` value.

The `smooth` value is applied by default; however, for browsers that do not support `scroll-behavior`, the transition will instead be instant.

> ### Progressive Enhancement
>
> Browsers that do not support the `scroll-behavior` will gracefully fallback to it's native jumping behavior.
