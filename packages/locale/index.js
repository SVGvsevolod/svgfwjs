/**
 * Container for localized strings (A `Dict`ionary)
 * @constructor
 * @typedef {Object} Dict
 * @param {...LocStr} [strings]
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
            Dict.add(this, b[c], a[b[c]])
    }
}

/**
 * Container for localized variants of string.
 * @constructor
 * @typedef {Object} LocStr
 * @param {object} [values] of localized variants
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
            this.set(a[b], values[a[b]])
    }
}

Object.defineProperty(Dict, 'add', {
    enumerable: !0,
    value: function add(a, b, c) {
        if (a instanceof Dict
         && c instanceof LocStr || 'object' == typeof c)
            Object.defineProperty(a, '' + b, {
                enumerable: !0,
                value: c instanceof LocStr
                    ? c
                    : new LocStr(c)
            })
        return a
    }
})

Object.defineProperties(LocStr.prototype, {
    set: {
        enumerable: !0,
        value: function set(a, b) {
            if (!this['' + a])
                Object.defineProperty(this, a, {
                    enumerable: !0,
                    value: '' + b
                })
            return this
        }
    },
    toString: {
        value: function(a) {
            return this['' + a]
                || this[process.env.locale]
                || this[Object.keys(this)[0]]
        }
    }
})

module.exports.Dict = Dict
module.exports.LocStr = LocStr