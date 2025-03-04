'use strict'

function stdout(data) {
    if ('object' == typeof Bun)
        Bun.stdout.write(data)
    if (process instanceof require('node:events'))
        process.stdout.write(data)
}

module.exports.stdin = function stdin(promptHandler, opts) {
    if ('object' == typeof opts && opts.welcome)
        stdout(opts.welcome.indexOf('\r\n') < 0 ? opts.welcome + '\r\n' : opts.welcome)
    if ('object' == typeof Bun)
        (async function() {
            for await (var a of Bun.stdin.stream()) {
                promptHandler(require('./Prompt')(
                    Buffer.from(a).toString(),
                    'object' == opts && opts.bye ? opts.bye : void 0
                ))
            }
        })()
    if (process instanceof require('node:events'))
        process.stdin.on('data', function(a) {
            promptHandler(require('./Prompt')(
                a.toString(),
                'object' == opts && opts.bye ? opts.bye : void 0
            ))
        })
}

module.exports.stdout = stdout