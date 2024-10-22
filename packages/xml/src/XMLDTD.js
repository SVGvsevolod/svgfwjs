function XMLDTD(opts) {
    if (!(this instanceof XMLTag))
        throw new Error(require('./common').a)
    if ('object' == typeof opts && opts.name)
        opts.name = require('./common').h(opts.name)
    if ('object' == typeof opts
     && 'object' == typeof opts.content)
        require('./common').i(opts.content)
    if ('object' == typeof opts && opts.ext || opts.external)
        opts.ext = '' + (opts.ext || opts.external)
    if ('object' == typeof opts && opts.public)
        opts.public = '' + opts.public
    Object.defineProperties(this, {
        _content: {
            configurable: true,
            value: 'object' == typeof opts
                && 'object' == typeof opts.content
                ? Object.create(null, opts.content)
                : Object.create(null)
        },
        _ext: {
            configurable: true,
            value: 'object' == typeof opts
                && opts.ext
                ? opts.ext
                : undefined
        },
        _name: {
            configurable: true,
            value: 'object' == typeof opts
                && opts.name
                ? opts.name
                : ''
        },
        _public: {
            configurable: true,
            value: 'object' == typeof opts
                && opts.public
                ? opts.public
                : undefined
        }
    })
}

var a = function get() {
    return this._content
},
    b = function get() {
    return this._ext
},
    c = function set(a) {
    Object.defineProperty(this, '_ext', {
        configurable: true,
        value: '' + a
    })
},
    d = function(a) {
    var b = ''
    Object.keys(a).forEach(function(c) {
        if (!(require('./common').e(c) && require('./common').f(c)))
            b += ''
    })
    return b
}

Object.setPrototypeOf(XMLDTD.prototype, require('./XMLTag').prototype)

Object.defineProperties(XMLDTD.prototype, {
    content: {
        get: a
    },
    ext: {
        get: b,
        set: c
    },
    external: {
        get: b,
        set: c
    },
    public: {
        get: function get() {
            return this._public
        },
        set: function set(a) {
            Object.defineProperty(this, '_public', {
                configurable: true,
                value: '' + a
            })
        }
    },
    text: {
        get: a
    },
    toString: {
        value: function toString() {
            if (!this.name)
                throw new Error(require('./common').d)
            else
                return '<!DOCTYPE ' + this.name
                    + (this.public
                        ? 'PUBLIC ' + this.public + '>'
                        : this.ext
                            ? 'SYSTEM ' + this.ext + '>'
                            : '[' + d(this.content) + ']>'
                    )
        }
    }
})

module.exports = XMLDTD