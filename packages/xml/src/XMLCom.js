/**
 * Represents an XML Comment as JS object, allows to modify its content and renders in XML syntax.
 * @constructor
 * @prop {string} XMLTag.prototype.content
 * @func XMLTag.prototype.toString() Renders Node in XML syntax
 * @param {object} opts Set Node's initial data
 * @example
 * import { XMLCom } from '@svgfwjs/xml'
 * 
 * // Create a new XML comment
 * let your_comment = new XMLCom({
 *  content: 'Cool comment'
 * })
 * 
 * // Edit comment text whenever needed
 * your_comment.content = 'Cooler comment'
 * 
 * // Render as XML code
 * console.log(your_comment.toString())
 * // or
 * console.log('' + your_comment)
 */
function XMLCom(opts) {
    if (!(this instanceof XMLCom))
        throw new Error(require('./common').a)
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