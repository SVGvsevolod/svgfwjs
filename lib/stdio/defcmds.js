export default Object.create(null, {
    l: {
        enumerable: true,
        value: Object.create(null, {
            fn: {
                enumerable: true,
                value: (a, b, c, d, e, f, g, h) => {
                    
                }
            },
            pattern: {
                enumerable: true,
                value: 'log(?:\\s(list|l|err)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)'
            }
        })
    },
    q: {
        enumerable: true,
        value: Object.create(null, {
            fn: {
                enumerable: true,
                value: () => {
                    process.exit()
                }
            },
            pattern: {
                enumerable: true,
                value: '(?:exit|quit)'
            }
        })
    }
})