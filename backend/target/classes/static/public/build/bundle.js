
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function _mergeNamespaces(n, m) {
        m.forEach(function (e) {
            e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
                if (k !== 'default' && !(k in n)) {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        });
        return Object.freeze(n);
    }

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    /**
     * List of attributes that should always be set through the attr method,
     * because updating them through the property setter doesn't work reliably.
     * In the example of `width`/`height`, the problem is that the setter only
     * accepts numeric values, but the attribute can also be set to a string like `50%`.
     * If this list becomes too big, rethink this approach.
     */
    const always_set_through_set_attribute = ['width', 'height'];
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately before the component is updated after any state change.
     *
     * The first time the callback runs will be before the initial `onMount`
     *
     * https://svelte.dev/docs#run-time-svelte-beforeupdate
     */
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function getAugmentedNamespace(n) {
      if (n.__esModule) return n;
      var f = n.default;
    	if (typeof f == "function") {
    		var a = function a () {
    			if (this instanceof a) {
    				var args = [null];
    				args.push.apply(args, arguments);
    				var Ctor = Function.bind.apply(f, args);
    				return new Ctor();
    			}
    			return f.apply(this, arguments);
    		};
    		a.prototype = f.prototype;
      } else a = {};
      Object.defineProperty(a, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    var feather$2 = {exports: {}};

    (function (module, exports) {
    	(function webpackUniversalModuleDefinition(root, factory) {
    		module.exports = factory();
    	})(typeof self !== 'undefined' ? self : commonjsGlobal, function() {
    	return /******/ (function(modules) { // webpackBootstrap
    	/******/ 	// The module cache
    	/******/ 	var installedModules = {};
    	/******/
    	/******/ 	// The require function
    	/******/ 	function __webpack_require__(moduleId) {
    	/******/
    	/******/ 		// Check if module is in cache
    	/******/ 		if(installedModules[moduleId]) {
    	/******/ 			return installedModules[moduleId].exports;
    	/******/ 		}
    	/******/ 		// Create a new module (and put it into the cache)
    	/******/ 		var module = installedModules[moduleId] = {
    	/******/ 			i: moduleId,
    	/******/ 			l: false,
    	/******/ 			exports: {}
    	/******/ 		};
    	/******/
    	/******/ 		// Execute the module function
    	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    	/******/
    	/******/ 		// Flag the module as loaded
    	/******/ 		module.l = true;
    	/******/
    	/******/ 		// Return the exports of the module
    	/******/ 		return module.exports;
    	/******/ 	}
    	/******/
    	/******/
    	/******/ 	// expose the modules object (__webpack_modules__)
    	/******/ 	__webpack_require__.m = modules;
    	/******/
    	/******/ 	// expose the module cache
    	/******/ 	__webpack_require__.c = installedModules;
    	/******/
    	/******/ 	// define getter function for harmony exports
    	/******/ 	__webpack_require__.d = function(exports, name, getter) {
    	/******/ 		if(!__webpack_require__.o(exports, name)) {
    	/******/ 			Object.defineProperty(exports, name, {
    	/******/ 				configurable: false,
    	/******/ 				enumerable: true,
    	/******/ 				get: getter
    	/******/ 			});
    	/******/ 		}
    	/******/ 	};
    	/******/
    	/******/ 	// define __esModule on exports
    	/******/ 	__webpack_require__.r = function(exports) {
    	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    	/******/ 	};
    	/******/
    	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
    	/******/ 	__webpack_require__.n = function(module) {
    	/******/ 		var getter = module && module.__esModule ?
    	/******/ 			function getDefault() { return module['default']; } :
    	/******/ 			function getModuleExports() { return module; };
    	/******/ 		__webpack_require__.d(getter, 'a', getter);
    	/******/ 		return getter;
    	/******/ 	};
    	/******/
    	/******/ 	// Object.prototype.hasOwnProperty.call
    	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    	/******/
    	/******/ 	// __webpack_public_path__
    	/******/ 	__webpack_require__.p = "";
    	/******/
    	/******/
    	/******/ 	// Load entry module and return exports
    	/******/ 	return __webpack_require__(__webpack_require__.s = 0);
    	/******/ })
    	/************************************************************************/
    	/******/ ({

    	/***/ "./dist/icons.json":
    	/*!*************************!*\
    	  !*** ./dist/icons.json ***!
    	  \*************************/
    	/*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, aperture, archive, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, award, bar-chart-2, bar-chart, battery-charging, battery, bell-off, bell, bluetooth, bold, book-open, book, bookmark, box, briefcase, calendar, camera-off, camera, cast, check-circle, check-square, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, chrome, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-off, cloud-rain, cloud-snow, cloud, code, codepen, codesandbox, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, divide-circle, divide-square, divide, dollar-sign, download-cloud, download, dribbble, droplet, edit-2, edit-3, edit, external-link, eye-off, eye, facebook, fast-forward, feather, figma, file-minus, file-plus, file-text, file, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, grid, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, info, instagram, italic, key, layers, layout, life-buoy, link-2, link, linkedin, list, loader, lock, log-in, log-out, mail, map-pin, map, maximize-2, maximize, meh, menu, message-circle, message-square, mic-off, mic, minimize-2, minimize, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation-2, navigation, octagon, package, paperclip, pause-circle, pause, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, pie-chart, play-circle, play, plus-circle, plus-square, plus, pocket, power, printer, radio, refresh-ccw, refresh-cw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, server, settings, share-2, share, shield-off, shield, shopping-bag, shopping-cart, shuffle, sidebar, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, square, star, stop-circle, sun, sunrise, sunset, table, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash-2, trash, trello, trending-down, trending-up, triangle, truck, tv, twitch, twitter, type, umbrella, underline, unlock, upload-cloud, upload, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume-1, volume-2, volume-x, volume, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
    	/***/ (function(module) {

    	module.exports = {"activity":"<polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline>","airplay":"<path d=\"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1\"></path><polygon points=\"12 15 17 21 7 21 12 15\"></polygon>","alert-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line>","alert-octagon":"<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line>","alert-triangle":"<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>","align-center":"<line x1=\"18\" y1=\"10\" x2=\"6\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"18\" y1=\"18\" x2=\"6\" y2=\"18\"></line>","align-justify":"<line x1=\"21\" y1=\"10\" x2=\"3\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"21\" y1=\"18\" x2=\"3\" y2=\"18\"></line>","align-left":"<line x1=\"17\" y1=\"10\" x2=\"3\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"17\" y1=\"18\" x2=\"3\" y2=\"18\"></line>","align-right":"<line x1=\"21\" y1=\"10\" x2=\"7\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"21\" y1=\"18\" x2=\"7\" y2=\"18\"></line>","anchor":"<circle cx=\"12\" cy=\"5\" r=\"3\"></circle><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"8\"></line><path d=\"M5 12H2a10 10 0 0 0 20 0h-3\"></path>","aperture":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"14.31\" y1=\"8\" x2=\"20.05\" y2=\"17.94\"></line><line x1=\"9.69\" y1=\"8\" x2=\"21.17\" y2=\"8\"></line><line x1=\"7.38\" y1=\"12\" x2=\"13.12\" y2=\"2.06\"></line><line x1=\"9.69\" y1=\"16\" x2=\"3.95\" y2=\"6.06\"></line><line x1=\"14.31\" y1=\"16\" x2=\"2.83\" y2=\"16\"></line><line x1=\"16.62\" y1=\"12\" x2=\"10.88\" y2=\"21.94\"></line>","archive":"<polyline points=\"21 8 21 21 3 21 3 8\"></polyline><rect x=\"1\" y=\"3\" width=\"22\" height=\"5\"></rect><line x1=\"10\" y1=\"12\" x2=\"14\" y2=\"12\"></line>","arrow-down-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"8 12 12 16 16 12\"></polyline><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line>","arrow-down-left":"<line x1=\"17\" y1=\"7\" x2=\"7\" y2=\"17\"></line><polyline points=\"17 17 7 17 7 7\"></polyline>","arrow-down-right":"<line x1=\"7\" y1=\"7\" x2=\"17\" y2=\"17\"></line><polyline points=\"17 7 17 17 7 17\"></polyline>","arrow-down":"<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><polyline points=\"19 12 12 19 5 12\"></polyline>","arrow-left-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 8 8 12 12 16\"></polyline><line x1=\"16\" y1=\"12\" x2=\"8\" y2=\"12\"></line>","arrow-left":"<line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"></line><polyline points=\"12 19 5 12 12 5\"></polyline>","arrow-right-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 16 16 12 12 8\"></polyline><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","arrow-right":"<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline>","arrow-up-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"16 12 12 8 8 12\"></polyline><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"8\"></line>","arrow-up-left":"<line x1=\"17\" y1=\"17\" x2=\"7\" y2=\"7\"></line><polyline points=\"7 17 7 7 17 7\"></polyline>","arrow-up-right":"<line x1=\"7\" y1=\"17\" x2=\"17\" y2=\"7\"></line><polyline points=\"7 7 17 7 17 17\"></polyline>","arrow-up":"<line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"5\"></line><polyline points=\"5 12 12 5 19 12\"></polyline>","at-sign":"<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94\"></path>","award":"<circle cx=\"12\" cy=\"8\" r=\"7\"></circle><polyline points=\"8.21 13.89 7 23 12 20 17 23 15.79 13.88\"></polyline>","bar-chart-2":"<line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"></line><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"></line><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"></line>","bar-chart":"<line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"10\"></line><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"4\"></line><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"16\"></line>","battery-charging":"<path d=\"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19\"></path><line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line><polyline points=\"11 6 7 12 13 12 9 18\"></polyline>","battery":"<rect x=\"1\" y=\"6\" width=\"18\" height=\"12\" rx=\"2\" ry=\"2\"></rect><line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line>","bell-off":"<path d=\"M13.73 21a2 2 0 0 1-3.46 0\"></path><path d=\"M18.63 13A17.89 17.89 0 0 1 18 8\"></path><path d=\"M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14\"></path><path d=\"M18 8a6 6 0 0 0-9.33-5\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","bell":"<path d=\"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9\"></path><path d=\"M13.73 21a2 2 0 0 1-3.46 0\"></path>","bluetooth":"<polyline points=\"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5\"></polyline>","bold":"<path d=\"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path><path d=\"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path>","book-open":"<path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"></path><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"></path>","book":"<path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"></path><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"></path>","bookmark":"<path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"></path>","box":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>","briefcase":"<rect x=\"2\" y=\"7\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"></path>","calendar":"<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>","camera-off":"<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56\"></path>","camera":"<path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path><circle cx=\"12\" cy=\"13\" r=\"4\"></circle>","cast":"<path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\"></path><line x1=\"2\" y1=\"20\" x2=\"2.01\" y2=\"20\"></line>","check-circle":"<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path><polyline points=\"22 4 12 14.01 9 11.01\"></polyline>","check-square":"<polyline points=\"9 11 12 14 22 4\"></polyline><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"></path>","check":"<polyline points=\"20 6 9 17 4 12\"></polyline>","chevron-down":"<polyline points=\"6 9 12 15 18 9\"></polyline>","chevron-left":"<polyline points=\"15 18 9 12 15 6\"></polyline>","chevron-right":"<polyline points=\"9 18 15 12 9 6\"></polyline>","chevron-up":"<polyline points=\"18 15 12 9 6 15\"></polyline>","chevrons-down":"<polyline points=\"7 13 12 18 17 13\"></polyline><polyline points=\"7 6 12 11 17 6\"></polyline>","chevrons-left":"<polyline points=\"11 17 6 12 11 7\"></polyline><polyline points=\"18 17 13 12 18 7\"></polyline>","chevrons-right":"<polyline points=\"13 17 18 12 13 7\"></polyline><polyline points=\"6 17 11 12 6 7\"></polyline>","chevrons-up":"<polyline points=\"17 11 12 6 7 11\"></polyline><polyline points=\"17 18 12 13 7 18\"></polyline>","chrome":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"21.17\" y1=\"8\" x2=\"12\" y2=\"8\"></line><line x1=\"3.95\" y1=\"6.06\" x2=\"8.54\" y2=\"14\"></line><line x1=\"10.88\" y1=\"21.94\" x2=\"15.46\" y2=\"14\"></line>","circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>","clipboard":"<path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"></path><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\" ry=\"1\"></rect>","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 6 12 12 16 14\"></polyline>","cloud-drizzle":"<line x1=\"8\" y1=\"19\" x2=\"8\" y2=\"21\"></line><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"15\"></line><line x1=\"16\" y1=\"19\" x2=\"16\" y2=\"21\"></line><line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"15\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"17\"></line><path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>","cloud-lightning":"<path d=\"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9\"></path><polyline points=\"13 11 9 17 15 17 11 23\"></polyline>","cloud-off":"<path d=\"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","cloud-rain":"<line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"21\"></line><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"21\"></line><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"23\"></line><path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>","cloud-snow":"<path d=\"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25\"></path><line x1=\"8\" y1=\"16\" x2=\"8.01\" y2=\"16\"></line><line x1=\"8\" y1=\"20\" x2=\"8.01\" y2=\"20\"></line><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line><line x1=\"12\" y1=\"22\" x2=\"12.01\" y2=\"22\"></line><line x1=\"16\" y1=\"16\" x2=\"16.01\" y2=\"16\"></line><line x1=\"16\" y1=\"20\" x2=\"16.01\" y2=\"20\"></line>","cloud":"<path d=\"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z\"></path>","code":"<polyline points=\"16 18 22 12 16 6\"></polyline><polyline points=\"8 6 2 12 8 18\"></polyline>","codepen":"<polygon points=\"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2\"></polygon><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"15.5\"></line><polyline points=\"22 8.5 12 15.5 2 8.5\"></polyline><polyline points=\"2 15.5 12 8.5 22 15.5\"></polyline><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"8.5\"></line>","codesandbox":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"7.5 4.21 12 6.81 16.5 4.21\"></polyline><polyline points=\"7.5 19.79 7.5 14.6 3 12\"></polyline><polyline points=\"21 12 16.5 14.6 16.5 19.79\"></polyline><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>","coffee":"<path d=\"M18 8h1a4 4 0 0 1 0 8h-1\"></path><path d=\"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z\"></path><line x1=\"6\" y1=\"1\" x2=\"6\" y2=\"4\"></line><line x1=\"10\" y1=\"1\" x2=\"10\" y2=\"4\"></line><line x1=\"14\" y1=\"1\" x2=\"14\" y2=\"4\"></line>","columns":"<path d=\"M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18\"></path>","command":"<path d=\"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z\"></path>","compass":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon>","copy":"<rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>","corner-down-left":"<polyline points=\"9 10 4 15 9 20\"></polyline><path d=\"M20 4v7a4 4 0 0 1-4 4H4\"></path>","corner-down-right":"<polyline points=\"15 10 20 15 15 20\"></polyline><path d=\"M4 4v7a4 4 0 0 0 4 4h12\"></path>","corner-left-down":"<polyline points=\"14 15 9 20 4 15\"></polyline><path d=\"M20 4h-7a4 4 0 0 0-4 4v12\"></path>","corner-left-up":"<polyline points=\"14 9 9 4 4 9\"></polyline><path d=\"M20 20h-7a4 4 0 0 1-4-4V4\"></path>","corner-right-down":"<polyline points=\"10 15 15 20 20 15\"></polyline><path d=\"M4 4h7a4 4 0 0 1 4 4v12\"></path>","corner-right-up":"<polyline points=\"10 9 15 4 20 9\"></polyline><path d=\"M4 20h7a4 4 0 0 0 4-4V4\"></path>","corner-up-left":"<polyline points=\"9 14 4 9 9 4\"></polyline><path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"></path>","corner-up-right":"<polyline points=\"15 14 20 9 15 4\"></polyline><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path>","cpu":"<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\"></rect><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect><line x1=\"9\" y1=\"1\" x2=\"9\" y2=\"4\"></line><line x1=\"15\" y1=\"1\" x2=\"15\" y2=\"4\"></line><line x1=\"9\" y1=\"20\" x2=\"9\" y2=\"23\"></line><line x1=\"15\" y1=\"20\" x2=\"15\" y2=\"23\"></line><line x1=\"20\" y1=\"9\" x2=\"23\" y2=\"9\"></line><line x1=\"20\" y1=\"14\" x2=\"23\" y2=\"14\"></line><line x1=\"1\" y1=\"9\" x2=\"4\" y2=\"9\"></line><line x1=\"1\" y1=\"14\" x2=\"4\" y2=\"14\"></line>","credit-card":"<rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\" ry=\"2\"></rect><line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"></line>","crop":"<path d=\"M6.13 1L6 16a2 2 0 0 0 2 2h15\"></path><path d=\"M1 6.13L16 6a2 2 0 0 1 2 2v15\"></path>","crosshair":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line>","database":"<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"></ellipse><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"></path><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"></path>","delete":"<path d=\"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z\"></path><line x1=\"18\" y1=\"9\" x2=\"12\" y2=\"15\"></line><line x1=\"12\" y1=\"9\" x2=\"18\" y2=\"15\"></line>","disc":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>","divide-circle":"<line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line><circle cx=\"12\" cy=\"12\" r=\"10\"></circle>","divide-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line>","divide":"<circle cx=\"12\" cy=\"6\" r=\"2\"></circle><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><circle cx=\"12\" cy=\"18\" r=\"2\"></circle>","dollar-sign":"<line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"23\"></line><path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path>","download-cloud":"<polyline points=\"8 17 12 21 16 17\"></polyline><line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line><path d=\"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29\"></path>","download":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line>","dribbble":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32\"></path>","droplet":"<path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"></path>","edit-2":"<path d=\"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z\"></path>","edit-3":"<path d=\"M12 20h9\"></path><path d=\"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z\"></path>","edit":"<path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path><path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"></path>","external-link":"<path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>","eye-off":"<path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","eye":"<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>","facebook":"<path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path>","fast-forward":"<polygon points=\"13 19 22 12 13 5 13 19\"></polygon><polygon points=\"2 19 11 12 2 5 2 19\"></polygon>","feather":"<path d=\"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z\"></path><line x1=\"16\" y1=\"8\" x2=\"2\" y2=\"22\"></line><line x1=\"17.5\" y1=\"15\" x2=\"9\" y2=\"15\"></line>","figma":"<path d=\"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z\"></path><path d=\"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z\"></path><path d=\"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z\"></path><path d=\"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z\"></path><path d=\"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z\"></path>","file-minus":"<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>","file-plus":"<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"12\"></line><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>","file-text":"<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"></line><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"></line><polyline points=\"10 9 9 9 8 9\"></polyline>","file":"<path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z\"></path><polyline points=\"13 2 13 9 20 9\"></polyline>","film":"<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2.18\" ry=\"2.18\"></rect><line x1=\"7\" y1=\"2\" x2=\"7\" y2=\"22\"></line><line x1=\"17\" y1=\"2\" x2=\"17\" y2=\"22\"></line><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"2\" y1=\"7\" x2=\"7\" y2=\"7\"></line><line x1=\"2\" y1=\"17\" x2=\"7\" y2=\"17\"></line><line x1=\"17\" y1=\"17\" x2=\"22\" y2=\"17\"></line><line x1=\"17\" y1=\"7\" x2=\"22\" y2=\"7\"></line>","filter":"<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>","flag":"<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"></path><line x1=\"4\" y1=\"22\" x2=\"4\" y2=\"15\"></line>","folder-minus":"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path><line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>","folder-plus":"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path><line x1=\"12\" y1=\"11\" x2=\"12\" y2=\"17\"></line><line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>","folder":"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>","framer":"<path d=\"M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7\"></path>","frown":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M16 16s-1.5-2-4-2-4 2-4 2\"></path><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>","gift":"<polyline points=\"20 12 20 22 4 22 4 12\"></polyline><rect x=\"2\" y=\"7\" width=\"20\" height=\"5\"></rect><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"7\"></line><path d=\"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z\"></path><path d=\"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z\"></path>","git-branch":"<line x1=\"6\" y1=\"3\" x2=\"6\" y2=\"15\"></line><circle cx=\"18\" cy=\"6\" r=\"3\"></circle><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><path d=\"M18 9a9 9 0 0 1-9 9\"></path>","git-commit":"<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"1.05\" y1=\"12\" x2=\"7\" y2=\"12\"></line><line x1=\"17.01\" y1=\"12\" x2=\"22.96\" y2=\"12\"></line>","git-merge":"<circle cx=\"18\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M6 21V9a9 9 0 0 0 9 9\"></path>","git-pull-request":"<circle cx=\"18\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M13 6h3a2 2 0 0 1 2 2v7\"></path><line x1=\"6\" y1=\"9\" x2=\"6\" y2=\"21\"></line>","github":"<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>","gitlab":"<path d=\"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z\"></path>","globe":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"></path>","grid":"<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"></rect>","hard-drive":"<line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line>","hash":"<line x1=\"4\" y1=\"9\" x2=\"20\" y2=\"9\"></line><line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\"></line><line x1=\"10\" y1=\"3\" x2=\"8\" y2=\"21\"></line><line x1=\"16\" y1=\"3\" x2=\"14\" y2=\"21\"></line>","headphones":"<path d=\"M3 18v-6a9 9 0 0 1 18 0v6\"></path><path d=\"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z\"></path>","heart":"<path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path>","help-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"></path><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>","hexagon":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path>","home":"<path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline>","image":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle><polyline points=\"21 15 16 10 5 21\"></polyline>","inbox":"<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\"></polyline><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path>","info":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line>","instagram":"<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\" ry=\"5\"></rect><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"></path><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"></line>","italic":"<line x1=\"19\" y1=\"4\" x2=\"10\" y2=\"4\"></line><line x1=\"14\" y1=\"20\" x2=\"5\" y2=\"20\"></line><line x1=\"15\" y1=\"4\" x2=\"9\" y2=\"20\"></line>","key":"<path d=\"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4\"></path>","layers":"<polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon><polyline points=\"2 17 12 22 22 17\"></polyline><polyline points=\"2 12 12 17 22 12\"></polyline>","layout":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"></line><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"></line>","life-buoy":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"9.17\" y2=\"9.17\"></line><line x1=\"14.83\" y1=\"14.83\" x2=\"19.07\" y2=\"19.07\"></line><line x1=\"14.83\" y1=\"9.17\" x2=\"19.07\" y2=\"4.93\"></line><line x1=\"14.83\" y1=\"9.17\" x2=\"18.36\" y2=\"5.64\"></line><line x1=\"4.93\" y1=\"19.07\" x2=\"9.17\" y2=\"14.83\"></line>","link-2":"<path d=\"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3\"></path><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","link":"<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></path>","linkedin":"<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>","list":"<line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"></line><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"></line><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"></line>","loader":"<line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"6\"></line><line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"22\"></line><line x1=\"4.93\" y1=\"4.93\" x2=\"7.76\" y2=\"7.76\"></line><line x1=\"16.24\" y1=\"16.24\" x2=\"19.07\" y2=\"19.07\"></line><line x1=\"2\" y1=\"12\" x2=\"6\" y2=\"12\"></line><line x1=\"18\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"4.93\" y1=\"19.07\" x2=\"7.76\" y2=\"16.24\"></line><line x1=\"16.24\" y1=\"7.76\" x2=\"19.07\" y2=\"4.93\"></line>","lock":"<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>","log-in":"<path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"></path><polyline points=\"10 17 15 12 10 7\"></polyline><line x1=\"15\" y1=\"12\" x2=\"3\" y2=\"12\"></line>","log-out":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"></path><polyline points=\"16 17 21 12 16 7\"></polyline><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"></line>","mail":"<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>","map-pin":"<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>","map":"<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"></polygon><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"></line><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"></line>","maximize-2":"<polyline points=\"15 3 21 3 21 9\"></polyline><polyline points=\"9 21 3 21 3 15\"></polyline><line x1=\"21\" y1=\"3\" x2=\"14\" y2=\"10\"></line><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>","maximize":"<path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>","meh":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"8\" y1=\"15\" x2=\"16\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>","menu":"<line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line>","message-circle":"<path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z\"></path>","message-square":"<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>","mic-off":"<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6\"></path><path d=\"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line><line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>","mic":"<path d=\"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z\"></path><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line><line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>","minimize-2":"<polyline points=\"4 14 10 14 10 20\"></polyline><polyline points=\"20 10 14 10 14 4\"></polyline><line x1=\"14\" y1=\"10\" x2=\"21\" y2=\"3\"></line><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>","minimize":"<path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"></path>","minus-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","minus-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","minus":"<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>","monitor":"<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"></line><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"></line>","moon":"<path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path>","more-horizontal":"<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"19\" cy=\"12\" r=\"1\"></circle><circle cx=\"5\" cy=\"12\" r=\"1\"></circle>","more-vertical":"<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"12\" cy=\"5\" r=\"1\"></circle><circle cx=\"12\" cy=\"19\" r=\"1\"></circle>","mouse-pointer":"<path d=\"M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\"></path><path d=\"M13 13l6 6\"></path>","move":"<polyline points=\"5 9 2 12 5 15\"></polyline><polyline points=\"9 5 12 2 15 5\"></polyline><polyline points=\"15 19 12 22 9 19\"></polyline><polyline points=\"19 9 22 12 19 15\"></polyline><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"></line>","music":"<path d=\"M9 18V5l12-2v13\"></path><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><circle cx=\"18\" cy=\"16\" r=\"3\"></circle>","navigation-2":"<polygon points=\"12 2 19 21 12 17 5 21 12 2\"></polygon>","navigation":"<polygon points=\"3 11 22 2 13 21 11 13 3 11\"></polygon>","octagon":"<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon>","package":"<line x1=\"16.5\" y1=\"9.4\" x2=\"7.5\" y2=\"4.21\"></line><path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>","paperclip":"<path d=\"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48\"></path>","pause-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"10\" y1=\"15\" x2=\"10\" y2=\"9\"></line><line x1=\"14\" y1=\"15\" x2=\"14\" y2=\"9\"></line>","pause":"<rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect>","pen-tool":"<path d=\"M12 19l7-7 3 3-7 7-3-3z\"></path><path d=\"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z\"></path><path d=\"M2 2l7.586 7.586\"></path><circle cx=\"11\" cy=\"11\" r=\"2\"></circle>","percent":"<line x1=\"19\" y1=\"5\" x2=\"5\" y2=\"19\"></line><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\"></circle><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\"></circle>","phone-call":"<path d=\"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-forwarded":"<polyline points=\"19 1 23 5 19 9\"></polyline><line x1=\"15\" y1=\"5\" x2=\"23\" y2=\"5\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-incoming":"<polyline points=\"16 2 16 8 22 8\"></polyline><line x1=\"23\" y1=\"1\" x2=\"16\" y2=\"8\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-missed":"<line x1=\"23\" y1=\"1\" x2=\"17\" y2=\"7\"></line><line x1=\"17\" y1=\"1\" x2=\"23\" y2=\"7\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-off":"<path d=\"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91\"></path><line x1=\"23\" y1=\"1\" x2=\"1\" y2=\"23\"></line>","phone-outgoing":"<polyline points=\"23 7 23 1 17 1\"></polyline><line x1=\"16\" y1=\"8\" x2=\"23\" y2=\"1\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone":"<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","pie-chart":"<path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"></path><path d=\"M22 12A10 10 0 0 0 12 2v10z\"></path>","play-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"10 8 16 12 10 16 10 8\"></polygon>","play":"<polygon points=\"5 3 19 12 5 21 5 3\"></polygon>","plus-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","plus-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","plus":"<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>","pocket":"<path d=\"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z\"></path><polyline points=\"8 10 12 14 16 10\"></polyline>","power":"<path d=\"M18.36 6.64a9 9 0 1 1-12.73 0\"></path><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"12\"></line>","printer":"<polyline points=\"6 9 6 2 18 2 18 9\"></polyline><path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"></path><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"></rect>","radio":"<circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14\"></path>","refresh-ccw":"<polyline points=\"1 4 1 10 7 10\"></polyline><polyline points=\"23 20 23 14 17 14\"></polyline><path d=\"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15\"></path>","refresh-cw":"<polyline points=\"23 4 23 10 17 10\"></polyline><polyline points=\"1 20 1 14 7 14\"></polyline><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"></path>","repeat":"<polyline points=\"17 1 21 5 17 9\"></polyline><path d=\"M3 11V9a4 4 0 0 1 4-4h14\"></path><polyline points=\"7 23 3 19 7 15\"></polyline><path d=\"M21 13v2a4 4 0 0 1-4 4H3\"></path>","rewind":"<polygon points=\"11 19 2 12 11 5 11 19\"></polygon><polygon points=\"22 19 13 12 22 5 22 19\"></polygon>","rotate-ccw":"<polyline points=\"1 4 1 10 7 10\"></polyline><path d=\"M3.51 15a9 9 0 1 0 2.13-9.36L1 10\"></path>","rotate-cw":"<polyline points=\"23 4 23 10 17 10\"></polyline><path d=\"M20.49 15a9 9 0 1 1-2.12-9.36L23 10\"></path>","rss":"<path d=\"M4 11a9 9 0 0 1 9 9\"></path><path d=\"M4 4a16 16 0 0 1 16 16\"></path><circle cx=\"5\" cy=\"19\" r=\"1\"></circle>","save":"<path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path><polyline points=\"17 21 17 13 7 13 7 21\"></polyline><polyline points=\"7 3 7 8 15 8\"></polyline>","scissors":"<circle cx=\"6\" cy=\"6\" r=\"3\"></circle><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><line x1=\"20\" y1=\"4\" x2=\"8.12\" y2=\"15.88\"></line><line x1=\"14.47\" y1=\"14.48\" x2=\"20\" y2=\"20\"></line><line x1=\"8.12\" y1=\"8.12\" x2=\"12\" y2=\"12\"></line>","search":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>","send":"<line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line><polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon>","server":"<rect x=\"2\" y=\"2\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect><rect x=\"2\" y=\"14\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect><line x1=\"6\" y1=\"6\" x2=\"6.01\" y2=\"6\"></line><line x1=\"6\" y1=\"18\" x2=\"6.01\" y2=\"18\"></line>","settings":"<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>","share-2":"<circle cx=\"18\" cy=\"5\" r=\"3\"></circle><circle cx=\"6\" cy=\"12\" r=\"3\"></circle><circle cx=\"18\" cy=\"19\" r=\"3\"></circle><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"></line><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"></line>","share":"<path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"></path><polyline points=\"16 6 12 2 8 6\"></polyline><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"></line>","shield-off":"<path d=\"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18\"></path><path d=\"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","shield":"<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path>","shopping-bag":"<path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"></path><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><path d=\"M16 10a4 4 0 0 1-8 0\"></path>","shopping-cart":"<circle cx=\"9\" cy=\"21\" r=\"1\"></circle><circle cx=\"20\" cy=\"21\" r=\"1\"></circle><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"></path>","shuffle":"<polyline points=\"16 3 21 3 21 8\"></polyline><line x1=\"4\" y1=\"20\" x2=\"21\" y2=\"3\"></line><polyline points=\"21 16 21 21 16 21\"></polyline><line x1=\"15\" y1=\"15\" x2=\"21\" y2=\"21\"></line><line x1=\"4\" y1=\"4\" x2=\"9\" y2=\"9\"></line>","sidebar":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"></line>","skip-back":"<polygon points=\"19 20 9 12 19 4 19 20\"></polygon><line x1=\"5\" y1=\"19\" x2=\"5\" y2=\"5\"></line>","skip-forward":"<polygon points=\"5 4 15 12 5 20 5 4\"></polygon><line x1=\"19\" y1=\"5\" x2=\"19\" y2=\"19\"></line>","slack":"<path d=\"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z\"></path><path d=\"M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"></path><path d=\"M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z\"></path><path d=\"M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z\"></path><path d=\"M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z\"></path><path d=\"M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z\"></path><path d=\"M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z\"></path><path d=\"M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z\"></path>","slash":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"></line>","sliders":"<line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line>","smartphone":"<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line>","smile":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"></path><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>","speaker":"<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect><circle cx=\"12\" cy=\"14\" r=\"4\"></circle><line x1=\"12\" y1=\"6\" x2=\"12.01\" y2=\"6\"></line>","square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>","star":"<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon>","stop-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect>","sun":"<circle cx=\"12\" cy=\"12\" r=\"5\"></circle><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line>","sunrise":"<path d=\"M17 18a5 5 0 0 0-10 0\"></path><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"9\"></line><line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line><line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line><line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line><line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line><line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line><polyline points=\"8 6 12 2 16 6\"></polyline>","sunset":"<path d=\"M17 18a5 5 0 0 0-10 0\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"2\"></line><line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line><line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line><line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line><line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line><line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line><polyline points=\"16 5 12 9 8 5\"></polyline>","table":"<path d=\"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18\"></path>","tablet":"<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line>","tag":"<path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"></path><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"></line>","target":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle>","terminal":"<polyline points=\"4 17 10 11 4 5\"></polyline><line x1=\"12\" y1=\"19\" x2=\"20\" y2=\"19\"></line>","thermometer":"<path d=\"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z\"></path>","thumbs-down":"<path d=\"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17\"></path>","thumbs-up":"<path d=\"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\"></path>","toggle-left":"<rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect><circle cx=\"8\" cy=\"12\" r=\"3\"></circle>","toggle-right":"<rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect><circle cx=\"16\" cy=\"12\" r=\"3\"></circle>","tool":"<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"></path>","trash-2":"<polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line>","trash":"<polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>","trello":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><rect x=\"7\" y=\"7\" width=\"3\" height=\"9\"></rect><rect x=\"14\" y=\"7\" width=\"3\" height=\"5\"></rect>","trending-down":"<polyline points=\"23 18 13.5 8.5 8.5 13.5 1 6\"></polyline><polyline points=\"17 18 23 18 23 12\"></polyline>","trending-up":"<polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"></polyline><polyline points=\"17 6 23 6 23 12\"></polyline>","triangle":"<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>","truck":"<rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"></rect><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"></polygon><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"></circle><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"></circle>","tv":"<rect x=\"2\" y=\"7\" width=\"20\" height=\"15\" rx=\"2\" ry=\"2\"></rect><polyline points=\"17 2 12 7 7 2\"></polyline>","twitch":"<path d=\"M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7\"></path>","twitter":"<path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path>","type":"<polyline points=\"4 7 4 4 20 4 20 7\"></polyline><line x1=\"9\" y1=\"20\" x2=\"15\" y2=\"20\"></line><line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"></line>","umbrella":"<path d=\"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7\"></path>","underline":"<path d=\"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3\"></path><line x1=\"4\" y1=\"21\" x2=\"20\" y2=\"21\"></line>","unlock":"<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"></path>","upload-cloud":"<polyline points=\"16 16 12 12 8 16\"></polyline><line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line><path d=\"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3\"></path><polyline points=\"16 16 12 12 8 16\"></polyline>","upload":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"17 8 12 3 7 8\"></polyline><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"></line>","user-check":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><polyline points=\"17 11 19 13 23 9\"></polyline>","user-minus":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>","user-plus":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"20\" y1=\"8\" x2=\"20\" y2=\"14\"></line><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>","user-x":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"18\" y1=\"8\" x2=\"23\" y2=\"13\"></line><line x1=\"23\" y1=\"8\" x2=\"18\" y2=\"13\"></line>","user":"<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle>","users":"<path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>","video-off":"<path d=\"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","video":"<polygon points=\"23 7 16 12 23 17 23 7\"></polygon><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"></rect>","voicemail":"<circle cx=\"5.5\" cy=\"11.5\" r=\"4.5\"></circle><circle cx=\"18.5\" cy=\"11.5\" r=\"4.5\"></circle><line x1=\"5.5\" y1=\"16\" x2=\"18.5\" y2=\"16\"></line>","volume-1":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"></path>","volume-2":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path>","volume-x":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"></line><line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"></line>","volume":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>","watch":"<circle cx=\"12\" cy=\"12\" r=\"7\"></circle><polyline points=\"12 9 12 12 13.5 13.5\"></polyline><path d=\"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83\"></path>","wifi-off":"<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M16.72 11.06A10.94 10.94 0 0 1 19 12.55\"></path><path d=\"M5 12.55a10.94 10.94 0 0 1 5.17-2.39\"></path><path d=\"M10.71 5.05A16 16 0 0 1 22.58 9\"></path><path d=\"M1.42 9a15.91 15.91 0 0 1 4.7-2.88\"></path><path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path><line x1=\"12\" y1=\"20\" x2=\"12.01\" y2=\"20\"></line>","wifi":"<path d=\"M5 12.55a11 11 0 0 1 14.08 0\"></path><path d=\"M1.42 9a16 16 0 0 1 21.16 0\"></path><path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path><line x1=\"12\" y1=\"20\" x2=\"12.01\" y2=\"20\"></line>","wind":"<path d=\"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2\"></path>","x-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>","x-octagon":"<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>","x-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line>","x":"<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>","youtube":"<path d=\"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z\"></path><polygon points=\"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02\"></polygon>","zap-off":"<polyline points=\"12.41 6.75 13 2 10.57 4.92\"></polyline><polyline points=\"18.57 12.91 21 10 15.66 10\"></polyline><polyline points=\"8 8 3 14 12 14 11 22 16 16\"></polyline><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","zap":"<polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon>","zoom-in":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>","zoom-out":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>"};

    	/***/ }),

    	/***/ "./node_modules/classnames/dedupe.js":
    	/*!*******************************************!*\
    	  !*** ./node_modules/classnames/dedupe.js ***!
    	  \*******************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
    	  Copyright (c) 2016 Jed Watson.
    	  Licensed under the MIT License (MIT), see
    	  http://jedwatson.github.io/classnames
    	*/
    	/* global define */

    	(function () {

    		var classNames = (function () {
    			// don't inherit from Object so we can skip hasOwnProperty check later
    			// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
    			function StorageObject() {}
    			StorageObject.prototype = Object.create(null);

    			function _parseArray (resultSet, array) {
    				var length = array.length;

    				for (var i = 0; i < length; ++i) {
    					_parse(resultSet, array[i]);
    				}
    			}

    			var hasOwn = {}.hasOwnProperty;

    			function _parseNumber (resultSet, num) {
    				resultSet[num] = true;
    			}

    			function _parseObject (resultSet, object) {
    				for (var k in object) {
    					if (hasOwn.call(object, k)) {
    						// set value to false instead of deleting it to avoid changing object structure
    						// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
    						resultSet[k] = !!object[k];
    					}
    				}
    			}

    			var SPACE = /\s+/;
    			function _parseString (resultSet, str) {
    				var array = str.split(SPACE);
    				var length = array.length;

    				for (var i = 0; i < length; ++i) {
    					resultSet[array[i]] = true;
    				}
    			}

    			function _parse (resultSet, arg) {
    				if (!arg) return;
    				var argType = typeof arg;

    				// 'foo bar'
    				if (argType === 'string') {
    					_parseString(resultSet, arg);

    				// ['foo', 'bar', ...]
    				} else if (Array.isArray(arg)) {
    					_parseArray(resultSet, arg);

    				// { 'foo': true, ... }
    				} else if (argType === 'object') {
    					_parseObject(resultSet, arg);

    				// '130'
    				} else if (argType === 'number') {
    					_parseNumber(resultSet, arg);
    				}
    			}

    			function _classNames () {
    				// don't leak arguments
    				// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    				var len = arguments.length;
    				var args = Array(len);
    				for (var i = 0; i < len; i++) {
    					args[i] = arguments[i];
    				}

    				var classSet = new StorageObject();
    				_parseArray(classSet, args);

    				var list = [];

    				for (var k in classSet) {
    					if (classSet[k]) {
    						list.push(k);
    					}
    				}

    				return list.join(' ');
    			}

    			return _classNames;
    		})();

    		if (typeof module !== 'undefined' && module.exports) {
    			module.exports = classNames;
    		} else {
    			// register as 'classnames', consistent with npm package name
    			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    				return classNames;
    			}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
    					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    		}
    	}());


    	/***/ }),

    	/***/ "./node_modules/core-js/es/array/from.js":
    	/*!***********************************************!*\
    	  !*** ./node_modules/core-js/es/array/from.js ***!
    	  \***********************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
    	__webpack_require__(/*! ../../modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
    	var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

    	module.exports = path.Array.from;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/a-function.js":
    	/*!******************************************************!*\
    	  !*** ./node_modules/core-js/internals/a-function.js ***!
    	  \******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = function (it) {
    	  if (typeof it != 'function') {
    	    throw TypeError(String(it) + ' is not a function');
    	  } return it;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/an-object.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/an-object.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

    	module.exports = function (it) {
    	  if (!isObject(it)) {
    	    throw TypeError(String(it) + ' is not an object');
    	  } return it;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/array-from.js":
    	/*!******************************************************!*\
    	  !*** ./node_modules/core-js/internals/array-from.js ***!
    	  \******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
    	var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
    	var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
    	var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
    	var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
    	var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
    	var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

    	// `Array.from` method
    	// https://tc39.github.io/ecma262/#sec-array.from
    	module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    	  var O = toObject(arrayLike);
    	  var C = typeof this == 'function' ? this : Array;
    	  var argumentsLength = arguments.length;
    	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    	  var mapping = mapfn !== undefined;
    	  var index = 0;
    	  var iteratorMethod = getIteratorMethod(O);
    	  var length, result, step, iterator;
    	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    	  // if the target is not iterable or it's an array with the default iterator - use a simple case
    	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    	    iterator = iteratorMethod.call(O);
    	    result = new C();
    	    for (;!(step = iterator.next()).done; index++) {
    	      createProperty(result, index, mapping
    	        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
    	        : step.value
    	      );
    	    }
    	  } else {
    	    length = toLength(O.length);
    	    result = new C(length);
    	    for (;length > index; index++) {
    	      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    	    }
    	  }
    	  result.length = index;
    	  return result;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/array-includes.js":
    	/*!**********************************************************!*\
    	  !*** ./node_modules/core-js/internals/array-includes.js ***!
    	  \**********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
    	var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
    	var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

    	// `Array.prototype.{ indexOf, includes }` methods implementation
    	// false -> Array#indexOf
    	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    	// true  -> Array#includes
    	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
    	module.exports = function (IS_INCLUDES) {
    	  return function ($this, el, fromIndex) {
    	    var O = toIndexedObject($this);
    	    var length = toLength(O.length);
    	    var index = toAbsoluteIndex(fromIndex, length);
    	    var value;
    	    // Array#includes uses SameValueZero equality algorithm
    	    // eslint-disable-next-line no-self-compare
    	    if (IS_INCLUDES && el != el) while (length > index) {
    	      value = O[index++];
    	      // eslint-disable-next-line no-self-compare
    	      if (value != value) return true;
    	    // Array#indexOf ignores holes, Array#includes - not
    	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
    	      if (O[index] === el) return IS_INCLUDES || index || 0;
    	    } return !IS_INCLUDES && -1;
    	  };
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/bind-context.js":
    	/*!********************************************************!*\
    	  !*** ./node_modules/core-js/internals/bind-context.js ***!
    	  \********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

    	// optional / simple context binding
    	module.exports = function (fn, that, length) {
    	  aFunction(fn);
    	  if (that === undefined) return fn;
    	  switch (length) {
    	    case 0: return function () {
    	      return fn.call(that);
    	    };
    	    case 1: return function (a) {
    	      return fn.call(that, a);
    	    };
    	    case 2: return function (a, b) {
    	      return fn.call(that, a, b);
    	    };
    	    case 3: return function (a, b, c) {
    	      return fn.call(that, a, b, c);
    	    };
    	  }
    	  return function (/* ...args */) {
    	    return fn.apply(that, arguments);
    	  };
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
    	/*!****************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
    	  \****************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

    	// call something on iterator step with safe closing on error
    	module.exports = function (iterator, fn, value, ENTRIES) {
    	  try {
    	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    	  // 7.4.6 IteratorClose(iterator, completion)
    	  } catch (error) {
    	    var returnMethod = iterator['return'];
    	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    	    throw error;
    	  }
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
    	/*!**************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
    	  \**************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

    	var ITERATOR = wellKnownSymbol('iterator');
    	var SAFE_CLOSING = false;

    	try {
    	  var called = 0;
    	  var iteratorWithReturn = {
    	    next: function () {
    	      return { done: !!called++ };
    	    },
    	    'return': function () {
    	      SAFE_CLOSING = true;
    	    }
    	  };
    	  iteratorWithReturn[ITERATOR] = function () {
    	    return this;
    	  };
    	  // eslint-disable-next-line no-throw-literal
    	  Array.from(iteratorWithReturn, function () { throw 2; });
    	} catch (error) { /* empty */ }

    	module.exports = function (exec, SKIP_CLOSING) {
    	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    	  var ITERATION_SUPPORT = false;
    	  try {
    	    var object = {};
    	    object[ITERATOR] = function () {
    	      return {
    	        next: function () {
    	          return { done: ITERATION_SUPPORT = true };
    	        }
    	      };
    	    };
    	    exec(object);
    	  } catch (error) { /* empty */ }
    	  return ITERATION_SUPPORT;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/classof-raw.js":
    	/*!*******************************************************!*\
    	  !*** ./node_modules/core-js/internals/classof-raw.js ***!
    	  \*******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	var toString = {}.toString;

    	module.exports = function (it) {
    	  return toString.call(it).slice(8, -1);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/classof.js":
    	/*!***************************************************!*\
    	  !*** ./node_modules/core-js/internals/classof.js ***!
    	  \***************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

    	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    	// ES3 wrong here
    	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    	// fallback for IE11 Script Access Denied error
    	var tryGet = function (it, key) {
    	  try {
    	    return it[key];
    	  } catch (error) { /* empty */ }
    	};

    	// getting tag from ES6+ `Object.prototype.toString`
    	module.exports = function (it) {
    	  var O, tag, result;
    	  return it === undefined ? 'Undefined' : it === null ? 'Null'
    	    // @@toStringTag case
    	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    	    // builtinTag case
    	    : CORRECT_ARGUMENTS ? classofRaw(O)
    	    // ES3 arguments fallback
    	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
    	/*!***********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
    	  \***********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
    	var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
    	var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

    	module.exports = function (target, source) {
    	  var keys = ownKeys(source);
    	  var defineProperty = definePropertyModule.f;
    	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    	  for (var i = 0; i < keys.length; i++) {
    	    var key = keys[i];
    	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    	  }
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
    	/*!********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
    	  \********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

    	module.exports = !fails(function () {
    	  function F() { /* empty */ }
    	  F.prototype.constructor = null;
    	  return Object.getPrototypeOf(new F()) !== F.prototype;
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
    	/*!***********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
    	  \***********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
    	var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
    	var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
    	var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
    	var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

    	var returnThis = function () { return this; };

    	module.exports = function (IteratorConstructor, NAME, next) {
    	  var TO_STRING_TAG = NAME + ' Iterator';
    	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
    	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    	  Iterators[TO_STRING_TAG] = returnThis;
    	  return IteratorConstructor;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
    	/*!**********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
    	  \**********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = function (bitmap, value) {
    	  return {
    	    enumerable: !(bitmap & 1),
    	    configurable: !(bitmap & 2),
    	    writable: !(bitmap & 4),
    	    value: value
    	  };
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/create-property.js":
    	/*!***********************************************************!*\
    	  !*** ./node_modules/core-js/internals/create-property.js ***!
    	  \***********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
    	var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
    	var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

    	module.exports = function (object, key, value) {
    	  var propertyKey = toPrimitive(key);
    	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    	  else object[propertyKey] = value;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/define-iterator.js":
    	/*!***********************************************************!*\
    	  !*** ./node_modules/core-js/internals/define-iterator.js ***!
    	  \***********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
    	var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
    	var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
    	var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
    	var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
    	var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
    	var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
    	var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
    	var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
    	var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

    	var IteratorPrototype = IteratorsCore.IteratorPrototype;
    	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    	var ITERATOR = wellKnownSymbol('iterator');
    	var KEYS = 'keys';
    	var VALUES = 'values';
    	var ENTRIES = 'entries';

    	var returnThis = function () { return this; };

    	module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    	  createIteratorConstructor(IteratorConstructor, NAME, next);

    	  var getIterationMethod = function (KIND) {
    	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    	    switch (KIND) {
    	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
    	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
    	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    	    } return function () { return new IteratorConstructor(this); };
    	  };

    	  var TO_STRING_TAG = NAME + ' Iterator';
    	  var INCORRECT_VALUES_NAME = false;
    	  var IterablePrototype = Iterable.prototype;
    	  var nativeIterator = IterablePrototype[ITERATOR]
    	    || IterablePrototype['@@iterator']
    	    || DEFAULT && IterablePrototype[DEFAULT];
    	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    	  var CurrentIteratorPrototype, methods, KEY;

    	  // fix native
    	  if (anyNativeIterator) {
    	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
    	      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
    	        if (setPrototypeOf) {
    	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
    	        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
    	          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
    	        }
    	      }
    	      // Set @@toStringTag to native iterators
    	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
    	      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    	    }
    	  }

    	  // fix Array#{values, @@iterator}.name in V8 / FF
    	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    	    INCORRECT_VALUES_NAME = true;
    	    defaultIterator = function values() { return nativeIterator.call(this); };
    	  }

    	  // define iterator
    	  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    	    hide(IterablePrototype, ITERATOR, defaultIterator);
    	  }
    	  Iterators[NAME] = defaultIterator;

    	  // export additional methods
    	  if (DEFAULT) {
    	    methods = {
    	      values: getIterationMethod(VALUES),
    	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
    	      entries: getIterationMethod(ENTRIES)
    	    };
    	    if (FORCED) for (KEY in methods) {
    	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
    	        redefine(IterablePrototype, KEY, methods[KEY]);
    	      }
    	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    	  }

    	  return methods;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/descriptors.js":
    	/*!*******************************************************!*\
    	  !*** ./node_modules/core-js/internals/descriptors.js ***!
    	  \*******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

    	// Thank's IE8 for his funny defineProperty
    	module.exports = !fails(function () {
    	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/document-create-element.js":
    	/*!*******************************************************************!*\
    	  !*** ./node_modules/core-js/internals/document-create-element.js ***!
    	  \*******************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

    	var document = global.document;
    	// typeof document.createElement is 'object' in old IE
    	var exist = isObject(document) && isObject(document.createElement);

    	module.exports = function (it) {
    	  return exist ? document.createElement(it) : {};
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
    	/*!*********************************************************!*\
    	  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
    	  \*********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	// IE8- don't enum bug keys
    	module.exports = [
    	  'constructor',
    	  'hasOwnProperty',
    	  'isPrototypeOf',
    	  'propertyIsEnumerable',
    	  'toLocaleString',
    	  'toString',
    	  'valueOf'
    	];


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/export.js":
    	/*!**************************************************!*\
    	  !*** ./node_modules/core-js/internals/export.js ***!
    	  \**************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
    	var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
    	var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
    	var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
    	var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
    	var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

    	/*
    	  options.target      - name of the target object
    	  options.global      - target is the global object
    	  options.stat        - export as static methods of target
    	  options.proto       - export as prototype methods of target
    	  options.real        - real prototype method for the `pure` version
    	  options.forced      - export even if the native feature is available
    	  options.bind        - bind methods to the target, required for the `pure` version
    	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    	  options.sham        - add a flag to not completely full polyfills
    	  options.enumerable  - export as enumerable property
    	  options.noTargetGet - prevent calling a getter on target
    	*/
    	module.exports = function (options, source) {
    	  var TARGET = options.target;
    	  var GLOBAL = options.global;
    	  var STATIC = options.stat;
    	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    	  if (GLOBAL) {
    	    target = global;
    	  } else if (STATIC) {
    	    target = global[TARGET] || setGlobal(TARGET, {});
    	  } else {
    	    target = (global[TARGET] || {}).prototype;
    	  }
    	  if (target) for (key in source) {
    	    sourceProperty = source[key];
    	    if (options.noTargetGet) {
    	      descriptor = getOwnPropertyDescriptor(target, key);
    	      targetProperty = descriptor && descriptor.value;
    	    } else targetProperty = target[key];
    	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    	    // contained in target
    	    if (!FORCED && targetProperty !== undefined) {
    	      if (typeof sourceProperty === typeof targetProperty) continue;
    	      copyConstructorProperties(sourceProperty, targetProperty);
    	    }
    	    // add a flag to not completely full polyfills
    	    if (options.sham || (targetProperty && targetProperty.sham)) {
    	      hide(sourceProperty, 'sham', true);
    	    }
    	    // extend global
    	    redefine(target, key, sourceProperty, options);
    	  }
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/fails.js":
    	/*!*************************************************!*\
    	  !*** ./node_modules/core-js/internals/fails.js ***!
    	  \*************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = function (exec) {
    	  try {
    	    return !!exec();
    	  } catch (error) {
    	    return true;
    	  }
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/function-to-string.js":
    	/*!**************************************************************!*\
    	  !*** ./node_modules/core-js/internals/function-to-string.js ***!
    	  \**************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

    	module.exports = shared('native-function-to-string', Function.toString);


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/get-iterator-method.js":
    	/*!***************************************************************!*\
    	  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
    	  \***************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
    	var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

    	var ITERATOR = wellKnownSymbol('iterator');

    	module.exports = function (it) {
    	  if (it != undefined) return it[ITERATOR]
    	    || it['@@iterator']
    	    || Iterators[classof(it)];
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/global.js":
    	/*!**************************************************!*\
    	  !*** ./node_modules/core-js/internals/global.js ***!
    	  \**************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	/* WEBPACK VAR INJECTION */(function(global) {var O = 'object';
    	var check = function (it) {
    	  return it && it.Math == Math && it;
    	};

    	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    	module.exports =
    	  // eslint-disable-next-line no-undef
    	  check(typeof globalThis == O && globalThis) ||
    	  check(typeof window == O && window) ||
    	  check(typeof self == O && self) ||
    	  check(typeof global == O && global) ||
    	  // eslint-disable-next-line no-new-func
    	  Function('return this')();

    	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")));

    	/***/ }),

    	/***/ "./node_modules/core-js/internals/has.js":
    	/*!***********************************************!*\
    	  !*** ./node_modules/core-js/internals/has.js ***!
    	  \***********************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	var hasOwnProperty = {}.hasOwnProperty;

    	module.exports = function (it, key) {
    	  return hasOwnProperty.call(it, key);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/hidden-keys.js":
    	/*!*******************************************************!*\
    	  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
    	  \*******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = {};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/hide.js":
    	/*!************************************************!*\
    	  !*** ./node_modules/core-js/internals/hide.js ***!
    	  \************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
    	var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
    	var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

    	module.exports = DESCRIPTORS ? function (object, key, value) {
    	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    	} : function (object, key, value) {
    	  object[key] = value;
    	  return object;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/html.js":
    	/*!************************************************!*\
    	  !*** ./node_modules/core-js/internals/html.js ***!
    	  \************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

    	var document = global.document;

    	module.exports = document && document.documentElement;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
    	/*!**********************************************************!*\
    	  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
    	  \**********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
    	var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
    	var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

    	// Thank's IE8 for his funny defineProperty
    	module.exports = !DESCRIPTORS && !fails(function () {
    	  return Object.defineProperty(createElement('div'), 'a', {
    	    get: function () { return 7; }
    	  }).a != 7;
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/indexed-object.js":
    	/*!**********************************************************!*\
    	  !*** ./node_modules/core-js/internals/indexed-object.js ***!
    	  \**********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	// fallback for non-array-like ES3 and non-enumerable old V8 strings
    	var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
    	var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

    	var split = ''.split;

    	module.exports = fails(function () {
    	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    	  // eslint-disable-next-line no-prototype-builtins
    	  return !Object('z').propertyIsEnumerable(0);
    	}) ? function (it) {
    	  return classof(it) == 'String' ? split.call(it, '') : Object(it);
    	} : Object;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/internal-state.js":
    	/*!**********************************************************!*\
    	  !*** ./node_modules/core-js/internals/internal-state.js ***!
    	  \**********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
    	var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
    	var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
    	var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

    	var WeakMap = global.WeakMap;
    	var set, get, has;

    	var enforce = function (it) {
    	  return has(it) ? get(it) : set(it, {});
    	};

    	var getterFor = function (TYPE) {
    	  return function (it) {
    	    var state;
    	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
    	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    	    } return state;
    	  };
    	};

    	if (NATIVE_WEAK_MAP) {
    	  var store = new WeakMap();
    	  var wmget = store.get;
    	  var wmhas = store.has;
    	  var wmset = store.set;
    	  set = function (it, metadata) {
    	    wmset.call(store, it, metadata);
    	    return metadata;
    	  };
    	  get = function (it) {
    	    return wmget.call(store, it) || {};
    	  };
    	  has = function (it) {
    	    return wmhas.call(store, it);
    	  };
    	} else {
    	  var STATE = sharedKey('state');
    	  hiddenKeys[STATE] = true;
    	  set = function (it, metadata) {
    	    hide(it, STATE, metadata);
    	    return metadata;
    	  };
    	  get = function (it) {
    	    return objectHas(it, STATE) ? it[STATE] : {};
    	  };
    	  has = function (it) {
    	    return objectHas(it, STATE);
    	  };
    	}

    	module.exports = {
    	  set: set,
    	  get: get,
    	  has: has,
    	  enforce: enforce,
    	  getterFor: getterFor
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
    	/*!********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
    	  \********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
    	var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

    	var ITERATOR = wellKnownSymbol('iterator');
    	var ArrayPrototype = Array.prototype;

    	// check on default Array iterator
    	module.exports = function (it) {
    	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/is-forced.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/is-forced.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

    	var replacement = /#|\.prototype\./;

    	var isForced = function (feature, detection) {
    	  var value = data[normalize(feature)];
    	  return value == POLYFILL ? true
    	    : value == NATIVE ? false
    	    : typeof detection == 'function' ? fails(detection)
    	    : !!detection;
    	};

    	var normalize = isForced.normalize = function (string) {
    	  return String(string).replace(replacement, '.').toLowerCase();
    	};

    	var data = isForced.data = {};
    	var NATIVE = isForced.NATIVE = 'N';
    	var POLYFILL = isForced.POLYFILL = 'P';

    	module.exports = isForced;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/is-object.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/is-object.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = function (it) {
    	  return typeof it === 'object' ? it !== null : typeof it === 'function';
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/is-pure.js":
    	/*!***************************************************!*\
    	  !*** ./node_modules/core-js/internals/is-pure.js ***!
    	  \***************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = false;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/iterators-core.js":
    	/*!**********************************************************!*\
    	  !*** ./node_modules/core-js/internals/iterators-core.js ***!
    	  \**********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
    	var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
    	var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

    	var ITERATOR = wellKnownSymbol('iterator');
    	var BUGGY_SAFARI_ITERATORS = false;

    	var returnThis = function () { return this; };

    	// `%IteratorPrototype%` object
    	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
    	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

    	if ([].keys) {
    	  arrayIterator = [].keys();
    	  // Safari 8 has buggy iterators w/o `next`
    	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    	  else {
    	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    	  }
    	}

    	if (IteratorPrototype == undefined) IteratorPrototype = {};

    	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    	if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

    	module.exports = {
    	  IteratorPrototype: IteratorPrototype,
    	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/iterators.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/iterators.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	module.exports = {};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/native-symbol.js":
    	/*!*********************************************************!*\
    	  !*** ./node_modules/core-js/internals/native-symbol.js ***!
    	  \*********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

    	module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
    	  // Chrome 38 Symbol has incorrect toString conversion
    	  // eslint-disable-next-line no-undef
    	  return !String(Symbol());
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/native-weak-map.js":
    	/*!***********************************************************!*\
    	  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
    	  \***********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");

    	var WeakMap = global.WeakMap;

    	module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-create.js":
    	/*!*********************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-create.js ***!
    	  \*********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
    	var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
    	var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
    	var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
    	var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
    	var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
    	var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
    	var IE_PROTO = sharedKey('IE_PROTO');

    	var PROTOTYPE = 'prototype';
    	var Empty = function () { /* empty */ };

    	// Create object with fake `null` prototype: use iframe Object with cleared prototype
    	var createDict = function () {
    	  // Thrash, waste and sodomy: IE GC bug
    	  var iframe = documentCreateElement('iframe');
    	  var length = enumBugKeys.length;
    	  var lt = '<';
    	  var script = 'script';
    	  var gt = '>';
    	  var js = 'java' + script + ':';
    	  var iframeDocument;
    	  iframe.style.display = 'none';
    	  html.appendChild(iframe);
    	  iframe.src = String(js);
    	  iframeDocument = iframe.contentWindow.document;
    	  iframeDocument.open();
    	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    	  iframeDocument.close();
    	  createDict = iframeDocument.F;
    	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    	  return createDict();
    	};

    	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    	module.exports = Object.create || function create(O, Properties) {
    	  var result;
    	  if (O !== null) {
    	    Empty[PROTOTYPE] = anObject(O);
    	    result = new Empty();
    	    Empty[PROTOTYPE] = null;
    	    // add "__proto__" for Object.getPrototypeOf polyfill
    	    result[IE_PROTO] = O;
    	  } else result = createDict();
    	  return Properties === undefined ? result : defineProperties(result, Properties);
    	};

    	hiddenKeys[IE_PROTO] = true;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-define-properties.js":
    	/*!********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
    	  \********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
    	var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
    	var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
    	var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

    	module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    	  anObject(O);
    	  var keys = objectKeys(Properties);
    	  var length = keys.length;
    	  var i = 0;
    	  var key;
    	  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
    	  return O;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-define-property.js":
    	/*!******************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-define-property.js ***!
    	  \******************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
    	var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
    	var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
    	var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

    	var nativeDefineProperty = Object.defineProperty;

    	exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    	  anObject(O);
    	  P = toPrimitive(P, true);
    	  anObject(Attributes);
    	  if (IE8_DOM_DEFINE) try {
    	    return nativeDefineProperty(O, P, Attributes);
    	  } catch (error) { /* empty */ }
    	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    	  if ('value' in Attributes) O[P] = Attributes.value;
    	  return O;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
    	/*!******************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
    	  \******************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
    	var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
    	var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
    	var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
    	var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

    	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    	exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    	  O = toIndexedObject(O);
    	  P = toPrimitive(P, true);
    	  if (IE8_DOM_DEFINE) try {
    	    return nativeGetOwnPropertyDescriptor(O, P);
    	  } catch (error) { /* empty */ }
    	  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
    	/*!*************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
    	  \*************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    	var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
    	var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

    	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

    	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    	  return internalObjectKeys(O, hiddenKeys);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
    	/*!***************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
    	  \***************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	exports.f = Object.getOwnPropertySymbols;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
    	/*!*******************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
    	  \*******************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
    	var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
    	var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

    	var IE_PROTO = sharedKey('IE_PROTO');
    	var ObjectPrototype = Object.prototype;

    	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    	module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    	  O = toObject(O);
    	  if (has(O, IE_PROTO)) return O[IE_PROTO];
    	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    	    return O.constructor.prototype;
    	  } return O instanceof Object ? ObjectPrototype : null;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-keys-internal.js":
    	/*!****************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
    	  \****************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
    	var arrayIncludes = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js");
    	var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

    	var arrayIndexOf = arrayIncludes(false);

    	module.exports = function (object, names) {
    	  var O = toIndexedObject(object);
    	  var i = 0;
    	  var result = [];
    	  var key;
    	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    	  // Don't enum bug & hidden keys
    	  while (names.length > i) if (has(O, key = names[i++])) {
    	    ~arrayIndexOf(result, key) || result.push(key);
    	  }
    	  return result;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-keys.js":
    	/*!*******************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-keys.js ***!
    	  \*******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
    	var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

    	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
    	module.exports = Object.keys || function keys(O) {
    	  return internalObjectKeys(O, enumBugKeys);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
    	/*!*************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
    	  \*************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    	// Nashorn ~ JDK8 bug
    	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

    	exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    	  var descriptor = getOwnPropertyDescriptor(this, V);
    	  return !!descriptor && descriptor.enumerable;
    	} : nativePropertyIsEnumerable;


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
    	/*!*******************************************************************!*\
    	  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
    	  \*******************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var validateSetPrototypeOfArguments = __webpack_require__(/*! ../internals/validate-set-prototype-of-arguments */ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js");

    	// Works with __proto__ only. Old v8 can't work with null proto objects.
    	/* eslint-disable no-proto */
    	module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    	  var correctSetter = false;
    	  var test = {};
    	  var setter;
    	  try {
    	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    	    setter.call(test, []);
    	    correctSetter = test instanceof Array;
    	  } catch (error) { /* empty */ }
    	  return function setPrototypeOf(O, proto) {
    	    validateSetPrototypeOfArguments(O, proto);
    	    if (correctSetter) setter.call(O, proto);
    	    else O.__proto__ = proto;
    	    return O;
    	  };
    	}() : undefined);


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/own-keys.js":
    	/*!****************************************************!*\
    	  !*** ./node_modules/core-js/internals/own-keys.js ***!
    	  \****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
    	var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
    	var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

    	var Reflect = global.Reflect;

    	// all object keys, includes non-enumerable and symbols
    	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
    	  var keys = getOwnPropertyNamesModule.f(anObject(it));
    	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/path.js":
    	/*!************************************************!*\
    	  !*** ./node_modules/core-js/internals/path.js ***!
    	  \************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	module.exports = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/redefine.js":
    	/*!****************************************************!*\
    	  !*** ./node_modules/core-js/internals/redefine.js ***!
    	  \****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
    	var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
    	var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");
    	var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

    	var getInternalState = InternalStateModule.get;
    	var enforceInternalState = InternalStateModule.enforce;
    	var TEMPLATE = String(nativeFunctionToString).split('toString');

    	shared('inspectSource', function (it) {
    	  return nativeFunctionToString.call(it);
    	});

    	(module.exports = function (O, key, value, options) {
    	  var unsafe = options ? !!options.unsafe : false;
    	  var simple = options ? !!options.enumerable : false;
    	  var noTargetGet = options ? !!options.noTargetGet : false;
    	  if (typeof value == 'function') {
    	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    	  }
    	  if (O === global) {
    	    if (simple) O[key] = value;
    	    else setGlobal(key, value);
    	    return;
    	  } else if (!unsafe) {
    	    delete O[key];
    	  } else if (!noTargetGet && O[key]) {
    	    simple = true;
    	  }
    	  if (simple) O[key] = value;
    	  else hide(O, key, value);
    	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    	})(Function.prototype, 'toString', function toString() {
    	  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/require-object-coercible.js":
    	/*!********************************************************************!*\
    	  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
    	  \********************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	// `RequireObjectCoercible` abstract operation
    	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
    	module.exports = function (it) {
    	  if (it == undefined) throw TypeError("Can't call method on " + it);
    	  return it;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/set-global.js":
    	/*!******************************************************!*\
    	  !*** ./node_modules/core-js/internals/set-global.js ***!
    	  \******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");

    	module.exports = function (key, value) {
    	  try {
    	    hide(global, key, value);
    	  } catch (error) {
    	    global[key] = value;
    	  } return value;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
    	/*!*************************************************************!*\
    	  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
    	  \*************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
    	var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
    	var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

    	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

    	module.exports = function (it, TAG, STATIC) {
    	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    	  }
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/shared-key.js":
    	/*!******************************************************!*\
    	  !*** ./node_modules/core-js/internals/shared-key.js ***!
    	  \******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
    	var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

    	var keys = shared('keys');

    	module.exports = function (key) {
    	  return keys[key] || (keys[key] = uid(key));
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/shared.js":
    	/*!**************************************************!*\
    	  !*** ./node_modules/core-js/internals/shared.js ***!
    	  \**************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
    	var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

    	var SHARED = '__core-js_shared__';
    	var store = global[SHARED] || setGlobal(SHARED, {});

    	(module.exports = function (key, value) {
    	  return store[key] || (store[key] = value !== undefined ? value : {});
    	})('versions', []).push({
    	  version: '3.1.3',
    	  mode: IS_PURE ? 'pure' : 'global',
    	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/string-at.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/string-at.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
    	var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

    	// CONVERT_TO_STRING: true  -> String#at
    	// CONVERT_TO_STRING: false -> String#codePointAt
    	module.exports = function (that, pos, CONVERT_TO_STRING) {
    	  var S = String(requireObjectCoercible(that));
    	  var position = toInteger(pos);
    	  var size = S.length;
    	  var first, second;
    	  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    	  first = S.charCodeAt(position);
    	  return first < 0xD800 || first > 0xDBFF || position + 1 === size
    	    || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
    	      ? CONVERT_TO_STRING ? S.charAt(position) : first
    	      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/to-absolute-index.js":
    	/*!*************************************************************!*\
    	  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
    	  \*************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

    	var max = Math.max;
    	var min = Math.min;

    	// Helper for a popular repeating case of the spec:
    	// Let integer be ? ToInteger(index).
    	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
    	module.exports = function (index, length) {
    	  var integer = toInteger(index);
    	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/to-indexed-object.js":
    	/*!*************************************************************!*\
    	  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
    	  \*************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	// toObject with fallback for non-array-like ES3 strings
    	var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
    	var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

    	module.exports = function (it) {
    	  return IndexedObject(requireObjectCoercible(it));
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/to-integer.js":
    	/*!******************************************************!*\
    	  !*** ./node_modules/core-js/internals/to-integer.js ***!
    	  \******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	var ceil = Math.ceil;
    	var floor = Math.floor;

    	// `ToInteger` abstract operation
    	// https://tc39.github.io/ecma262/#sec-tointeger
    	module.exports = function (argument) {
    	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/to-length.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/to-length.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

    	var min = Math.min;

    	// `ToLength` abstract operation
    	// https://tc39.github.io/ecma262/#sec-tolength
    	module.exports = function (argument) {
    	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/to-object.js":
    	/*!*****************************************************!*\
    	  !*** ./node_modules/core-js/internals/to-object.js ***!
    	  \*****************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

    	// `ToObject` abstract operation
    	// https://tc39.github.io/ecma262/#sec-toobject
    	module.exports = function (argument) {
    	  return Object(requireObjectCoercible(argument));
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/to-primitive.js":
    	/*!********************************************************!*\
    	  !*** ./node_modules/core-js/internals/to-primitive.js ***!
    	  \********************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

    	// 7.1.1 ToPrimitive(input [, PreferredType])
    	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
    	// and the second argument - flag - preferred type is a string
    	module.exports = function (it, S) {
    	  if (!isObject(it)) return it;
    	  var fn, val;
    	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
    	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    	  throw TypeError("Can't convert object to primitive value");
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/uid.js":
    	/*!***********************************************!*\
    	  !*** ./node_modules/core-js/internals/uid.js ***!
    	  \***********************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	var id = 0;
    	var postfix = Math.random();

    	module.exports = function (key) {
    	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js":
    	/*!*******************************************************************************!*\
    	  !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
    	  \*******************************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
    	var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

    	module.exports = function (O, proto) {
    	  anObject(O);
    	  if (!isObject(proto) && proto !== null) {
    	    throw TypeError("Can't set " + String(proto) + ' as a prototype');
    	  }
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/internals/well-known-symbol.js":
    	/*!*************************************************************!*\
    	  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
    	  \*************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
    	var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
    	var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
    	var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

    	var Symbol = global.Symbol;
    	var store = shared('wks');

    	module.exports = function (name) {
    	  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    	    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
    	};


    	/***/ }),

    	/***/ "./node_modules/core-js/modules/es.array.from.js":
    	/*!*******************************************************!*\
    	  !*** ./node_modules/core-js/modules/es.array.from.js ***!
    	  \*******************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
    	var from = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");
    	var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

    	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    	  Array.from(iterable);
    	});

    	// `Array.from` method
    	// https://tc39.github.io/ecma262/#sec-array.from
    	$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    	  from: from
    	});


    	/***/ }),

    	/***/ "./node_modules/core-js/modules/es.string.iterator.js":
    	/*!************************************************************!*\
    	  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
    	  \************************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	var codePointAt = __webpack_require__(/*! ../internals/string-at */ "./node_modules/core-js/internals/string-at.js");
    	var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
    	var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

    	var STRING_ITERATOR = 'String Iterator';
    	var setInternalState = InternalStateModule.set;
    	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

    	// `String.prototype[@@iterator]` method
    	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
    	defineIterator(String, 'String', function (iterated) {
    	  setInternalState(this, {
    	    type: STRING_ITERATOR,
    	    string: String(iterated),
    	    index: 0
    	  });
    	// `%StringIteratorPrototype%.next` method
    	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
    	}, function next() {
    	  var state = getInternalState(this);
    	  var string = state.string;
    	  var index = state.index;
    	  var point;
    	  if (index >= string.length) return { value: undefined, done: true };
    	  point = codePointAt(string, index, true);
    	  state.index += point.length;
    	  return { value: point, done: false };
    	});


    	/***/ }),

    	/***/ "./node_modules/webpack/buildin/global.js":
    	/*!***********************************!*\
    	  !*** (webpack)/buildin/global.js ***!
    	  \***********************************/
    	/*! no static exports found */
    	/***/ (function(module, exports) {

    	var g;

    	// This works in non-strict mode
    	g = (function() {
    		return this;
    	})();

    	try {
    		// This works if eval is allowed (see CSP)
    		g = g || Function("return this")() || (1, eval)("this");
    	} catch (e) {
    		// This works if the window reference is available
    		if (typeof window === "object") g = window;
    	}

    	// g can still be undefined, but nothing to do about it...
    	// We return undefined, instead of nothing here, so it's
    	// easier to handle this case. if(!global) { ...}

    	module.exports = g;


    	/***/ }),

    	/***/ "./src/default-attrs.json":
    	/*!********************************!*\
    	  !*** ./src/default-attrs.json ***!
    	  \********************************/
    	/*! exports provided: xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin, default */
    	/***/ (function(module) {

    	module.exports = {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};

    	/***/ }),

    	/***/ "./src/icon.js":
    	/*!*********************!*\
    	  !*** ./src/icon.js ***!
    	  \*********************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {


    	Object.defineProperty(exports, "__esModule", {
    	  value: true
    	});

    	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    	var _dedupe = __webpack_require__(/*! classnames/dedupe */ "./node_modules/classnames/dedupe.js");

    	var _dedupe2 = _interopRequireDefault(_dedupe);

    	var _defaultAttrs = __webpack_require__(/*! ./default-attrs.json */ "./src/default-attrs.json");

    	var _defaultAttrs2 = _interopRequireDefault(_defaultAttrs);

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    	var Icon = function () {
    	  function Icon(name, contents) {
    	    var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    	    _classCallCheck(this, Icon);

    	    this.name = name;
    	    this.contents = contents;
    	    this.tags = tags;
    	    this.attrs = _extends({}, _defaultAttrs2.default, { class: 'feather feather-' + name });
    	  }

    	  /**
    	   * Create an SVG string.
    	   * @param {Object} attrs
    	   * @returns {string}
    	   */


    	  _createClass(Icon, [{
    	    key: 'toSvg',
    	    value: function toSvg() {
    	      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    	      var combinedAttrs = _extends({}, this.attrs, attrs, { class: (0, _dedupe2.default)(this.attrs.class, attrs.class) });

    	      return '<svg ' + attrsToString(combinedAttrs) + '>' + this.contents + '</svg>';
    	    }

    	    /**
    	     * Return string representation of an `Icon`.
    	     *
    	     * Added for backward compatibility. If old code expects `feather.icons.<name>`
    	     * to be a string, `toString()` will get implicitly called.
    	     *
    	     * @returns {string}
    	     */

    	  }, {
    	    key: 'toString',
    	    value: function toString() {
    	      return this.contents;
    	    }
    	  }]);

    	  return Icon;
    	}();

    	/**
    	 * Convert attributes object to string of HTML attributes.
    	 * @param {Object} attrs
    	 * @returns {string}
    	 */


    	function attrsToString(attrs) {
    	  return Object.keys(attrs).map(function (key) {
    	    return key + '="' + attrs[key] + '"';
    	  }).join(' ');
    	}

    	exports.default = Icon;

    	/***/ }),

    	/***/ "./src/icons.js":
    	/*!**********************!*\
    	  !*** ./src/icons.js ***!
    	  \**********************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {


    	Object.defineProperty(exports, "__esModule", {
    	  value: true
    	});

    	var _icon = __webpack_require__(/*! ./icon */ "./src/icon.js");

    	var _icon2 = _interopRequireDefault(_icon);

    	var _icons = __webpack_require__(/*! ../dist/icons.json */ "./dist/icons.json");

    	var _icons2 = _interopRequireDefault(_icons);

    	var _tags = __webpack_require__(/*! ./tags.json */ "./src/tags.json");

    	var _tags2 = _interopRequireDefault(_tags);

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    	exports.default = Object.keys(_icons2.default).map(function (key) {
    	  return new _icon2.default(key, _icons2.default[key], _tags2.default[key]);
    	}).reduce(function (object, icon) {
    	  object[icon.name] = icon;
    	  return object;
    	}, {});

    	/***/ }),

    	/***/ "./src/index.js":
    	/*!**********************!*\
    	  !*** ./src/index.js ***!
    	  \**********************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {


    	var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

    	var _icons2 = _interopRequireDefault(_icons);

    	var _toSvg = __webpack_require__(/*! ./to-svg */ "./src/to-svg.js");

    	var _toSvg2 = _interopRequireDefault(_toSvg);

    	var _replace = __webpack_require__(/*! ./replace */ "./src/replace.js");

    	var _replace2 = _interopRequireDefault(_replace);

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    	module.exports = { icons: _icons2.default, toSvg: _toSvg2.default, replace: _replace2.default };

    	/***/ }),

    	/***/ "./src/replace.js":
    	/*!************************!*\
    	  !*** ./src/replace.js ***!
    	  \************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {


    	Object.defineProperty(exports, "__esModule", {
    	  value: true
    	});

    	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env browser */


    	var _dedupe = __webpack_require__(/*! classnames/dedupe */ "./node_modules/classnames/dedupe.js");

    	var _dedupe2 = _interopRequireDefault(_dedupe);

    	var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

    	var _icons2 = _interopRequireDefault(_icons);

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    	/**
    	 * Replace all HTML elements that have a `data-feather` attribute with SVG markup
    	 * corresponding to the element's `data-feather` attribute value.
    	 * @param {Object} attrs
    	 */
    	function replace() {
    	  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    	  if (typeof document === 'undefined') {
    	    throw new Error('`feather.replace()` only works in a browser environment.');
    	  }

    	  var elementsToReplace = document.querySelectorAll('[data-feather]');

    	  Array.from(elementsToReplace).forEach(function (element) {
    	    return replaceElement(element, attrs);
    	  });
    	}

    	/**
    	 * Replace a single HTML element with SVG markup
    	 * corresponding to the element's `data-feather` attribute value.
    	 * @param {HTMLElement} element
    	 * @param {Object} attrs
    	 */
    	function replaceElement(element) {
    	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    	  var elementAttrs = getAttrs(element);
    	  var name = elementAttrs['data-feather'];
    	  delete elementAttrs['data-feather'];

    	  var svgString = _icons2.default[name].toSvg(_extends({}, attrs, elementAttrs, { class: (0, _dedupe2.default)(attrs.class, elementAttrs.class) }));
    	  var svgDocument = new DOMParser().parseFromString(svgString, 'image/svg+xml');
    	  var svgElement = svgDocument.querySelector('svg');

    	  element.parentNode.replaceChild(svgElement, element);
    	}

    	/**
    	 * Get the attributes of an HTML element.
    	 * @param {HTMLElement} element
    	 * @returns {Object}
    	 */
    	function getAttrs(element) {
    	  return Array.from(element.attributes).reduce(function (attrs, attr) {
    	    attrs[attr.name] = attr.value;
    	    return attrs;
    	  }, {});
    	}

    	exports.default = replace;

    	/***/ }),

    	/***/ "./src/tags.json":
    	/*!***********************!*\
    	  !*** ./src/tags.json ***!
    	  \***********************/
    	/*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, archive, at-sign, award, aperture, bar-chart, bar-chart-2, battery, battery-charging, bell, bell-off, bluetooth, book-open, book, bookmark, box, briefcase, calendar, camera, cast, chevron-down, chevron-up, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-rain, cloud-snow, cloud, codepen, codesandbox, code, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, dollar-sign, droplet, edit, edit-2, edit-3, eye, eye-off, external-link, facebook, fast-forward, figma, file-minus, file-plus, file-text, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, instagram, key, layers, layout, life-buoy, link, link-2, linkedin, list, lock, log-in, log-out, mail, map-pin, map, maximize, maximize-2, meh, menu, message-circle, message-square, mic-off, mic, minimize, minimize-2, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation, navigation-2, octagon, package, paperclip, pause, pause-circle, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, play, pie-chart, play-circle, plus, plus-circle, plus-square, pocket, power, printer, radio, refresh-cw, refresh-ccw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, settings, share-2, shield, shield-off, shopping-bag, shopping-cart, shuffle, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash, trash-2, triangle, truck, tv, twitch, twitter, type, umbrella, unlock, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume, volume-1, volume-2, volume-x, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
    	/***/ (function(module) {

    	module.exports = {"activity":["pulse","health","action","motion"],"airplay":["stream","cast","mirroring"],"alert-circle":["warning","alert","danger"],"alert-octagon":["warning","alert","danger"],"alert-triangle":["warning","alert","danger"],"align-center":["text alignment","center"],"align-justify":["text alignment","justified"],"align-left":["text alignment","left"],"align-right":["text alignment","right"],"anchor":[],"archive":["index","box"],"at-sign":["mention","at","email","message"],"award":["achievement","badge"],"aperture":["camera","photo"],"bar-chart":["statistics","diagram","graph"],"bar-chart-2":["statistics","diagram","graph"],"battery":["power","electricity"],"battery-charging":["power","electricity"],"bell":["alarm","notification","sound"],"bell-off":["alarm","notification","silent"],"bluetooth":["wireless"],"book-open":["read","library"],"book":["read","dictionary","booklet","magazine","library"],"bookmark":["read","clip","marker","tag"],"box":["cube"],"briefcase":["work","bag","baggage","folder"],"calendar":["date"],"camera":["photo"],"cast":["chromecast","airplay"],"chevron-down":["expand"],"chevron-up":["collapse"],"circle":["off","zero","record"],"clipboard":["copy"],"clock":["time","watch","alarm"],"cloud-drizzle":["weather","shower"],"cloud-lightning":["weather","bolt"],"cloud-rain":["weather"],"cloud-snow":["weather","blizzard"],"cloud":["weather"],"codepen":["logo"],"codesandbox":["logo"],"code":["source","programming"],"coffee":["drink","cup","mug","tea","cafe","hot","beverage"],"columns":["layout"],"command":["keyboard","cmd","terminal","prompt"],"compass":["navigation","safari","travel","direction"],"copy":["clone","duplicate"],"corner-down-left":["arrow","return"],"corner-down-right":["arrow"],"corner-left-down":["arrow"],"corner-left-up":["arrow"],"corner-right-down":["arrow"],"corner-right-up":["arrow"],"corner-up-left":["arrow"],"corner-up-right":["arrow"],"cpu":["processor","technology"],"credit-card":["purchase","payment","cc"],"crop":["photo","image"],"crosshair":["aim","target"],"database":["storage","memory"],"delete":["remove"],"disc":["album","cd","dvd","music"],"dollar-sign":["currency","money","payment"],"droplet":["water"],"edit":["pencil","change"],"edit-2":["pencil","change"],"edit-3":["pencil","change"],"eye":["view","watch"],"eye-off":["view","watch","hide","hidden"],"external-link":["outbound"],"facebook":["logo","social"],"fast-forward":["music"],"figma":["logo","design","tool"],"file-minus":["delete","remove","erase"],"file-plus":["add","create","new"],"file-text":["data","txt","pdf"],"film":["movie","video"],"filter":["funnel","hopper"],"flag":["report"],"folder-minus":["directory"],"folder-plus":["directory"],"folder":["directory"],"framer":["logo","design","tool"],"frown":["emoji","face","bad","sad","emotion"],"gift":["present","box","birthday","party"],"git-branch":["code","version control"],"git-commit":["code","version control"],"git-merge":["code","version control"],"git-pull-request":["code","version control"],"github":["logo","version control"],"gitlab":["logo","version control"],"globe":["world","browser","language","translate"],"hard-drive":["computer","server","memory","data"],"hash":["hashtag","number","pound"],"headphones":["music","audio","sound"],"heart":["like","love","emotion"],"help-circle":["question mark"],"hexagon":["shape","node.js","logo"],"home":["house","living"],"image":["picture"],"inbox":["email"],"instagram":["logo","camera"],"key":["password","login","authentication","secure"],"layers":["stack"],"layout":["window","webpage"],"life-buoy":["help","life ring","support"],"link":["chain","url"],"link-2":["chain","url"],"linkedin":["logo","social media"],"list":["options"],"lock":["security","password","secure"],"log-in":["sign in","arrow","enter"],"log-out":["sign out","arrow","exit"],"mail":["email","message"],"map-pin":["location","navigation","travel","marker"],"map":["location","navigation","travel"],"maximize":["fullscreen"],"maximize-2":["fullscreen","arrows","expand"],"meh":["emoji","face","neutral","emotion"],"menu":["bars","navigation","hamburger"],"message-circle":["comment","chat"],"message-square":["comment","chat"],"mic-off":["record","sound","mute"],"mic":["record","sound","listen"],"minimize":["exit fullscreen","close"],"minimize-2":["exit fullscreen","arrows","close"],"minus":["subtract"],"monitor":["tv","screen","display"],"moon":["dark","night"],"more-horizontal":["ellipsis"],"more-vertical":["ellipsis"],"mouse-pointer":["arrow","cursor"],"move":["arrows"],"music":["note"],"navigation":["location","travel"],"navigation-2":["location","travel"],"octagon":["stop"],"package":["box","container"],"paperclip":["attachment"],"pause":["music","stop"],"pause-circle":["music","audio","stop"],"pen-tool":["vector","drawing"],"percent":["discount"],"phone-call":["ring"],"phone-forwarded":["call"],"phone-incoming":["call"],"phone-missed":["call"],"phone-off":["call","mute"],"phone-outgoing":["call"],"phone":["call"],"play":["music","start"],"pie-chart":["statistics","diagram"],"play-circle":["music","start"],"plus":["add","new"],"plus-circle":["add","new"],"plus-square":["add","new"],"pocket":["logo","save"],"power":["on","off"],"printer":["fax","office","device"],"radio":["signal"],"refresh-cw":["synchronise","arrows"],"refresh-ccw":["arrows"],"repeat":["loop","arrows"],"rewind":["music"],"rotate-ccw":["arrow"],"rotate-cw":["arrow"],"rss":["feed","subscribe"],"save":["floppy disk"],"scissors":["cut"],"search":["find","magnifier","magnifying glass"],"send":["message","mail","email","paper airplane","paper aeroplane"],"settings":["cog","edit","gear","preferences"],"share-2":["network","connections"],"shield":["security","secure"],"shield-off":["security","insecure"],"shopping-bag":["ecommerce","cart","purchase","store"],"shopping-cart":["ecommerce","cart","purchase","store"],"shuffle":["music"],"skip-back":["music"],"skip-forward":["music"],"slack":["logo"],"slash":["ban","no"],"sliders":["settings","controls"],"smartphone":["cellphone","device"],"smile":["emoji","face","happy","good","emotion"],"speaker":["audio","music"],"star":["bookmark","favorite","like"],"stop-circle":["media","music"],"sun":["brightness","weather","light"],"sunrise":["weather","time","morning","day"],"sunset":["weather","time","evening","night"],"tablet":["device"],"tag":["label"],"target":["logo","bullseye"],"terminal":["code","command line","prompt"],"thermometer":["temperature","celsius","fahrenheit","weather"],"thumbs-down":["dislike","bad","emotion"],"thumbs-up":["like","good","emotion"],"toggle-left":["on","off","switch"],"toggle-right":["on","off","switch"],"tool":["settings","spanner"],"trash":["garbage","delete","remove","bin"],"trash-2":["garbage","delete","remove","bin"],"triangle":["delta"],"truck":["delivery","van","shipping","transport","lorry"],"tv":["television","stream"],"twitch":["logo"],"twitter":["logo","social"],"type":["text"],"umbrella":["rain","weather"],"unlock":["security"],"user-check":["followed","subscribed"],"user-minus":["delete","remove","unfollow","unsubscribe"],"user-plus":["new","add","create","follow","subscribe"],"user-x":["delete","remove","unfollow","unsubscribe","unavailable"],"user":["person","account"],"users":["group"],"video-off":["camera","movie","film"],"video":["camera","movie","film"],"voicemail":["phone"],"volume":["music","sound","mute"],"volume-1":["music","sound"],"volume-2":["music","sound"],"volume-x":["music","sound","mute"],"watch":["clock","time"],"wifi-off":["disabled"],"wifi":["connection","signal","wireless"],"wind":["weather","air"],"x-circle":["cancel","close","delete","remove","times","clear"],"x-octagon":["delete","stop","alert","warning","times","clear"],"x-square":["cancel","close","delete","remove","times","clear"],"x":["cancel","close","delete","remove","times","clear"],"youtube":["logo","video","play"],"zap-off":["flash","camera","lightning"],"zap":["flash","camera","lightning"],"zoom-in":["magnifying glass"],"zoom-out":["magnifying glass"]};

    	/***/ }),

    	/***/ "./src/to-svg.js":
    	/*!***********************!*\
    	  !*** ./src/to-svg.js ***!
    	  \***********************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {


    	Object.defineProperty(exports, "__esModule", {
    	  value: true
    	});

    	var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

    	var _icons2 = _interopRequireDefault(_icons);

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    	/**
    	 * Create an SVG string.
    	 * @deprecated
    	 * @param {string} name
    	 * @param {Object} attrs
    	 * @returns {string}
    	 */
    	function toSvg(name) {
    	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    	  console.warn('feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead.');

    	  if (!name) {
    	    throw new Error('The required `key` (icon name) parameter is missing.');
    	  }

    	  if (!_icons2.default[name]) {
    	    throw new Error('No icon matching \'' + name + '\'. See the complete list of icons at https://feathericons.com');
    	  }

    	  return _icons2.default[name].toSvg(attrs);
    	}

    	exports.default = toSvg;

    	/***/ }),

    	/***/ 0:
    	/*!**************************************************!*\
    	  !*** multi core-js/es/array/from ./src/index.js ***!
    	  \**************************************************/
    	/*! no static exports found */
    	/***/ (function(module, exports, __webpack_require__) {

    	__webpack_require__(/*! core-js/es/array/from */"./node_modules/core-js/es/array/from.js");
    	module.exports = __webpack_require__(/*! /home/runner/work/feather/feather/src/index.js */"./src/index.js");


    	/***/ })

    	/******/ });
    	});
    	
    } (feather$2));

    var featherExports = feather$2.exports;
    var feather = /*@__PURE__*/getDefaultExportFromCjs(featherExports);

    var feather$1 = /*#__PURE__*/_mergeNamespaces({
        __proto__: null,
        default: feather
    }, [featherExports]);

    /* src\components\CoolButton.svelte generated by Svelte v3.59.2 */

    const file$d = "src\\components\\CoolButton.svelte";

    function create_fragment$d(ctx) {
    	let button;
    	let t;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(/*text*/ ctx[0]);
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(`button ${/*size*/ ctx[2]}`) + " svelte-1abt88r"));
    			add_location(button, file$d, 13, 0, 251);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*onClick*/ ctx[1])) /*onClick*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*text*/ 1) set_data_dev(t, /*text*/ ctx[0]);

    			if (dirty & /*size*/ 4 && button_class_value !== (button_class_value = "" + (null_to_empty(`button ${/*size*/ ctx[2]}`) + " svelte-1abt88r"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CoolButton', slots, []);
    	let { text } = $$props;
    	let { onClick } = $$props;
    	let { size = 'medium' } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
    			console.warn("<CoolButton> was created without expected prop 'text'");
    		}

    		if (onClick === undefined && !('onClick' in $$props || $$self.$$.bound[$$self.$$.props['onClick']])) {
    			console.warn("<CoolButton> was created without expected prop 'onClick'");
    		}
    	});

    	const writable_props = ['text', 'onClick', 'size'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CoolButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('onClick' in $$props) $$invalidate(1, onClick = $$props.onClick);
    		if ('size' in $$props) $$invalidate(2, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({ text, onClick, size });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('onClick' in $$props) $$invalidate(1, onClick = $$props.onClick);
    		if ('size' in $$props) $$invalidate(2, size = $$props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, onClick, size];
    }

    class CoolButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { text: 0, onClick: 1, size: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CoolButton",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get text() {
    		throw new Error("<CoolButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<CoolButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClick() {
    		throw new Error("<CoolButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClick(value) {
    		throw new Error("<CoolButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<CoolButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<CoolButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\InfoCard.svelte generated by Svelte v3.59.2 */
    const file$c = "src\\components\\InfoCard.svelte";

    function create_fragment$c(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let h5;
    	let t2;
    	let p;
    	let t4;
    	let coolbutton;
    	let current;

    	coolbutton = new CoolButton({
    			props: {
    				text: "Does Something",
    				onClick: /*handleClick*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			h5 = element("h5");
    			h5.textContent = "Card title";
    			t2 = space();
    			p = element("p");
    			p.textContent = "This will become a reusable card component";
    			t4 = space();
    			create_component(coolbutton.$$.fragment);
    			if (!src_url_equal(img.src, img_src_value = "/images/hyunjin-stray-kids.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "card-img-top svelte-o692v");
    			attr_dev(img, "alt", "No image");
    			add_location(img, file$c, 14, 1, 283);
    			attr_dev(h5, "class", "card-title svelte-o692v");
    			add_location(h5, file$c, 16, 2, 393);
    			attr_dev(p, "class", "card-text svelte-o692v");
    			add_location(p, file$c, 17, 2, 435);
    			attr_dev(div0, "class", "card-body svelte-o692v");
    			add_location(div0, file$c, 15, 1, 366);
    			attr_dev(div1, "class", "card svelte-o692v");
    			add_location(div1, file$c, 13, 0, 262);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h5);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(div0, t4);
    			mount_component(coolbutton, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(coolbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(coolbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(coolbutton);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('InfoCard', slots, []);

    	const handleClick = () => {
    		alert('greetings my dude');
    	}; //for debugging

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<InfoCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ CoolButton, handleClick });
    	return [handleClick];
    }

    class InfoCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InfoCard",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\components\InputBox.svelte generated by Svelte v3.59.2 */
    const file$b = "src\\components\\InputBox.svelte";

    function create_fragment$b(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t0 = text(/*label*/ ctx[0]);
    			t1 = space();
    			input = element("input");
    			add_location(label_1, file$b, 28, 0, 692);
    			attr_dev(input, "type", /*type*/ ctx[1]);
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[2]);
    			input.disabled = /*disabled*/ ctx[3];
    			input.required = /*required*/ ctx[4];
    			add_location(input, file$b, 29, 0, 716);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*handleInput*/ ctx[5], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*label*/ 1) set_data_dev(t0, /*label*/ ctx[0]);

    			if (dirty & /*type*/ 2) {
    				attr_dev(input, "type", /*type*/ ctx[1]);
    			}

    			if (dirty & /*placeholder*/ 4) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[2]);
    			}

    			if (dirty & /*disabled*/ 8) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (dirty & /*required*/ 16) {
    				prop_dev(input, "required", /*required*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('InputBox', slots, []);
    	let { label = "" } = $$props;
    	let { value = "" } = $$props;
    	let { type = "text" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { required = false } = $$props;
    	const dispatch = createEventDispatcher();

    	const handleInput = e => {
    		$$invalidate(6, value = e.target.value);
    		dispatch("input", { value });
    	};

    	const writable_props = ['label', 'value', 'type', 'placeholder', 'disabled', 'required'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<InputBox> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('value' in $$props) $$invalidate(6, value = $$props.value);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ('required' in $$props) $$invalidate(4, required = $$props.required);
    	};

    	$$self.$capture_state = () => ({
    		label,
    		value,
    		type,
    		placeholder,
    		disabled,
    		required,
    		createEventDispatcher,
    		dispatch,
    		handleInput
    	});

    	$$self.$inject_state = $$props => {
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('value' in $$props) $$invalidate(6, value = $$props.value);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ('required' in $$props) $$invalidate(4, required = $$props.required);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [label, type, placeholder, disabled, required, handleInput, value];
    }

    class InputBox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			label: 0,
    			value: 6,
    			type: 1,
    			placeholder: 2,
    			disabled: 3,
    			required: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InputBox",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get label() {
    		throw new Error("<InputBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<InputBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<InputBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<InputBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<InputBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<InputBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<InputBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<InputBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<InputBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<InputBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<InputBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<InputBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Navbar.svelte generated by Svelte v3.59.2 */
    const file$a = "src\\components\\Navbar.svelte";

    function create_fragment$a(ctx) {
    	let main;
    	let div1;
    	let a0;
    	let t1;
    	let div0;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let a3;
    	let t7;
    	let a4;
    	let t9;
    	let input;
    	let t10;
    	let a5;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "Tix";
    			t1 = space();
    			div0 = element("div");
    			a1 = element("a");
    			a1.textContent = "Help";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "About";
    			t5 = space();
    			a3 = element("a");
    			a3.textContent = "Events";
    			t7 = space();
    			a4 = element("a");
    			a4.textContent = "FAQ";
    			t9 = space();
    			input = element("input");
    			t10 = space();
    			a5 = element("a");
    			a5.textContent = "Sign up/Log in";
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "icon svelte-1v4wp7e");
    			add_location(a0, file$a, 59, 8, 1273);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-1v4wp7e");
    			add_location(a1, file$a, 65, 12, 1414);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "svelte-1v4wp7e");
    			add_location(a2, file$a, 66, 12, 1448);
    			attr_dev(a3, "href", "/");
    			attr_dev(a3, "class", "svelte-1v4wp7e");
    			add_location(a3, file$a, 67, 12, 1483);
    			attr_dev(a4, "href", "/");
    			attr_dev(a4, "class", "svelte-1v4wp7e");
    			add_location(a4, file$a, 68, 12, 1519);
    			attr_dev(div0, "class", "wrapper1 svelte-1v4wp7e");
    			add_location(div0, file$a, 63, 8, 1341);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "search-bar svelte-1v4wp7e");
    			attr_dev(input, "placeholder", "Search...");
    			add_location(input, file$a, 72, 8, 1605);
    			attr_dev(a5, "href", "/");
    			attr_dev(a5, "class", "svelte-1v4wp7e");
    			add_location(a5, file$a, 74, 8, 1683);
    			attr_dev(div1, "class", "navbar navbar-expand nav-line svelte-1v4wp7e");
    			add_location(div1, file$a, 58, 4, 1220);
    			attr_dev(main, "class", "svelte-1v4wp7e");
    			add_location(main, file$a, 57, 0, 1208);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, a1);
    			append_dev(div0, t3);
    			append_dev(div0, a2);
    			append_dev(div0, t5);
    			append_dev(div0, a3);
    			append_dev(div0, t7);
    			append_dev(div0, a4);
    			append_dev(div1, t9);
    			append_dev(div1, input);
    			append_dev(div1, t10);
    			append_dev(div1, a5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ feather: feather$1, InfoCard, InputBox });
    	return [];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Footer.svelte generated by Svelte v3.59.2 */

    const file$9 = "src\\components\\Footer.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			p0.textContent = "This is the footer of your website.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "© 2023 TixHelp. All rights reserved.";
    			add_location(p0, file$9, 20, 4, 373);
    			add_location(p1, file$9, 21, 4, 421);
    			attr_dev(div, "class", "footer svelte-1fvfbf0");
    			add_location(div, file$9, 19, 0, 347);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    var bootstrap = {exports: {}};

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function getUAString() {
      var uaData = navigator.userAgentData;

      if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands.map(function (item) {
          return item.brand + "/" + item.version;
        }).join(' ');
      }

      return navigator.userAgent;
    }

    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }

    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }

      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
      }

      var _ref = isElement(element) ? getWindow(element) : window,
          visualViewport = _ref.visualViewport;

      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width: width,
        height: height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x: x,
        y: y
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {
        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref, win) {
      var x = _ref.x,
          y = _ref.y;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;

      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }, getWindow(popper)) : {
        x: x,
        y: y
      };

      x = _ref4.x;
      y = _ref4.y;

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element, strategy) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();

        if (layoutViewport || !layoutViewport && strategy === 'fixed') {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === 'fixed');
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$strategy = _options.strategy,
          strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var _offsetModifierState$;

        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = offset + overflow[mainSide];
        var max$1 = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _offsetModifierState$2;

        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _len = altAxis === 'y' ? 'height' : 'width';

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            });
            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {
              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });

            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {
          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref) {
            var name = _ref.name,
                _ref$options = _ref.options,
                options = _ref$options === void 0 ? {} : _ref$options,
                effect = _ref.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }
    var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers$1
    }); // eslint-disable-next-line import/no-unused-modules

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    var lib = /*#__PURE__*/Object.freeze({
        __proto__: null,
        afterMain: afterMain,
        afterRead: afterRead,
        afterWrite: afterWrite,
        applyStyles: applyStyles$1,
        arrow: arrow$1,
        auto: auto,
        basePlacements: basePlacements,
        beforeMain: beforeMain,
        beforeRead: beforeRead,
        beforeWrite: beforeWrite,
        bottom: bottom,
        clippingParents: clippingParents,
        computeStyles: computeStyles$1,
        createPopper: createPopper,
        createPopperBase: createPopper$2,
        createPopperLite: createPopper$1,
        detectOverflow: detectOverflow,
        end: end,
        eventListeners: eventListeners,
        flip: flip$1,
        hide: hide$1,
        left: left,
        main: main,
        modifierPhases: modifierPhases,
        offset: offset$1,
        placements: placements,
        popper: popper,
        popperGenerator: popperGenerator,
        popperOffsets: popperOffsets$1,
        preventOverflow: preventOverflow$1,
        read: read,
        reference: reference,
        right: right,
        start: start,
        top: top,
        variationPlacements: variationPlacements,
        viewport: viewport,
        write: write
    });

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

    /*!
      * Bootstrap v5.3.1 (https://getbootstrap.com/)
      * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    (function (module, exports) {
    	(function (global, factory) {
    	  module.exports = factory(require$$0) ;
    	})(commonjsGlobal, (function (Popper) {
    	  function _interopNamespaceDefault(e) {
    	    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    	    if (e) {
    	      for (const k in e) {
    	        if (k !== 'default') {
    	          const d = Object.getOwnPropertyDescriptor(e, k);
    	          Object.defineProperty(n, k, d.get ? d : {
    	            enumerable: true,
    	            get: () => e[k]
    	          });
    	        }
    	      }
    	    }
    	    n.default = e;
    	    return Object.freeze(n);
    	  }

    	  const Popper__namespace = /*#__PURE__*/_interopNamespaceDefault(Popper);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap dom/data.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  /**
    	   * Constants
    	   */

    	  const elementMap = new Map();
    	  const Data = {
    	    set(element, key, instance) {
    	      if (!elementMap.has(element)) {
    	        elementMap.set(element, new Map());
    	      }
    	      const instanceMap = elementMap.get(element);

    	      // make it clear we only want one instance per element
    	      // can be removed later when multiple key/instances are fine to be used
    	      if (!instanceMap.has(key) && instanceMap.size !== 0) {
    	        // eslint-disable-next-line no-console
    	        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
    	        return;
    	      }
    	      instanceMap.set(key, instance);
    	    },
    	    get(element, key) {
    	      if (elementMap.has(element)) {
    	        return elementMap.get(element).get(key) || null;
    	      }
    	      return null;
    	    },
    	    remove(element, key) {
    	      if (!elementMap.has(element)) {
    	        return;
    	      }
    	      const instanceMap = elementMap.get(element);
    	      instanceMap.delete(key);

    	      // free up element references if there are no instances left for an element
    	      if (instanceMap.size === 0) {
    	        elementMap.delete(element);
    	      }
    	    }
    	  };

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/index.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  const MAX_UID = 1000000;
    	  const MILLISECONDS_MULTIPLIER = 1000;
    	  const TRANSITION_END = 'transitionend';

    	  /**
    	   * Properly escape IDs selectors to handle weird IDs
    	   * @param {string} selector
    	   * @returns {string}
    	   */
    	  const parseSelector = selector => {
    	    if (selector && window.CSS && window.CSS.escape) {
    	      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    	      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    	    }
    	    return selector;
    	  };

    	  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
    	  const toType = object => {
    	    if (object === null || object === undefined) {
    	      return `${object}`;
    	    }
    	    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
    	  };

    	  /**
    	   * Public Util API
    	   */

    	  const getUID = prefix => {
    	    do {
    	      prefix += Math.floor(Math.random() * MAX_UID);
    	    } while (document.getElementById(prefix));
    	    return prefix;
    	  };
    	  const getTransitionDurationFromElement = element => {
    	    if (!element) {
    	      return 0;
    	    }

    	    // Get transition-duration of the element
    	    let {
    	      transitionDuration,
    	      transitionDelay
    	    } = window.getComputedStyle(element);
    	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    	    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    	    // Return 0 if element or transition duration is not found
    	    if (!floatTransitionDuration && !floatTransitionDelay) {
    	      return 0;
    	    }

    	    // If multiple durations are defined, take the first
    	    transitionDuration = transitionDuration.split(',')[0];
    	    transitionDelay = transitionDelay.split(',')[0];
    	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    	  };
    	  const triggerTransitionEnd = element => {
    	    element.dispatchEvent(new Event(TRANSITION_END));
    	  };
    	  const isElement = object => {
    	    if (!object || typeof object !== 'object') {
    	      return false;
    	    }
    	    if (typeof object.jquery !== 'undefined') {
    	      object = object[0];
    	    }
    	    return typeof object.nodeType !== 'undefined';
    	  };
    	  const getElement = object => {
    	    // it's a jQuery object or a node element
    	    if (isElement(object)) {
    	      return object.jquery ? object[0] : object;
    	    }
    	    if (typeof object === 'string' && object.length > 0) {
    	      return document.querySelector(parseSelector(object));
    	    }
    	    return null;
    	  };
    	  const isVisible = element => {
    	    if (!isElement(element) || element.getClientRects().length === 0) {
    	      return false;
    	    }
    	    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    	    // Handle `details` element as its content may falsie appear visible when it is closed
    	    const closedDetails = element.closest('details:not([open])');
    	    if (!closedDetails) {
    	      return elementIsVisible;
    	    }
    	    if (closedDetails !== element) {
    	      const summary = element.closest('summary');
    	      if (summary && summary.parentNode !== closedDetails) {
    	        return false;
    	      }
    	      if (summary === null) {
    	        return false;
    	      }
    	    }
    	    return elementIsVisible;
    	  };
    	  const isDisabled = element => {
    	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    	      return true;
    	    }
    	    if (element.classList.contains('disabled')) {
    	      return true;
    	    }
    	    if (typeof element.disabled !== 'undefined') {
    	      return element.disabled;
    	    }
    	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
    	  };
    	  const findShadowRoot = element => {
    	    if (!document.documentElement.attachShadow) {
    	      return null;
    	    }

    	    // Can find the shadow root otherwise it'll return the document
    	    if (typeof element.getRootNode === 'function') {
    	      const root = element.getRootNode();
    	      return root instanceof ShadowRoot ? root : null;
    	    }
    	    if (element instanceof ShadowRoot) {
    	      return element;
    	    }

    	    // when we don't find a shadow root
    	    if (!element.parentNode) {
    	      return null;
    	    }
    	    return findShadowRoot(element.parentNode);
    	  };
    	  const noop = () => {};

    	  /**
    	   * Trick to restart an element's animation
    	   *
    	   * @param {HTMLElement} element
    	   * @return void
    	   *
    	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
    	   */
    	  const reflow = element => {
    	    element.offsetHeight; // eslint-disable-line no-unused-expressions
    	  };

    	  const getjQuery = () => {
    	    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    	      return window.jQuery;
    	    }
    	    return null;
    	  };
    	  const DOMContentLoadedCallbacks = [];
    	  const onDOMContentLoaded = callback => {
    	    if (document.readyState === 'loading') {
    	      // add listener on the first call when the document is in loading state
    	      if (!DOMContentLoadedCallbacks.length) {
    	        document.addEventListener('DOMContentLoaded', () => {
    	          for (const callback of DOMContentLoadedCallbacks) {
    	            callback();
    	          }
    	        });
    	      }
    	      DOMContentLoadedCallbacks.push(callback);
    	    } else {
    	      callback();
    	    }
    	  };
    	  const isRTL = () => document.documentElement.dir === 'rtl';
    	  const defineJQueryPlugin = plugin => {
    	    onDOMContentLoaded(() => {
    	      const $ = getjQuery();
    	      /* istanbul ignore if */
    	      if ($) {
    	        const name = plugin.NAME;
    	        const JQUERY_NO_CONFLICT = $.fn[name];
    	        $.fn[name] = plugin.jQueryInterface;
    	        $.fn[name].Constructor = plugin;
    	        $.fn[name].noConflict = () => {
    	          $.fn[name] = JQUERY_NO_CONFLICT;
    	          return plugin.jQueryInterface;
    	        };
    	      }
    	    });
    	  };
    	  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    	    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
    	  };
    	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    	    if (!waitForTransition) {
    	      execute(callback);
    	      return;
    	    }
    	    const durationPadding = 5;
    	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    	    let called = false;
    	    const handler = ({
    	      target
    	    }) => {
    	      if (target !== transitionElement) {
    	        return;
    	      }
    	      called = true;
    	      transitionElement.removeEventListener(TRANSITION_END, handler);
    	      execute(callback);
    	    };
    	    transitionElement.addEventListener(TRANSITION_END, handler);
    	    setTimeout(() => {
    	      if (!called) {
    	        triggerTransitionEnd(transitionElement);
    	      }
    	    }, emulatedDuration);
    	  };

    	  /**
    	   * Return the previous/next element of a list.
    	   *
    	   * @param {array} list    The list of elements
    	   * @param activeElement   The active element
    	   * @param shouldGetNext   Choose to get next or previous element
    	   * @param isCycleAllowed
    	   * @return {Element|elem} The proper element
    	   */
    	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    	    const listLength = list.length;
    	    let index = list.indexOf(activeElement);

    	    // if the element does not exist in the list return an element
    	    // depending on the direction and if cycle is allowed
    	    if (index === -1) {
    	      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    	    }
    	    index += shouldGetNext ? 1 : -1;
    	    if (isCycleAllowed) {
    	      index = (index + listLength) % listLength;
    	    }
    	    return list[Math.max(0, Math.min(index, listLength - 1))];
    	  };

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap dom/event-handler.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    	  const stripNameRegex = /\..*/;
    	  const stripUidRegex = /::\d+$/;
    	  const eventRegistry = {}; // Events storage
    	  let uidEvent = 1;
    	  const customEvents = {
    	    mouseenter: 'mouseover',
    	    mouseleave: 'mouseout'
    	  };
    	  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

    	  /**
    	   * Private methods
    	   */

    	  function makeEventUid(element, uid) {
    	    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
    	  }
    	  function getElementEvents(element) {
    	    const uid = makeEventUid(element);
    	    element.uidEvent = uid;
    	    eventRegistry[uid] = eventRegistry[uid] || {};
    	    return eventRegistry[uid];
    	  }
    	  function bootstrapHandler(element, fn) {
    	    return function handler(event) {
    	      hydrateObj(event, {
    	        delegateTarget: element
    	      });
    	      if (handler.oneOff) {
    	        EventHandler.off(element, event.type, fn);
    	      }
    	      return fn.apply(element, [event]);
    	    };
    	  }
    	  function bootstrapDelegationHandler(element, selector, fn) {
    	    return function handler(event) {
    	      const domElements = element.querySelectorAll(selector);
    	      for (let {
    	        target
    	      } = event; target && target !== this; target = target.parentNode) {
    	        for (const domElement of domElements) {
    	          if (domElement !== target) {
    	            continue;
    	          }
    	          hydrateObj(event, {
    	            delegateTarget: target
    	          });
    	          if (handler.oneOff) {
    	            EventHandler.off(element, event.type, selector, fn);
    	          }
    	          return fn.apply(target, [event]);
    	        }
    	      }
    	    };
    	  }
    	  function findHandler(events, callable, delegationSelector = null) {
    	    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
    	  }
    	  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    	    const isDelegated = typeof handler === 'string';
    	    // TODO: tooltip passes `false` instead of selector, so we need to check
    	    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    	    let typeEvent = getTypeEvent(originalTypeEvent);
    	    if (!nativeEvents.has(typeEvent)) {
    	      typeEvent = originalTypeEvent;
    	    }
    	    return [isDelegated, callable, typeEvent];
    	  }
    	  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    	    if (typeof originalTypeEvent !== 'string' || !element) {
    	      return;
    	    }
    	    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

    	    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    	    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    	    if (originalTypeEvent in customEvents) {
    	      const wrapFunction = fn => {
    	        return function (event) {
    	          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
    	            return fn.call(this, event);
    	          }
    	        };
    	      };
    	      callable = wrapFunction(callable);
    	    }
    	    const events = getElementEvents(element);
    	    const handlers = events[typeEvent] || (events[typeEvent] = {});
    	    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    	    if (previousFunction) {
    	      previousFunction.oneOff = previousFunction.oneOff && oneOff;
    	      return;
    	    }
    	    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    	    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    	    fn.delegationSelector = isDelegated ? handler : null;
    	    fn.callable = callable;
    	    fn.oneOff = oneOff;
    	    fn.uidEvent = uid;
    	    handlers[uid] = fn;
    	    element.addEventListener(typeEvent, fn, isDelegated);
    	  }
    	  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    	    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    	    if (!fn) {
    	      return;
    	    }
    	    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    	    delete events[typeEvent][fn.uidEvent];
    	  }
    	  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    	    const storeElementEvent = events[typeEvent] || {};
    	    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    	      if (handlerKey.includes(namespace)) {
    	        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    	      }
    	    }
    	  }
    	  function getTypeEvent(event) {
    	    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    	    event = event.replace(stripNameRegex, '');
    	    return customEvents[event] || event;
    	  }
    	  const EventHandler = {
    	    on(element, event, handler, delegationFunction) {
    	      addHandler(element, event, handler, delegationFunction, false);
    	    },
    	    one(element, event, handler, delegationFunction) {
    	      addHandler(element, event, handler, delegationFunction, true);
    	    },
    	    off(element, originalTypeEvent, handler, delegationFunction) {
    	      if (typeof originalTypeEvent !== 'string' || !element) {
    	        return;
    	      }
    	      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    	      const inNamespace = typeEvent !== originalTypeEvent;
    	      const events = getElementEvents(element);
    	      const storeElementEvent = events[typeEvent] || {};
    	      const isNamespace = originalTypeEvent.startsWith('.');
    	      if (typeof callable !== 'undefined') {
    	        // Simplest case: handler is passed, remove that listener ONLY.
    	        if (!Object.keys(storeElementEvent).length) {
    	          return;
    	        }
    	        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
    	        return;
    	      }
    	      if (isNamespace) {
    	        for (const elementEvent of Object.keys(events)) {
    	          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
    	        }
    	      }
    	      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
    	        const handlerKey = keyHandlers.replace(stripUidRegex, '');
    	        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
    	          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    	        }
    	      }
    	    },
    	    trigger(element, event, args) {
    	      if (typeof event !== 'string' || !element) {
    	        return null;
    	      }
    	      const $ = getjQuery();
    	      const typeEvent = getTypeEvent(event);
    	      const inNamespace = event !== typeEvent;
    	      let jQueryEvent = null;
    	      let bubbles = true;
    	      let nativeDispatch = true;
    	      let defaultPrevented = false;
    	      if (inNamespace && $) {
    	        jQueryEvent = $.Event(event, args);
    	        $(element).trigger(jQueryEvent);
    	        bubbles = !jQueryEvent.isPropagationStopped();
    	        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
    	        defaultPrevented = jQueryEvent.isDefaultPrevented();
    	      }
    	      const evt = hydrateObj(new Event(event, {
    	        bubbles,
    	        cancelable: true
    	      }), args);
    	      if (defaultPrevented) {
    	        evt.preventDefault();
    	      }
    	      if (nativeDispatch) {
    	        element.dispatchEvent(evt);
    	      }
    	      if (evt.defaultPrevented && jQueryEvent) {
    	        jQueryEvent.preventDefault();
    	      }
    	      return evt;
    	    }
    	  };
    	  function hydrateObj(obj, meta = {}) {
    	    for (const [key, value] of Object.entries(meta)) {
    	      try {
    	        obj[key] = value;
    	      } catch (_unused) {
    	        Object.defineProperty(obj, key, {
    	          configurable: true,
    	          get() {
    	            return value;
    	          }
    	        });
    	      }
    	    }
    	    return obj;
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap dom/manipulator.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  function normalizeData(value) {
    	    if (value === 'true') {
    	      return true;
    	    }
    	    if (value === 'false') {
    	      return false;
    	    }
    	    if (value === Number(value).toString()) {
    	      return Number(value);
    	    }
    	    if (value === '' || value === 'null') {
    	      return null;
    	    }
    	    if (typeof value !== 'string') {
    	      return value;
    	    }
    	    try {
    	      return JSON.parse(decodeURIComponent(value));
    	    } catch (_unused) {
    	      return value;
    	    }
    	  }
    	  function normalizeDataKey(key) {
    	    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
    	  }
    	  const Manipulator = {
    	    setDataAttribute(element, key, value) {
    	      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    	    },
    	    removeDataAttribute(element, key) {
    	      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    	    },
    	    getDataAttributes(element) {
    	      if (!element) {
    	        return {};
    	      }
    	      const attributes = {};
    	      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
    	      for (const key of bsKeys) {
    	        let pureKey = key.replace(/^bs/, '');
    	        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
    	        attributes[pureKey] = normalizeData(element.dataset[key]);
    	      }
    	      return attributes;
    	    },
    	    getDataAttribute(element, key) {
    	      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    	    }
    	  };

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/config.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Class definition
    	   */

    	  class Config {
    	    // Getters
    	    static get Default() {
    	      return {};
    	    }
    	    static get DefaultType() {
    	      return {};
    	    }
    	    static get NAME() {
    	      throw new Error('You have to implement the static method "NAME", for each component!');
    	    }
    	    _getConfig(config) {
    	      config = this._mergeConfigObj(config);
    	      config = this._configAfterMerge(config);
    	      this._typeCheckConfig(config);
    	      return config;
    	    }
    	    _configAfterMerge(config) {
    	      return config;
    	    }
    	    _mergeConfigObj(config, element) {
    	      const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

    	      return {
    	        ...this.constructor.Default,
    	        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
    	        ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
    	        ...(typeof config === 'object' ? config : {})
    	      };
    	    }
    	    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    	      for (const [property, expectedTypes] of Object.entries(configTypes)) {
    	        const value = config[property];
    	        const valueType = isElement(value) ? 'element' : toType(value);
    	        if (!new RegExp(expectedTypes).test(valueType)) {
    	          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
    	        }
    	      }
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap base-component.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const VERSION = '5.3.1';

    	  /**
    	   * Class definition
    	   */

    	  class BaseComponent extends Config {
    	    constructor(element, config) {
    	      super();
    	      element = getElement(element);
    	      if (!element) {
    	        return;
    	      }
    	      this._element = element;
    	      this._config = this._getConfig(config);
    	      Data.set(this._element, this.constructor.DATA_KEY, this);
    	    }

    	    // Public
    	    dispose() {
    	      Data.remove(this._element, this.constructor.DATA_KEY);
    	      EventHandler.off(this._element, this.constructor.EVENT_KEY);
    	      for (const propertyName of Object.getOwnPropertyNames(this)) {
    	        this[propertyName] = null;
    	      }
    	    }
    	    _queueCallback(callback, element, isAnimated = true) {
    	      executeAfterTransition(callback, element, isAnimated);
    	    }
    	    _getConfig(config) {
    	      config = this._mergeConfigObj(config, this._element);
    	      config = this._configAfterMerge(config);
    	      this._typeCheckConfig(config);
    	      return config;
    	    }

    	    // Static
    	    static getInstance(element) {
    	      return Data.get(getElement(element), this.DATA_KEY);
    	    }
    	    static getOrCreateInstance(element, config = {}) {
    	      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    	    }
    	    static get VERSION() {
    	      return VERSION;
    	    }
    	    static get DATA_KEY() {
    	      return `bs.${this.NAME}`;
    	    }
    	    static get EVENT_KEY() {
    	      return `.${this.DATA_KEY}`;
    	    }
    	    static eventName(name) {
    	      return `${name}${this.EVENT_KEY}`;
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap dom/selector-engine.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  const getSelector = element => {
    	    let selector = element.getAttribute('data-bs-target');
    	    if (!selector || selector === '#') {
    	      let hrefAttribute = element.getAttribute('href');

    	      // The only valid content that could double as a selector are IDs or classes,
    	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    	      // `document.querySelector` will rightfully complain it is invalid.
    	      // See https://github.com/twbs/bootstrap/issues/32273
    	      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
    	        return null;
    	      }

    	      // Just in case some CMS puts out a full URL with the anchor appended
    	      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
    	        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
    	      }
    	      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    	    }
    	    return parseSelector(selector);
    	  };
    	  const SelectorEngine = {
    	    find(selector, element = document.documentElement) {
    	      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    	    },
    	    findOne(selector, element = document.documentElement) {
    	      return Element.prototype.querySelector.call(element, selector);
    	    },
    	    children(element, selector) {
    	      return [].concat(...element.children).filter(child => child.matches(selector));
    	    },
    	    parents(element, selector) {
    	      const parents = [];
    	      let ancestor = element.parentNode.closest(selector);
    	      while (ancestor) {
    	        parents.push(ancestor);
    	        ancestor = ancestor.parentNode.closest(selector);
    	      }
    	      return parents;
    	    },
    	    prev(element, selector) {
    	      let previous = element.previousElementSibling;
    	      while (previous) {
    	        if (previous.matches(selector)) {
    	          return [previous];
    	        }
    	        previous = previous.previousElementSibling;
    	      }
    	      return [];
    	    },
    	    // TODO: this is now unused; remove later along with prev()
    	    next(element, selector) {
    	      let next = element.nextElementSibling;
    	      while (next) {
    	        if (next.matches(selector)) {
    	          return [next];
    	        }
    	        next = next.nextElementSibling;
    	      }
    	      return [];
    	    },
    	    focusableChildren(element) {
    	      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
    	      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    	    },
    	    getSelectorFromElement(element) {
    	      const selector = getSelector(element);
    	      if (selector) {
    	        return SelectorEngine.findOne(selector) ? selector : null;
    	      }
    	      return null;
    	    },
    	    getElementFromSelector(element) {
    	      const selector = getSelector(element);
    	      return selector ? SelectorEngine.findOne(selector) : null;
    	    },
    	    getMultipleElementsFromSelector(element) {
    	      const selector = getSelector(element);
    	      return selector ? SelectorEngine.find(selector) : [];
    	    }
    	  };

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/component-functions.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  const enableDismissTrigger = (component, method = 'hide') => {
    	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    	    const name = component.NAME;
    	    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    	      if (['A', 'AREA'].includes(this.tagName)) {
    	        event.preventDefault();
    	      }
    	      if (isDisabled(this)) {
    	        return;
    	      }
    	      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
    	      const instance = component.getOrCreateInstance(target);

    	      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
    	      instance[method]();
    	    });
    	  };

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap alert.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$f = 'alert';
    	  const DATA_KEY$a = 'bs.alert';
    	  const EVENT_KEY$b = `.${DATA_KEY$a}`;
    	  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
    	  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
    	  const CLASS_NAME_FADE$5 = 'fade';
    	  const CLASS_NAME_SHOW$8 = 'show';

    	  /**
    	   * Class definition
    	   */

    	  class Alert extends BaseComponent {
    	    // Getters
    	    static get NAME() {
    	      return NAME$f;
    	    }

    	    // Public
    	    close() {
    	      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    	      if (closeEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._element.classList.remove(CLASS_NAME_SHOW$8);
    	      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    	      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    	    }

    	    // Private
    	    _destroyElement() {
    	      this._element.remove();
    	      EventHandler.trigger(this._element, EVENT_CLOSED);
    	      this.dispose();
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Alert.getOrCreateInstance(this);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config](this);
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  enableDismissTrigger(Alert, 'close');

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Alert);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap button.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$e = 'button';
    	  const DATA_KEY$9 = 'bs.button';
    	  const EVENT_KEY$a = `.${DATA_KEY$9}`;
    	  const DATA_API_KEY$6 = '.data-api';
    	  const CLASS_NAME_ACTIVE$3 = 'active';
    	  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
    	  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

    	  /**
    	   * Class definition
    	   */

    	  class Button extends BaseComponent {
    	    // Getters
    	    static get NAME() {
    	      return NAME$e;
    	    }

    	    // Public
    	    toggle() {
    	      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    	      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Button.getOrCreateInstance(this);
    	        if (config === 'toggle') {
    	          data[config]();
    	        }
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    	    event.preventDefault();
    	    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    	    const data = Button.getOrCreateInstance(button);
    	    data.toggle();
    	  });

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Button);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/swipe.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$d = 'swipe';
    	  const EVENT_KEY$9 = '.bs.swipe';
    	  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
    	  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
    	  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
    	  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
    	  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
    	  const POINTER_TYPE_TOUCH = 'touch';
    	  const POINTER_TYPE_PEN = 'pen';
    	  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
    	  const SWIPE_THRESHOLD = 40;
    	  const Default$c = {
    	    endCallback: null,
    	    leftCallback: null,
    	    rightCallback: null
    	  };
    	  const DefaultType$c = {
    	    endCallback: '(function|null)',
    	    leftCallback: '(function|null)',
    	    rightCallback: '(function|null)'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Swipe extends Config {
    	    constructor(element, config) {
    	      super();
    	      this._element = element;
    	      if (!element || !Swipe.isSupported()) {
    	        return;
    	      }
    	      this._config = this._getConfig(config);
    	      this._deltaX = 0;
    	      this._supportPointerEvents = Boolean(window.PointerEvent);
    	      this._initEvents();
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$c;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$c;
    	    }
    	    static get NAME() {
    	      return NAME$d;
    	    }

    	    // Public
    	    dispose() {
    	      EventHandler.off(this._element, EVENT_KEY$9);
    	    }

    	    // Private
    	    _start(event) {
    	      if (!this._supportPointerEvents) {
    	        this._deltaX = event.touches[0].clientX;
    	        return;
    	      }
    	      if (this._eventIsPointerPenTouch(event)) {
    	        this._deltaX = event.clientX;
    	      }
    	    }
    	    _end(event) {
    	      if (this._eventIsPointerPenTouch(event)) {
    	        this._deltaX = event.clientX - this._deltaX;
    	      }
    	      this._handleSwipe();
    	      execute(this._config.endCallback);
    	    }
    	    _move(event) {
    	      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    	    }
    	    _handleSwipe() {
    	      const absDeltaX = Math.abs(this._deltaX);
    	      if (absDeltaX <= SWIPE_THRESHOLD) {
    	        return;
    	      }
    	      const direction = absDeltaX / this._deltaX;
    	      this._deltaX = 0;
    	      if (!direction) {
    	        return;
    	      }
    	      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    	    }
    	    _initEvents() {
    	      if (this._supportPointerEvents) {
    	        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
    	        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
    	        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    	      } else {
    	        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
    	        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
    	        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
    	      }
    	    }
    	    _eventIsPointerPenTouch(event) {
    	      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    	    }

    	    // Static
    	    static isSupported() {
    	      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap carousel.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$c = 'carousel';
    	  const DATA_KEY$8 = 'bs.carousel';
    	  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
    	  const DATA_API_KEY$5 = '.data-api';
    	  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
    	  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
    	  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    	  const ORDER_NEXT = 'next';
    	  const ORDER_PREV = 'prev';
    	  const DIRECTION_LEFT = 'left';
    	  const DIRECTION_RIGHT = 'right';
    	  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
    	  const EVENT_SLID = `slid${EVENT_KEY$8}`;
    	  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
    	  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
    	  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
    	  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
    	  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
    	  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
    	  const CLASS_NAME_CAROUSEL = 'carousel';
    	  const CLASS_NAME_ACTIVE$2 = 'active';
    	  const CLASS_NAME_SLIDE = 'slide';
    	  const CLASS_NAME_END = 'carousel-item-end';
    	  const CLASS_NAME_START = 'carousel-item-start';
    	  const CLASS_NAME_NEXT = 'carousel-item-next';
    	  const CLASS_NAME_PREV = 'carousel-item-prev';
    	  const SELECTOR_ACTIVE = '.active';
    	  const SELECTOR_ITEM = '.carousel-item';
    	  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
    	  const SELECTOR_ITEM_IMG = '.carousel-item img';
    	  const SELECTOR_INDICATORS = '.carousel-indicators';
    	  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
    	  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
    	  const KEY_TO_DIRECTION = {
    	    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    	    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
    	  };
    	  const Default$b = {
    	    interval: 5000,
    	    keyboard: true,
    	    pause: 'hover',
    	    ride: false,
    	    touch: true,
    	    wrap: true
    	  };
    	  const DefaultType$b = {
    	    interval: '(number|boolean)',
    	    // TODO:v6 remove boolean support
    	    keyboard: 'boolean',
    	    pause: '(string|boolean)',
    	    ride: '(boolean|string)',
    	    touch: 'boolean',
    	    wrap: 'boolean'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Carousel extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._interval = null;
    	      this._activeElement = null;
    	      this._isSliding = false;
    	      this.touchTimeout = null;
    	      this._swipeHelper = null;
    	      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    	      this._addEventListeners();
    	      if (this._config.ride === CLASS_NAME_CAROUSEL) {
    	        this.cycle();
    	      }
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$b;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$b;
    	    }
    	    static get NAME() {
    	      return NAME$c;
    	    }

    	    // Public
    	    next() {
    	      this._slide(ORDER_NEXT);
    	    }
    	    nextWhenVisible() {
    	      // FIXME TODO use `document.visibilityState`
    	      // Don't call next when the page isn't visible
    	      // or the carousel or its parent isn't visible
    	      if (!document.hidden && isVisible(this._element)) {
    	        this.next();
    	      }
    	    }
    	    prev() {
    	      this._slide(ORDER_PREV);
    	    }
    	    pause() {
    	      if (this._isSliding) {
    	        triggerTransitionEnd(this._element);
    	      }
    	      this._clearInterval();
    	    }
    	    cycle() {
    	      this._clearInterval();
    	      this._updateInterval();
    	      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    	    }
    	    _maybeEnableCycle() {
    	      if (!this._config.ride) {
    	        return;
    	      }
    	      if (this._isSliding) {
    	        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
    	        return;
    	      }
    	      this.cycle();
    	    }
    	    to(index) {
    	      const items = this._getItems();
    	      if (index > items.length - 1 || index < 0) {
    	        return;
    	      }
    	      if (this._isSliding) {
    	        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
    	        return;
    	      }
    	      const activeIndex = this._getItemIndex(this._getActive());
    	      if (activeIndex === index) {
    	        return;
    	      }
    	      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    	      this._slide(order, items[index]);
    	    }
    	    dispose() {
    	      if (this._swipeHelper) {
    	        this._swipeHelper.dispose();
    	      }
    	      super.dispose();
    	    }

    	    // Private
    	    _configAfterMerge(config) {
    	      config.defaultInterval = config.interval;
    	      return config;
    	    }
    	    _addEventListeners() {
    	      if (this._config.keyboard) {
    	        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
    	      }
    	      if (this._config.pause === 'hover') {
    	        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
    	        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    	      }
    	      if (this._config.touch && Swipe.isSupported()) {
    	        this._addTouchEventListeners();
    	      }
    	    }
    	    _addTouchEventListeners() {
    	      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
    	        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
    	      }
    	      const endCallBack = () => {
    	        if (this._config.pause !== 'hover') {
    	          return;
    	        }

    	        // If it's a touch-enabled device, mouseenter/leave are fired as
    	        // part of the mouse compatibility events on first tap - the carousel
    	        // would stop cycling until user tapped out of it;
    	        // here, we listen for touchend, explicitly pause the carousel
    	        // (as if it's the second time we tap on it, mouseenter compat event
    	        // is NOT fired) and after a timeout (to allow for mouse compatibility
    	        // events to fire) we explicitly restart cycling

    	        this.pause();
    	        if (this.touchTimeout) {
    	          clearTimeout(this.touchTimeout);
    	        }
    	        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
    	      };
    	      const swipeConfig = {
    	        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
    	        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
    	        endCallback: endCallBack
    	      };
    	      this._swipeHelper = new Swipe(this._element, swipeConfig);
    	    }
    	    _keydown(event) {
    	      if (/input|textarea/i.test(event.target.tagName)) {
    	        return;
    	      }
    	      const direction = KEY_TO_DIRECTION[event.key];
    	      if (direction) {
    	        event.preventDefault();
    	        this._slide(this._directionToOrder(direction));
    	      }
    	    }
    	    _getItemIndex(element) {
    	      return this._getItems().indexOf(element);
    	    }
    	    _setActiveIndicatorElement(index) {
    	      if (!this._indicatorsElement) {
    	        return;
    	      }
    	      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    	      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    	      activeIndicator.removeAttribute('aria-current');
    	      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
    	      if (newActiveIndicator) {
    	        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
    	        newActiveIndicator.setAttribute('aria-current', 'true');
    	      }
    	    }
    	    _updateInterval() {
    	      const element = this._activeElement || this._getActive();
    	      if (!element) {
    	        return;
    	      }
    	      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
    	      this._config.interval = elementInterval || this._config.defaultInterval;
    	    }
    	    _slide(order, element = null) {
    	      if (this._isSliding) {
    	        return;
    	      }
    	      const activeElement = this._getActive();
    	      const isNext = order === ORDER_NEXT;
    	      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    	      if (nextElement === activeElement) {
    	        return;
    	      }
    	      const nextElementIndex = this._getItemIndex(nextElement);
    	      const triggerEvent = eventName => {
    	        return EventHandler.trigger(this._element, eventName, {
    	          relatedTarget: nextElement,
    	          direction: this._orderToDirection(order),
    	          from: this._getItemIndex(activeElement),
    	          to: nextElementIndex
    	        });
    	      };
    	      const slideEvent = triggerEvent(EVENT_SLIDE);
    	      if (slideEvent.defaultPrevented) {
    	        return;
    	      }
    	      if (!activeElement || !nextElement) {
    	        // Some weirdness is happening, so we bail
    	        // TODO: change tests that use empty divs to avoid this check
    	        return;
    	      }
    	      const isCycling = Boolean(this._interval);
    	      this.pause();
    	      this._isSliding = true;
    	      this._setActiveIndicatorElement(nextElementIndex);
    	      this._activeElement = nextElement;
    	      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    	      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    	      nextElement.classList.add(orderClassName);
    	      reflow(nextElement);
    	      activeElement.classList.add(directionalClassName);
    	      nextElement.classList.add(directionalClassName);
    	      const completeCallBack = () => {
    	        nextElement.classList.remove(directionalClassName, orderClassName);
    	        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
    	        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
    	        this._isSliding = false;
    	        triggerEvent(EVENT_SLID);
    	      };
    	      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    	      if (isCycling) {
    	        this.cycle();
    	      }
    	    }
    	    _isAnimated() {
    	      return this._element.classList.contains(CLASS_NAME_SLIDE);
    	    }
    	    _getActive() {
    	      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    	    }
    	    _getItems() {
    	      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    	    }
    	    _clearInterval() {
    	      if (this._interval) {
    	        clearInterval(this._interval);
    	        this._interval = null;
    	      }
    	    }
    	    _directionToOrder(direction) {
    	      if (isRTL()) {
    	        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    	      }
    	      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    	    }
    	    _orderToDirection(order) {
    	      if (isRTL()) {
    	        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    	      }
    	      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Carousel.getOrCreateInstance(this, config);
    	        if (typeof config === 'number') {
    	          data.to(config);
    	          return;
    	        }
    	        if (typeof config === 'string') {
    	          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
    	            throw new TypeError(`No method named "${config}"`);
    	          }
    	          data[config]();
    	        }
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    	    const target = SelectorEngine.getElementFromSelector(this);
    	    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    	      return;
    	    }
    	    event.preventDefault();
    	    const carousel = Carousel.getOrCreateInstance(target);
    	    const slideIndex = this.getAttribute('data-bs-slide-to');
    	    if (slideIndex) {
    	      carousel.to(slideIndex);
    	      carousel._maybeEnableCycle();
    	      return;
    	    }
    	    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    	      carousel.next();
    	      carousel._maybeEnableCycle();
    	      return;
    	    }
    	    carousel.prev();
    	    carousel._maybeEnableCycle();
    	  });
    	  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    	    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    	    for (const carousel of carousels) {
    	      Carousel.getOrCreateInstance(carousel);
    	    }
    	  });

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Carousel);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap collapse.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$b = 'collapse';
    	  const DATA_KEY$7 = 'bs.collapse';
    	  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
    	  const DATA_API_KEY$4 = '.data-api';
    	  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
    	  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
    	  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
    	  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
    	  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
    	  const CLASS_NAME_SHOW$7 = 'show';
    	  const CLASS_NAME_COLLAPSE = 'collapse';
    	  const CLASS_NAME_COLLAPSING = 'collapsing';
    	  const CLASS_NAME_COLLAPSED = 'collapsed';
    	  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
    	  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
    	  const WIDTH = 'width';
    	  const HEIGHT = 'height';
    	  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
    	  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
    	  const Default$a = {
    	    parent: null,
    	    toggle: true
    	  };
    	  const DefaultType$a = {
    	    parent: '(null|element)',
    	    toggle: 'boolean'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Collapse extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._isTransitioning = false;
    	      this._triggerArray = [];
    	      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    	      for (const elem of toggleList) {
    	        const selector = SelectorEngine.getSelectorFromElement(elem);
    	        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
    	        if (selector !== null && filterElement.length) {
    	          this._triggerArray.push(elem);
    	        }
    	      }
    	      this._initializeChildren();
    	      if (!this._config.parent) {
    	        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    	      }
    	      if (this._config.toggle) {
    	        this.toggle();
    	      }
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$a;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$a;
    	    }
    	    static get NAME() {
    	      return NAME$b;
    	    }

    	    // Public
    	    toggle() {
    	      if (this._isShown()) {
    	        this.hide();
    	      } else {
    	        this.show();
    	      }
    	    }
    	    show() {
    	      if (this._isTransitioning || this._isShown()) {
    	        return;
    	      }
    	      let activeChildren = [];

    	      // find active children
    	      if (this._config.parent) {
    	        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
    	          toggle: false
    	        }));
    	      }
    	      if (activeChildren.length && activeChildren[0]._isTransitioning) {
    	        return;
    	      }
    	      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
    	      if (startEvent.defaultPrevented) {
    	        return;
    	      }
    	      for (const activeInstance of activeChildren) {
    	        activeInstance.hide();
    	      }
    	      const dimension = this._getDimension();
    	      this._element.classList.remove(CLASS_NAME_COLLAPSE);
    	      this._element.classList.add(CLASS_NAME_COLLAPSING);
    	      this._element.style[dimension] = 0;
    	      this._addAriaAndCollapsedClass(this._triggerArray, true);
    	      this._isTransitioning = true;
    	      const complete = () => {
    	        this._isTransitioning = false;
    	        this._element.classList.remove(CLASS_NAME_COLLAPSING);
    	        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    	        this._element.style[dimension] = '';
    	        EventHandler.trigger(this._element, EVENT_SHOWN$6);
    	      };
    	      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    	      const scrollSize = `scroll${capitalizedDimension}`;
    	      this._queueCallback(complete, this._element, true);
    	      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    	    }
    	    hide() {
    	      if (this._isTransitioning || !this._isShown()) {
    	        return;
    	      }
    	      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
    	      if (startEvent.defaultPrevented) {
    	        return;
    	      }
    	      const dimension = this._getDimension();
    	      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    	      reflow(this._element);
    	      this._element.classList.add(CLASS_NAME_COLLAPSING);
    	      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    	      for (const trigger of this._triggerArray) {
    	        const element = SelectorEngine.getElementFromSelector(trigger);
    	        if (element && !this._isShown(element)) {
    	          this._addAriaAndCollapsedClass([trigger], false);
    	        }
    	      }
    	      this._isTransitioning = true;
    	      const complete = () => {
    	        this._isTransitioning = false;
    	        this._element.classList.remove(CLASS_NAME_COLLAPSING);
    	        this._element.classList.add(CLASS_NAME_COLLAPSE);
    	        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
    	      };
    	      this._element.style[dimension] = '';
    	      this._queueCallback(complete, this._element, true);
    	    }
    	    _isShown(element = this._element) {
    	      return element.classList.contains(CLASS_NAME_SHOW$7);
    	    }

    	    // Private
    	    _configAfterMerge(config) {
    	      config.toggle = Boolean(config.toggle); // Coerce string values
    	      config.parent = getElement(config.parent);
    	      return config;
    	    }
    	    _getDimension() {
    	      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    	    }
    	    _initializeChildren() {
    	      if (!this._config.parent) {
    	        return;
    	      }
    	      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
    	      for (const element of children) {
    	        const selected = SelectorEngine.getElementFromSelector(element);
    	        if (selected) {
    	          this._addAriaAndCollapsedClass([element], this._isShown(selected));
    	        }
    	      }
    	    }
    	    _getFirstLevelChildren(selector) {
    	      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    	      // remove children if greater depth
    	      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    	    }
    	    _addAriaAndCollapsedClass(triggerArray, isOpen) {
    	      if (!triggerArray.length) {
    	        return;
    	      }
    	      for (const element of triggerArray) {
    	        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
    	        element.setAttribute('aria-expanded', isOpen);
    	      }
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      const _config = {};
    	      if (typeof config === 'string' && /show|hide/.test(config)) {
    	        _config.toggle = false;
    	      }
    	      return this.each(function () {
    	        const data = Collapse.getOrCreateInstance(this, _config);
    	        if (typeof config === 'string') {
    	          if (typeof data[config] === 'undefined') {
    	            throw new TypeError(`No method named "${config}"`);
    	          }
    	          data[config]();
    	        }
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    	    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    	    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    	      event.preventDefault();
    	    }
    	    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    	      Collapse.getOrCreateInstance(element, {
    	        toggle: false
    	      }).toggle();
    	    }
    	  });

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Collapse);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap dropdown.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$a = 'dropdown';
    	  const DATA_KEY$6 = 'bs.dropdown';
    	  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
    	  const DATA_API_KEY$3 = '.data-api';
    	  const ESCAPE_KEY$2 = 'Escape';
    	  const TAB_KEY$1 = 'Tab';
    	  const ARROW_UP_KEY$1 = 'ArrowUp';
    	  const ARROW_DOWN_KEY$1 = 'ArrowDown';
    	  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

    	  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
    	  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
    	  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
    	  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
    	  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
    	  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
    	  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
    	  const CLASS_NAME_SHOW$6 = 'show';
    	  const CLASS_NAME_DROPUP = 'dropup';
    	  const CLASS_NAME_DROPEND = 'dropend';
    	  const CLASS_NAME_DROPSTART = 'dropstart';
    	  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
    	  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
    	  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
    	  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
    	  const SELECTOR_MENU = '.dropdown-menu';
    	  const SELECTOR_NAVBAR = '.navbar';
    	  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
    	  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
    	  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
    	  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
    	  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
    	  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
    	  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
    	  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
    	  const PLACEMENT_TOPCENTER = 'top';
    	  const PLACEMENT_BOTTOMCENTER = 'bottom';
    	  const Default$9 = {
    	    autoClose: true,
    	    boundary: 'clippingParents',
    	    display: 'dynamic',
    	    offset: [0, 2],
    	    popperConfig: null,
    	    reference: 'toggle'
    	  };
    	  const DefaultType$9 = {
    	    autoClose: '(boolean|string)',
    	    boundary: '(string|element)',
    	    display: 'string',
    	    offset: '(array|string|function)',
    	    popperConfig: '(null|object|function)',
    	    reference: '(string|element|object)'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Dropdown extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._popper = null;
    	      this._parent = this._element.parentNode; // dropdown wrapper
    	      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    	      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    	      this._inNavbar = this._detectNavbar();
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$9;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$9;
    	    }
    	    static get NAME() {
    	      return NAME$a;
    	    }

    	    // Public
    	    toggle() {
    	      return this._isShown() ? this.hide() : this.show();
    	    }
    	    show() {
    	      if (isDisabled(this._element) || this._isShown()) {
    	        return;
    	      }
    	      const relatedTarget = {
    	        relatedTarget: this._element
    	      };
    	      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
    	      if (showEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._createPopper();

    	      // If this is a touch-enabled device we add extra
    	      // empty mouseover listeners to the body's immediate children;
    	      // only needed because of broken event delegation on iOS
    	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    	      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
    	        for (const element of [].concat(...document.body.children)) {
    	          EventHandler.on(element, 'mouseover', noop);
    	        }
    	      }
    	      this._element.focus();
    	      this._element.setAttribute('aria-expanded', true);
    	      this._menu.classList.add(CLASS_NAME_SHOW$6);
    	      this._element.classList.add(CLASS_NAME_SHOW$6);
    	      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    	    }
    	    hide() {
    	      if (isDisabled(this._element) || !this._isShown()) {
    	        return;
    	      }
    	      const relatedTarget = {
    	        relatedTarget: this._element
    	      };
    	      this._completeHide(relatedTarget);
    	    }
    	    dispose() {
    	      if (this._popper) {
    	        this._popper.destroy();
    	      }
    	      super.dispose();
    	    }
    	    update() {
    	      this._inNavbar = this._detectNavbar();
    	      if (this._popper) {
    	        this._popper.update();
    	      }
    	    }

    	    // Private
    	    _completeHide(relatedTarget) {
    	      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }

    	      // If this is a touch-enabled device we remove the extra
    	      // empty mouseover listeners we added for iOS support
    	      if ('ontouchstart' in document.documentElement) {
    	        for (const element of [].concat(...document.body.children)) {
    	          EventHandler.off(element, 'mouseover', noop);
    	        }
    	      }
    	      if (this._popper) {
    	        this._popper.destroy();
    	      }
    	      this._menu.classList.remove(CLASS_NAME_SHOW$6);
    	      this._element.classList.remove(CLASS_NAME_SHOW$6);
    	      this._element.setAttribute('aria-expanded', 'false');
    	      Manipulator.removeDataAttribute(this._menu, 'popper');
    	      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    	    }
    	    _getConfig(config) {
    	      config = super._getConfig(config);
    	      if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
    	        // Popper virtual elements require a getBoundingClientRect method
    	        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    	      }
    	      return config;
    	    }
    	    _createPopper() {
    	      if (typeof Popper__namespace === 'undefined') {
    	        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
    	      }
    	      let referenceElement = this._element;
    	      if (this._config.reference === 'parent') {
    	        referenceElement = this._parent;
    	      } else if (isElement(this._config.reference)) {
    	        referenceElement = getElement(this._config.reference);
    	      } else if (typeof this._config.reference === 'object') {
    	        referenceElement = this._config.reference;
    	      }
    	      const popperConfig = this._getPopperConfig();
    	      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
    	    }
    	    _isShown() {
    	      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    	    }
    	    _getPlacement() {
    	      const parentDropdown = this._parent;
    	      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
    	        return PLACEMENT_RIGHT;
    	      }
    	      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
    	        return PLACEMENT_LEFT;
    	      }
    	      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
    	        return PLACEMENT_TOPCENTER;
    	      }
    	      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
    	        return PLACEMENT_BOTTOMCENTER;
    	      }

    	      // We need to trim the value because custom properties can also include spaces
    	      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
    	      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
    	        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    	      }
    	      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    	    }
    	    _detectNavbar() {
    	      return this._element.closest(SELECTOR_NAVBAR) !== null;
    	    }
    	    _getOffset() {
    	      const {
    	        offset
    	      } = this._config;
    	      if (typeof offset === 'string') {
    	        return offset.split(',').map(value => Number.parseInt(value, 10));
    	      }
    	      if (typeof offset === 'function') {
    	        return popperData => offset(popperData, this._element);
    	      }
    	      return offset;
    	    }
    	    _getPopperConfig() {
    	      const defaultBsPopperConfig = {
    	        placement: this._getPlacement(),
    	        modifiers: [{
    	          name: 'preventOverflow',
    	          options: {
    	            boundary: this._config.boundary
    	          }
    	        }, {
    	          name: 'offset',
    	          options: {
    	            offset: this._getOffset()
    	          }
    	        }]
    	      };

    	      // Disable Popper if we have a static display or Dropdown is in Navbar
    	      if (this._inNavbar || this._config.display === 'static') {
    	        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
    	        defaultBsPopperConfig.modifiers = [{
    	          name: 'applyStyles',
    	          enabled: false
    	        }];
    	      }
    	      return {
    	        ...defaultBsPopperConfig,
    	        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    	      };
    	    }
    	    _selectMenuItem({
    	      key,
    	      target
    	    }) {
    	      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
    	      if (!items.length) {
    	        return;
    	      }

    	      // if target isn't included in items (e.g. when expanding the dropdown)
    	      // allow cycling to get the last item in case key equals ARROW_UP_KEY
    	      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Dropdown.getOrCreateInstance(this, config);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (typeof data[config] === 'undefined') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config]();
    	      });
    	    }
    	    static clearMenus(event) {
    	      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
    	        return;
    	      }
    	      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    	      for (const toggle of openToggles) {
    	        const context = Dropdown.getInstance(toggle);
    	        if (!context || context._config.autoClose === false) {
    	          continue;
    	        }
    	        const composedPath = event.composedPath();
    	        const isMenuTarget = composedPath.includes(context._menu);
    	        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
    	          continue;
    	        }

    	        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
    	        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
    	          continue;
    	        }
    	        const relatedTarget = {
    	          relatedTarget: context._element
    	        };
    	        if (event.type === 'click') {
    	          relatedTarget.clickEvent = event;
    	        }
    	        context._completeHide(relatedTarget);
    	      }
    	    }
    	    static dataApiKeydownHandler(event) {
    	      // If not an UP | DOWN | ESCAPE key => not a dropdown command
    	      // If input/textarea && if key is other than ESCAPE => not a dropdown command

    	      const isInput = /input|textarea/i.test(event.target.tagName);
    	      const isEscapeEvent = event.key === ESCAPE_KEY$2;
    	      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
    	      if (!isUpOrDownEvent && !isEscapeEvent) {
    	        return;
    	      }
    	      if (isInput && !isEscapeEvent) {
    	        return;
    	      }
    	      event.preventDefault();

    	      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    	      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    	      const instance = Dropdown.getOrCreateInstance(getToggleButton);
    	      if (isUpOrDownEvent) {
    	        event.stopPropagation();
    	        instance.show();
    	        instance._selectMenuItem(event);
    	        return;
    	      }
    	      if (instance._isShown()) {
    	        // else is escape and we check if it is shown
    	        event.stopPropagation();
    	        instance.hide();
    	        getToggleButton.focus();
    	      }
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
    	  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
    	  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
    	  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
    	  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    	    event.preventDefault();
    	    Dropdown.getOrCreateInstance(this).toggle();
    	  });

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Dropdown);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/backdrop.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$9 = 'backdrop';
    	  const CLASS_NAME_FADE$4 = 'fade';
    	  const CLASS_NAME_SHOW$5 = 'show';
    	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
    	  const Default$8 = {
    	    className: 'modal-backdrop',
    	    clickCallback: null,
    	    isAnimated: false,
    	    isVisible: true,
    	    // if false, we use the backdrop helper without adding any element to the dom
    	    rootElement: 'body' // give the choice to place backdrop under different elements
    	  };

    	  const DefaultType$8 = {
    	    className: 'string',
    	    clickCallback: '(function|null)',
    	    isAnimated: 'boolean',
    	    isVisible: 'boolean',
    	    rootElement: '(element|string)'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Backdrop extends Config {
    	    constructor(config) {
    	      super();
    	      this._config = this._getConfig(config);
    	      this._isAppended = false;
    	      this._element = null;
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$8;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$8;
    	    }
    	    static get NAME() {
    	      return NAME$9;
    	    }

    	    // Public
    	    show(callback) {
    	      if (!this._config.isVisible) {
    	        execute(callback);
    	        return;
    	      }
    	      this._append();
    	      const element = this._getElement();
    	      if (this._config.isAnimated) {
    	        reflow(element);
    	      }
    	      element.classList.add(CLASS_NAME_SHOW$5);
    	      this._emulateAnimation(() => {
    	        execute(callback);
    	      });
    	    }
    	    hide(callback) {
    	      if (!this._config.isVisible) {
    	        execute(callback);
    	        return;
    	      }
    	      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    	      this._emulateAnimation(() => {
    	        this.dispose();
    	        execute(callback);
    	      });
    	    }
    	    dispose() {
    	      if (!this._isAppended) {
    	        return;
    	      }
    	      EventHandler.off(this._element, EVENT_MOUSEDOWN);
    	      this._element.remove();
    	      this._isAppended = false;
    	    }

    	    // Private
    	    _getElement() {
    	      if (!this._element) {
    	        const backdrop = document.createElement('div');
    	        backdrop.className = this._config.className;
    	        if (this._config.isAnimated) {
    	          backdrop.classList.add(CLASS_NAME_FADE$4);
    	        }
    	        this._element = backdrop;
    	      }
    	      return this._element;
    	    }
    	    _configAfterMerge(config) {
    	      // use getElement() with the default "body" to get a fresh Element on each instantiation
    	      config.rootElement = getElement(config.rootElement);
    	      return config;
    	    }
    	    _append() {
    	      if (this._isAppended) {
    	        return;
    	      }
    	      const element = this._getElement();
    	      this._config.rootElement.append(element);
    	      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
    	        execute(this._config.clickCallback);
    	      });
    	      this._isAppended = true;
    	    }
    	    _emulateAnimation(callback) {
    	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/focustrap.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$8 = 'focustrap';
    	  const DATA_KEY$5 = 'bs.focustrap';
    	  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
    	  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
    	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
    	  const TAB_KEY = 'Tab';
    	  const TAB_NAV_FORWARD = 'forward';
    	  const TAB_NAV_BACKWARD = 'backward';
    	  const Default$7 = {
    	    autofocus: true,
    	    trapElement: null // The element to trap focus inside of
    	  };

    	  const DefaultType$7 = {
    	    autofocus: 'boolean',
    	    trapElement: 'element'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class FocusTrap extends Config {
    	    constructor(config) {
    	      super();
    	      this._config = this._getConfig(config);
    	      this._isActive = false;
    	      this._lastTabNavDirection = null;
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$7;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$7;
    	    }
    	    static get NAME() {
    	      return NAME$8;
    	    }

    	    // Public
    	    activate() {
    	      if (this._isActive) {
    	        return;
    	      }
    	      if (this._config.autofocus) {
    	        this._config.trapElement.focus();
    	      }
    	      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
    	      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
    	      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
    	      this._isActive = true;
    	    }
    	    deactivate() {
    	      if (!this._isActive) {
    	        return;
    	      }
    	      this._isActive = false;
    	      EventHandler.off(document, EVENT_KEY$5);
    	    }

    	    // Private
    	    _handleFocusin(event) {
    	      const {
    	        trapElement
    	      } = this._config;
    	      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
    	        return;
    	      }
    	      const elements = SelectorEngine.focusableChildren(trapElement);
    	      if (elements.length === 0) {
    	        trapElement.focus();
    	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
    	        elements[elements.length - 1].focus();
    	      } else {
    	        elements[0].focus();
    	      }
    	    }
    	    _handleKeydown(event) {
    	      if (event.key !== TAB_KEY) {
    	        return;
    	      }
    	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/scrollBar.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
    	  const SELECTOR_STICKY_CONTENT = '.sticky-top';
    	  const PROPERTY_PADDING = 'padding-right';
    	  const PROPERTY_MARGIN = 'margin-right';

    	  /**
    	   * Class definition
    	   */

    	  class ScrollBarHelper {
    	    constructor() {
    	      this._element = document.body;
    	    }

    	    // Public
    	    getWidth() {
    	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    	      const documentWidth = document.documentElement.clientWidth;
    	      return Math.abs(window.innerWidth - documentWidth);
    	    }
    	    hide() {
    	      const width = this.getWidth();
    	      this._disableOverFlow();
    	      // give padding to element to balance the hidden scrollbar width
    	      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    	      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
    	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    	    }
    	    reset() {
    	      this._resetElementAttributes(this._element, 'overflow');
    	      this._resetElementAttributes(this._element, PROPERTY_PADDING);
    	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    	    }
    	    isOverflowing() {
    	      return this.getWidth() > 0;
    	    }

    	    // Private
    	    _disableOverFlow() {
    	      this._saveInitialAttribute(this._element, 'overflow');
    	      this._element.style.overflow = 'hidden';
    	    }
    	    _setElementAttributes(selector, styleProperty, callback) {
    	      const scrollbarWidth = this.getWidth();
    	      const manipulationCallBack = element => {
    	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
    	          return;
    	        }
    	        this._saveInitialAttribute(element, styleProperty);
    	        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
    	        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    	      };
    	      this._applyManipulationCallback(selector, manipulationCallBack);
    	    }
    	    _saveInitialAttribute(element, styleProperty) {
    	      const actualValue = element.style.getPropertyValue(styleProperty);
    	      if (actualValue) {
    	        Manipulator.setDataAttribute(element, styleProperty, actualValue);
    	      }
    	    }
    	    _resetElementAttributes(selector, styleProperty) {
    	      const manipulationCallBack = element => {
    	        const value = Manipulator.getDataAttribute(element, styleProperty);
    	        // We only want to remove the property if the value is `null`; the value can also be zero
    	        if (value === null) {
    	          element.style.removeProperty(styleProperty);
    	          return;
    	        }
    	        Manipulator.removeDataAttribute(element, styleProperty);
    	        element.style.setProperty(styleProperty, value);
    	      };
    	      this._applyManipulationCallback(selector, manipulationCallBack);
    	    }
    	    _applyManipulationCallback(selector, callBack) {
    	      if (isElement(selector)) {
    	        callBack(selector);
    	        return;
    	      }
    	      for (const sel of SelectorEngine.find(selector, this._element)) {
    	        callBack(sel);
    	      }
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap modal.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$7 = 'modal';
    	  const DATA_KEY$4 = 'bs.modal';
    	  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
    	  const DATA_API_KEY$2 = '.data-api';
    	  const ESCAPE_KEY$1 = 'Escape';
    	  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
    	  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
    	  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
    	  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
    	  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
    	  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
    	  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
    	  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
    	  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
    	  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
    	  const CLASS_NAME_OPEN = 'modal-open';
    	  const CLASS_NAME_FADE$3 = 'fade';
    	  const CLASS_NAME_SHOW$4 = 'show';
    	  const CLASS_NAME_STATIC = 'modal-static';
    	  const OPEN_SELECTOR$1 = '.modal.show';
    	  const SELECTOR_DIALOG = '.modal-dialog';
    	  const SELECTOR_MODAL_BODY = '.modal-body';
    	  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
    	  const Default$6 = {
    	    backdrop: true,
    	    focus: true,
    	    keyboard: true
    	  };
    	  const DefaultType$6 = {
    	    backdrop: '(boolean|string)',
    	    focus: 'boolean',
    	    keyboard: 'boolean'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Modal extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    	      this._backdrop = this._initializeBackDrop();
    	      this._focustrap = this._initializeFocusTrap();
    	      this._isShown = false;
    	      this._isTransitioning = false;
    	      this._scrollBar = new ScrollBarHelper();
    	      this._addEventListeners();
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$6;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$6;
    	    }
    	    static get NAME() {
    	      return NAME$7;
    	    }

    	    // Public
    	    toggle(relatedTarget) {
    	      return this._isShown ? this.hide() : this.show(relatedTarget);
    	    }
    	    show(relatedTarget) {
    	      if (this._isShown || this._isTransitioning) {
    	        return;
    	      }
    	      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
    	        relatedTarget
    	      });
    	      if (showEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._isShown = true;
    	      this._isTransitioning = true;
    	      this._scrollBar.hide();
    	      document.body.classList.add(CLASS_NAME_OPEN);
    	      this._adjustDialog();
    	      this._backdrop.show(() => this._showElement(relatedTarget));
    	    }
    	    hide() {
    	      if (!this._isShown || this._isTransitioning) {
    	        return;
    	      }
    	      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._isShown = false;
    	      this._isTransitioning = true;
    	      this._focustrap.deactivate();
    	      this._element.classList.remove(CLASS_NAME_SHOW$4);
    	      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    	    }
    	    dispose() {
    	      EventHandler.off(window, EVENT_KEY$4);
    	      EventHandler.off(this._dialog, EVENT_KEY$4);
    	      this._backdrop.dispose();
    	      this._focustrap.deactivate();
    	      super.dispose();
    	    }
    	    handleUpdate() {
    	      this._adjustDialog();
    	    }

    	    // Private
    	    _initializeBackDrop() {
    	      return new Backdrop({
    	        isVisible: Boolean(this._config.backdrop),
    	        // 'static' option will be translated to true, and booleans will keep their value,
    	        isAnimated: this._isAnimated()
    	      });
    	    }
    	    _initializeFocusTrap() {
    	      return new FocusTrap({
    	        trapElement: this._element
    	      });
    	    }
    	    _showElement(relatedTarget) {
    	      // try to append dynamic modal
    	      if (!document.body.contains(this._element)) {
    	        document.body.append(this._element);
    	      }
    	      this._element.style.display = 'block';
    	      this._element.removeAttribute('aria-hidden');
    	      this._element.setAttribute('aria-modal', true);
    	      this._element.setAttribute('role', 'dialog');
    	      this._element.scrollTop = 0;
    	      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    	      if (modalBody) {
    	        modalBody.scrollTop = 0;
    	      }
    	      reflow(this._element);
    	      this._element.classList.add(CLASS_NAME_SHOW$4);
    	      const transitionComplete = () => {
    	        if (this._config.focus) {
    	          this._focustrap.activate();
    	        }
    	        this._isTransitioning = false;
    	        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
    	          relatedTarget
    	        });
    	      };
    	      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    	    }
    	    _addEventListeners() {
    	      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
    	        if (event.key !== ESCAPE_KEY$1) {
    	          return;
    	        }
    	        if (this._config.keyboard) {
    	          this.hide();
    	          return;
    	        }
    	        this._triggerBackdropTransition();
    	      });
    	      EventHandler.on(window, EVENT_RESIZE$1, () => {
    	        if (this._isShown && !this._isTransitioning) {
    	          this._adjustDialog();
    	        }
    	      });
    	      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
    	        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
    	        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
    	          if (this._element !== event.target || this._element !== event2.target) {
    	            return;
    	          }
    	          if (this._config.backdrop === 'static') {
    	            this._triggerBackdropTransition();
    	            return;
    	          }
    	          if (this._config.backdrop) {
    	            this.hide();
    	          }
    	        });
    	      });
    	    }
    	    _hideModal() {
    	      this._element.style.display = 'none';
    	      this._element.setAttribute('aria-hidden', true);
    	      this._element.removeAttribute('aria-modal');
    	      this._element.removeAttribute('role');
    	      this._isTransitioning = false;
    	      this._backdrop.hide(() => {
    	        document.body.classList.remove(CLASS_NAME_OPEN);
    	        this._resetAdjustments();
    	        this._scrollBar.reset();
    	        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    	      });
    	    }
    	    _isAnimated() {
    	      return this._element.classList.contains(CLASS_NAME_FADE$3);
    	    }
    	    _triggerBackdropTransition() {
    	      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }
    	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    	      const initialOverflowY = this._element.style.overflowY;
    	      // return if the following background transition hasn't yet completed
    	      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
    	        return;
    	      }
    	      if (!isModalOverflowing) {
    	        this._element.style.overflowY = 'hidden';
    	      }
    	      this._element.classList.add(CLASS_NAME_STATIC);
    	      this._queueCallback(() => {
    	        this._element.classList.remove(CLASS_NAME_STATIC);
    	        this._queueCallback(() => {
    	          this._element.style.overflowY = initialOverflowY;
    	        }, this._dialog);
    	      }, this._dialog);
    	      this._element.focus();
    	    }

    	    /**
    	     * The following methods are used to handle overflowing modals
    	     */

    	    _adjustDialog() {
    	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    	      const scrollbarWidth = this._scrollBar.getWidth();
    	      const isBodyOverflowing = scrollbarWidth > 0;
    	      if (isBodyOverflowing && !isModalOverflowing) {
    	        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
    	        this._element.style[property] = `${scrollbarWidth}px`;
    	      }
    	      if (!isBodyOverflowing && isModalOverflowing) {
    	        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
    	        this._element.style[property] = `${scrollbarWidth}px`;
    	      }
    	    }
    	    _resetAdjustments() {
    	      this._element.style.paddingLeft = '';
    	      this._element.style.paddingRight = '';
    	    }

    	    // Static
    	    static jQueryInterface(config, relatedTarget) {
    	      return this.each(function () {
    	        const data = Modal.getOrCreateInstance(this, config);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (typeof data[config] === 'undefined') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config](relatedTarget);
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    	    const target = SelectorEngine.getElementFromSelector(this);
    	    if (['A', 'AREA'].includes(this.tagName)) {
    	      event.preventDefault();
    	    }
    	    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
    	      if (showEvent.defaultPrevented) {
    	        // only register focus restorer if modal will actually get shown
    	        return;
    	      }
    	      EventHandler.one(target, EVENT_HIDDEN$4, () => {
    	        if (isVisible(this)) {
    	          this.focus();
    	        }
    	      });
    	    });

    	    // avoid conflict when clicking modal toggler while another one is open
    	    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    	    if (alreadyOpen) {
    	      Modal.getInstance(alreadyOpen).hide();
    	    }
    	    const data = Modal.getOrCreateInstance(target);
    	    data.toggle(this);
    	  });
    	  enableDismissTrigger(Modal);

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Modal);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap offcanvas.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$6 = 'offcanvas';
    	  const DATA_KEY$3 = 'bs.offcanvas';
    	  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
    	  const DATA_API_KEY$1 = '.data-api';
    	  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
    	  const ESCAPE_KEY = 'Escape';
    	  const CLASS_NAME_SHOW$3 = 'show';
    	  const CLASS_NAME_SHOWING$1 = 'showing';
    	  const CLASS_NAME_HIDING = 'hiding';
    	  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
    	  const OPEN_SELECTOR = '.offcanvas.show';
    	  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
    	  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
    	  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
    	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
    	  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
    	  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
    	  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
    	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
    	  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
    	  const Default$5 = {
    	    backdrop: true,
    	    keyboard: true,
    	    scroll: false
    	  };
    	  const DefaultType$5 = {
    	    backdrop: '(boolean|string)',
    	    keyboard: 'boolean',
    	    scroll: 'boolean'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Offcanvas extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._isShown = false;
    	      this._backdrop = this._initializeBackDrop();
    	      this._focustrap = this._initializeFocusTrap();
    	      this._addEventListeners();
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$5;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$5;
    	    }
    	    static get NAME() {
    	      return NAME$6;
    	    }

    	    // Public
    	    toggle(relatedTarget) {
    	      return this._isShown ? this.hide() : this.show(relatedTarget);
    	    }
    	    show(relatedTarget) {
    	      if (this._isShown) {
    	        return;
    	      }
    	      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
    	        relatedTarget
    	      });
    	      if (showEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._isShown = true;
    	      this._backdrop.show();
    	      if (!this._config.scroll) {
    	        new ScrollBarHelper().hide();
    	      }
    	      this._element.setAttribute('aria-modal', true);
    	      this._element.setAttribute('role', 'dialog');
    	      this._element.classList.add(CLASS_NAME_SHOWING$1);
    	      const completeCallBack = () => {
    	        if (!this._config.scroll || this._config.backdrop) {
    	          this._focustrap.activate();
    	        }
    	        this._element.classList.add(CLASS_NAME_SHOW$3);
    	        this._element.classList.remove(CLASS_NAME_SHOWING$1);
    	        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
    	          relatedTarget
    	        });
    	      };
    	      this._queueCallback(completeCallBack, this._element, true);
    	    }
    	    hide() {
    	      if (!this._isShown) {
    	        return;
    	      }
    	      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._focustrap.deactivate();
    	      this._element.blur();
    	      this._isShown = false;
    	      this._element.classList.add(CLASS_NAME_HIDING);
    	      this._backdrop.hide();
    	      const completeCallback = () => {
    	        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
    	        this._element.removeAttribute('aria-modal');
    	        this._element.removeAttribute('role');
    	        if (!this._config.scroll) {
    	          new ScrollBarHelper().reset();
    	        }
    	        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    	      };
    	      this._queueCallback(completeCallback, this._element, true);
    	    }
    	    dispose() {
    	      this._backdrop.dispose();
    	      this._focustrap.deactivate();
    	      super.dispose();
    	    }

    	    // Private
    	    _initializeBackDrop() {
    	      const clickCallback = () => {
    	        if (this._config.backdrop === 'static') {
    	          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    	          return;
    	        }
    	        this.hide();
    	      };

    	      // 'static' option will be translated to true, and booleans will keep their value
    	      const isVisible = Boolean(this._config.backdrop);
    	      return new Backdrop({
    	        className: CLASS_NAME_BACKDROP,
    	        isVisible,
    	        isAnimated: true,
    	        rootElement: this._element.parentNode,
    	        clickCallback: isVisible ? clickCallback : null
    	      });
    	    }
    	    _initializeFocusTrap() {
    	      return new FocusTrap({
    	        trapElement: this._element
    	      });
    	    }
    	    _addEventListeners() {
    	      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
    	        if (event.key !== ESCAPE_KEY) {
    	          return;
    	        }
    	        if (this._config.keyboard) {
    	          this.hide();
    	          return;
    	        }
    	        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    	      });
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Offcanvas.getOrCreateInstance(this, config);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config](this);
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    	    const target = SelectorEngine.getElementFromSelector(this);
    	    if (['A', 'AREA'].includes(this.tagName)) {
    	      event.preventDefault();
    	    }
    	    if (isDisabled(this)) {
    	      return;
    	    }
    	    EventHandler.one(target, EVENT_HIDDEN$3, () => {
    	      // focus on trigger when it is closed
    	      if (isVisible(this)) {
    	        this.focus();
    	      }
    	    });

    	    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    	    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    	    if (alreadyOpen && alreadyOpen !== target) {
    	      Offcanvas.getInstance(alreadyOpen).hide();
    	    }
    	    const data = Offcanvas.getOrCreateInstance(target);
    	    data.toggle(this);
    	  });
    	  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    	    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    	      Offcanvas.getOrCreateInstance(selector).show();
    	    }
    	  });
    	  EventHandler.on(window, EVENT_RESIZE, () => {
    	    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    	      if (getComputedStyle(element).position !== 'fixed') {
    	        Offcanvas.getOrCreateInstance(element).hide();
    	      }
    	    }
    	  });
    	  enableDismissTrigger(Offcanvas);

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Offcanvas);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/sanitizer.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  // js-docs-start allow-list
    	  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    	  const DefaultAllowlist = {
    	    // Global attributes allowed on any supplied element below.
    	    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    	    a: ['target', 'href', 'title', 'rel'],
    	    area: [],
    	    b: [],
    	    br: [],
    	    col: [],
    	    code: [],
    	    div: [],
    	    em: [],
    	    hr: [],
    	    h1: [],
    	    h2: [],
    	    h3: [],
    	    h4: [],
    	    h5: [],
    	    h6: [],
    	    i: [],
    	    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    	    li: [],
    	    ol: [],
    	    p: [],
    	    pre: [],
    	    s: [],
    	    small: [],
    	    span: [],
    	    sub: [],
    	    sup: [],
    	    strong: [],
    	    u: [],
    	    ul: []
    	  };
    	  // js-docs-end allow-list

    	  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

    	  /**
    	   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
    	   * contexts.
    	   *
    	   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
    	   */
    	  // eslint-disable-next-line unicorn/better-regex
    	  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
    	  const allowedAttribute = (attribute, allowedAttributeList) => {
    	    const attributeName = attribute.nodeName.toLowerCase();
    	    if (allowedAttributeList.includes(attributeName)) {
    	      if (uriAttributes.has(attributeName)) {
    	        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
    	      }
    	      return true;
    	    }

    	    // Check if a regular expression validates the attribute.
    	    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
    	  };
    	  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    	    if (!unsafeHtml.length) {
    	      return unsafeHtml;
    	    }
    	    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    	      return sanitizeFunction(unsafeHtml);
    	    }
    	    const domParser = new window.DOMParser();
    	    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    	    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
    	    for (const element of elements) {
    	      const elementName = element.nodeName.toLowerCase();
    	      if (!Object.keys(allowList).includes(elementName)) {
    	        element.remove();
    	        continue;
    	      }
    	      const attributeList = [].concat(...element.attributes);
    	      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
    	      for (const attribute of attributeList) {
    	        if (!allowedAttribute(attribute, allowedAttributes)) {
    	          element.removeAttribute(attribute.nodeName);
    	        }
    	      }
    	    }
    	    return createdDocument.body.innerHTML;
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap util/template-factory.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$5 = 'TemplateFactory';
    	  const Default$4 = {
    	    allowList: DefaultAllowlist,
    	    content: {},
    	    // { selector : text ,  selector2 : text2 , }
    	    extraClass: '',
    	    html: false,
    	    sanitize: true,
    	    sanitizeFn: null,
    	    template: '<div></div>'
    	  };
    	  const DefaultType$4 = {
    	    allowList: 'object',
    	    content: 'object',
    	    extraClass: '(string|function)',
    	    html: 'boolean',
    	    sanitize: 'boolean',
    	    sanitizeFn: '(null|function)',
    	    template: 'string'
    	  };
    	  const DefaultContentType = {
    	    entry: '(string|element|function|null)',
    	    selector: '(string|element)'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class TemplateFactory extends Config {
    	    constructor(config) {
    	      super();
    	      this._config = this._getConfig(config);
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$4;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$4;
    	    }
    	    static get NAME() {
    	      return NAME$5;
    	    }

    	    // Public
    	    getContent() {
    	      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    	    }
    	    hasContent() {
    	      return this.getContent().length > 0;
    	    }
    	    changeContent(content) {
    	      this._checkContent(content);
    	      this._config.content = {
    	        ...this._config.content,
    	        ...content
    	      };
    	      return this;
    	    }
    	    toHtml() {
    	      const templateWrapper = document.createElement('div');
    	      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    	      for (const [selector, text] of Object.entries(this._config.content)) {
    	        this._setContent(templateWrapper, text, selector);
    	      }
    	      const template = templateWrapper.children[0];
    	      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    	      if (extraClass) {
    	        template.classList.add(...extraClass.split(' '));
    	      }
    	      return template;
    	    }

    	    // Private
    	    _typeCheckConfig(config) {
    	      super._typeCheckConfig(config);
    	      this._checkContent(config.content);
    	    }
    	    _checkContent(arg) {
    	      for (const [selector, content] of Object.entries(arg)) {
    	        super._typeCheckConfig({
    	          selector,
    	          entry: content
    	        }, DefaultContentType);
    	      }
    	    }
    	    _setContent(template, content, selector) {
    	      const templateElement = SelectorEngine.findOne(selector, template);
    	      if (!templateElement) {
    	        return;
    	      }
    	      content = this._resolvePossibleFunction(content);
    	      if (!content) {
    	        templateElement.remove();
    	        return;
    	      }
    	      if (isElement(content)) {
    	        this._putElementInTemplate(getElement(content), templateElement);
    	        return;
    	      }
    	      if (this._config.html) {
    	        templateElement.innerHTML = this._maybeSanitize(content);
    	        return;
    	      }
    	      templateElement.textContent = content;
    	    }
    	    _maybeSanitize(arg) {
    	      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    	    }
    	    _resolvePossibleFunction(arg) {
    	      return execute(arg, [this]);
    	    }
    	    _putElementInTemplate(element, templateElement) {
    	      if (this._config.html) {
    	        templateElement.innerHTML = '';
    	        templateElement.append(element);
    	        return;
    	      }
    	      templateElement.textContent = element.textContent;
    	    }
    	  }

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap tooltip.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$4 = 'tooltip';
    	  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
    	  const CLASS_NAME_FADE$2 = 'fade';
    	  const CLASS_NAME_MODAL = 'modal';
    	  const CLASS_NAME_SHOW$2 = 'show';
    	  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
    	  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
    	  const EVENT_MODAL_HIDE = 'hide.bs.modal';
    	  const TRIGGER_HOVER = 'hover';
    	  const TRIGGER_FOCUS = 'focus';
    	  const TRIGGER_CLICK = 'click';
    	  const TRIGGER_MANUAL = 'manual';
    	  const EVENT_HIDE$2 = 'hide';
    	  const EVENT_HIDDEN$2 = 'hidden';
    	  const EVENT_SHOW$2 = 'show';
    	  const EVENT_SHOWN$2 = 'shown';
    	  const EVENT_INSERTED = 'inserted';
    	  const EVENT_CLICK$1 = 'click';
    	  const EVENT_FOCUSIN$1 = 'focusin';
    	  const EVENT_FOCUSOUT$1 = 'focusout';
    	  const EVENT_MOUSEENTER = 'mouseenter';
    	  const EVENT_MOUSELEAVE = 'mouseleave';
    	  const AttachmentMap = {
    	    AUTO: 'auto',
    	    TOP: 'top',
    	    RIGHT: isRTL() ? 'left' : 'right',
    	    BOTTOM: 'bottom',
    	    LEFT: isRTL() ? 'right' : 'left'
    	  };
    	  const Default$3 = {
    	    allowList: DefaultAllowlist,
    	    animation: true,
    	    boundary: 'clippingParents',
    	    container: false,
    	    customClass: '',
    	    delay: 0,
    	    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    	    html: false,
    	    offset: [0, 6],
    	    placement: 'top',
    	    popperConfig: null,
    	    sanitize: true,
    	    sanitizeFn: null,
    	    selector: false,
    	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    	    title: '',
    	    trigger: 'hover focus'
    	  };
    	  const DefaultType$3 = {
    	    allowList: 'object',
    	    animation: 'boolean',
    	    boundary: '(string|element)',
    	    container: '(string|element|boolean)',
    	    customClass: '(string|function)',
    	    delay: '(number|object)',
    	    fallbackPlacements: 'array',
    	    html: 'boolean',
    	    offset: '(array|string|function)',
    	    placement: '(string|function)',
    	    popperConfig: '(null|object|function)',
    	    sanitize: 'boolean',
    	    sanitizeFn: '(null|function)',
    	    selector: '(string|boolean)',
    	    template: 'string',
    	    title: '(string|element|function)',
    	    trigger: 'string'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Tooltip extends BaseComponent {
    	    constructor(element, config) {
    	      if (typeof Popper__namespace === 'undefined') {
    	        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    	      }
    	      super(element, config);

    	      // Private
    	      this._isEnabled = true;
    	      this._timeout = 0;
    	      this._isHovered = null;
    	      this._activeTrigger = {};
    	      this._popper = null;
    	      this._templateFactory = null;
    	      this._newContent = null;

    	      // Protected
    	      this.tip = null;
    	      this._setListeners();
    	      if (!this._config.selector) {
    	        this._fixTitle();
    	      }
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$3;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$3;
    	    }
    	    static get NAME() {
    	      return NAME$4;
    	    }

    	    // Public
    	    enable() {
    	      this._isEnabled = true;
    	    }
    	    disable() {
    	      this._isEnabled = false;
    	    }
    	    toggleEnabled() {
    	      this._isEnabled = !this._isEnabled;
    	    }
    	    toggle() {
    	      if (!this._isEnabled) {
    	        return;
    	      }
    	      this._activeTrigger.click = !this._activeTrigger.click;
    	      if (this._isShown()) {
    	        this._leave();
    	        return;
    	      }
    	      this._enter();
    	    }
    	    dispose() {
    	      clearTimeout(this._timeout);
    	      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    	      if (this._element.getAttribute('data-bs-original-title')) {
    	        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
    	      }
    	      this._disposePopper();
    	      super.dispose();
    	    }
    	    show() {
    	      if (this._element.style.display === 'none') {
    	        throw new Error('Please use show on visible elements');
    	      }
    	      if (!(this._isWithContent() && this._isEnabled)) {
    	        return;
    	      }
    	      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    	      const shadowRoot = findShadowRoot(this._element);
    	      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
    	      if (showEvent.defaultPrevented || !isInTheDom) {
    	        return;
    	      }

    	      // TODO: v6 remove this or make it optional
    	      this._disposePopper();
    	      const tip = this._getTipElement();
    	      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
    	      const {
    	        container
    	      } = this._config;
    	      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
    	        container.append(tip);
    	        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    	      }
    	      this._popper = this._createPopper(tip);
    	      tip.classList.add(CLASS_NAME_SHOW$2);

    	      // If this is a touch-enabled device we add extra
    	      // empty mouseover listeners to the body's immediate children;
    	      // only needed because of broken event delegation on iOS
    	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    	      if ('ontouchstart' in document.documentElement) {
    	        for (const element of [].concat(...document.body.children)) {
    	          EventHandler.on(element, 'mouseover', noop);
    	        }
    	      }
    	      const complete = () => {
    	        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
    	        if (this._isHovered === false) {
    	          this._leave();
    	        }
    	        this._isHovered = false;
    	      };
    	      this._queueCallback(complete, this.tip, this._isAnimated());
    	    }
    	    hide() {
    	      if (!this._isShown()) {
    	        return;
    	      }
    	      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }
    	      const tip = this._getTipElement();
    	      tip.classList.remove(CLASS_NAME_SHOW$2);

    	      // If this is a touch-enabled device we remove the extra
    	      // empty mouseover listeners we added for iOS support
    	      if ('ontouchstart' in document.documentElement) {
    	        for (const element of [].concat(...document.body.children)) {
    	          EventHandler.off(element, 'mouseover', noop);
    	        }
    	      }
    	      this._activeTrigger[TRIGGER_CLICK] = false;
    	      this._activeTrigger[TRIGGER_FOCUS] = false;
    	      this._activeTrigger[TRIGGER_HOVER] = false;
    	      this._isHovered = null; // it is a trick to support manual triggering

    	      const complete = () => {
    	        if (this._isWithActiveTrigger()) {
    	          return;
    	        }
    	        if (!this._isHovered) {
    	          this._disposePopper();
    	        }
    	        this._element.removeAttribute('aria-describedby');
    	        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
    	      };
    	      this._queueCallback(complete, this.tip, this._isAnimated());
    	    }
    	    update() {
    	      if (this._popper) {
    	        this._popper.update();
    	      }
    	    }

    	    // Protected
    	    _isWithContent() {
    	      return Boolean(this._getTitle());
    	    }
    	    _getTipElement() {
    	      if (!this.tip) {
    	        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    	      }
    	      return this.tip;
    	    }
    	    _createTipElement(content) {
    	      const tip = this._getTemplateFactory(content).toHtml();

    	      // TODO: remove this check in v6
    	      if (!tip) {
    	        return null;
    	      }
    	      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    	      // TODO: v6 the following can be achieved with CSS only
    	      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    	      const tipId = getUID(this.constructor.NAME).toString();
    	      tip.setAttribute('id', tipId);
    	      if (this._isAnimated()) {
    	        tip.classList.add(CLASS_NAME_FADE$2);
    	      }
    	      return tip;
    	    }
    	    setContent(content) {
    	      this._newContent = content;
    	      if (this._isShown()) {
    	        this._disposePopper();
    	        this.show();
    	      }
    	    }
    	    _getTemplateFactory(content) {
    	      if (this._templateFactory) {
    	        this._templateFactory.changeContent(content);
    	      } else {
    	        this._templateFactory = new TemplateFactory({
    	          ...this._config,
    	          // the `content` var has to be after `this._config`
    	          // to override config.content in case of popover
    	          content,
    	          extraClass: this._resolvePossibleFunction(this._config.customClass)
    	        });
    	      }
    	      return this._templateFactory;
    	    }
    	    _getContentForTemplate() {
    	      return {
    	        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    	      };
    	    }
    	    _getTitle() {
    	      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    	    }

    	    // Private
    	    _initializeOnDelegatedTarget(event) {
    	      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    	    }
    	    _isAnimated() {
    	      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    	    }
    	    _isShown() {
    	      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    	    }
    	    _createPopper(tip) {
    	      const placement = execute(this._config.placement, [this, tip, this._element]);
    	      const attachment = AttachmentMap[placement.toUpperCase()];
    	      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    	    }
    	    _getOffset() {
    	      const {
    	        offset
    	      } = this._config;
    	      if (typeof offset === 'string') {
    	        return offset.split(',').map(value => Number.parseInt(value, 10));
    	      }
    	      if (typeof offset === 'function') {
    	        return popperData => offset(popperData, this._element);
    	      }
    	      return offset;
    	    }
    	    _resolvePossibleFunction(arg) {
    	      return execute(arg, [this._element]);
    	    }
    	    _getPopperConfig(attachment) {
    	      const defaultBsPopperConfig = {
    	        placement: attachment,
    	        modifiers: [{
    	          name: 'flip',
    	          options: {
    	            fallbackPlacements: this._config.fallbackPlacements
    	          }
    	        }, {
    	          name: 'offset',
    	          options: {
    	            offset: this._getOffset()
    	          }
    	        }, {
    	          name: 'preventOverflow',
    	          options: {
    	            boundary: this._config.boundary
    	          }
    	        }, {
    	          name: 'arrow',
    	          options: {
    	            element: `.${this.constructor.NAME}-arrow`
    	          }
    	        }, {
    	          name: 'preSetPlacement',
    	          enabled: true,
    	          phase: 'beforeMain',
    	          fn: data => {
    	            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
    	            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
    	            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
    	          }
    	        }]
    	      };
    	      return {
    	        ...defaultBsPopperConfig,
    	        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    	      };
    	    }
    	    _setListeners() {
    	      const triggers = this._config.trigger.split(' ');
    	      for (const trigger of triggers) {
    	        if (trigger === 'click') {
    	          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
    	            const context = this._initializeOnDelegatedTarget(event);
    	            context.toggle();
    	          });
    	        } else if (trigger !== TRIGGER_MANUAL) {
    	          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
    	          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
    	          EventHandler.on(this._element, eventIn, this._config.selector, event => {
    	            const context = this._initializeOnDelegatedTarget(event);
    	            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
    	            context._enter();
    	          });
    	          EventHandler.on(this._element, eventOut, this._config.selector, event => {
    	            const context = this._initializeOnDelegatedTarget(event);
    	            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
    	            context._leave();
    	          });
    	        }
    	      }
    	      this._hideModalHandler = () => {
    	        if (this._element) {
    	          this.hide();
    	        }
    	      };
    	      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    	    }
    	    _fixTitle() {
    	      const title = this._element.getAttribute('title');
    	      if (!title) {
    	        return;
    	      }
    	      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
    	        this._element.setAttribute('aria-label', title);
    	      }
    	      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
    	      this._element.removeAttribute('title');
    	    }
    	    _enter() {
    	      if (this._isShown() || this._isHovered) {
    	        this._isHovered = true;
    	        return;
    	      }
    	      this._isHovered = true;
    	      this._setTimeout(() => {
    	        if (this._isHovered) {
    	          this.show();
    	        }
    	      }, this._config.delay.show);
    	    }
    	    _leave() {
    	      if (this._isWithActiveTrigger()) {
    	        return;
    	      }
    	      this._isHovered = false;
    	      this._setTimeout(() => {
    	        if (!this._isHovered) {
    	          this.hide();
    	        }
    	      }, this._config.delay.hide);
    	    }
    	    _setTimeout(handler, timeout) {
    	      clearTimeout(this._timeout);
    	      this._timeout = setTimeout(handler, timeout);
    	    }
    	    _isWithActiveTrigger() {
    	      return Object.values(this._activeTrigger).includes(true);
    	    }
    	    _getConfig(config) {
    	      const dataAttributes = Manipulator.getDataAttributes(this._element);
    	      for (const dataAttribute of Object.keys(dataAttributes)) {
    	        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
    	          delete dataAttributes[dataAttribute];
    	        }
    	      }
    	      config = {
    	        ...dataAttributes,
    	        ...(typeof config === 'object' && config ? config : {})
    	      };
    	      config = this._mergeConfigObj(config);
    	      config = this._configAfterMerge(config);
    	      this._typeCheckConfig(config);
    	      return config;
    	    }
    	    _configAfterMerge(config) {
    	      config.container = config.container === false ? document.body : getElement(config.container);
    	      if (typeof config.delay === 'number') {
    	        config.delay = {
    	          show: config.delay,
    	          hide: config.delay
    	        };
    	      }
    	      if (typeof config.title === 'number') {
    	        config.title = config.title.toString();
    	      }
    	      if (typeof config.content === 'number') {
    	        config.content = config.content.toString();
    	      }
    	      return config;
    	    }
    	    _getDelegateConfig() {
    	      const config = {};
    	      for (const [key, value] of Object.entries(this._config)) {
    	        if (this.constructor.Default[key] !== value) {
    	          config[key] = value;
    	        }
    	      }
    	      config.selector = false;
    	      config.trigger = 'manual';

    	      // In the future can be replaced with:
    	      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    	      // `Object.fromEntries(keysWithDifferentValues)`
    	      return config;
    	    }
    	    _disposePopper() {
    	      if (this._popper) {
    	        this._popper.destroy();
    	        this._popper = null;
    	      }
    	      if (this.tip) {
    	        this.tip.remove();
    	        this.tip = null;
    	      }
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Tooltip.getOrCreateInstance(this, config);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (typeof data[config] === 'undefined') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config]();
    	      });
    	    }
    	  }

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Tooltip);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap popover.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$3 = 'popover';
    	  const SELECTOR_TITLE = '.popover-header';
    	  const SELECTOR_CONTENT = '.popover-body';
    	  const Default$2 = {
    	    ...Tooltip.Default,
    	    content: '',
    	    offset: [0, 8],
    	    placement: 'right',
    	    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    	    trigger: 'click'
    	  };
    	  const DefaultType$2 = {
    	    ...Tooltip.DefaultType,
    	    content: '(null|string|element|function)'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Popover extends Tooltip {
    	    // Getters
    	    static get Default() {
    	      return Default$2;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$2;
    	    }
    	    static get NAME() {
    	      return NAME$3;
    	    }

    	    // Overrides
    	    _isWithContent() {
    	      return this._getTitle() || this._getContent();
    	    }

    	    // Private
    	    _getContentForTemplate() {
    	      return {
    	        [SELECTOR_TITLE]: this._getTitle(),
    	        [SELECTOR_CONTENT]: this._getContent()
    	      };
    	    }
    	    _getContent() {
    	      return this._resolvePossibleFunction(this._config.content);
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Popover.getOrCreateInstance(this, config);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (typeof data[config] === 'undefined') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config]();
    	      });
    	    }
    	  }

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Popover);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap scrollspy.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$2 = 'scrollspy';
    	  const DATA_KEY$2 = 'bs.scrollspy';
    	  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
    	  const DATA_API_KEY = '.data-api';
    	  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
    	  const EVENT_CLICK = `click${EVENT_KEY$2}`;
    	  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
    	  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
    	  const CLASS_NAME_ACTIVE$1 = 'active';
    	  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
    	  const SELECTOR_TARGET_LINKS = '[href]';
    	  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
    	  const SELECTOR_NAV_LINKS = '.nav-link';
    	  const SELECTOR_NAV_ITEMS = '.nav-item';
    	  const SELECTOR_LIST_ITEMS = '.list-group-item';
    	  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
    	  const SELECTOR_DROPDOWN = '.dropdown';
    	  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
    	  const Default$1 = {
    	    offset: null,
    	    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    	    rootMargin: '0px 0px -25%',
    	    smoothScroll: false,
    	    target: null,
    	    threshold: [0.1, 0.5, 1]
    	  };
    	  const DefaultType$1 = {
    	    offset: '(number|null)',
    	    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    	    rootMargin: 'string',
    	    smoothScroll: 'boolean',
    	    target: 'element',
    	    threshold: 'array'
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class ScrollSpy extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);

    	      // this._element is the observablesContainer and config.target the menu links wrapper
    	      this._targetLinks = new Map();
    	      this._observableSections = new Map();
    	      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
    	      this._activeTarget = null;
    	      this._observer = null;
    	      this._previousScrollData = {
    	        visibleEntryTop: 0,
    	        parentScrollTop: 0
    	      };
    	      this.refresh(); // initialize
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default$1;
    	    }
    	    static get DefaultType() {
    	      return DefaultType$1;
    	    }
    	    static get NAME() {
    	      return NAME$2;
    	    }

    	    // Public
    	    refresh() {
    	      this._initializeTargetsAndObservables();
    	      this._maybeEnableSmoothScroll();
    	      if (this._observer) {
    	        this._observer.disconnect();
    	      } else {
    	        this._observer = this._getNewObserver();
    	      }
    	      for (const section of this._observableSections.values()) {
    	        this._observer.observe(section);
    	      }
    	    }
    	    dispose() {
    	      this._observer.disconnect();
    	      super.dispose();
    	    }

    	    // Private
    	    _configAfterMerge(config) {
    	      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
    	      config.target = getElement(config.target) || document.body;

    	      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
    	      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    	      if (typeof config.threshold === 'string') {
    	        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
    	      }
    	      return config;
    	    }
    	    _maybeEnableSmoothScroll() {
    	      if (!this._config.smoothScroll) {
    	        return;
    	      }

    	      // unregister any previous listeners
    	      EventHandler.off(this._config.target, EVENT_CLICK);
    	      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
    	        const observableSection = this._observableSections.get(event.target.hash);
    	        if (observableSection) {
    	          event.preventDefault();
    	          const root = this._rootElement || window;
    	          const height = observableSection.offsetTop - this._element.offsetTop;
    	          if (root.scrollTo) {
    	            root.scrollTo({
    	              top: height,
    	              behavior: 'smooth'
    	            });
    	            return;
    	          }

    	          // Chrome 60 doesn't support `scrollTo`
    	          root.scrollTop = height;
    	        }
    	      });
    	    }
    	    _getNewObserver() {
    	      const options = {
    	        root: this._rootElement,
    	        threshold: this._config.threshold,
    	        rootMargin: this._config.rootMargin
    	      };
    	      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    	    }

    	    // The logic of selection
    	    _observerCallback(entries) {
    	      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
    	      const activate = entry => {
    	        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
    	        this._process(targetElement(entry));
    	      };
    	      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    	      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    	      this._previousScrollData.parentScrollTop = parentScrollTop;
    	      for (const entry of entries) {
    	        if (!entry.isIntersecting) {
    	          this._activeTarget = null;
    	          this._clearActiveClass(targetElement(entry));
    	          continue;
    	        }
    	        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
    	        // if we are scrolling down, pick the bigger offsetTop
    	        if (userScrollsDown && entryIsLowerThanPrevious) {
    	          activate(entry);
    	          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
    	          if (!parentScrollTop) {
    	            return;
    	          }
    	          continue;
    	        }

    	        // if we are scrolling up, pick the smallest offsetTop
    	        if (!userScrollsDown && !entryIsLowerThanPrevious) {
    	          activate(entry);
    	        }
    	      }
    	    }
    	    _initializeTargetsAndObservables() {
    	      this._targetLinks = new Map();
    	      this._observableSections = new Map();
    	      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    	      for (const anchor of targetLinks) {
    	        // ensure that the anchor has an id and is not disabled
    	        if (!anchor.hash || isDisabled(anchor)) {
    	          continue;
    	        }
    	        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

    	        // ensure that the observableSection exists & is visible
    	        if (isVisible(observableSection)) {
    	          this._targetLinks.set(decodeURI(anchor.hash), anchor);
    	          this._observableSections.set(anchor.hash, observableSection);
    	        }
    	      }
    	    }
    	    _process(target) {
    	      if (this._activeTarget === target) {
    	        return;
    	      }
    	      this._clearActiveClass(this._config.target);
    	      this._activeTarget = target;
    	      target.classList.add(CLASS_NAME_ACTIVE$1);
    	      this._activateParents(target);
    	      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
    	        relatedTarget: target
    	      });
    	    }
    	    _activateParents(target) {
    	      // Activate dropdown parents
    	      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
    	        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
    	        return;
    	      }
    	      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
    	        // Set triggered links parents as active
    	        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
    	        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
    	          item.classList.add(CLASS_NAME_ACTIVE$1);
    	        }
    	      }
    	    }
    	    _clearActiveClass(parent) {
    	      parent.classList.remove(CLASS_NAME_ACTIVE$1);
    	      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
    	      for (const node of activeNodes) {
    	        node.classList.remove(CLASS_NAME_ACTIVE$1);
    	      }
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = ScrollSpy.getOrCreateInstance(this, config);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config]();
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    	    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    	      ScrollSpy.getOrCreateInstance(spy);
    	    }
    	  });

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(ScrollSpy);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap tab.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME$1 = 'tab';
    	  const DATA_KEY$1 = 'bs.tab';
    	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
    	  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
    	  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
    	  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
    	  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
    	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
    	  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
    	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
    	  const ARROW_LEFT_KEY = 'ArrowLeft';
    	  const ARROW_RIGHT_KEY = 'ArrowRight';
    	  const ARROW_UP_KEY = 'ArrowUp';
    	  const ARROW_DOWN_KEY = 'ArrowDown';
    	  const HOME_KEY = 'Home';
    	  const END_KEY = 'End';
    	  const CLASS_NAME_ACTIVE = 'active';
    	  const CLASS_NAME_FADE$1 = 'fade';
    	  const CLASS_NAME_SHOW$1 = 'show';
    	  const CLASS_DROPDOWN = 'dropdown';
    	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
    	  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
    	  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
    	  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
    	  const SELECTOR_OUTER = '.nav-item, .list-group-item';
    	  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
    	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
    	  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
    	  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

    	  /**
    	   * Class definition
    	   */

    	  class Tab extends BaseComponent {
    	    constructor(element) {
    	      super(element);
    	      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    	      if (!this._parent) {
    	        return;
    	        // TODO: should throw exception in v6
    	        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
    	      }

    	      // Set up initial aria attributes
    	      this._setInitialAttributes(this._parent, this._getChildren());
    	      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    	    }

    	    // Getters
    	    static get NAME() {
    	      return NAME$1;
    	    }

    	    // Public
    	    show() {
    	      // Shows this elem and deactivate the active sibling if exists
    	      const innerElem = this._element;
    	      if (this._elemIsActive(innerElem)) {
    	        return;
    	      }

    	      // Search for active tab on same parent to deactivate it
    	      const active = this._getActiveElem();
    	      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
    	        relatedTarget: innerElem
    	      }) : null;
    	      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
    	        relatedTarget: active
    	      });
    	      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._deactivate(active, innerElem);
    	      this._activate(innerElem, active);
    	    }

    	    // Private
    	    _activate(element, relatedElem) {
    	      if (!element) {
    	        return;
    	      }
    	      element.classList.add(CLASS_NAME_ACTIVE);
    	      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

    	      const complete = () => {
    	        if (element.getAttribute('role') !== 'tab') {
    	          element.classList.add(CLASS_NAME_SHOW$1);
    	          return;
    	        }
    	        element.removeAttribute('tabindex');
    	        element.setAttribute('aria-selected', true);
    	        this._toggleDropDown(element, true);
    	        EventHandler.trigger(element, EVENT_SHOWN$1, {
    	          relatedTarget: relatedElem
    	        });
    	      };
    	      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    	    }
    	    _deactivate(element, relatedElem) {
    	      if (!element) {
    	        return;
    	      }
    	      element.classList.remove(CLASS_NAME_ACTIVE);
    	      element.blur();
    	      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

    	      const complete = () => {
    	        if (element.getAttribute('role') !== 'tab') {
    	          element.classList.remove(CLASS_NAME_SHOW$1);
    	          return;
    	        }
    	        element.setAttribute('aria-selected', false);
    	        element.setAttribute('tabindex', '-1');
    	        this._toggleDropDown(element, false);
    	        EventHandler.trigger(element, EVENT_HIDDEN$1, {
    	          relatedTarget: relatedElem
    	        });
    	      };
    	      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    	    }
    	    _keydown(event) {
    	      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
    	        return;
    	      }
    	      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
    	      event.preventDefault();
    	      const children = this._getChildren().filter(element => !isDisabled(element));
    	      let nextActiveElement;
    	      if ([HOME_KEY, END_KEY].includes(event.key)) {
    	        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
    	      } else {
    	        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
    	        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
    	      }
    	      if (nextActiveElement) {
    	        nextActiveElement.focus({
    	          preventScroll: true
    	        });
    	        Tab.getOrCreateInstance(nextActiveElement).show();
    	      }
    	    }
    	    _getChildren() {
    	      // collection of inner elements
    	      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    	    }
    	    _getActiveElem() {
    	      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    	    }
    	    _setInitialAttributes(parent, children) {
    	      this._setAttributeIfNotExists(parent, 'role', 'tablist');
    	      for (const child of children) {
    	        this._setInitialAttributesOnChild(child);
    	      }
    	    }
    	    _setInitialAttributesOnChild(child) {
    	      child = this._getInnerElement(child);
    	      const isActive = this._elemIsActive(child);
    	      const outerElem = this._getOuterElement(child);
    	      child.setAttribute('aria-selected', isActive);
    	      if (outerElem !== child) {
    	        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
    	      }
    	      if (!isActive) {
    	        child.setAttribute('tabindex', '-1');
    	      }
    	      this._setAttributeIfNotExists(child, 'role', 'tab');

    	      // set attributes to the related panel too
    	      this._setInitialAttributesOnTargetPanel(child);
    	    }
    	    _setInitialAttributesOnTargetPanel(child) {
    	      const target = SelectorEngine.getElementFromSelector(child);
    	      if (!target) {
    	        return;
    	      }
    	      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
    	      if (child.id) {
    	        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
    	      }
    	    }
    	    _toggleDropDown(element, open) {
    	      const outerElem = this._getOuterElement(element);
    	      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
    	        return;
    	      }
    	      const toggle = (selector, className) => {
    	        const element = SelectorEngine.findOne(selector, outerElem);
    	        if (element) {
    	          element.classList.toggle(className, open);
    	        }
    	      };
    	      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    	      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    	      outerElem.setAttribute('aria-expanded', open);
    	    }
    	    _setAttributeIfNotExists(element, attribute, value) {
    	      if (!element.hasAttribute(attribute)) {
    	        element.setAttribute(attribute, value);
    	      }
    	    }
    	    _elemIsActive(elem) {
    	      return elem.classList.contains(CLASS_NAME_ACTIVE);
    	    }

    	    // Try to get the inner element (usually the .nav-link)
    	    _getInnerElement(elem) {
    	      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    	    }

    	    // Try to get the outer element (usually the .nav-item)
    	    _getOuterElement(elem) {
    	      return elem.closest(SELECTOR_OUTER) || elem;
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Tab.getOrCreateInstance(this);
    	        if (typeof config !== 'string') {
    	          return;
    	        }
    	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
    	          throw new TypeError(`No method named "${config}"`);
    	        }
    	        data[config]();
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    	    if (['A', 'AREA'].includes(this.tagName)) {
    	      event.preventDefault();
    	    }
    	    if (isDisabled(this)) {
    	      return;
    	    }
    	    Tab.getOrCreateInstance(this).show();
    	  });

    	  /**
    	   * Initialize on focus
    	   */
    	  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    	    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    	      Tab.getOrCreateInstance(element);
    	    }
    	  });
    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Tab);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap toast.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */


    	  /**
    	   * Constants
    	   */

    	  const NAME = 'toast';
    	  const DATA_KEY = 'bs.toast';
    	  const EVENT_KEY = `.${DATA_KEY}`;
    	  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
    	  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
    	  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
    	  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
    	  const EVENT_HIDE = `hide${EVENT_KEY}`;
    	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    	  const EVENT_SHOW = `show${EVENT_KEY}`;
    	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
    	  const CLASS_NAME_FADE = 'fade';
    	  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
    	  const CLASS_NAME_SHOW = 'show';
    	  const CLASS_NAME_SHOWING = 'showing';
    	  const DefaultType = {
    	    animation: 'boolean',
    	    autohide: 'boolean',
    	    delay: 'number'
    	  };
    	  const Default = {
    	    animation: true,
    	    autohide: true,
    	    delay: 5000
    	  };

    	  /**
    	   * Class definition
    	   */

    	  class Toast extends BaseComponent {
    	    constructor(element, config) {
    	      super(element, config);
    	      this._timeout = null;
    	      this._hasMouseInteraction = false;
    	      this._hasKeyboardInteraction = false;
    	      this._setListeners();
    	    }

    	    // Getters
    	    static get Default() {
    	      return Default;
    	    }
    	    static get DefaultType() {
    	      return DefaultType;
    	    }
    	    static get NAME() {
    	      return NAME;
    	    }

    	    // Public
    	    show() {
    	      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    	      if (showEvent.defaultPrevented) {
    	        return;
    	      }
    	      this._clearTimeout();
    	      if (this._config.animation) {
    	        this._element.classList.add(CLASS_NAME_FADE);
    	      }
    	      const complete = () => {
    	        this._element.classList.remove(CLASS_NAME_SHOWING);
    	        EventHandler.trigger(this._element, EVENT_SHOWN);
    	        this._maybeScheduleHide();
    	      };
    	      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
    	      reflow(this._element);
    	      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
    	      this._queueCallback(complete, this._element, this._config.animation);
    	    }
    	    hide() {
    	      if (!this.isShown()) {
    	        return;
    	      }
    	      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    	      if (hideEvent.defaultPrevented) {
    	        return;
    	      }
    	      const complete = () => {
    	        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
    	        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
    	        EventHandler.trigger(this._element, EVENT_HIDDEN);
    	      };
    	      this._element.classList.add(CLASS_NAME_SHOWING);
    	      this._queueCallback(complete, this._element, this._config.animation);
    	    }
    	    dispose() {
    	      this._clearTimeout();
    	      if (this.isShown()) {
    	        this._element.classList.remove(CLASS_NAME_SHOW);
    	      }
    	      super.dispose();
    	    }
    	    isShown() {
    	      return this._element.classList.contains(CLASS_NAME_SHOW);
    	    }

    	    // Private

    	    _maybeScheduleHide() {
    	      if (!this._config.autohide) {
    	        return;
    	      }
    	      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
    	        return;
    	      }
    	      this._timeout = setTimeout(() => {
    	        this.hide();
    	      }, this._config.delay);
    	    }
    	    _onInteraction(event, isInteracting) {
    	      switch (event.type) {
    	        case 'mouseover':
    	        case 'mouseout':
    	          {
    	            this._hasMouseInteraction = isInteracting;
    	            break;
    	          }
    	        case 'focusin':
    	        case 'focusout':
    	          {
    	            this._hasKeyboardInteraction = isInteracting;
    	            break;
    	          }
    	      }
    	      if (isInteracting) {
    	        this._clearTimeout();
    	        return;
    	      }
    	      const nextElement = event.relatedTarget;
    	      if (this._element === nextElement || this._element.contains(nextElement)) {
    	        return;
    	      }
    	      this._maybeScheduleHide();
    	    }
    	    _setListeners() {
    	      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
    	      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
    	      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
    	      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    	    }
    	    _clearTimeout() {
    	      clearTimeout(this._timeout);
    	      this._timeout = null;
    	    }

    	    // Static
    	    static jQueryInterface(config) {
    	      return this.each(function () {
    	        const data = Toast.getOrCreateInstance(this, config);
    	        if (typeof config === 'string') {
    	          if (typeof data[config] === 'undefined') {
    	            throw new TypeError(`No method named "${config}"`);
    	          }
    	          data[config](this);
    	        }
    	      });
    	    }
    	  }

    	  /**
    	   * Data API implementation
    	   */

    	  enableDismissTrigger(Toast);

    	  /**
    	   * jQuery
    	   */

    	  defineJQueryPlugin(Toast);

    	  /**
    	   * --------------------------------------------------------------------------
    	   * Bootstrap index.umd.js
    	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    	   * --------------------------------------------------------------------------
    	   */

    	  const index_umd = {
    	    Alert,
    	    Button,
    	    Carousel,
    	    Collapse,
    	    Dropdown,
    	    Modal,
    	    Offcanvas,
    	    Popover,
    	    ScrollSpy,
    	    Tab,
    	    Toast,
    	    Tooltip
    	  };

    	  return index_umd;

    	}));
    	
    } (bootstrap));

    /* src\components\Jumbotron.svelte generated by Svelte v3.59.2 */

    const file$8 = "src\\components\\Jumbotron.svelte";

    function create_fragment$8(ctx) {
    	let head;
    	let link;
    	let t0;
    	let main;
    	let div0;
    	let h1;
    	let t3;
    	let div3;
    	let div2;
    	let div1;
    	let h2;
    	let t5;
    	let p;

    	const block = {
    		c: function create() {
    			head = element("head");
    			link = element("link");
    			t0 = space();
    			main = element("main");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = `Buying tickets for ${/*name*/ ctx[0]}`;
    			t3 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "EVENT DETAILS";
    			t5 = space();
    			p = element("p");
    			p.textContent = "Lorem ep ipsum";
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
    			add_location(link, file$8, 7, 4, 112);
    			add_location(head, file$8, 6, 0, 100);
    			add_location(h1, file$8, 21, 8, 466);
    			attr_dev(div0, "class", "container py-4");
    			add_location(div0, file$8, 20, 4, 428);
    			add_location(h2, file$8, 27, 16, 666);
    			add_location(p, file$8, 28, 16, 706);
    			attr_dev(div1, "class", "container-fluid py-5");
    			add_location(div1, file$8, 26, 12, 614);
    			attr_dev(div2, "class", "p-5 mb-4 rounded-4 jumbotron svelte-ah2jr9");
    			add_location(div2, file$8, 25, 8, 558);
    			attr_dev(div3, "class", "container py-4");
    			add_location(div3, file$8, 24, 4, 520);
    			add_location(main, file$8, 19, 0, 416);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, head, anchor);
    			append_dev(head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, h1);
    			append_dev(main, t3);
    			append_dev(main, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(div1, t5);
    			append_dev(div1, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Jumbotron', slots, []);
    	let name = "Taylor Swift | The Eras Tour";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Jumbotron> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class Jumbotron extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Jumbotron",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules\carbon-components-svelte\src\RadioButton\RadioButton.svelte generated by Svelte v3.59.2 */
    const file$7 = "node_modules\\carbon-components-svelte\\src\\RadioButton\\RadioButton.svelte";
    const get_labelText_slot_changes$1 = dirty => ({});
    const get_labelText_slot_context$1 = ctx => ({});

    // (74:4) {#if labelText || $$slots.labelText}
    function create_if_block$4(ctx) {
    	let span;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[16].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[15], get_labelText_slot_context$1);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block$2(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			toggle_class(span, "bx--visually-hidden", /*hideLabel*/ ctx[7]);
    			add_location(span, file$7, 74, 6, 1826);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[15], dirty, get_labelText_slot_changes$1),
    						get_labelText_slot_context$1
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty & /*labelText*/ 64)) {
    					labelText_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*hideLabel*/ 128) {
    				toggle_class(span, "bx--visually-hidden", /*hideLabel*/ ctx[7]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(74:4) {#if labelText || $$slots.labelText}",
    		ctx
    	});

    	return block;
    }

    // (76:31)            
    function fallback_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[6]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelText*/ 64) set_data_dev(t, /*labelText*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(76:31)            ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let input;
    	let t0;
    	let label;
    	let span;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = (/*labelText*/ ctx[6] || /*$$slots*/ ctx[13].labelText) && create_if_block$4(ctx);
    	let div_levels = [/*$$restProps*/ ctx[12]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			span = element("span");
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", /*id*/ ctx[8]);
    			attr_dev(input, "name", /*name*/ ctx[9]);
    			input.checked = /*checked*/ ctx[0];
    			input.disabled = /*disabled*/ ctx[3];
    			input.required = /*required*/ ctx[4];
    			input.value = /*value*/ ctx[2];
    			toggle_class(input, "bx--radio-button", true);
    			add_location(input, file$7, 54, 2, 1344);
    			toggle_class(span, "bx--radio-button__appearance", true);
    			add_location(span, file$7, 72, 4, 1721);
    			attr_dev(label, "for", /*id*/ ctx[8]);
    			toggle_class(label, "bx--radio-button__label", true);
    			add_location(label, file$7, 71, 2, 1659);
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--radio-button-wrapper", true);
    			toggle_class(div, "bx--radio-button-wrapper--label-left", /*labelPosition*/ ctx[5] === 'left');
    			add_location(div, file$7, 49, 0, 1200);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			/*input_binding*/ ctx[18](input);
    			append_dev(div, t0);
    			append_dev(div, label);
    			append_dev(label, span);
    			append_dev(label, t1);
    			if (if_block) if_block.m(label, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*change_handler*/ ctx[17], false, false, false, false),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[19], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*id*/ 256) {
    				attr_dev(input, "id", /*id*/ ctx[8]);
    			}

    			if (!current || dirty & /*name*/ 512) {
    				attr_dev(input, "name", /*name*/ ctx[9]);
    			}

    			if (!current || dirty & /*checked*/ 1) {
    				prop_dev(input, "checked", /*checked*/ ctx[0]);
    			}

    			if (!current || dirty & /*disabled*/ 8) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (!current || dirty & /*required*/ 16) {
    				prop_dev(input, "required", /*required*/ ctx[4]);
    			}

    			if (!current || dirty & /*value*/ 4) {
    				prop_dev(input, "value", /*value*/ ctx[2]);
    			}

    			if (/*labelText*/ ctx[6] || /*$$slots*/ ctx[13].labelText) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*labelText, $$slots*/ 8256) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(label, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*id*/ 256) {
    				attr_dev(label, "for", /*id*/ ctx[8]);
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]]));
    			toggle_class(div, "bx--radio-button-wrapper", true);
    			toggle_class(div, "bx--radio-button-wrapper--label-left", /*labelPosition*/ ctx[5] === 'left');
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*input_binding*/ ctx[18](null);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"value","checked","disabled","required","labelPosition","labelText","hideLabel","id","name","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $selectedValue;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RadioButton', slots, ['labelText']);
    	const $$slots = compute_slots(slots);
    	let { value = "" } = $$props;
    	let { checked = false } = $$props;
    	let { disabled = false } = $$props;
    	let { required = false } = $$props;
    	let { labelPosition = "right" } = $$props;
    	let { labelText = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = "" } = $$props;
    	let { ref = null } = $$props;
    	const ctx = getContext("RadioButtonGroup");

    	const selectedValue = ctx
    	? ctx.selectedValue
    	: writable(checked ? value : undefined);

    	validate_store(selectedValue, 'selectedValue');
    	component_subscribe($$self, selectedValue, value => $$invalidate(14, $selectedValue = value));

    	if (ctx) {
    		ctx.add({ id, checked, disabled, value });
    	}

    	function change_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	const change_handler_1 = () => {
    		if (ctx) {
    			ctx.update(value);
    		}
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('value' in $$new_props) $$invalidate(2, value = $$new_props.value);
    		if ('checked' in $$new_props) $$invalidate(0, checked = $$new_props.checked);
    		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('required' in $$new_props) $$invalidate(4, required = $$new_props.required);
    		if ('labelPosition' in $$new_props) $$invalidate(5, labelPosition = $$new_props.labelPosition);
    		if ('labelText' in $$new_props) $$invalidate(6, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$new_props) $$invalidate(7, hideLabel = $$new_props.hideLabel);
    		if ('id' in $$new_props) $$invalidate(8, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(9, name = $$new_props.name);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		checked,
    		disabled,
    		required,
    		labelPosition,
    		labelText,
    		hideLabel,
    		id,
    		name,
    		ref,
    		getContext,
    		writable,
    		ctx,
    		selectedValue,
    		$selectedValue
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('value' in $$props) $$invalidate(2, value = $$new_props.value);
    		if ('checked' in $$props) $$invalidate(0, checked = $$new_props.checked);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('required' in $$props) $$invalidate(4, required = $$new_props.required);
    		if ('labelPosition' in $$props) $$invalidate(5, labelPosition = $$new_props.labelPosition);
    		if ('labelText' in $$props) $$invalidate(6, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$props) $$invalidate(7, hideLabel = $$new_props.hideLabel);
    		if ('id' in $$props) $$invalidate(8, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(9, name = $$new_props.name);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$selectedValue, value*/ 16388) {
    			$$invalidate(0, checked = $selectedValue === value);
    		}
    	};

    	return [
    		checked,
    		ref,
    		value,
    		disabled,
    		required,
    		labelPosition,
    		labelText,
    		hideLabel,
    		id,
    		name,
    		ctx,
    		selectedValue,
    		$$restProps,
    		$$slots,
    		$selectedValue,
    		$$scope,
    		slots,
    		change_handler,
    		input_binding,
    		change_handler_1
    	];
    }

    class RadioButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			value: 2,
    			checked: 0,
    			disabled: 3,
    			required: 4,
    			labelPosition: 5,
    			labelText: 6,
    			hideLabel: 7,
    			id: 8,
    			name: 9,
    			ref: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RadioButton",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get value() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelPosition() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelPosition(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<RadioButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<RadioButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var RadioButton$1 = RadioButton;

    /* node_modules\carbon-components-svelte\src\icons\CheckmarkFilled.svelte generated by Svelte v3.59.2 */

    const file$6 = "node_modules\\carbon-components-svelte\\src\\icons\\CheckmarkFilled.svelte";

    // (24:2) {#if title}
    function create_if_block$3(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$6, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$3(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z");
    			add_location(path0, file$6, 24, 2, 579);
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "d", "M14 21.591L9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591z");
    			attr_dev(path1, "data-icon-path", "inner-path");
    			add_location(path1, file$6, 26, 10, 707);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$6, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CheckmarkFilled', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class CheckmarkFilled extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CheckmarkFilled",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get size() {
    		throw new Error("<CheckmarkFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<CheckmarkFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CheckmarkFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CheckmarkFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var CheckmarkFilled$1 = CheckmarkFilled;

    /* node_modules\carbon-components-svelte\src\icons\ErrorFilled.svelte generated by Svelte v3.59.2 */

    const file$5 = "node_modules\\carbon-components-svelte\\src\\icons\\ErrorFilled.svelte";

    // (24:2) {#if title}
    function create_if_block$2(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$5, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$2(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "d", "M14.9 7.2H17.1V24.799H14.9z");
    			attr_dev(path0, "data-icon-path", "inner-path");
    			attr_dev(path0, "transform", "rotate(-45 16 16)");
    			add_location(path0, file$5, 24, 2, 579);
    			attr_dev(path1, "d", "M16,2A13.914,13.914,0,0,0,2,16,13.914,13.914,0,0,0,16,30,13.914,13.914,0,0,0,30,16,13.914,13.914,0,0,0,16,2Zm5.4449,21L9,10.5557,10.5557,9,23,21.4448Z");
    			add_location(path1, file$5, 28, 41, 710);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$5, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ErrorFilled', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class ErrorFilled extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ErrorFilled",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get size() {
    		throw new Error("<ErrorFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ErrorFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ErrorFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ErrorFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ErrorFilled$1 = ErrorFilled;

    /* node_modules\carbon-components-svelte\src\ProgressBar\ProgressBar.svelte generated by Svelte v3.59.2 */
    const file$4 = "node_modules\\carbon-components-svelte\\src\\ProgressBar\\ProgressBar.svelte";
    const get_labelText_slot_changes = dirty => ({});
    const get_labelText_slot_context = ctx => ({});

    // (80:27)        
    function fallback_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelText*/ 16) set_data_dev(t, /*labelText*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(80:27)        ",
    		ctx
    	});

    	return block;
    }

    // (83:4) {#if status === "error" || status === "finished"}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*statusIcons*/ ctx[10][/*status*/ ctx[2]];

    	function switch_props(ctx) {
    		return {
    			props: { class: "bx--progress-bar__status-icon" },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*status*/ 4 && switch_value !== (switch_value = /*statusIcons*/ ctx[10][/*status*/ ctx[2]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(83:4) {#if status === \\\"error\\\" || status === \\\"finished\\\"}",
    		ctx
    	});

    	return block;
    }

    // (105:2) {#if helperText}
    function create_if_block$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[6]);
    			attr_dev(div, "id", /*helperId*/ ctx[11]);
    			toggle_class(div, "bx--progress-bar__helper-text", true);
    			add_location(div, file$4, 105, 4, 2655);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*helperText*/ 64) set_data_dev(t, /*helperText*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(105:2) {#if helperText}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div2;
    	let label;
    	let t0;
    	let t1;
    	let div1;
    	let div0;
    	let div1_aria_busy_value;
    	let div1_aria_valuemin_value;
    	let div1_aria_valuemax_value;
    	let div1_aria_valuenow_value;
    	let div1_aria_describedby_value;
    	let t2;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[15].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[14], get_labelText_slot_context);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block$1(ctx);
    	let if_block0 = (/*status*/ ctx[2] === "error" || /*status*/ ctx[2] === "finished") && create_if_block_1(ctx);
    	let if_block1 = /*helperText*/ ctx[6] && create_if_block$1(ctx);
    	let div2_levels = [/*$$restProps*/ ctx[12]];
    	let div_data_2 = {};

    	for (let i = 0; i < div2_levels.length; i += 1) {
    		div_data_2 = assign(div_data_2, div2_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(label, "for", /*id*/ ctx[7]);
    			toggle_class(label, "bx--progress-bar__label", true);
    			toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[5]);
    			add_location(label, file$4, 74, 2, 1776);
    			toggle_class(div0, "bx--progress-bar__bar", true);
    			set_style(div0, "transform", /*status*/ ctx[2] === "active" && `scaleX(${/*capped*/ ctx[8] / /*max*/ ctx[0]})`);
    			add_location(div0, file$4, 99, 4, 2488);
    			attr_dev(div1, "role", "progressbar");
    			attr_dev(div1, "id", /*id*/ ctx[7]);
    			attr_dev(div1, "aria-busy", div1_aria_busy_value = /*status*/ ctx[2] === 'active');
    			attr_dev(div1, "aria-valuemin", div1_aria_valuemin_value = /*indeterminate*/ ctx[9] ? undefined : 0);
    			attr_dev(div1, "aria-valuemax", div1_aria_valuemax_value = /*indeterminate*/ ctx[9] ? undefined : /*max*/ ctx[0]);
    			attr_dev(div1, "aria-valuenow", div1_aria_valuenow_value = /*indeterminate*/ ctx[9] ? undefined : /*capped*/ ctx[8]);
    			attr_dev(div1, "aria-describedby", div1_aria_describedby_value = /*helperText*/ ctx[6] ? /*helperId*/ ctx[11] : null);
    			toggle_class(div1, "bx--progress-bar__track", true);
    			add_location(div1, file$4, 89, 2, 2140);
    			set_attributes(div2, div_data_2);
    			toggle_class(div2, "bx--progress-bar", true);
    			toggle_class(div2, "bx--progress-bar--indeterminate", /*indeterminate*/ ctx[9]);
    			toggle_class(div2, "bx--progress-bar--big", /*size*/ ctx[3] === 'md');
    			toggle_class(div2, "bx--progress-bar--small", /*size*/ ctx[3] === 'sm');
    			toggle_class(div2, "bx--progress-bar--inline", /*kind*/ ctx[1] === 'inline');
    			toggle_class(div2, "bx--progress-bar--indented", /*kind*/ ctx[1] === 'indented');
    			toggle_class(div2, "bx--progress-bar--error", /*status*/ ctx[2] === 'error');
    			toggle_class(div2, "bx--progress-bar--finished", /*status*/ ctx[2] === 'finished');
    			add_location(div2, file$4, 63, 0, 1328);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, label);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			append_dev(label, t0);
    			if (if_block0) if_block0.m(label, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div2, t2);
    			if (if_block1) if_block1.m(div2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[14], dirty, get_labelText_slot_changes),
    						get_labelText_slot_context
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty & /*labelText*/ 16)) {
    					labelText_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (/*status*/ ctx[2] === "error" || /*status*/ ctx[2] === "finished") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*status*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(label, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			if (!current || dirty & /*hideLabel*/ 32) {
    				toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[5]);
    			}

    			if (dirty & /*status, capped, max*/ 261) {
    				set_style(div0, "transform", /*status*/ ctx[2] === "active" && `scaleX(${/*capped*/ ctx[8] / /*max*/ ctx[0]})`);
    			}

    			if (!current || dirty & /*id*/ 128) {
    				attr_dev(div1, "id", /*id*/ ctx[7]);
    			}

    			if (!current || dirty & /*status*/ 4 && div1_aria_busy_value !== (div1_aria_busy_value = /*status*/ ctx[2] === 'active')) {
    				attr_dev(div1, "aria-busy", div1_aria_busy_value);
    			}

    			if (!current || dirty & /*indeterminate*/ 512 && div1_aria_valuemin_value !== (div1_aria_valuemin_value = /*indeterminate*/ ctx[9] ? undefined : 0)) {
    				attr_dev(div1, "aria-valuemin", div1_aria_valuemin_value);
    			}

    			if (!current || dirty & /*indeterminate, max*/ 513 && div1_aria_valuemax_value !== (div1_aria_valuemax_value = /*indeterminate*/ ctx[9] ? undefined : /*max*/ ctx[0])) {
    				attr_dev(div1, "aria-valuemax", div1_aria_valuemax_value);
    			}

    			if (!current || dirty & /*indeterminate, capped*/ 768 && div1_aria_valuenow_value !== (div1_aria_valuenow_value = /*indeterminate*/ ctx[9] ? undefined : /*capped*/ ctx[8])) {
    				attr_dev(div1, "aria-valuenow", div1_aria_valuenow_value);
    			}

    			if (!current || dirty & /*helperText*/ 64 && div1_aria_describedby_value !== (div1_aria_describedby_value = /*helperText*/ ctx[6] ? /*helperId*/ ctx[11] : null)) {
    				attr_dev(div1, "aria-describedby", div1_aria_describedby_value);
    			}

    			if (/*helperText*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(div2, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			set_attributes(div2, div_data_2 = get_spread_update(div2_levels, [dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]]));
    			toggle_class(div2, "bx--progress-bar", true);
    			toggle_class(div2, "bx--progress-bar--indeterminate", /*indeterminate*/ ctx[9]);
    			toggle_class(div2, "bx--progress-bar--big", /*size*/ ctx[3] === 'md');
    			toggle_class(div2, "bx--progress-bar--small", /*size*/ ctx[3] === 'sm');
    			toggle_class(div2, "bx--progress-bar--inline", /*kind*/ ctx[1] === 'inline');
    			toggle_class(div2, "bx--progress-bar--indented", /*kind*/ ctx[1] === 'indented');
    			toggle_class(div2, "bx--progress-bar--error", /*status*/ ctx[2] === 'error');
    			toggle_class(div2, "bx--progress-bar--finished", /*status*/ ctx[2] === 'finished');
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let indeterminate;
    	const omit_props_names = ["value","max","kind","status","size","labelText","hideLabel","helperText","id"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProgressBar', slots, ['labelText']);
    	let { value = undefined } = $$props;
    	let { max = 100 } = $$props;
    	let { kind = "default" } = $$props;
    	let { status = "active" } = $$props;
    	let { size = "md" } = $$props;
    	let { labelText = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { helperText = "" } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;

    	const statusIcons = {
    		error: ErrorFilled$1,
    		finished: CheckmarkFilled$1
    	};

    	let helperId = "ccs-" + Math.random().toString(36);
    	let capped;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('value' in $$new_props) $$invalidate(13, value = $$new_props.value);
    		if ('max' in $$new_props) $$invalidate(0, max = $$new_props.max);
    		if ('kind' in $$new_props) $$invalidate(1, kind = $$new_props.kind);
    		if ('status' in $$new_props) $$invalidate(2, status = $$new_props.status);
    		if ('size' in $$new_props) $$invalidate(3, size = $$new_props.size);
    		if ('labelText' in $$new_props) $$invalidate(4, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$new_props) $$invalidate(5, hideLabel = $$new_props.hideLabel);
    		if ('helperText' in $$new_props) $$invalidate(6, helperText = $$new_props.helperText);
    		if ('id' in $$new_props) $$invalidate(7, id = $$new_props.id);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		max,
    		kind,
    		status,
    		size,
    		labelText,
    		hideLabel,
    		helperText,
    		id,
    		CheckmarkFilled: CheckmarkFilled$1,
    		ErrorFilled: ErrorFilled$1,
    		statusIcons,
    		helperId,
    		capped,
    		indeterminate
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('value' in $$props) $$invalidate(13, value = $$new_props.value);
    		if ('max' in $$props) $$invalidate(0, max = $$new_props.max);
    		if ('kind' in $$props) $$invalidate(1, kind = $$new_props.kind);
    		if ('status' in $$props) $$invalidate(2, status = $$new_props.status);
    		if ('size' in $$props) $$invalidate(3, size = $$new_props.size);
    		if ('labelText' in $$props) $$invalidate(4, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$props) $$invalidate(5, hideLabel = $$new_props.hideLabel);
    		if ('helperText' in $$props) $$invalidate(6, helperText = $$new_props.helperText);
    		if ('id' in $$props) $$invalidate(7, id = $$new_props.id);
    		if ('helperId' in $$props) $$invalidate(11, helperId = $$new_props.helperId);
    		if ('capped' in $$props) $$invalidate(8, capped = $$new_props.capped);
    		if ('indeterminate' in $$props) $$invalidate(9, indeterminate = $$new_props.indeterminate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value, status*/ 8196) {
    			$$invalidate(9, indeterminate = value === undefined && status === "active");
    		}

    		if ($$self.$$.dirty & /*status, value, max*/ 8197) {
    			{
    				if (status === "error" || value < 0) {
    					$$invalidate(8, capped = 0);
    				} else if (value > max) {
    					$$invalidate(8, capped = max);
    				} else {
    					$$invalidate(8, capped = value);
    				}
    			}
    		}
    	};

    	return [
    		max,
    		kind,
    		status,
    		size,
    		labelText,
    		hideLabel,
    		helperText,
    		id,
    		capped,
    		indeterminate,
    		statusIcons,
    		helperId,
    		$$restProps,
    		value,
    		$$scope,
    		slots
    	];
    }

    class ProgressBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			value: 13,
    			max: 0,
    			kind: 1,
    			status: 2,
    			size: 3,
    			labelText: 4,
    			hideLabel: 5,
    			helperText: 6,
    			id: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProgressBar",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get value() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get kind() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set kind(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get status() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set status(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get helperText() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set helperText(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ProgressBar$1 = ProgressBar;

    /* node_modules\carbon-components-svelte\src\RadioButtonGroup\RadioButtonGroup.svelte generated by Svelte v3.59.2 */
    const file$3 = "node_modules\\carbon-components-svelte\\src\\RadioButtonGroup\\RadioButtonGroup.svelte";
    const get_legendText_slot_changes = dirty => ({});
    const get_legendText_slot_context = ctx => ({});

    // (90:4) {#if legendText || $$slots.legendText}
    function create_if_block(ctx) {
    	let legend;
    	let current;
    	const legendText_slot_template = /*#slots*/ ctx[11].legendText;
    	const legendText_slot = create_slot(legendText_slot_template, ctx, /*$$scope*/ ctx[10], get_legendText_slot_context);
    	const legendText_slot_or_fallback = legendText_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			legend = element("legend");
    			if (legendText_slot_or_fallback) legendText_slot_or_fallback.c();
    			toggle_class(legend, "bx--label", true);
    			toggle_class(legend, "bx--visually-hidden", /*hideLegend*/ ctx[2]);
    			add_location(legend, file$3, 90, 6, 1999);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, legend, anchor);

    			if (legendText_slot_or_fallback) {
    				legendText_slot_or_fallback.m(legend, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (legendText_slot) {
    				if (legendText_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						legendText_slot,
    						legendText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(legendText_slot_template, /*$$scope*/ ctx[10], dirty, get_legendText_slot_changes),
    						get_legendText_slot_context
    					);
    				}
    			} else {
    				if (legendText_slot_or_fallback && legendText_slot_or_fallback.p && (!current || dirty & /*legendText*/ 2)) {
    					legendText_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*hideLegend*/ 4) {
    				toggle_class(legend, "bx--visually-hidden", /*hideLegend*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(legendText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(legendText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(legend);
    			if (legendText_slot_or_fallback) legendText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(90:4) {#if legendText || $$slots.legendText}",
    		ctx
    	});

    	return block;
    }

    // (92:32) {legendText}
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*legendText*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*legendText*/ 2) set_data_dev(t, /*legendText*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(92:32) {legendText}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let fieldset;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = (/*legendText*/ ctx[1] || /*$$slots*/ ctx[8].legendText) && create_if_block(ctx);
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	let div_levels = [{ id: /*id*/ ctx[5] }, /*$$restProps*/ ctx[7]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			fieldset = element("fieldset");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			fieldset.disabled = /*disabled*/ ctx[0];
    			toggle_class(fieldset, "bx--radio-button-group", true);
    			toggle_class(fieldset, "bx--radio-button-group--vertical", /*orientation*/ ctx[4] === 'vertical');
    			toggle_class(fieldset, "bx--radio-button-group--label-left", /*labelPosition*/ ctx[3] === 'left');
    			toggle_class(fieldset, "bx--radio-button-group--label-right", /*labelPosition*/ ctx[3] === 'right');
    			add_location(fieldset, file$3, 82, 2, 1644);
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--form-item", true);
    			add_location(div, file$3, 73, 0, 1515);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, fieldset);
    			if (if_block) if_block.m(fieldset, null);
    			append_dev(fieldset, t);

    			if (default_slot) {
    				default_slot.m(fieldset, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler*/ ctx[12], false, false, false, false),
    					listen_dev(div, "mouseover", /*mouseover_handler*/ ctx[13], false, false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler*/ ctx[14], false, false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler*/ ctx[15], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*legendText*/ ctx[1] || /*$$slots*/ ctx[8].legendText) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*legendText, $$slots*/ 258) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(fieldset, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*disabled*/ 1) {
    				prop_dev(fieldset, "disabled", /*disabled*/ ctx[0]);
    			}

    			if (!current || dirty & /*orientation*/ 16) {
    				toggle_class(fieldset, "bx--radio-button-group--vertical", /*orientation*/ ctx[4] === 'vertical');
    			}

    			if (!current || dirty & /*labelPosition*/ 8) {
    				toggle_class(fieldset, "bx--radio-button-group--label-left", /*labelPosition*/ ctx[3] === 'left');
    			}

    			if (!current || dirty & /*labelPosition*/ 8) {
    				toggle_class(fieldset, "bx--radio-button-group--label-right", /*labelPosition*/ ctx[3] === 'right');
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty & /*id*/ 32) && { id: /*id*/ ctx[5] },
    				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]
    			]));

    			toggle_class(div, "bx--form-item", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"selected","disabled","legendText","hideLegend","labelPosition","orientation","id"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $selectedValue;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RadioButtonGroup', slots, ['legendText','default']);
    	const $$slots = compute_slots(slots);
    	let { selected = undefined } = $$props;
    	let { disabled = false } = $$props;
    	let { legendText = "" } = $$props;
    	let { hideLegend = false } = $$props;
    	let { labelPosition = "right" } = $$props;
    	let { orientation = "horizontal" } = $$props;
    	let { id = undefined } = $$props;
    	const dispatch = createEventDispatcher();
    	const selectedValue = writable(selected);
    	validate_store(selectedValue, 'selectedValue');
    	component_subscribe($$self, selectedValue, value => $$invalidate(16, $selectedValue = value));

    	setContext("RadioButtonGroup", {
    		selectedValue,
    		add: ({ checked, value }) => {
    			if (checked) {
    				selectedValue.set(value);
    			}
    		},
    		update: value => {
    			$$invalidate(9, selected = value);
    		}
    	});

    	onMount(() => {
    		set_store_value(selectedValue, $selectedValue = selected, $selectedValue);
    	});

    	beforeUpdate(() => {
    		set_store_value(selectedValue, $selectedValue = selected, $selectedValue);
    	});

    	selectedValue.subscribe(value => {
    		$$invalidate(9, selected = value);
    		dispatch("change", value);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('selected' in $$new_props) $$invalidate(9, selected = $$new_props.selected);
    		if ('disabled' in $$new_props) $$invalidate(0, disabled = $$new_props.disabled);
    		if ('legendText' in $$new_props) $$invalidate(1, legendText = $$new_props.legendText);
    		if ('hideLegend' in $$new_props) $$invalidate(2, hideLegend = $$new_props.hideLegend);
    		if ('labelPosition' in $$new_props) $$invalidate(3, labelPosition = $$new_props.labelPosition);
    		if ('orientation' in $$new_props) $$invalidate(4, orientation = $$new_props.orientation);
    		if ('id' in $$new_props) $$invalidate(5, id = $$new_props.id);
    		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		selected,
    		disabled,
    		legendText,
    		hideLegend,
    		labelPosition,
    		orientation,
    		id,
    		beforeUpdate,
    		createEventDispatcher,
    		onMount,
    		setContext,
    		writable,
    		dispatch,
    		selectedValue,
    		$selectedValue
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('selected' in $$props) $$invalidate(9, selected = $$new_props.selected);
    		if ('disabled' in $$props) $$invalidate(0, disabled = $$new_props.disabled);
    		if ('legendText' in $$props) $$invalidate(1, legendText = $$new_props.legendText);
    		if ('hideLegend' in $$props) $$invalidate(2, hideLegend = $$new_props.hideLegend);
    		if ('labelPosition' in $$props) $$invalidate(3, labelPosition = $$new_props.labelPosition);
    		if ('orientation' in $$props) $$invalidate(4, orientation = $$new_props.orientation);
    		if ('id' in $$props) $$invalidate(5, id = $$new_props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		disabled,
    		legendText,
    		hideLegend,
    		labelPosition,
    		orientation,
    		id,
    		selectedValue,
    		$$restProps,
    		$$slots,
    		selected,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class RadioButtonGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			selected: 9,
    			disabled: 0,
    			legendText: 1,
    			hideLegend: 2,
    			labelPosition: 3,
    			orientation: 4,
    			id: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RadioButtonGroup",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get selected() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get legendText() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set legendText(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLegend() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLegend(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelPosition() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelPosition(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get orientation() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set orientation(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<RadioButtonGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<RadioButtonGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var RadioButtonGroup$1 = RadioButtonGroup;

    /* src\components\RadioButton.svelte generated by Svelte v3.59.2 */
    const file$2 = "src\\components\\RadioButton.svelte";

    // (16:4) <RadioButtonGroup selected="standard">
    function create_default_slot(ctx) {
    	let radiobutton0;
    	let t0;
    	let radiobutton1;
    	let t1;
    	let radiobutton2;
    	let current;

    	radiobutton0 = new RadioButton$1({
    			props: { labelText: "Free (1 GB)", value: "free" },
    			$$inline: true
    		});

    	radiobutton1 = new RadioButton$1({
    			props: {
    				labelText: "Standard (10 GB)",
    				value: "standard"
    			},
    			$$inline: true
    		});

    	radiobutton2 = new RadioButton$1({
    			props: { labelText: "Pro (128 GB)", value: "pro" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(radiobutton0.$$.fragment);
    			t0 = space();
    			create_component(radiobutton1.$$.fragment);
    			t1 = space();
    			create_component(radiobutton2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(radiobutton0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(radiobutton1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(radiobutton2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(radiobutton0.$$.fragment, local);
    			transition_in(radiobutton1.$$.fragment, local);
    			transition_in(radiobutton2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(radiobutton0.$$.fragment, local);
    			transition_out(radiobutton1.$$.fragment, local);
    			transition_out(radiobutton2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(radiobutton0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(radiobutton1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(radiobutton2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(16:4) <RadioButtonGroup selected=\\\"standard\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let radiobuttongroup;
    	let current;

    	radiobuttongroup = new RadioButtonGroup$1({
    			props: {
    				selected: "standard",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(radiobuttongroup.$$.fragment);
    			attr_dev(div, "class", "container-fluid py-5 container-small svelte-1jx5lpr");
    			add_location(div, file$2, 14, 0, 234);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(radiobuttongroup, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const radiobuttongroup_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				radiobuttongroup_changes.$$scope = { dirty, ctx };
    			}

    			radiobuttongroup.$set(radiobuttongroup_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(radiobuttongroup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(radiobuttongroup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(radiobuttongroup);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RadioButton', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RadioButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ RadioButtonGroup: RadioButtonGroup$1, RadioButton: RadioButton$1 });
    	return [];
    }

    class RadioButton_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RadioButton_1",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\LoadingBar.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\components\\LoadingBar.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let progressbar;
    	let current;

    	progressbar = new ProgressBar$1({
    			props: { helperText: "Loading..." },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(progressbar.$$.fragment);
    			attr_dev(div, "class", "container-fluid py-5 container-small svelte-1jx5lpr");
    			add_location(div, file$1, 14, 0, 216);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(progressbar, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(progressbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(progressbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(progressbar);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LoadingBar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LoadingBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ ProgressBar: ProgressBar$1 });
    	return [];
    }

    class LoadingBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LoadingBar",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let navbar;
    	let t0;
    	let radiobutton;
    	let t1;
    	let loadingbar;
    	let t2;
    	let jumbotron;
    	let t3;
    	let footer;
    	let current;
    	navbar = new Navbar({ $$inline: true });
    	radiobutton = new RadioButton_1({ $$inline: true });
    	loadingbar = new LoadingBar({ $$inline: true });
    	jumbotron = new Jumbotron({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			create_component(radiobutton.$$.fragment);
    			t1 = space();
    			create_component(loadingbar.$$.fragment);
    			t2 = space();
    			create_component(jumbotron.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file, 14, 0, 443);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(navbar, main, null);
    			append_dev(main, t0);
    			mount_component(radiobutton, main, null);
    			append_dev(main, t1);
    			mount_component(loadingbar, main, null);
    			append_dev(main, t2);
    			mount_component(jumbotron, main, null);
    			append_dev(main, t3);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(radiobutton.$$.fragment, local);
    			transition_in(loadingbar.$$.fragment, local);
    			transition_in(jumbotron.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(radiobutton.$$.fragment, local);
    			transition_out(loadingbar.$$.fragment, local);
    			transition_out(jumbotron.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			destroy_component(radiobutton);
    			destroy_component(loadingbar);
    			destroy_component(jumbotron);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Navbar,
    		Footer,
    		Jumbotron,
    		RadioButton: RadioButton_1,
    		LoadingBar
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
