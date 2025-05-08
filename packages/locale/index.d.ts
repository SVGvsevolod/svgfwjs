/**
 * ISO 639.2 Language Code.
 * (ex:
 * en-US - for English (United States),
 * en-UK - for English (United Kingdom),
 * ru-RU - for Russian)
 * @type {string} ISOLang
 */
export declare type ISOLang = string

/**
 * Container for localized strings (A `Dict`ionary)
 * @constructor
 * @param {...LocStr} strings
 * @returns {Dict}
 * @example
 * import { Dict } from '@svgfwjs/locale'
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * const str = new Dict({
 *   start: {
 *     'en-US': 'Type "start" to Start',
 *     'ru-RU': 'Напишите "start" чтобы начать'
 *   },
 *   err: {
 *     'en-US': 'An error has occured',
 *     'ru-RU': 'Произошла ошибка'
 *   }
 * })
 * 
 * stdout(str.start)
 * // Will output:
 * // Type "start" to Start
 * //
 * // Depending on which locale was set in 
 * // process.env.locale property
 */
export declare interface Dict {
    /**
     * Adds new localized string to the `Dict`ionary
     * @param {string} name
     * @param {LocStr | Object} str
     */
    add: (name: string, str: LocStr | Object) => void
}

export declare class Dict implements Dict { constructor(...strings: LocStr[] | Object[]) }

export declare function Dict(...strings: LocStr[] | Object[]): Dict

/**
 * Container for localized variants of string.
 * @param {Object} values of localized variants
 * @example
 * import { LocStr } from '@svgfwjs/locale'
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * const startMsg = new LocStr({
 *   'en-US': 'Type "start" to Start',
 *   'ru-RU': 'Напишите "start" чтобы начать'
 * })
 * 
 * stdout(startMsg)
 * // Will output:
 * // Type "start" to Start
 * //
 * // Depending on which locale was set in 
 * // process.env.locale property
 */
export declare interface LocStr {
    /**
     * Adds new localized value to container
     * @param {ISOLang} ISOLang 
     * @param {string} value 
     */
    set: (ISOLang: ISOLang, value: string) => void
}

export declare class LocStr implements LocStr { constructor(values: Object) }

export declare function LocStr(value: Object): LocStr