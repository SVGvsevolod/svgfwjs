'use strict'

module.exports = function Prompt(a) {
    if (!(this instanceof Prompt))
        return new Prompt(a)
    var b = Object.create(null),
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
    })
}