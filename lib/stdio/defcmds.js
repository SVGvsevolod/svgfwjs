export default Object.create(null, {
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