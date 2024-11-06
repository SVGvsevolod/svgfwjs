if (window)
    window.svgfwjs = {
        /**
         * Creates and returns an `Error` instance and reduces the stack trace to function that throws that `Error` instance.
         * @param {string} msg of `Error` to output/display
         * @param {function} caller that throws the `Error`
         * @param {Error} type of `Error` (must be any of `Error` object)
         * @param {object|string} opts or name of the file
         * @param {number} line in the file
         * @returns {Error}
         * @example
         * <script src="https://svg.moe/js/err.js"></script>
         * <script>
         * function yourCoolFunction() {
         *     if ( somethingIncorrect )
         *         throw svgfwjs.err('You did it wrong!', yourCoolFunction)
         * }
         * 
         * yourCoolFunction()
         * // Will result as following:
         * // Uncaught Error: You did it wrong!
         * //     at index.html:13:1
         * </script>
         */
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