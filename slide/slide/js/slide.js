(function(global) {
    const generate = function(properties, o) {
        return Object.defineProperties(o || {}, properties);
    };

    const toArray = function(collection) {
        const store = [];
        const ar = store.slice.call(collection);
        return ar;
    };

    const slide = generate({
        defaults: {
            value: generate({
                delay: {
                    value: 5000
                },
                noScroll: {
                    value: "slide__into--no-scroll"
                },
                error: {
                    value: "The passed error code could not be found."
                }
            })
        },
        docs: {
            value: generate({
                error: {
                    value:
                        "https://github.com/jamiedraws/Slide/blob/master/slide/javascript.md#api-errors"
                }
            })
        },
        errors: {
            value: generate({
                "ERR-E": {
                    value: "The passed 'element' must be an element."
                },
                "ERR-P": {
                    value: "The passed 'element' could not be found."
                },
                "ERR-N": {
                    value: "The passed 'element' is not a node element."
                },
                "ERR-X": {
                    value: "The passed 'index' is not a number."
                },
                "ERR-M": {
                    value:
                        "The passed error 'code' or 'message' is not a string."
                },
                "ERR-C": {
                    value: "The passed error 'code' is not a string."
                }
            })
        },
        team: {
            value: []
        },
        request: {
            value: function(id) {
                return this.team[id];
            }
        },
        observer: {
            value: function(parent, children, cb) {
                if (window.hasOwnProperty("IntersectionObserver")) {
                    const io = new IntersectionObserver(
                        function(entries) {
                            entries.forEach(function(entry) {
                                if (
                                    entry.intersectionRatio > 0 &&
                                    entry.isIntersecting
                                ) {
                                    const items = toArray(children);
                                    const index = items.indexOf(entry.target);
                                    cb(index);
                                }
                            });
                        },
                        {
                            root: parent,
                            rootMargin: "0px",
                            threshold: 0.9
                        }
                    );

                    return function(children) {
                        const items = toArray(children);
                        items.forEach(function(item) {
                            io.observe(item);
                        });
                    };
                } else {
                    return function() {
                        const noScroll = slide.defaults.noScroll;
                        this.shim = true;
                        this.parent.classList.add(noScroll);
                    };
                }
            }
        },
        manager: {
            value: generate({
                config: {
                    value: function(options) {
                        const self = this;

                        if (typeof options === "object") {
                            Object.keys(options).forEach(function(option) {
                                Object.defineProperty(self, option, {
                                    enumerable: true,
                                    value: options[option]
                                });
                            });
                        }
                    }
                },
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

                        this.config.call(self, config);

                        return self;
                    }
                },
                assign: {
                    value: function() {
                        const self = Object.create(this);

                        self.index = 0;
                        self.shim = false;
                        self.auto = false;
                        self.timer = 0;
                        self.delay = slide.defaults.delay;

                        return self;
                    }
                },
                observer: {
                    value: function(parent, children) {
                        const self = this;
                        return slide.observer(parent, children, function(
                            index
                        ) {
                            self.setIndex(index);
                            self.setCallback();
                        });
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
                setRotation: {
                    value: function() {
                        const item = this.children[this.index];
                        item.scrollIntoView();
                    }
                },
                setDelay: {
                    value: function(time) {
                        const illegal =
                            typeof time !== "number" ||
                            time < slide.defaults.delay;
                        if (illegal) {
                            time = this.delay;
                        }

                        this.delay = time;
                    }
                },
                setCallback: {
                    value: function() {
                        if (typeof this.handleCallback === "function") {
                            this.handleCallback(this.index);
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
                setShim: {
                    value: function(cb) {
                        if (this.shim) {
                            this.setCallback(cb);
                        } else {
                            cb();
                        }
                    }
                },
                setTask: {
                    value: function(index) {
                        const self = this;

                        self.setDelay();
                        self.setIndex(index);
                        self.setRotation();
                        self.setShim(function() {
                            self.setTimer(function() {
                                self.setTask(self.index + 1);
                            });
                        });
                    }
                }
            })
        },
        api: {
            value: generate({
                parent: {
                    set: function(parent) {
                        this.validateNodeElement(parent);

                        const worker = slide.request(this.id);

                        worker.parent = parent;
                        worker.observe = worker.observer(
                            worker.parent,
                            parent.children
                        );

                        this.children = parent.children;
                    },
                    get: function() {
                        const worker = slide.request(this.id);
                        return worker.parent;
                    }
                },
                validateNodeElement: {
                    value: function(element) {
                        if (typeof element !== "object") {
                            this.getError("ERR-E");
                        }
                        if (element === null) {
                            this.getError("ERR-P");
                        }
                        if (element.nodeType !== 1) {
                            this.getError("ERR-N");
                        }
                        return true;
                    }
                },
                children: {
                    set: function() {
                        const worker = slide.request(this.id);
                        worker.children = worker.parent.children;
                        worker.observe(worker.children);
                    },
                    get: function() {
                        const worker = slide.request(this.id);
                        return worker.children;
                    }
                },
                isAuto: {
                    value: function() {
                        const worker = slide.request(this.id);
                        return worker.auto;
                    }
                },
                watch: {
                    value: function(task) {
                        const worker = slide.request(this.id);
                        worker.handleCallback = task.bind(this);
                    }
                },
                countChildren: {
                    value: function() {
                        return this.children.length;
                    }
                },
                getDelay: {
                    value: function() {
                        const worker = slide.request(this.id);
                        return worker.delay;
                    }
                },
                setDelay: {
                    value: function(delay) {
                        const worker = slide.request(this.id);
                        worker.setDelay(delay);
                    }
                },
                setError: {
                    value: function(code, message) {
                        if (
                            typeof code === "string" &&
                            typeof message === "string"
                        ) {
                            Object.defineProperty(slide.errors, code, {
                                value: message
                            });
                        } else {
                            this.getError("ERR-M");
                        }
                    }
                },
                getError: {
                    value: function(code) {
                        if (typeof code !== "string") {
                            code = "ERR-C";
                        }

                        const error =
                            slide.errors[code] || slide.defaults.error;

                        throw {
                            code: code,
                            error: error,
                            help: slide.docs.error
                        };
                    }
                },
                hasError: {
                    value: function(code) {
                        return slide.errors.hasOwnProperty(code);
                    }
                },
                config: {
                    value: function(options) {
                        const worker = slide.request(this.id);
                        worker.config.call(this, options);
                    }
                },
                play: {
                    enumerable: true,
                    value: function() {
                        const worker = slide.request(this.id);
                        this.pause();
                        worker.auto = true;
                        worker.setTask(worker.index + 1);
                    }
                },
                pause: {
                    enumerable: true,
                    value: function() {
                        const worker = slide.request(this.id);
                        worker.auto = false;
                        clearTimeout(worker.timer);
                    }
                },
                prev: {
                    enumerable: true,
                    value: function() {
                        const worker = slide.request(this.id);
                        this.pause();
                        worker.setTask(worker.index - 1);
                    }
                },
                next: {
                    enumerable: true,
                    value: function() {
                        const worker = slide.request(this.id);
                        this.pause();
                        worker.setTask(worker.index + 1);
                    }
                },
                goto: {
                    enumerable: true,
                    value: function(index) {
                        if (typeof index !== "number") {
                            this.getError("ERR-X");
                        }

                        const worker = slide.request(this.id);
                        this.pause();
                        worker.setIndex(index);
                        worker.setTask();
                    }
                }
            })
        },
        interface: {
            value: generate({
                into: {
                    value: function(parent, init, app) {
                        const worker = slide.manager.assign();
                        let task = app;
                        let options = {};

                        slide.team.push(worker);

                        if (typeof init === "function") {
                            task = init;
                        }

                        if (typeof init === "object") {
                            options = init;
                        } else if (typeof app === "object") {
                            options = app;
                        }

                        const ui = slide.manager.create(
                            slide.api,
                            slide.team.length - 1,
                            parent,
                            options
                        );

                        return task.call(ui);
                    }
                },
                proto: {
                    value: function(parameters) {
                        if (typeof parameters === "object") {
                            Object.create(slide.api, parameters);
                            Object.keys(parameters).forEach(function(
                                parameter
                            ) {
                                Object.defineProperty(slide.api, parameter, {
                                    writable: false,
                                    configurable: false,
                                    enumerable: true,
                                    value: parameters[parameter]
                                });
                            });
                        }
                    }
                }
            })
        }
    });

    if (typeof global.Slide !== "object") {
        Object.defineProperty(global, "Slide", {
            value: slide.interface,
            writable: false,
            configurable: false
        });
        Object.freeze(global.Slide);
    }
})(window);
