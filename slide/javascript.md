# JavaScript

## Overview

Slide is powered by a simple JavaScript API that the author can access in the `Slide.into` method callback function. Custom properties and methods that are defined in `Slide.into` are protected from outer context interference.

If you've already followed the **Setup** tutorial and have a working Slide on your webpage, please continue reading below to learn more about how the JavaScript works.

## `Slide.into` Method

Let's take a look at the `Slide.into` method. There are two different interfaces to code in.

### Two Parameter Interface

```javascript
/*
Slide.into(
    // carousel node element
    document.querySelector(".slide__into"),

    // callback function
    function () {
        console.log(this); // `this` connects to the API
    }
);
*/
```

### Three Parameter Interface

```javascript
/*
Slide.into(
    // carousel node element
    document.querySelector(".slide__into"),

    // object initialization
    {
        property: value
    },

    // callback function
    function () {
        console.log(this); // `this` connects to the API
        console.log(this.property); /// this.property will return the value.
    }
);
*/
```

Slide can be programmed to work in either interface. The difference is that in the `three parameter interface`, an author can declare properties and methods upfront and separate them from the callback function. Whereas in the `two parameter interface`, an author would have to declare properties and methods in the same scope as the callback function.

# API

Slide's API structure utilizes an `object` to contain any properties and methods that are related to the individual carousel on the shallow-level and any properties and methods that are shareable amongst carousels on the prototype.

```javascript
/*
{
    properties: value
    __proto__: {
        methods: value
    }
}
*/
```

This architecture allows Slide to protect carousel-specific properties and methods from conflicting with other carousel-specific properties and methods through separation, while providing access to shareable properties and methods through the prototype.

Let's take a look at the default properties and methods.

# API Properties (Non-Enumerable)

```javascript
/*
{
    id: number,
    name: "string",
    parent: ELEMENT_NODE,
    children: HTMLCollection
}
*/
```

By default, the shallow-level properties in Slide's API are not enumerable for good reason. They are not meant to be either mutated or removed by an author, so they are immutable. However, for debugging purposes, an author can read them if necessary.

| Property   | Description                                                                                                                                                                                                                                                                                                                                                             | Example                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `id`       | This is Slide's numeric ID. Each Slide will have a unique ID assigned to them where no ID number is the same number. Each assigned ID number will start at `0` and then increment by 1.                                                                                                                                                                                 | `id: 0`                         |
| `name`     | This is Slide's namespace. It's not an alternative for the ID but it should be treated as if it were unique. The namespace can be used as a prefix to assign ID's to a subset of dynamic elements that share a relationship to a particular Slide. For example, the namespace can be useful when adding dynmaic slides and thumbnails to a carousel.                    | `name: "alpha"`                 |
| `parent`   | This is the Slide carousel node element itself. After linking the node element through the `Slide.into` method, the node element becomes accessible through this property. While the `parent` cannot be deleted by an author, it can be mutated but only into another node element. Slide will throw an error if any other data type replaces the current node element. | `parent: div#alpha.slide__into` |
| `children` | This represents the direct child nodes of the `parent` node element. Like with `parent`, the `children` property cannot be deleted by an author but can be mutated. Mutation is not recommended.                                                                                                                                                                        | `children: HTMLCollection(3)`   |

# API Methods (Enumerable)

The following methods below are accessible in Slide's prototype. Each method is immutable and enumerable. An author can invoke them but cannot mutate them or delete them.

```javascript
/*
{
    next: function () {...},
    prev: function () {...},
    play: function () {...},
    pause: function () {...},
    goto: function (index) {...}
}
*/
```

| Method  | Description                                                                                                                           | Example         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `next`  | This advances the carousel one slide forward. On the last slide, invoking the `next` method will advance back to the first slide.     | `this.next();`  |
| `prev`  | This advances the carousel one slide backward. On the first slide, invoking the `prev` method will advance forward to the last slide. | `this.prev();`  |
| `play`  | This advances the carousel one slide forward, like `next`, and repeats the task on each `delay`.                                      | `this.play();`  |
| `pause` | This pauses on the current slide.                                                                                                     | `this.pause();` |
| `goto`  | This advances the carousel to a particular slide using it's index `number`.                                                           | `this.goto();`  |

