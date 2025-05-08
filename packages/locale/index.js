/**
 * Container for localized strings (A `Dict`ionary)
 * @constructor
 * @param {...LocStr} strings
 * @returns {Dict}
 * @example
 * import { Dict } from '@svgfwjs/locale'
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * const str = new Dict({
 *   start: {
 *     'en-US': 'Type "start" to Start',
 *     'ru-RU': 'Напишите "start" чтобы начать'
 *   },
 *   err: {
 *     'en-US': 'An error has occured',
 *     'ru-RU': 'Произошла ошибка'
 *   }
 * })
 * 
 * stdout(str.start)
 * // Will output:
 * // Type "start" to Start
 * //
 * // Depending on which locale was set in 
 * // process.env.locale property
 */
function Dict(strings) {
    var a = arguments.length > 1 ? arguments : strings
    if (!(this instanceof Dict))
        return new Dict(a)
    else {
        var b = Object.keys(a)
        for (var c = 0; c < b.length; c++)
            this.add(b[c], a[b[c]])
    }
}

/**
 * @typedef {Object} LocalizedVariants
 * @prop {string} variant
 */

/**
 * Container for localized variants of string.
 * @constructor
 * @typedef {Object} LocStr
 * @param {LocalizedVariants} values of localized variants
 * @returns {LocStr}
 * @example
 * import { LocStr } from '@svgfwjs/locale'
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * const startMsg = new LocStr({
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
function LocStr(values) {
    if (!(this instanceof LocStr))
        return new LocStr(values)
    else if ('object' == typeof values) {
        var a = Object.keys(values)
        for (var b = 0; b < a.length; b++)
            Object.defineProperty(this, a[b], {
                enumerable: !0,
                value: values[a[b]]
            })
    }
}

Object.defineProperty(Dict.prototype, 'add', {
    enumerable: !0,
    value: function add(name, str) {
        if (str instanceof LocStr || 'object' == typeof str)
            Object.defineProperty(this, name, {
                enumerable: !0,
                value: str instanceof LocStr
                    ? str
                    : new LocStr(str)
            })
    }
})

Object.defineProperties(LocStr.prototype, {
    set: {
        enumerable: !0,
        value: function set(ISOLang, value) {
            if (!this[ISOLang])
                Object.defineProperty(this, ISOLang, {
                    enumerable: !0,
                    value: value
                })
        }
    },
    toString: {
        value: function(a) {
            return this[a]
                || this[process.env.locale]
                || this[Object.keys(this)[0]]
        }
    }
})

module.exports.Dict = Dict
module.exports.LocStr = LocStr