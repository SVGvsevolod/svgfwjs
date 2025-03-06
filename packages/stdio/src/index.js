'use strict'

/**
 * Output data. Shorthand function that depends if You running with Node or Bun
 * uses its stdout stream to output. Can be used whenever some information needed
 * to output.
 * @param {*} data
 * @example
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * stdout('(h)ello world')
 */
function stdout(data) {
    if ('object' == typeof Bun)
        Bun.stdout.write('' + data)
    if (process instanceof require('node:events'))
        process.stdout.write('' + data)
}

/**
 * Defines handler for input data. Uses depends if You running with Node or Bun
 * its stdin stream to read input data. Transfer `Prompt` object with processed 
 * input data to `promptHandler` function.
 * @param {function} promptHandler that receives `Prompt` object with processed
 * input data where You define how user interacts with application/system.
 * @param {object} opts in which you can set welcome and bye messages
 * @example
 * import { stdin } from '@svgfwjs/stdio'
 * 
 * stdin((prompt) => {
 *   switch(prompt.command) {
 *     case 'sum': // processes input: sum 2 2
 *       stdout(prompt.arguments[0] + prompt.arguments[1]) // expected output: 4
 *       break;
 *     ...
 *   }
 * }, {
 *   welcome: '(h)ello world',
 *   bye: 'by.'
 * }) 
 */
module.exports.stdin = function stdin(promptHandler, opts) {
    if ('object' == typeof opts && opts.welcome)
        stdout(opts.welcome.indexOf('\r\n') < 0 ? opts.welcome + '\r\n' : opts.welcome)
    if ('object' == typeof Bun)
        (async function() {
            for await (var a of Bun.stdin.stream()) {
                promptHandler(new (require('./Prompt'))(
                    Buffer.from(a).toString(),
                    'object' == opts && opts.bye ? opts.bye : void 0
                ))
            }
        })()
    if (process instanceof require('node:events'))
        process.stdin.on('data', function(a) {
            promptHandler(new (require('./Prompt'))(
                a.toString(),
                'object' == opts && opts.bye ? opts.bye : void 0
            ))
        })
}

module.exports.stdout = stdout