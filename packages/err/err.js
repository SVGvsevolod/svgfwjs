if (window)
    window.svgfwjs = {
        err: function(msg, caller, type, opts, line) {
            'use strict'
            type = 'function' == typeof type ? type : Error
            var a = /MSIE \d*.\d*;|Trident\/\d*.\d*;|rv:11.0/.test(navigator.userAgent)
                || document.documentMode
                ? type(msg)
                : type(msg, opts, line)
            if ('function' == typeof Error.captureStackTrace && 'function' == typeof caller)
                Error.captureStackTrace(a, caller)
            return a
        }
    }