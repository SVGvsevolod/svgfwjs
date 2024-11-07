'use strict'

function XMLTag(name, content, attr) {
    if (!(this instanceof XMLTag))
        return new XMLTag(name, content, attr)
    name = 'string' == typeof name ? name : ''
    Object.defineProperties(this, {
        _content: {
            configurable: !0,
            value: a(content)
        },
        _empty: {
            configurable: !0,
            value: 'number' != typeof content 
                || 'string' != typeof content
                || !content
        },
        _name: {
            configurable: !0,
            value: require('./common').c(name, !0, XMLTag)
        }
    })
}

var a = function(a) {
    return 'number' == typeof a
        || a instanceof Array
        || a instanceof XMLTag
        ? a
        : '' + a
},
    b = function set(a) {
    Object.defineProperty(this, '_name', {
        configurable: !0,
        value: require('./common').c(a, !0, b)
    })
},
    c = function get() {
    return this._content
},
    d = function set(b) {
    Object.defineProperty(this, '_content', {
        configurable: !0,
        value: a(b)
    })
}

Object.defineProperties(XMLTag.prototype, {
    [require('node:util').inspect.custom]: {
        value: function() {
            return this._str()
        }
    },
    _str: {
        value: function _str(a) {
            a = 'object' == typeof a ? a : Object.create(null)
            return 'ab'
        }
    },
    content: {
        get: c,
        set: d
    },
    empty: {
        get: function get() {
            return this._empty
        },
        set: function set(a) {
            Object.defineProperty(this, '_empty', {
                configurable: !0,
                value: !!a
            })
        }
    },
    name: {
        get: function get() {
            return this._name
        },
        set: a
    },
    text: {
        get: c,
        set: d
    },
    toJSON: {
        value: function toJSON() {
            return Object.create(null, {
                content: {
                    enumerable: !0,
                    value: this.content
                },
                empty: {
                    enumerable: !0,
                    value: this.empty
                },
                name: {
                    enumerable: !0,
                    value: this.name
                }
            })
        }
    },
    toString: {
        value: function toString(a) {
            return this._str(a)
        }
    }
})

module.exports = XMLTag

/**
 * Represents an XML Node as JS object, allows to modify its data and renders in XML syntax.
 * @constructor
 * @prop {object} XMLTag.prototype.attr Node attributes
 * @prop {string[]|XMLTag[]} XMLTag.prototype.content
 * @prop {boolean} XMLTag.prototype.hasContent
 * @prop {string} XMLTag.prototype.name
 * @func XMLTag.prototype.toString() Renders Node in XML syntax
 * @param {object} opts Set Node's initial data
 * @example
 * import { XMLTag } from '@svgfwjs/xml'
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
/*function XMLTag(opts) {
    if (!(this instanceof XMLTag))
        return new XMLTag(opts)
    if ('object' == typeof opts && opts.name)
        opts.name = require('./common').h(opts.name)
    if ('object' == typeof opts && (opts.content || opts.text))
        opts.content = a(opts.content || opts.text)
    if ('object' == typeof opts
     && ('object' == typeof opts.attr
     || 'object' == typeof opts.props
     || 'object' == typeof opts.attributes
     || 'object' == typeof opts.properties)) {
        opts.attr = opts.attr || opts.props || opts.attributes || opts.properties
        require('./common').i(opts.attr)
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
        _hasContent: {
            configurable: true,
            value: 'object' == typeof opts
                && !opts.hasContent
                ? !!opts.hasContent
                : true
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

var a = function(a) {
    return a instanceof Array
        || a instanceof XMLTag
        ? a 
        : '' + a
},
    b = function get() {
    return this._content
},
    c = function set(a) {
    Object.defineProperty(this, '_content', {
        configurable: true,
        value: a(a)
    })
},
    d = function get() {
    return this._attr
},
    e = function(a) {
    return a
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&apos;')
},
    f = function(a) {
    var b = ''
    for (var c in a)
        if (a[c] instanceof Array)
            b += f(a[c])
        else
            b += '' + (a[c] instanceof XMLTag ? a[c] : e(a[c]))
    return b
},
    g = function(a) {
    var b = ''
    Object.keys(a).forEach(function(c) {
        if (/^[a-zA-Z1-9-_:.]+$/.test(c) && '' + a[c]) {
            var d = ('' + a[c]).indexOf('"') > -1 ? '\'' : '"'
            b += ' ' + c + '=' + d + a[c] + d
        }
    })
    return b
}

Object.defineProperties(XMLTag.prototype, {
    attr: {
        get: d
    },
    attributes: {
        get: d
    },
    content: {
        get: b,
        set: c
    },
    hasContent: {
        get: function get() {
            return this._hasContent
        },
        set: function set(a) {
            Object.defineProperty(this, '_hasContent', {
                configurable: true,
                value: !!a
            })
        }
    },
    name: {
        get: function get() {
            return this._name
        },
        set: function set(a) {
            a = require('./common').g(a)
            if (require('./common').e(a))
                throw new Error(require('./common').b)
            else if (require('./common').f(a[0]))
                throw new Error(require('./common').c)
            else
                Object.defineProperty(this, '_name', {
                    configurable: true,
                    value: a
                })
        }
    },
    props: {
        get: d
    },
    properties: {
        get: d
    },
    text: {
        get: b,
        set: c
    },
    toString: {
        value: function toString() {
            if (!this.name)
                throw require('@svgfwjs/err').err(require('./common').d, XMLTag.prototype.toString)
            else
                return '<' + this.name
                    + g(this.attr)
                    + (this.hasContent
                        ? '>'
                        + (this.content 
                            ? this.content instanceof Array
                                ? f(this.content)
                                : e(this.content)
                            : '')
                        + '</' + this.name + '>'
                        : '/>')
        }
    }
})

module.exports = XMLTag*/