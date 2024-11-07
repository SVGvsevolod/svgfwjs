'use strict'

module.exports.a = function(a, b) {
    var b = require('@svgfwjs/err').err(a, b)
    throw b
}

module.exports.b = function(a) {
    var b = '[!] ' + a
    console.warn(b)
}

module.exports.c = function(a, b) {
    a = '' + a
    if (!a.toLowerCase().indexOf('xml')) {
        module.exports.b(a + ' - Name cannot start with "XML".')
        a = a.substring(3)
    }
    if (!a)
        module.exports.a(a + ' - Name cannot be empty.', b)
    if (a.indexOf(' ') >- 1) {
        module.exports.b(a + ' - Name cannot contain spaces.')
        a = a.replaceAll(' ', '')
    }
    if (!/^[a-zA-Z0-9-_.:]*$/.test(a))
        module.exports.a(a + ' - Name contain forbidden characters.', b)
    return a
}

/*module.exports.a = 'This constructor must be invoked with a keyword "new".'
module.exports.b = ''
module.exports.c = ''
module.exports.d = ''
module.exports.e = function(a) {
    return 0 == a.toLowerCase().indexOf('xml')
}
module.exports.f = function(a) {
    return !/[a-zA-Z_]/.test(a)
}
module.exports.g = function(a) {
    a = '' + a
    return a.replaceAll(' ', '')
}
module.exports.h = function(a) {
    a = module.exports.f(a)
    if (module.exports.d(a)) {
        console.warn(module.exports.b)
        a = ''
    }
    if (module.exports.e(a)) {
        console.warn(module.exports.c)
        a = ''
    }
    return a
}
module.exports.i = function(a) {
    Object.keys(a).forEach(function(b) {
        var c = a[b]
        a[b] = {
            configurable: true,
            enumerable: true,
            value: c,
            writable: true
        }
    })
}*/