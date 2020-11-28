
let start = function () {
  return "^";
}

let end = function () {
  return "$";
}

let exactly = function (count, expression) {
  let raw = `${count}`;

  if (count instanceof Array) {
    let [from, to] = count;
    to = to ? to : "";
    raw = `${from},${to}`
  }

  return "(" + expression + "){" + raw +"}";
}

let many = function (expression) {
  return "(" + expression + ")+";
}

let any = function (expression) {
  return "(" + expression + ")*";
}

let optional = function (expression) {
  return "(" + expression + ")?";
}

let digit = function () {
  return "\\d";
}

let word = function () {
  return "\\w";
}

let whitespace = function () {
  return "\\s";
}

let boundary = function () {
  return "\\b";
}

let all = function () {
  return ".";
}

let or = function (...expressions) {
  return "("+ expressions.join("|") +")";
}

let regex = function (...parts) {
  let raw = parts.join("");

  // console.log("raw", raw);

  return new RegExp(raw);
}

/**
 * Exporting functions
 */
module.exports = {
  regex,
  start,
  end,
  exactly, many, any, optional,
  digit, word, all, whitespace, boundary,
  or,
}
