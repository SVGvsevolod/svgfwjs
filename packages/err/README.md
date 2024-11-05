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
err('message', )
```

## Back-end
```js
import err from '@svgfwjs/err'

function yourCoolFunction() {
    if ( somethingIncorrect )
        throw err('You did it wrong!', yourCoolFunction)
}

yourCoolFunction()
```