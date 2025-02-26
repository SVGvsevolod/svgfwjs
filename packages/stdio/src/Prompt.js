'use strict'

function Prompt(a) {
    if (!(this instanceof Prompt))
        return new Prompt(a)
    if ('exit\n' == a || 'exit\r' == a || 'exit\r\n' == a
     || 'quit\n' == a || 'quit\r' == a || 'quit\r\n' == a)
        process.exit(0)
    else {
        var b = this,
            c = 'object' == typeof Bun ? Object.create(null) : [],
            d = 'object' == typeof Bun ? Object.create(null) : [],
            e = 0,
            f = !!0
        a.matchAll(/(?:-[a-zA-Z])|(?:--[a-zA-Z-_]+(?:=(?:('[^']+')|("[^"]+")))?)/g).forEach(function(a, b) {
            Object.defineProperty(c, b, {
                enumerable: !0,
                value: a[0].split('=')[0]
            })
            if (a[1] || a[2])
                Object.defineProperty(c, a[0].split('=')[0].substring(2), {
                    enumerable: !0,
                    value: a[1] ? a[1].substring(1, a[1].length-1) : a[2].substring(1, a[2].length-1)
                })
            if ('-h' == c[b] || '--help' == c[b] && !f)
                f = !0
        })
        Object.defineProperties(b, {
            args: { value: d },
            arguments: { enumerable: !0, value: d },
            cmd: { value: a.match(/^[a-zA-Z0-9-_]+/)[0] },
            command: { enumerable: !0, value: a.match(/^[a-zA-Z0-9-_]+/)[0] },
            flags: { enumerable: !0, value: c },
            input: { enumerable: !0, value: a },
            isHelp: { enumerable: !0, value: f },
            options: { enumerable: !0, value: c },
            parameters: { enumerable: !0, value: d },
            text: { enumerable: !0, value: a }
        })
        a.matchAll(/(?:'.+')|(?:".+")|(?:\S+)/g).forEach(function(a, c) {
            if (c && !b.has(a[0].split('=')[0])) {
                Object.defineProperty(d, e, {
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
}

function hasFlag(a) {
    var b = !!0
    for (var c in this.flags)
        if (a == this.flags[c]) {
            b = !0
            break
        }
    return b
}

Object.defineProperties(Prompt.prototype, {
    has: { value: hasFlag },
    hasFlag: { value: hasFlag }
})

module.exports = Prompt