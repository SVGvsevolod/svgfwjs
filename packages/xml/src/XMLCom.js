/**
 * Represents an XML Comment as JS object, allows to modify its content and renders in XML syntax.
 * @constructor
 * @prop {string} XMLTag.prototype.content
 * @func XMLTag.prototype.toString() Renders Node in XML syntax
 * @param {object} opts Set Node's initial data
 */
function XMLCom(opts) {
    if (!(this instanceof XMLCom))
        throw new Error('This constructor must be invoked with a keyword "new".')
    if ('object' == typeof opts && (opts.content || opts.text))
        opts.content = '' + (opts.content || opts.text)
    Object.defineProperty(this, '_content', {
        configurable: true,
        value: 'object' == typeof opts
            && opts.content
            ? opts.content
            : undefined
    })
}

var a = function get() {
    return this._content
},
    b = function set(a) {
    Object.defineProperty(this, '_content', {
        configurable: true,
        value: '' + a
    })
}

Object.setPrototypeOf(XMLCom.prototype, require('./XMLTag').prototype)

Object.defineProperties(XMLCom.prototype, {
    content: {
        get: a,
        set: b
    },
    text: {
        get: a,
        set: b
    },
    toString: {
        value: function toString() {
            return '<!--' + this.content.replaceAll('-->', '&ndash;->') + '-->'
        }
    }
})

module.exports = XMLCom