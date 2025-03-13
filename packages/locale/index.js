/**
 * Container for localized variants of string.
 * @constructor
 * @typedef {Object} LocStr
 * @param {string} name to refer to this container
 * @param {object} values of localized variants
 * @returns {LocStr}
 * @example
 * import { LocStr } from '@svgfwjs/locale'
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * const startMsg = new LocStr('startMsg', {
 *   'en-US': 'Type "start" to Start',
 *   'ru-RU': 'Напишите "start" чтобы начать'
 * })
 * 
 * stdout(startMsg)
 * // Will output:
 * // Type "start" to Start
 * //
 * // Depending on which locale was set in 
 * // process.env.locale property
 */
function LocStr(name, values) {
    if (!(this instanceof LocStr))
        return new LocStr(name, values)
    else {
        var a = this
        Object.defineProperty(a, '_name', { value: name })
        Object.keys(values).forEach(function(b) {
            Object.defineProperty(a, b, {
                enumerable: !0,
                value: values[b]
            })
        })
    }
}

Object.defineProperty(LocStr.prototype, 'toString', {
    value: function toString(a) {
        return this[process.env.locale] || this[a]
    }
})

module.exports.Dict = function Dict() {

}

module.exports.LocStr = LocStr