'use strict'

module.exports.a = function(a, b) {
    var b = require('@svgfwjs/err').err(a, b)
    throw b
}

module.exports.b = function(a) {
    var b = '[!] ' + a
    console.warn(b)
}

module.exports.c = function(a, b, c) {
    a = '' + a
    if (b && !a.toLowerCase().indexOf('xml')) {
        module.exports.b(a + ' - Name cannot start with "XML".')
        a = a.substring(3)
    }
    if (!a)
        module.exports.a(a + ' - Name cannot be empty.', c)
    if (a.indexOf(' ') >- 1) {
        module.exports.b(a + ' - Name cannot contain spaces.')
        a = a.replaceAll(' ', '')
    }
    if (!/^[a-zA-Z0-9-_:.]*$/.test(a))
        module.exports.a(a + ' - Name contain forbidden characters.', c)
    return a
}

module.exports.d = function(a) {
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