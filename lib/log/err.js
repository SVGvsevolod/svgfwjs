import { writeFile } from 'node:fs/promises'
import dir from './dir.js'
import name from './name.js'
/**
 * Log error
 * @param {Error} err 
 */
export default async function err(err) {
    if (err instanceof Error && 'string' == typeof err.stack) {
        let a = name()
        await dir('logs/err/' + a[0])
        try {
            await writeFile(`logs/err/${a[0]}/${a[1]}.log`,
            err.stack + ('number' == typeof err.errno ? '\nERRNO: ' + err.errno : ''),
            Object.create(null, {
                encoding: {
                    value: 'utf8'
                }
            }))
        } catch (a) {
            
        }
    }
}