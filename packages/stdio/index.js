'use strict'

var a = !!0, b = !!0, c = !!0, d = function(a) {
        if (b && !c) {
            stdout(a
                ? ('' + a).indexOf('\n') < 0
                || ('' + a).indexOf('\r') < 0
                || ('' + a).indexOf('\r\n') < 0
                    ? a + '\r\n'
                    : '' + a
                : 'Confirm termination? (type "exit" or "quit" again)\r\n')
            c = !0
        } else
            process.exit(0)
    }

/**
 * Categorises user input into structure for easy use in input handling algorithm.
 * @constructor
 * @typedef {Object} Prompt
 * @param {string} input
 */
function Prompt(input) {
    if (!(this instanceof Prompt))
        return new Prompt(input)
    else {
        var a = this,
            b = /^[a-zA-Z0-9-_]+/.test(input) ? input.match(/^[a-zA-Z0-9-_]+/)[0] : void 0,
            c = Array.from(input.matchAll(/(?:-[a-zA-Z])|(?:--[a-zA-Z-_]+(?:=(?:('[^']+')|("[^"]+")))?)/g)),
            d = Array.from(input.matchAll(/(?:'.+')|(?:".+")|(?:\S+)/g)),
            e = Object.create(null),
            f = Object.create(null),
            g = 0,
            h = !!0
        for (var i = 0; i < c.length; i++) {
            Object.defineProperty(e, i, {
                enumerable: !0,
                value: c[i][0].split('=')[0]
            })
            if (c[i][1] || c[i][2])
                Object.defineProperty(e, c[i][0].split('=')[0].substring(2), {
                    enumerable: !0,
                    value: c[i][1]
                        ? c[i][1].substring(1, c[i][1].length - 1)
                        : c[i][2].substring(1, c[i][2].length - 1)
                })
            if ('-h' == e[i] || '--help' == e[i] && !h)
                h = !0
        }
        Object.defineProperties(a, {
            args: { value: f },
            arguments: { enumerable: !0, value: f },
            cmd: { value: b },
            command: { enumerable: !0, value: b },
            flags: { enumerable: !0, value: e },
            input: { enumerable: !0, value: input },
            isHelp: { enumerable: !0, value: h },
            options: { enumerable: !0, value: e },
            parameters: { enumerable: !0, value: f },
            text: { enumerable: !0, value: input }
        })
        for (var i = 0; i < d.length; i++) {
            if (i && !a.has(d[i][0].split('=')[0])) {
                Object.defineProperty(f, g, {
                    enumerable: !0,
                    value: ('\'' == d[i][0][0] && '\'' == d[i][0][d[i][0].length-1])
                        || ('"' == d[i][0][0] && '"' == d[i][0][d[i][0].length-1])
                        ? d[i][0].substring(1, d[i][0].length - 1)
                        : d[i][0]
                })
                g++
            }
        }
        Object.defineProperty(e, 'length', { value: Object.keys(e).length })
        Object.defineProperty(f, 'length', { value: Object.keys(f).length })
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
        if ('object' == typeof Bun && 'function' == typeof Bun.stdout.write)
            Bun.stdout.write('' + data)
        else if ('function' == typeof process.stdout.write)
            process.stdout.write('' + data)
    }
}

Object.defineProperties(Prompt.prototype, {
    has: { 
        value: function has(a) {
            var b = !!0
            for (var c in this.flags)
                if (a == this.flags[c]) {
                    b = !0
                    break
                }
            return b
        }
    },
    hasFlag: {
        enumerable: !0,
        value: function hasFlag(a) {
            var b = !!0
            for (var c in this.flags)
                if (a == this.flags[c]) {
                    b = !0
                    break
                }
            return b
        }
    }
})

/**
 * Prevent process from being terminated in case if needed to keep active.
 * @returns {boolean} `true` if hold was set active
 */
module.exports.hold = function hold() { var a = !b ? !0 : !!0; if (!b) b = !0; return c = !!0, a }

/**
 * Undo process active keeping caused by `Prompt.hold()` and making it
 * terminable again.
 * @returns {boolean} `true` if hold was released
 */
module.exports.release = function release() { var a = b ? !0 : !!0; if (b) b = !!0; return c = !!0, a }

module.exports.Prompt = Prompt

/**
 * Output error. Shorthand function that depends if You running with Node or Bun
 * uses its stderr stream to output. Can be used whenever some error needed to
 * output.
 * @param {*} data
 * @example
 * import { err } from '@svgfwjs/err'
 * import { stderr } from '@svgfwjs/stdio'
 * 
 * stderr(err('You broke it, baka!')) 
 */
module.exports.stderr = function stderr(data) {
    if (arguments.length) {
        if ('object' == typeof Bun && 'function' == typeof Bun.stderr.write)
            Bun.stderr.write('' + data)
        else if ('function' == typeof process.stderr.write)
            process.stderr.write('' + data)
    }
}

/**
 * @callback PromptHandler
 * @param {Prompt} prompt
 * @returns {void}
 */

/**
 * Defines handler for input data. Uses depends if You running with Node or Bun
 * its stdin stream to read input data. Transfer `Prompt` object with processed 
 * input data to `promptHandler` function.
 * @param {PromptHandler} promptHandler function that receives `Prompt` object with processed
 * input data where You define how user interacts with application/system.
 * @param {object} opts in which you can set welcome, bye and confirm (termination) messages
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
 *   bye: 'by.',
 *   confirm: '"Are you sure about that?" (type "exit" or "quit" again)'
 * }) 
 */
module.exports.stdin = function stdin(promptHandler, opts) {
    if ('function' == typeof promptHandler && !a) {
        if ('object' == typeof opts && opts.welcome)
            stdout(('' + opts.welcome).indexOf('\n') < 0
                || ('' + opts.welcome).indexOf('\r') < 0
                || ('' + opts.welcome).indexOf('\r\n') < 0
                ? opts.welcome + '\r\n'
                : '' + opts.welcome)
        process.on('exit', 'object' == typeof opts && opts.bye
            ? function(a) {
                stdout(('' + opts.bye).indexOf('\r') < 0
                    || ('' + opts.bye).indexOf('\n') < 0
                    || ('' + opts.bye).indexOf('\r\n') < 0
                    ? opts.bye + ' (C: ' + a + ')\r\n'
                    : opts.bye + '(C: ' + a + ')\r\n')
            }
            : function(a) { stdout('(C: ' + a + ')\r\n') }
        )
        process.on('SIGINT', function() {
            d('object' == typeof opts && opts.confirm ? opts.confirm : void 0)
        })
        if ('object' == typeof Bun)
            (async function() {
                for await (var a of Bun.stdin.stream()) {
                    a = '' + Buffer.from(a)
                    if ('exit\nexit\rexit\r\nquit\nquit\rquit\r\n'.indexOf(a) > -1 && a.length > 1)
                        d('object' == typeof opts && opts.confirm ? opts.confirm : void 0)
                    else
                        promptHandler(new Prompt(a))
                }
            })()
        else
            process.stdin.on('data', function(a) {
                a = '' + a
                if ('exit\nexit\rexit\r\nquit\nquit\rquit\r\n'.indexOf(a) > -1 && a.length > 1)
                    d('object' == typeof opts && opts.confirm ? opts.confirm : void 0)
                else
                    promptHandler(new Prompt(a))
            })
        a = true
    }
}

module.exports.stdout = stdout