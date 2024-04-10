import { readdir } from 'node:fs/promises'
/**
 * List all logs
 * @param {string} type 
 * @param {number|string} y 
 * @param {number|string} m 
 * @param {number|string} d 
 */
export default async function list(type, y, m, d) {
    let a = []
    if ('number' == typeof parseInt(y) && !isNaN(y)
     && 'number' == typeof parseInt(m) && !isNaN(m)
     && 'number' == typeof parseInt(d) && !isNaN(d)) {
        try {
            const b = await readdir(`logs/${type}/${parseInt(y)} ${parseInt(m).toString().padStart(2, '0')} ${parseInt(d).toString().padStart(2, '0')}`)
            for (let c in b)
                if (b[c].indexOf('.log') > -1)
                    a.push(b[c].substring(0, b[c].length-4))
        } catch(a) {

        }
    }
    return a
}