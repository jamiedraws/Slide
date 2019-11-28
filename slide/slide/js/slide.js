(function(global) {
	const slide = function() {
		const rules = {
			delay: 5000,
			noScroll: "slide__into--no-scroll"
		};
		const team = [];
		const request = function(id) {
			return team[id];
		};

		const manager = Object.defineProperties(
			{},
			{
				create: {
					value: function(api, id, parent, config) {
						const self = Object.create(api);

						Object.defineProperties(self, {
							name: {
								set: function(parent) {
									this.parent = parent;
								},
								get: function() {
									return this.parent.id;
								}
							},
							id: {
								value: id
							}
						});

						self.name = parent;

						if (typeof config === "object") {
							for (var option in config) {
								self[option] = config[option];
							}
						}

						return self;
					}
				},
				assign: {
					value: function() {
						const self = Object.create(this);

						self.index = 0;
						self.shim = false;
						self.auto = false;
						self.timer = undefined;
						self.delay = rules.delay;

						return self;
					}
				},
				setScroll: {
					value: function(scroll) {
						if (scroll) {
							this.parent.classList.add(rules.noScroll);
						} else {
							this.parent.classList.remove(rules.noScroll);
						}
					}
				},
				setIndex: {
					value: function(index) {
						const children = this.children.length;
						if (typeof index === "number") {
							this.index = index;
						}

						if (this.index === children) {
							this.index = 0;
						} else if (this.index < 0) {
							this.index = children - 1;
						}
					}
				},
				setPosition: {
					value: function() {
						const currentIndex = this.index;
						this.position = -(currentIndex * 100);
					}
				},
				setRotation: {
					value: function() {
						const slide = this.children[this.index];
						slide.scrollIntoView();
					}
				},
				setDelay: {
					value: function(time) {
						const illegal = typeof time !== "number" || time < rules.delay;
						if (illegal) {
							time = this.delay;
						}

						this.delay = time;
					}
				},
				setCallback: {
					value: function(finish) {
						if (typeof this.handleCallback === "function") {
							this.handleCallback(this.index, finish);
						} else {
							finish();
						}
					}
				},
				setTimer: {
					value: function(cb) {
						if (this.auto) {
							this.timer = setTimeout(cb, this.delay);
						} else {
							clearTimeout(this.timer);
						}
					}
				},
				setTask: {
					value: function(index) {
						const self = this;
						self.setDelay();
						self.setIndex(index);
						self.setPosition();
						self.setRotation();
						self.setCallback(function() {
							self.setTimer(function() {
								self.setTask(self.index + 1);
							});
						});
					}
				}
			}
		);

		const api = Object.defineProperties(
			{},
			{
				parent: {
					set: function(parent) {
						if (typeof parent !== "object") {
							throw "E2 :: The passed 'parent' must be an element.";
						}
						if (parent === null) {
							throw "E3 :: The passed 'parent' could not be found.";
						}
						if (parent.nodeType !== 1) {
							throw "E4 :: The passed 'parent' is not an element.";
						}

						const worker = request(this.id);
						worker.parent = parent;
						this.children = parent.children;
					},
					get: function() {
						const worker = request(this.id);
						return worker.parent;
					}
				},
				children: {
					set: function() {
						const worker = request(this.id);
						worker.children = worker.parent.children;
					},
					get: function() {
						const worker = request(this.id);
						return worker.children;
					}
				},
				isAuto: {
					value: function() {
						const worker = request(this.id);
						return worker.auto;
					}
				},
				watch: {
					value: function(task) {
						const worker = request(this.id);
						worker.handleCallback = task.bind(this);
					}
				},
				countChildren: {
					value: function() {
						return this.children.length;
					}
				},
				getDelay: {
					value: function(time) {
						const worker = request(this.id);
						worker.setDelay(time);
						return worker.delay;
					}
				},
				play: {
					enumerable: true,
					value: function(reverse) {
						const worker = request(this.id);
						this.pause(true);
						worker.auto = true;
						worker.setTask(worker.index + 1);
					}
				},
				pause: {
					enumerable: true,
					value: function(scroll) {
						const worker = request(this.id);
						worker.auto = false;
						worker.setScroll(scroll);
						clearTimeout(worker.timer);
					}
				},
				prev: {
					enumerable: true,
					value: function() {
						const worker = request(this.id);
						this.pause(true);
						worker.setTask(worker.index - 1);
					}
				},
				next: {
					enumerable: true,
					value: function() {
						const worker = request(this.id);
						this.pause(true);
						worker.setTask(worker.index + 1);
					}
				},
				goto: {
					enumerable: true,
					value: function(index) {
						if (typeof index !== "number") {
							throw "E5 :: The passed 'index' is not a number.";
						}

						const worker = request(this.id);
						this.pause();
						worker.setIndex(index);
						worker.setTask();
					}
				}
			}
		);

		const interface = Object.defineProperties(
			{},
			{
				into: {
					value: function(parent, init, app) {
						const worker = manager.assign();
						let task, options;
						team.push(worker);

						if (typeof init === "function") {
							task = init;
						}

						if (typeof init === "object") {
							task = app;
							options = init;
						} else if (typeof app === "object") {
							options = app;
						} else {
							options = {};
						}

						const ui = manager.create(api, team.length - 1, parent, options);
						return task.call(ui);
					}
				},
				proto: {
					value: function(parameters) {
						Object.create(api, parameters);
						Object.keys(parameters).forEach(function(parameter) {
							Object.defineProperty(api, parameter, {
								writable: false,
								configurable: false,
								enumerable: true,
								value: parameters[parameter]
							});
						});
					}
				}
			}
		);

		return interface;
	};

	if (typeof global.Slide !== "object") {
		Object.defineProperty(global, "Slide", {
			value: slide(),
			writable: false,
			configurable: false
		});
	} else {
		throw "E1 :: The 'Slide' feature has already been evaluated.";
	}
})(window);
