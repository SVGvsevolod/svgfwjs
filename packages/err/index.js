'use strict'

/**
 * Creates and returns an `Error` instance and reduces the stack trace to function that throws that `Error` instance.
 * @param {string} msg of `Error` to output/display
 * @param {function} caller that throws the `Error`
 * @param {Error} type of `Error` (must be any of `Error` object)
 * @param {object} opts
 * @returns {Error}
 * @example
 * import err from '@svgfwjs/err'
 *
 * function yourCoolFunction() {
 *  if ( somethingIncorrect )
 *   throw err('You did it wrong!', yourCoolFunction)
 * }
 *
 * yourCoolFunction()
 */
module.exports = function err(msg, caller, type, opts) {
    type = 'function' == typeof type ? type : Error
    var a = type(msg, opts)
    if ('function' == typeof Error.captureStackTrace && 'function' == typeof caller)
        Error.captureStackTrace(a, caller)
    return a
}