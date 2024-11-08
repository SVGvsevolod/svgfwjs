'use strict'

module.exports.a = function(a, b) {
    var b = require('@svgfwjs/err').err(a, b)
    throw b
}

module.exports.b = function(a) {
    var b = '[!] ' + a
    console.warn(b)
}

module.exports.c = function(a) {
    Object.keys(a).forEach(function(b) {
        var c = a[b]
        a[b] = {
            configurable: true,
            enumerable: true,
            value: c,
            writable: true
        }
    })
}

module.exports.d = function(a, b) {
    a = '' + a
    if (!a)
        module.exports.a(a + ' - Name cannot be empty.', b)
    if (a.indexOf(' ') >- 1) {
        module.exports.b(a + ' - Name cannot contain spaces.')
        a = a.replaceAll(' ', '')
    }
    if (!/^[a-zA-Z0-9-_:.]*$/.test(a))
        module.exports.a(a + ' - Name contain forbidden characters.', b)
    return a
}