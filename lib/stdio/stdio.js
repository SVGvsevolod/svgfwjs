import defcmds from "./defcmds.js"
/**
 * Defines stdio (standard input-output).
 * Uses process' read stream (process.stdin).
 * Becomes an instance object to let define custom commands
 * @example
 * import { stdio } from 'svgfw'
 * 
 * const std = new stdio
 * 
 * std.your_cmd = {
 *   fn: () => { ... },
 *   pattern: 'your_cmd (?'args'\?...argv)' // regex pattern
 * }
 */
export default function stdio() {
    if (!(this instanceof stdio))
        throw new Error('This function must be called with keyword new')
    const a = this
    for (let b in Object.keys(defcmds))
        Object.defineProperty(a, Object.keys(defcmds)[b], {
            enumerable: true,
            value: defcmds[Object.keys(defcmds)[b]]
        })
    process.on('exit', a => {
        process.stdout.write(`(${a}) by\r\n`)
    })
    process.stdin.on('data', b => {
        for (let c in Object.keys(a)) {
            const d = new RegExp(`^${a[Object.keys(a)[c]].pattern}(?:\\r|\\n)+$`).exec(b)
            if (d) {
                console.log(d)
                a[Object.keys(a)[c]].fn()
                break
            }
        }
    })
}