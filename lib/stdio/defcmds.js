import list from '../log/list.js'
export default Object.create(null, {
    l: {
        enumerable: true,
        value: Object.create(null, {
            fn: {
                enumerable: true,
                value: async (a, b, c, d, e, f, g, h, i) => {
                    if (!a)
                        process.stdout.write('Usage: log <type> ?list YY MM DD HH MM SS ZZZ\r\nTypes:\r\nerr - Error logs\r\nTo list all logs: log <type> list YYYY MM DD\r\nTo output: log err YYYY MM DD HH MM SS ZZZ\r\n')
                    else if ('list' == b || 'l' == b) {
                        const b = await list(a, c, d, e)
                        let j = b.length ? '' : 'No logs found'
                        if (b.length) {
                            let k = 0
                            for (let d in b) {
                                if (k >= process.stdout.columns) {
                                    j += '\r\n'
                                    k = 0
                                }
                                j += d == b.length - 1 ? b[d] : b[d] + ', '
                                k += 15
                            }
                        }
                        process.stdout.write(j + '\r\n')
                    }
                }
            },
            pattern: {
                enumerable: true,
                value: 'log(?:\\s(\\w+)|)(?:\\s(list|l)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)(?:\\s(\\d+)|)'
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