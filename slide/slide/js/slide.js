(function (global) {
    const slide = function () {
        const delay = {
            name: "--slide-delay",
            shim: "animation-iteration-count",
            time: 1000
        };
        const team = [];
        const request = function (id) {
            return team[id];
        };

        const manager = Object.defineProperties({}, {
            assign: {
                value: function () {
                    const self = Object.create(this);

                    self.index = 0;
                    self.shim = false;
                    self.auto = false;
                    self.timer = undefined;
                    self.delay = delay.time;

                    return self;
                }
            },
            setIndex: {
                value: function (index) {
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
                value: function () {
                    const currentIndex = this.index;
                    this.position = -(currentIndex * 100);
                }
            },
            setRotation: {
                value: function () {
                    const parent = this.parent;
                    const pos = this.position;

                    if (!this.shim) {
                        parent.style.setProperty("--slide-pos", pos + "%");
                    } else {
                        const children = this.children;
                        children.forEach(function (child) {
                            child.style.transform = "translateX(" + pos + "%)";
                        });
                    }
                }
            },
            setDelay: {
                value: function () {
                    const style = getComputedStyle(this.parent);
                    let time = parseInt(style.getPropertyValue(delay.name));

                    if (Number.isNaN(time)) {
                        this.shim = true;
                        time = parseInt(style.getPropertyValue(delay.shim));
                    }

                    if (Number.isNaN(time)) {
                        time = delay.time;
                        throw "The delay amount is not a number.";
                    }

                    if (time < delay.time) {
                        time = delay.time;
                    }

                    this.delay = time;
                }
            },
            setCallback: {
                value: function (finish) {
                    if (typeof this.handleCallback === "function") {
                        this.handleCallback(this.index, finish);
                    } else {
                        finish();
                    }
                }
            },
            setTimer: {
                value: function (cb) {
                    if (this.auto) {
                        this.timer = setTimeout(cb, this.delay);
                    } else {
                        clearTimeout(this.timer);
                    }
                }
            },
            setTask: {
                value: function (index) {
                    const self = this;
                    self.setDelay();
                    self.setIndex(index);
                    self.setPosition();
                    self.setRotation();
                    self.setCallback(function () {
                        self.setTimer(function () {
                            self.setTask(self.index + 1);
                        });
                    });
                }
            }
        });

        const api = Object.defineProperties({}, {
            create: {
                value: function (id, parent, config) {
                    if (!("id" in this)) {
                        const self = Object.create(this);
                        Object.defineProperties(self, {
                            name: {
                                set: function (parent) {
                                    this.parent = parent;
                                },
                                get: function () {
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
                    } else {
                        throw "The 'api' is already constructed.";
                    }
                }
            },
            parent: {
                set: function (parent) {
                    if (typeof parent !== "object") {
                        throw "The passed 'parent' must be an element.";
                    }
                    if (parent === null) {
                        throw "The passed 'parent' could not be found.";
                    }
                    if (parent.nodeType !== 1) {
                        throw "The passed 'parent' is not an element.";
                    }

                    const worker = request(this.id);
                    worker.parent = parent;
                    this.children = parent.children;
                },
                get: function () {
                    const worker = request(this.id);
                    return worker.parent;
                }
            },
            children: {
                set: function (children) {
                    const worker = request(this.id);
                    worker.children = children || worker.parent.children;
                },
                get: function () {
                    const worker = request(this.id);
                    return worker.children;
                }
            },
            isAuto: {
                value: function () {
                    const worker = request(this.id);
                    return worker.auto;
                }
            },
            watch: {
                value: function (task) {
                    const worker = request(this.id);
                    worker.handleCallback = task.bind(this);
                }
            },
            countChildren: {
                value: function () {
                    return this.children.length;
                }
            },
            play: {
                enumerable: true,
                value: function () {
                    const worker = request(this.id);
                    this.pause();
                    worker.auto = true;
                    worker.setTask(worker.index + 1);
                }
            },
            pause: {
                enumerable: true,
                value: function () {
                    const worker = request(this.id);
                    worker.auto = false;
                    clearTimeout(worker.timer);
                }
            },
            prev: {
                enumerable: true,
                value: function () {
                    const worker = request(this.id);
                    this.pause();
                    worker.setTask(worker.index - 1);
                }
            },
            next: {
                enumerable: true,
                value: function () {
                    const worker = request(this.id);
                    this.pause();
                    worker.setTask(worker.index + 1);
                }
            },
            goto: {
                enumerable: true,
                value: function (index) {
                    if (typeof index !== "number") {
                        throw "The passed 'index' is not a number.";
                    }

                    const worker = request(this.id);
                    this.pause();
                    worker.setIndex(index);
                    worker.setTask();
                }
            }
        });

        return {
            into: function (parent, init, app) {
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

                const ui = api.create(team.length - 1, parent, options);
                return task.call(ui);
            },
            proto: api
        };
    };

    if (typeof global.Slide !== "object") {
        global.Slide = slide();
    } else {
        throw "The 'Slide' feature has already been evaluated.";
    }
}(window));