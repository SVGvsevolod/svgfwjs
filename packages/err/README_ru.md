# JS Сообщение об ошибке, но исключены пункты в стеке вызова
В V8 движке JavaScript был введен стек вызова показывающий иерархию вызваных функций в объект [ошибки (`Error`)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error), а также предоставлена возможность повлиять на этот стек при помощи статического метода [`Error.captureStackTrace()`](https://v8.dev/docs/stack-trace-api). Это позволяет разработчикам собственных API или библиотек, в которых есть функции выдающие сообщения об ошибке, срезать этот самый стек у сообщения об ошибке где фигурирует функции API или библиотеки, тем самым разработчики использующие эти функции могли обратить внимание на то, если эти функции были использованы неправильно.

Этот пакет моего личного фреймворка предоставляет функцию, которая создает экземпляр сообщения об ошибке (`Error`) и срезает стек вызова до функции, которая выдает это самое сообщение об ошибке. Это является основным компонентом для остальных составляющих моего личного фреймворка, однако, Вы можете свободно использовать в своих разработках.

# Как использовать?
```
npm i @svgfwjs/err
```

## Синтаксис
```js
err('Сообщение ошибки.', callerFunction, ErrorType, optionsOrFileName, lineNumber)
```

- `callerFunction` это функция, которая выдает сообщения об ошибка и она используется как опорная точка для срезания стека вызова
- `ErrorType` это тип ошибки.

Это должно быть что-либо среди [объектов `Error`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error#типы_ошибок) которые доступны в JavaScript, либо можно собственного производства.
- `optionsOrFileName` - этот аргумент передается [конструктору объекта ошибки (`Error`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#options) вместе с `'сообщением ошибки.'`. Это может быть либо объект с свойством/ключом причины (`cause`), либо строка, в которой указан путь к файлу.
- `lineNumber` это номер строки в файле (что тоже передается конструктору ошибки)

**Важно:** параметры/аргументы имя файла и номер строки в основном используются в конкретных веб-браузерах. Node или другие подобные программные среды не используют эти параметры/аргументы.

Все параметры/аргументы не обязятельны, собственно как и самого конструктора ошибки.

## Бекенд
```js
import { err } from '@svgfwjs/err'

function yourCoolFunction() {
    if ( somethingIncorrect )
        throw err('Неправильно!', yourCoolFunction)
}

yourCoolFunction()
// Результат будет следующим:
// yourCoolFunction()
// ^
// 
// Error: Неправильно!
//     at file:///.../yourCoolScript.js:8:1
```

## Фронтенд
```html
<script src="https://svg.moe/js/err.js"></script>
<script>
function yourCoolFunction() {
    if ( somethingIncorrect )
        throw svgfwjs.err('Неправильно!', yourCoolFunction)
}

yourCoolFunction()
// Результат будет следующим:
// Uncaught Error: Неправильно!
//     at index.html:13:1
</script>
```

## Как модуль
```js
import err from '@svgfwjs/err'
```