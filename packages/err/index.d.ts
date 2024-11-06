/**
 * Creates and returns an `Error` instance and reduces the stack trace to function that throws that `Error` instance.
 * @param {string} msg of `Error` to output/display
 * @param {function} caller that throws the `Error`
 * @param {Error} type of `Error` (must be any of `Error` object)
 * @param {object} opts
 * @returns {Error}
 * @example
 * import { err } from '@svgfwjs/err'
 *
 * function yourCoolFunction() {
 *  if ( somethingIncorrect )
 *   throw err('You did it wrong!', yourCoolFunction)
 * }
 *
 * yourCoolFunction()
 * // Will result as following:
 * // yourCoolFunction()
 * // ^
 * // 
 * // Error: You did it wrong!
 * //     at file:///.../yourCoolScript.js:8:1
 */
export declare function err(msg?: string, caller?: Function, type?: Error, opts?: object): Error