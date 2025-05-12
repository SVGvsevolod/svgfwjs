[ [README на русском](README_ru.md) ]

# Localization String Containers and Dictionary Containers
This package contains `LocStr` implied interface that works as simple JavaScript `Object` that contains all localized variants for string and have overriden `toString()` method to output string in proper language depending which was set in `process.env.locale` enviroment variable property. Also contains `Dict` implied interface that also works as simple JavaScript `Object` and serves as "dictionary" for `LocStr` objects.

This is part of my personal framework that is used in other packages, although, You may use it in Your code or projects.

# Usage
```
npm i @svgfwjs/locale
```

## Syntax
```js
LocStr({
    'la_NG' : 'Your string here.',
    ...
}) // constructor
```

- `'la_NG'` should be a ISO 639.2 Language Code

!! All variants inside the object cannot be edited after creation.

```js
LocStr.prototype.set('la_NG', 'Your string here.') // method
```

In case if You need to dynamically add a new variant. 

!! It will add the new one if it wasn't existed in the object before but it will not override existing ones.

```js
LocStr.prototype.toString(['la_NG']) // method
```

- By specifying language as argument in this method You can output the variant in that language if its exists

By default, this method is to output string in proper language according to which was set in `process.env.locale` enviroment variable property. If it's not set then will be output the first variant of the string in the container.

```js
Dict({
    name: new LocStr( ... ) || {
        'la_NG' : 'Your string here.',
        ...
    },
    ...
}) // constructor
```

- `name` is to refer to the needed localized string
- You can put an already created `LocStr` instance or object with variants that is used in `LocStr` constructor

!! Already existing entries in the "dictionary" cannot be overriden

```js
Dict.add(dict, 'name', new LocStr( ... ) || { ... }) // static method
```

- `dict` which is a `Dict` instance You want to add new entry to

Static because to allow to set localized string under `add` name.

