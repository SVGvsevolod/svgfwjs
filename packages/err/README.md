[ [README на русском](README_ru.md) ]

# JS Error with reduced Stack Trace
V8 JavaScript engine introduced stack trace into [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) objects and gave ability to manipulate it with [`Error.captureStackTrace()`](https://v8.dev/docs/stack-trace-api) static method. This gives opportunity for developing own API and libraries which has functions that throws `Error`s to cut off parts of the stack trace which points to the API/library and make focus on code that used its functions wrong.

This package of my personal framework provides function that creates and returns an `Error` instance and reduces the stack trace to function that throws that `Error` instance. It's part of my personal framework as core component that is used in other packages, however, You may use it in Your code or projects.

# Usage
```
npm i @svgfwjs/err
```

## Syntax
```js
err('Error Message.', callerFunction, ErrorType, optionsOrFileName, lineNumber)
```

- `callerFunction` is the function that throws an error which is used for stack trace reduction
- `ErrorType` is the type of error that was chosen to be thrown.

It should be any of [`Error` objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#error_types) that exists in JavaScript or it may be own custom `Error`.
- `optionsOrFileName` - this argument is being passed to [`Error` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#options) alongside with `'Error Message.'`. It can be object that has `cause` property/key or string that is path to the file.
- `lineNumber` is the number of the line in the file (which also is being passed to `Error` constructor)

**The thing is:** file name and line number parameters/arguments are mostly usable in certain web browsers. Node and other alike runtime enviroments doesn't use those parameters/arguments.

All parameters/arguments are optional, just like in `Error` constructor.

## Back-end
```js
import { err } from '@svgfwjs/err'

function yourCoolFunction() {
    if ( somethingIncorrect )
        throw err('You did it wrong!', yourCoolFunction)
}

yourCoolFunction()
// Will result as following:
// yourCoolFunction()
// ^
// 
// Error: You did it wrong!
//     at file:///.../yourCoolScript.js:8:1
```

## Front-end
```html
<script src="https://svg.moe/js/err.js"></script>
<script>
function yourCoolFunction() {
    if ( somethingIncorrect )
        throw svgfwjs.err('You did it wrong!', yourCoolFunction)
}

yourCoolFunction()
// Will result as following:
// Uncaught Error: You did it wrong!
//     at index.html:13:1
</script>
```

## As bundle-able module
```js
import err from '@svgfwjs/err'
```