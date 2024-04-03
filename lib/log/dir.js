import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
/**
 * Checks if directory exists, if not, creates
 * @param {string} path 
 * @returns {Promise<boolean>}
 */
export default async function dir(path) {
    if ('string' != typeof path)
        throw new Error('No valid path provided')
    else {
        let a = existsSync(path)
        if (!a) {
            try {
                await mkdir(path, {
                    recursive: true
                })
            } catch (a) {

            }
            return true
        } else
            return a
    }
}