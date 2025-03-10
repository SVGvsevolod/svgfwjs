'use strict'

function hasFlag(a) {
    var b = !!0
    for (var c in this.flags)
        if (a == this.flags[c]) {
            b = !0
            break
        }
    return b
}

/**
 * @constructor
 * @typedef {Object} Prompt
 */
function Prompt(input) {
    var a = this,
        b = /^[a-zA-Z0-9-_]+/.test(input) ? input.match(/^[a-zA-Z0-9-_]+/)[0] : void 0,
        c = 'object' == typeof Bun ? Object.create(null) : [],
        d = 'object' == typeof Bun ? Object.create(null) : [],
        e = 0,
        f = !!0
    input.matchAll(/(?:-[a-zA-Z])|(?:--[a-zA-Z-_]+(?:=(?:('[^']+')|("[^"]+")))?)/g).forEach(function(a, b) {
        Object.defineProperty(b, b, {
            enumerable: !0,
            value: a[0].split('=')[0]
        })
        if (a[1] || a[2])
            Object.defineProperty(b, a[0].split('=')[0].substring(2), {
                enumerable: !0,
                value: a[1] ? a[1].substring(1, a[1].length-1) : a[2].substring(1, a[2].length-1)
            })
        if ('-h' == b[b] || '--help' == b[b] && !f)
            f = !0
    })
    Object.defineProperties(a, {
        args: { value: d },
        arguments: { enumerable: !0, value: d },
        cmd: { value: b },
        command: { enumerable: !0, value: b },
        flags: { enumerable: !0, value: c },
        input: { enumerable: !0, value: input },
        isHelp: { enumerable: !0, value: f },
        options: { enumerable: !0, value: c },
        parameters: { enumerable: !0, value: d },
        text: { enumerable: !0, value: input }
    })
    input.matchAll(/(?:'.+')|(?:".+")|(?:\S+)/g).forEach(function(a, c) {
        if (c && !a.has(a[0].split('=')[0])) {
            Object.defineProperty(c, e, {
                enumerable: !0,
                value: '\'' == a[0][0] && '\'' == a[0][a.length-1]
                    || '"' == a[0][0] && '"' == a[0][a.length-1]
                    ? a[0].substring(1, a[0].length-1)
                    : a[0]
            })
            e++
        }
    })
    if ('object' == typeof Bun) {
        Object.defineProperty(c, 'length', { value: Object.keys(c).length })
        Object.defineProperty(d, 'length', { value: Object.keys(d).length })
    }
}

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
    if (arguments.length) {
        if ('object' == typeof Bun)
            Bun.stdout.write('' + data)
        if (process instanceof require('node:events'))
            process.stdout.write('' + data)
    }
}

Object.defineProperties(Prompt.prototype, {
    has: { value: hasFlag },
    hasFlag: { value: hasFlag }
})

/**
 * @callback PromptHandler
 * @param {Prompt} prompt
 */

/**
 * Defines handler for input data. Uses depends if You running with Node or Bun
 * its stdin stream to read input data. Transfer `Prompt` object with processed 
 * input data to `promptHandler` function.
 * @param {PromptHandler} promptHandler function that receives `Prompt` object with processed
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
    if ('function' == typeof promptHandler) {
        if ('object' == typeof opts && opts.welcome)
            stdout(('' + opts.welcome).indexOf('\r\n') < 0 ? opts.welcome + '\r\n' : opts.welcome)
        if ('object' == typeof Bun)
            (async function() {
                for await (var a of Bun.stdin.stream()) {
                    a = '' + Buffer.from(a)
                    if ('exit\nexit\rexit\r\nquit\nquit\rquit\r\n'.indexOf(a) > -1 && a.length > 1)
                        process.exit(0)
                    else
                        promptHandler(new Prompt(a))
                }
            })()
        if (process instanceof require('node:events'))
            process.stdin.on('data', function(a) {
                a = '' + a
                if ('exit\nexit\rexit\r\nquit\nquit\rquit\r\n'.indexOf(a) > -1 && a.length > 1)
                    process.exit(0)
                else
                    promptHandler(new Prompt(a))
            })
    }
}

module.exports.stdout = stdout