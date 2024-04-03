import err from './log/err.js'
import stdio from './stdio/stdio.js'
export const log = Object.create(null, {
    err: {
        enumerable: true,
        value: err
    }
})
export { default as stdio } from './stdio/stdio.js'
export default Object.create(null, {
    log: {
        enumerable: true,
        value: log
    },
    stdio: {
        enumerable: true,
        value: stdio
    }
})