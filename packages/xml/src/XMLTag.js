/**
 * Represents an XML Node as JS object, allows to modify its data and renders in XML syntax.
 * @constructor
 * @prop {object} XMLTag.prototype.attr Node attributes
 * @prop {string[]|XMLTag[]} XMLTag.prototype.content
 * @prop {string} XMLTag.prototype.name
 * @func XMLTag.prototype.toString() Renders Node in XML syntax
 * @param {object} opts Set Node's initial data
 * @example
 * import { XMLTag } from 'svgfwjs/xml'
 * 
 * // Create a new XML element
 * let your_element = new XMLTag({
 *  attr: {
 *   someProp: 'some_value'
 *  },
 *  content: 'Element contents goes here',
 *  name: 'coolName'
 * })
 * 
 * // Edit element's data whenever needed
 * your_element.attr.otherProp = 'another_value'
 * your_element.content = 'New data'
 * // You may put other elements inside
 * list[index] = new XMLTag({
 *  content: 'Touch Grass',
 *  name: 'item'
 * })
 * your_element.content = ['TO DO List:', list[index]]
 * 
 * // Render as XML code
 * console.log(your_element.toString())
 * // or
 * console.log('' + your_element)
 */
function XMLTag(opts) {
    if (!(this instanceof XMLTag))
        throw new Error('This constructor must be invoked with a keyword "new".')
    if ('object' == typeof opts && opts.name) {
        opts.name = e(opts.name)
        if (opts.name && c(opts.name)) {
            console.warn(a)
            opts.name = ''
        }
        if (opts.name && d(opts.name)) {
            console.warn(b)
            opts.name = ''
        }
    }
    if ('object' == typeof opts && (opts.content || opts.text))
        opts.content = f(opts.content || opts.text)
    if ('object' == typeof opts
        && 'object' == typeof opts.attr
        || 'object' == typeof opts.props
        || 'object' == typeof opts.attributes
        || 'object' == typeof opts.properties) {
        opts.attr = opts.attr || opts.props || opts.attributes || opts.properties
        if ('object' == typeof opts.attr)
            Object.keys(opts.attr).forEach(function(a) {
                var b = opts.attr[a]
                opts.attr[a] = {
                    configurable: true,
                    enumerable: true,
                    value: b,
                    writable: true
                }
            })
    }
    Object.defineProperties(this, {
        _attr: {
            configurable: true,
            value: 'object' == typeof opts
                && 'object' == typeof opts.attr
                ? Object.create(null, opts.attr)
                : Object.create(null)
        },
        _content: {
            configurable: true,
            value: 'object' == typeof opts
                && opts.content
                ? opts.content
                : undefined
        },
        _name: {
            configurable: true,
            value: 'object' == typeof opts
                && opts.name
                ? opts.name
                : ''
        }
    })
}

var a = 'Name cannot start with "XML".',
    b = 'Name must start with a letter or underscore.',
    c = function(a) {
    return 0 == a.toLowerCase().indexOf('xml')
},
    d = function(a) {
    return !/[a-zA-Z_]/.test(a)
},
    e = function(a) {
    a = '' + a
    return a.replaceAll(' ', '')
},
    f = function(a) {
    return a instanceof Array
        || a instanceof XMLTag
        ? a 
        : '' + a
},
    g = function get() {
    return this._content
},
    h = function set(a) {
    Object.defineProperty(this, '_content', {
        configurable: true,
        value: f(a)
    })
},
    i = function get() {
    return this._attr
},
    j = function(a) {
    return a
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&apos;')
},
    k = function(a) {
    var b = ''
    for (var c in a)
        if (a[c] instanceof Array)
            b += k(a[c])
        else
            b += '' + (a[c] instanceof XMLTag ? a[c] : j(a[c]))
    return b
},
    l = function(a) {
    var b = ''
    Object.keys(a).forEach(function(c) {
        b += ' ' + c + '="' + a[c] + '"'
    })
    return b
}

Object.defineProperties(XMLTag.prototype, {
    /**
     * @prop {object} XMLTag.prototype.attr Node attributes
     */
    attr: {
        get: i
    },
    /**
     * @prop {object} XMLTag.prototype.attributes Alias to `XMLTag.prototype.attr`
     */
    attributes: {
        get: i
    },
    /**
     * @prop {string[]|XMLTag[]} XMLTag.prototype.content
     */
    content: {
        get: g,
        set: h
    },
    /**
     * @prop {string} XMLTag.prototype.name
     */
    name: {
        get: function get() {
            return this._name
        },
        set: function set(f) {
            f = e(f)
            if (c(f))
                throw new Error(a)
            else if (d(f[0]))
                throw new Error(b)
            else
                Object.defineProperty(this, '_name', {
                    configurable: true,
                    value: f
                })
        }
    },
    /**
     * @prop {object} XMLTag.prototype.props Alias to `XMLTag.prototype.attr`
     */
    props: {
        get: i
    },
    /**
     * @prop {object} XMLTag.prototype.properties Alias to `XMLTag.prototype.attr`
     */
    properties: {
        get: i
    },
    /**
     * @prop {string[]|XMLTag[]} XMLTag.prototype.text Alias to `XMLTag.prototype.content`
     */
    text: {
        get: g,
        set: h
    },
    /**
     * @func XMLTag.prototype.toString() Renders Node in XML syntax
     */
    toString: {
        value: function toString() {
            if (!this.name)
                throw new Error('Name cannot be empty.')
            else
                return '<' + this.name
                    + l(this.attr) + '>'
                    + (this.content 
                        ? this.content instanceof Array
                            ? k(this.content)
                            : j(this.content)
                        : '')
                    + '</' + this.name + '>'
        }
    }
})

module.exports = XMLTag