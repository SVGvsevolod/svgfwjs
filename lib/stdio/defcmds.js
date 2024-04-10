import list from '../log/list.js'
export default Object.create(null, {
    l: {
        enumerable: true,
        value: Object.create(null, {
            fn: {
                enumerable: true,
                value: async (a, b, c, d, e, f, g, h, i) => {
                    switch (a) {
                        case 'err':
                            if ('list' == b || 'l' == b)
                                console.log(await list(a, c, d, e))
                            break;
                        default:
                            process.stdout.write('Usage:\r\nlog <type> ?list YY MM DD HH MM SS ZZZ\r\nTypes:\r\nerr - Error logs\r\nTo list all logs:\r\nlog <type> list YYYY MM DD\r\nTo output:\r\nlog err YYYY MM DD HH MM SS ZZZ\r\n')
                    }
                }
            },
            pattern: {
                enumerable: true,
                value: 'log(?:\\s(err)|)(?:\\s(list|l)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)'
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