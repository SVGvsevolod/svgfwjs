import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
/**
 * Checks if directory exists, if not, creates
 * @param {string} a path 
 * @returns {Promise<boolean>}
 */
export default async function dir(a) {
    if ('string' != typeof a)
        throw new Error('No valid path provided')
    else {
        let b = existsSync(a)
        if (!b) {
            try {
                await mkdir(a, {
                    recursive: true
                })
            } catch (a) {

            }
            return true
        } else
            return b
    }
}