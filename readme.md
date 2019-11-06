# Using BEM to Communicate CSS Solutions

## The Next Guy's Problem

Let's imagine we're putting together a header on a webpage. What can I put inside of a header? Let's start with something simple, like a logo and a title. So, let's imagine what this could look like in HTML.

```html
<header>
	<img src="logo.svg" />
	<h1>Title of the website</h1>
</header>
```

Now, let's imagine what my CSS would look like.

```css
header {
}

header img {
}

header h1 {
}
```

### I'm That Guy...

Sure, I could get by with this alone. However, header elements can be used to describe other relationships besides the website itself. For instance, I could use a header element to describe the header of an article or a quote or a sidebar. Imagine these headers having a different look and feel.

The CSS I've written for the main header will also affect those other headers, whcih I probably don't want. This is where you'd start thinking about using classes to solve the problem, right?

```css
.header {
}

.header-logo {
}

.header-title {
}
```

Okay, now my CSS is separated from my HTML so I can choose which headers I want my styling to apply to.

Imagine our website has two headers that look very similar to one another but are just colored differently. You're probably thinking about using the same classes to handle most of the work, right? Okay, so say I do that. Now, they look exactly the same. So, how can I change the color for this other header?

Maybe, I just write another class that's supposed to overwrite the default styling.

```css
.header {
}

.header-logo {
}

.header-title {
}

.header-dark-theme {
}
```

My `.header-dark-theme` class can override the default styling. I know this problem I'm trying to solve and I know exactly where to put it. I've figure it out, now I'm done and I can move on.

### You're the Next Guy!

6 months later, let's say you come along and maintain my css and you see these styles. You have to style another header similar to this but the HTML has been removed so you can't see how it was implemented before.

Sooooo, forget the HTML. Okay, maybe you can just ask me, right? Nope. I took a PTO day, I'm somewhere where internet is pretty spotty so who knows when I'll see your text. Now ask youself, where the heck do you put these classes? Where was the `.header-dark-theme` supposed to go?

If you don't know, are you likely to go and change my CSS? What if your changes to my code break something else? Well, you're probably going to decide it's just easier to style it from scratch, right?

Now, you've solved your problem, you're done and ready to move on buuuuut, this website still lives on. So, what about the next guy that will look at both your code and my code 6 months from now and have to maintain that?

What do you think the next guy is going to do?

## Is it CSS or is it my Names?

CSS is simple to write but it's hard to maintain. That's just for yourself if you end up being the next guy on your own project. For our peers, there's an even bigger problem - the communication.

It's not so much CSS that's at fault. It's more-so how we're writing it that can either speak clear or speak cryptic for the next guy. We have to always think of the next guy!

### The CSS That Lies

Let's take another look at my CSS solution for the header.

```css
.header {
}

.header-logo {
}

.header-title {
}

.header-dark-theme {
}
```

So, my HTML looks like this with my `.header` classes applied.

```html
<header class="header header-dark-theme">
	<img class="header-logo" src="logo.svg" />
	<h1 class="header-title">Title of the website</h1>
</header>
```

The names make sense and they're clear. They're all a part of the header, right? How could anyone possibly mess this up?

Now, what if the next guy had to rewrite the HTML from scratch but applied the classes like this?

```html
<header class="header">
	<img class="header-logo header-dark-theme" src="logo.svg" />
	<h1 class="header-title header-dark-theme">Title of the website</h1>
</header>
```

### R.I.P.

Why would the next guy do something like this? It's rather quite simple, really. Between, `.header-logo`, `.header-title` and `.header-dark-theme`, they all look like they have a relationship with the `.header` class, right?

> So you mean to tell me, if I want a dark theme... I have to put this shit on every single tag? Give me a break.

That's the assumption the next guy is going to make... and he's not wrong. He just didn't know how to use it and he couldn't rely on me or you for guidance. So, what are the chances this is going to break something? Say it did, then what does the next guy do? Think he's going to risk getting burned again?

CSS shouldn't be this hard.... and it doesn't have to be.

## Making Sense with BEM

Let's say I want to start thinking about the next guy... that next guy could also be future me, okay? How can I clearly communicate what my CSS is supposed to do?

Maybe, I could use [BEM](http://getbem.com/ "Read more about what BEM is on their documentation website") to name my classes.

```css
.header {
}

.header__logo {
}

.header__title {
}

.header--dark-theme {
}
```

Now let's break this down. What does this mean?

`.header` is my module. It's the very thing I'm styling the header with. It is the **B** in B.E.M. _a.k.a. the block_.

`.header__logo` and `.header__title` are the children of `.header`, the parent. The `__` _(double underscore)_ means there is a clear parent to child relationship. It is the **E** in B.E.M. _a.k.a. the element_.

`.header--dark-theme` is not a child of `.header` at all. Instead, it is an extension or modifier of `.header` itself. If `.header` is the parent, then think of `.header--dark-theme` as the aunt. That's what the `--` _(double hyphen)_ means. It is the **M** in B.E.M. _a.k.a. the modifier_.

Again, if we're looking at this as if it were a family tree, the `__` symbol means the child of the parent module, while the `--` symbol means sibling of the parent module. Creating structure that can communicate clearly is the whole point of BEM.

```html
<header class="header header--dark-theme">
	<img class="header__logo" src="logo.svg" />
	<h1 class="header__title">Title of the website</h1>
</header>
```

This idea of family and these two symbols is a simple idea our team can understand and make sense of. If we all practice this, our CSS has a better chance to communicate with our peers, exactly what it's meant to do.

If the next guy understands what your CSS or my CSS does, instead of creating problems, it can create opportunities in that the next guy can maintain the code by:

-   Introducing new elements to the block
-   Extending the block with a modifier
