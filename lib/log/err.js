import { writeFile } from 'node:fs/promises'
import dir from './dir.js'
import name from './name.js'
/**
 * Log error
 * @param {Error} a 
 */
export default async function err(a) {
    if (a instanceof Error && 'string' == typeof a.stack) {
        let b = name()
        await dir('logs/err/' + b[0])
        try {
            await writeFile(`logs/err/${b[0]}/${b[1]}.txt`,
            a.stack + ('number' == typeof a.errno ? '\nERRNO: ' + a.errno : ''),
            {
                encoding: 'utf8'
            })
        } catch (a) {
            
        }
    }
}