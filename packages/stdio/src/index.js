'use strict'

module.exports.stdin = function stdin(promptHandler) {
    if ('object' == typeof Bun && Bun.stdin instanceof Blob)
        (async function() {
            for await (const a of Bun.stdin.stream()) {
                promptHandler(require('./Prompt')(Buffer.from(a).toString()))
            }
        })()
    if (process instanceof require('node:events'))
        process.stdin.on('data', function(a) {
            promptHandler(require('./Prompt')(a.toString()))
        })
}