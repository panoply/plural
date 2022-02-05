/**
 * Get Plurals
 *
 * Parses string content messages returning pluralized versions.
 * The Regex Expression looks for following string content.
 *
 * ---
 *
 * _Examples_
 *
 * - `#{N}`
 *
 * > Writes the _size_ number only. The `N` is replaced with the
 * length of the array. For example, if the `size` (length of array)
 * is `2` and the string is `#{N} #{product}` then  `2 products` will
 * be returned
 *
 * - `#{N}` or `#{1}` or `#{2}` etc
 *
 * > The `size` parameter is a spread and accepts multiple sizes.
 * When multiple lengths are passed you can the reference its
 * position. For example, if 2 sizes are passed to `size`, eg:
 * `plural('#{N}, #{1} #{2}', 2, 5, 1)` can reference the length
 * of the size by appending its zero offset number, eg: `#{N}`
 * would return `2`, `#{1}` would return `5` and `#{2}` will return `1`.
 *
 * - `#{string}`
 *
 * > Returns plural when size more than `1`. The string surrounded by
 * the parenthesis will be pluralized. For example if the `size`
 * (length of array) is `2` and the string is `#{product}` then
 * `products` will be returned
 *
 * - `#{string|other}`
 *
 * > Left is plural, right is singular plural. When size is more then `1` the
 * right string is used, else the left side. This allows for different words,
 * For example if the `size` (length of array) is `2` and the string is
 * `#{quantity|quantities}` then `quantities` will be returned.
 *
 * - `#{string}{1}` or `#{string|other}{2}`
 *
 * > Allows a string to reference a size in the spread.
 *
 */
export function plural(message: string, ...data: any[]): string;

export { plural as default };
