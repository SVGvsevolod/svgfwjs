export declare interface Prompt {
    /** Shorthand alias to `Prompt.arguments` property */
    readonly args: string[],
    /**
     * Command's arguments that can be used in its algorithm, which was part
     * of user input.
     */
    readonly arguments: string[],
    /** Shorthand alias to `Prompt.command` property */
    readonly cmd?: string | undefined,
    /** 
     * Name of the command reference that should be used to define its algorithm, 
     * which was part of user input.
     */
    readonly command?: string | undefined,
    /** Shorthand alias to `Prompt.options` property */
    readonly flags: string[],
    /** Raw value of user input. */
    readonly input: string,
    /** Boolean indicator for help option flag for convenience. */
    readonly isHelp: boolean,
    /**
     * Command's options flags that can be used in its algorithm, which was part
     * of user input.
     */
    readonly options: string[],
    /** Alias to `Prompt.arguments` property */
    readonly parameters: string[],
    /** Shorthand alias to `Prompt.input` property */
    readonly text: string,
    /** Shorthand alias to `Prompt.hasFlag()` method */
    has: (flag: string) => boolean,
    /** Method for checking option flag usage for convenience. */
    hasFlag: (flag: string) => boolean
}

/**
 * @callback PromptHandler
 * @param {Prompt} prompt
 */
export declare type PromptHandler = (prompt: Prompt) => void

/**
 * Defines handler for input data. Uses depends if You running with Node or Bun
 * its stdin stream to read input data. Transfer `Prompt` object with processed 
 * input data to `promptHandler` function.
 * @param {function} promptHandler function that receives `Prompt` object with processed
 * input data where You define how user interacts with application/system.
 * @param {object} opts in which you can set welcome and bye messages
 * @example
 * import { stdin } from '@svgfwjs/stdio'
 * 
 * stdin((prompt) => {
 *   switch(prompt.command) {
 *     case 'sum': // processes input: sum 2 2
 *       stdout(prompt.arguments[0] + prompt.arguments[1]) // expected output: 4
 *       break;
 *     ...
 *   }
 * }, {
 *   welcome: '(h)ello world',
 *   bye: 'by.'
 * }) 
 */
export declare function stdin(promptHandler: PromptHandler, opts?: {
    welcome?: string,
    bye?: string
}): void

/**
 * Output data. Shorthand function that depends if You running with Node or Bun
 * uses its stdout stream to output. Can be used whenever some information needed
 * to output.
 * @param {*} data
 * @example
 * import { stdout } from '@svgfwjs/stdio'
 * 
 * stdout('(h)ello world')
 */
export declare function stdout(data?: any): void