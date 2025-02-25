'use strict'

// (?<cmd>^[a-zA-Z0-9-_]+)|(?<f>\-[a-zA-Z])|(?<flag>\-\-[a-zA-Z]+=)|(?<arg>(?:[a-zA-Z-]+)|(?:'\S+')|(?:"\S+"))

module.exports = function Prompt(a) {
    if (!(this instanceof Prompt))
        return new Prompt(a)
    var b = a.matchAll(/(?:-[a-zA-Z])|(?:--[a-zA-Z-_]+(?:=(?:('.+')|(".+")))?)/g),
        c = 'object' == typeof Bun ? Object.create(null) : []
    Object.defineProperties(this, {
        cmd: { value: a.match(/^[a-zA-Z0-9-_]+/)[0] },
        command: { enumerable: !0, value: a.match(/^[a-zA-Z0-9-_]+/)[0] },
        flags: { enumerable: !0, value: c },
        options: { enumerable: !0, value: c },
        text: { enumerable: !0, value: a }
    })
    b.forEach(function(a, b) {
        Object.defineProperty(c, b, {
            enumerable: !0,
            value: a[0].split('=')[0]
        })
        if (a[2])
            Object.defineProperty(c, a[0].split('=')[0].substring(2), {
                enumerable: !0,
                value: a[2].substring(1, a[2].length-1)
            })
    })
    /*var b = Object.create(null),
        c = []
    a.replace('\r\n', '').split(' ').forEach(function(a, d, e) {
        if (!d)
            Object.defineProperties(this, {
                cmd: { value: a },
                command: { enumerable: !0, value: a }
            })
        else {
            if (!a.indexOf('--'))
                b[a.substring(2)] = e[d + 1]
            else if (!a.indexOf('-'))
                console.log(a)
            else
                c.push(a)
        }
    }, this)
    Object.defineProperties(this, {
        args: { value: c },
        arguments: { enumerable: !0, value: c },
        flags: { value: b },
        options: { enumerable: !0, value: b },
        params: { value: c },
        parameters: { value: c },
        text: { enumerable: !0, value: a }
    })*/
}