# API Methods (Non-Enumerable)

The following methods below are accessible on Slide's prototype. Each method is immutable and non-enumerable. While an author can invoke them, they cannot be mutated, deleted or exposed.

```javascript
/*
{
    watch: function (task) {...},
    countChildren: function () {...},
    getDelay: function () {...},
    isAuto: function () {...}
}
*/
```

| Method          | Description                                                                                                                                                                                                                                                                     | Example                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `watch`         | This watches Slide's rotation cycle and invokes a callback function on each rotation. The callback function is defined by the author. Slide will return the current slide index `number` and a `function` called finish, which must be invoked in order to finish the rotation. | `this.watch(function (index, finish) {...});` |
| `countChildren` | This returns the total number of slides in a carousel, as a `number`.                                                                                                                                                                                                           | `this.countChildren();`                       |
| `getDelay`      | This returns the delay amount expressed in milliseconds, as a `number`.                                                                                                                                                                                                         | `this.getDelay();`                            |
| `isAuto`        | This returns an answer to whether Slide is automatically rotating each slide or not. For example, if the `play` method has been invoked, `isAuto` will return a `true` boolean. Otherwise, it will return a `false` boolean.                                                    | `this.isAuto();`                              |

# API Errors

Slide enforces protection against damaging the integrity of the program by throwing errors when the flow of the program has been abused by the author.

Let's take a look below at the list of error codes, their log and their description.

| Code | Log                                               | Description                                                                                                                                                                                                                           |
| ---- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `E1` | `The 'Slide' feature has already been evaluated.` | Slide will throw this error if the author has more than one `slide.js` resource in the document.                                                                                                                                      |
| `E2` | `The passed 'parent' must be an element.`         | Slide will throw this error when an author attempts to set the value of `parent` with a data type that is not an `node element`. Slide will conduct a `typeof object` condition against `parent` where it expects `true`.             |
| `E3` | `The passed 'parent' could not be found.`         | Slide will throw this error when an author attempts to set the value of `parent` with a `node element` that does not exist in the document. Slide will conduct an equality `null` condition against `parent` where it expects `true`. |
| `E4` | `The passed 'parent' is not an element.`          | Slide will throw this error when an author attempts to set the value of `parent` with a `node type` that is not an `element`. Slide will conduct an inequality `node type of 1` condition against `parent` where it expects `true`.   |
| `E5` | `The passed 'index' is not a number.`             | Slide will throw this error when an author attempts to invoke the `goto` method and either ignore the parameter or include a parameter that is not a `number`.                                                                        |
| `E6` | `The delay amount is not a number.`               | Slide will throw this error when an author attempts to set the `delay` value to a data type that is not a `number`.                                                                                                                   |

# `Slide.proto` Method

An author can build on top of Slide's API with custom properties and methods by defining them as a `object literal` in the `Slide.proto` method.

```javascript
/*
Slide.proto({
    customMethod: value,
    customProperty: value
});
*/
```

Slide will receive this object and assign them to the API and then ensure the properties and methods are immutable. This way, the author's custom functionality will have the same level of protection as the default API properties and methods.

Inside each custom method, the author can access other shareable properties and methods that also live in the prototype. This can create powerful functionality.

## Good Example

For example, an author can define a method called `slideName` and pass it into the API.

```javascript
Slide.proto({
	slideName: function() {
		console.log("Hello, " + this.name);
	}
});
```

Then, from within the `Slide.into` callback function, that custom method can be invoked like so.

```javascript
Slide.into(document.querySelector(".slide__into"), function() {
	this.slideName();
});
```

On the console, a message should say `Hello, alpha`.

## Bad Example

However, an author cannot define a method that has already been defined either by a default property and method or a custom property and method.

```javascript
Slide.proto({
	next: function() {
		/* This is dangerous as it would override the default functionality to advance a slide forward. */
	}
});
```

Fortunately, Slide will throw an error if the author attempts to redefine a property or method.

On the console, a messsage should say `Uncaught TypeError: Cannot redefine property: next`.
