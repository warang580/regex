# Regex [![GitHub release](https://img.shields.io/github/release/warang580/regex.svg)](https://gitHub.com/warang580/regex/releases/)

A simple API to write, read and maintain regex without pain.

NOTE: this is a work in progress, it doesn't really work yet ! Don't use it.

Examples :

```js
let greeting = compose(
  "hello",
  many(whitespace())
  capture(
    or(
      ["w", many("o"), "rld"],
      many(alphanum()),
    ),
  ),
  any(whitespace()),
  optional(any(or("!", "?")))
)

regex(greeting, {caseInsensitve: true, global: true})

// Something like
// => /hello(?:(?:\s)+)(w(?:o)+rld|\w+)\s*\(?:(?:!|?)*)?/ig
```

```js
// Match phone numbers
let number = regex(
  // International prefix
  maybe(
    maybe("+"),
    exactly(2, digit()),
    maybe(space())
  ),
  // Actual phone
  exactly(5,
    exactly(2, digit(), maybe(or(".", "/", "-")))
  ),
),
```

Composing regex

```js
let word      = compose(boundary(), many(alphanum()), boundary());
let separator = compose(or(".", "?", "!"));
let sentence  = compose(many(word), separator)

let flag = regex(sentence, {global: true}).test(string);
```

## Notes

Use compose() to work on arrays, and regex() outputs the actual regex ?

compose is actually just an array, and regex = new RegExp(...parts)
but the api is nicer anyway
