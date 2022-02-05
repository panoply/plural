# _plural_

A tiny 600 byte string parser for word pluralization. Extracted from an internal API logging system I maintain. It is fast, effective and an easy drop in solution for handling basic word plurals.

#### Links

- [Example on Flems](https://flems.io/#0=N4IgtglgJlA2CmIBcBGADGgNCAzvBAxgC7xTIgB0ROI2AZhAjUgNqgB2AhmIkpQBZEwsWiAIB7diSnkQAX0wduvStVESp8GXw04iAAmD6IOAIIAnc5wCe+ufoC8+i1esAddh7oBXdsQiS+gAOsN5WsPoAFDw4OJwA5vBI+nrmEOzxmPoUOVCcRJzJnOzWLAC6AJTJqenxhh4e+voIBjgQAF5J+uzeYABG8Ob6AD7dvQPm5QDcDexNEHRRRNZB8OKLeQWODk4A5D39g7sV9XNNKR3wjvqbnDNn9vh4xouRJi42kbcVJ8CN521OtdbhQwJwgpFIgA3LIAfSynBODgAfFF-ud9MtVut9FDtnsDhNdvoAPy4-TJd6WT5Qk5kqEUBAZIj8Cn6TiMrTxFno-Q-e5NR6wZ5-M5NczwIhhOYxOKJAV2WbiyXS-SyhLwCgSkKcAjwSIAegAxMAWAA5NAAWgAnGVgCg5HJhibIiSAITmq22ipuNwAdwA1K6kL7hr7AxUSXJg6aLTaynJIwbMpj4AAPAwo068hZLdNECgEficcwAYXEUHgpiIkQAzEidvoUAAmACsv30BoNdgcLdbvPmrxIGcLxbLFarNebDacAHYABwjUbDgtFkvlyvVyLT-H6AAs89+A-OEql5jmAGUiGkMpFAfAWGgyqSySuKgqMULnrnDSwUPGDSoeA9EiFcWGbSojzFDF9FPVUrxveI70uFgwIg58SVffN32POReTwzxoN0AwgggVZrhXCh0krNMAHk6EiXZhmOD99GIsYwBwCj8yo9gaPoxi5GAFjeXYtdzC4pxKKZbl+FY9iZJZa4DT-ACgJAsDxK4y19AgukLk6VD8xYLT9B09C2XvR8ynuXk4PPYIyKuVFm2PMlFNZVEUGPJosJHHBYAgPVIlI8iAybLJTJ0yIDi4lzSX3NkUB+Hy2UogKgv1ZsslC+AfWgppknSwLguytix20qJYv0eKyT3JKfn0cLIg8mqmwS3YcGJZJdhEwjBRwwi5Fswiu30AAVYCDAvWoEH0M1xkGWZ2JIPRYRQa4QjCThYEYk0zXsE1VgkyRhmxEJ4EO4ATGGEtLv0PpxDTWpjDmfaroYeJBDkXYsmnDxdHEBBGXEJDVqIdb8o8MbJr0fQLyCCVOCgebFok5bJDh8HYWbTbQnCPb7Su46cFO86ECEh19BNG67vsR7noyV7qeAA6Wc+77foi3T8sB4HYFB0CppxqH2Bhqb4cR+BkecalrBwDH2DhktzHW642H0OhxHEHqtfEYkFEMTXtZ6voS12Q2jD103OHaA2ygBzGDBVnH1d2Kw+PEMAud2KEdu8YDdgdvwnfZSxYVrdWUGDx2lYMbHI6cLaCd2E1m2JwZSfYM61guoT05Z2mJXz+mnpe9IWapk0OaISmfoRcOUAb1Wypd+tY9J-nBYT0WPHUL3SIQcxyDUbA8EIIgAiV8hW3nJB51reRFBALgeHIQtYn7zRtBAeQEyAA)
- [Regex101](https://regex101.com/r/S5RphJ/1)

## Usage

The function accepts a `string` as the first parameter which will contain the plural sentence. The second parameter accepts an `array` or `number`. When you pass an `array` of _numbers_ (eg: `number[]`) you can reference each index in that array to apply pluralized appenditures based on the position of their indexes. If you pass an `array` or _arrays_ (eg: `any[][]`) the function will look to the lengths. It is hard to articulate in words, so see the below examples.

> Note that `N` is sugar for `0` or the first items in a spread.

#### How it works

Below are a couple of example to help you understand how it works.

<!-- prettier-ignore -->
```ts
// Numbers
plural("#{N} #{0} #{1} #{2} #{3}", 1, 2, 3, 4); // => 1, 1, 2, 3, 4

// Arrays
plural("#{N} #{0} #{1} #{2} #{3}", ["x"], ["x", "x"], ["x", "x", "x"], ["x", "x", "x", "x"]); // => 1, 1, 2, 3, 4

// Pluralize cat and bird (first value is default)
plural("#{dog} #{cat}{1} #{bird}{2}", 1, 2, 3); // => dog, cats, birds

// Pluralize dog (first value is default)
plural("#{dog} #{cat} #{bird}", 2, 1, 1); // => dogs, cat, bird

// Pluralize birds based on 2nd index (it uses 0 based index when referencing)
plural("#{dog} #{cat} #{bird}{2}", 1, 2, 1); // => dog, cat, birds

// Pluralize dogs and birds based on 2nd and 3rd index (it uses 0 based index when referencing)
plural("#{dog}{1} #{cat} #{bird}{2}", 1, 2, 2); // => dogs, cat, birds

// Pluralize dog and use 2nd value (are) in the literal based on 2nd index in the spread
plural("The #{dog}{1} #{is|are}{1} chasing the #{cat}", 1, 2); // => The dogs are chasing the cat

// Pluralize cat based on 2nd index in the spread
plural("The #{dog} #{is|are} chasing the #{cat}{1}", 1, 2); // => The dog is chasing the cats
```

#### Number

Passing a number

```ts
plural("#{N} #{person|people} #{is|are} boxing in #{N} #{fight}", 1);
// => 1 person is boxing in 1 fight

plural("#{N} #{person|people} #{is|are} boxing in #{N} #{fight}", 3);
// => 3 people are boxing in 3 fights
```

#### Spread of Numbers

Passing a spread of numbers and referencing them based on index position. Remember that `N` is sugar for `0`.

```ts
plural("#{N} #{person|people} #{is|are} boxing in #{1} #{fight}{1}", 2, 1);
// => 2 people are boxing in 1 fight

plural("#{N} #{person|people} #{is|are} boxing in #{1} #{fight}{1}", 1, 2);
// => 1 person is boxing in 2 fights
```

#### Spread of Arrays

Passing a spread of arrays. Each array passed will used the index length as the value.

<!-- prettier-ignore -->
```ts
const arr_1 = [{ foo: "foo" }, { foo: "bar" }, { foo: "baz" }];
const arr_2 = ["random", "values"];

plural("#{N} #{person|people} #{is|are} boxing in #{0} #{fight}{1}", arr_1, arr_2);
// => 3 people are boxing in 2 fights

plural("#{N} #{person|people} #{is|are} boxing in #{N} #{fight}", arr_2);
// => 2 people are boxing in 2 fights
```

## License

[MIT](#LICENSE)
