module.exports.a = 'This constructor must be invoked with a keyword "new".'
module.exports.b = 'Name cannot start with "XML".'
module.exports.c = 'Name must start with a letter or underscore.'
module.exports.d = 'Name cannot be empty.'
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
}