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
export default function plural (message: string, ...data: any[]): string {

  let size: number | number[];

  if (typeof data === 'number') {
    size = data;
  } else if (Array.isArray(data)) {
    size = data.map((v, _, a) => typeof v === 'number' ? v : Array.isArray(v) ? v.length : a.length);
  } else {
    return message;
  }

  return message.replace(
    /#{[N0-9]{1}}|#{(?![N0-9])\w+(?:\|\w+)?}(?:{[N0-9]})?/g,
    text => {
      if (text.charCodeAt(3) === 125) {
        // }=125
        if (text.charCodeAt(2) === 78 || text.charCodeAt(2) === 48) {
          return String(size[0] ?? text);
        } else if (/[1-9]/.test(text[2])) {
          return String(size[text[2]] ?? text);
        }
      }

      const pipe = text.indexOf('|');
      const nums = text.indexOf('}{');
      const chars = text.length;
      const length = /[1-9]/.test(text[chars - 2])
        ? size[text[chars - 2]]
        : size[0];

      return pipe > 2
        ? length > 1
          ? text.slice(pipe + 1, chars - (nums > 2 ? 4 : 1))
          : text.slice(2, pipe)
        : text.slice(2, chars - (nums > 2 ? 4 : 1)) +
            (length > 1 ? 's' : '');
    }
  );
}
