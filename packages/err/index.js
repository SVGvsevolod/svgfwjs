'use strict'

module.exports = function err(msg, caller, type, opts) {
    type = 'function' == typeof type ? type : Error
    var a = type(msg, opts)
    if ('function' == typeof Error.captureStackTrace && 'function' == typeof caller)
        Error.captureStackTrace(a, caller)
    return a
}