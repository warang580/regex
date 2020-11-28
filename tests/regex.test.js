const R = require("../src/regex");

describe("regex", () => {
  it("checks literal strings", function () {
    expect(R.regex("foo").test("foo")).toStrictEqual(true);
    expect(R.regex("foo").test("var")).toStrictEqual(false);
  });
});

describe("start", () => {
  it("checks start of string", function () {
    let r = R.regex(R.start(), "a");

    expect(r.test("abc")).toStrictEqual(true);
    expect(r.test("bac")).toStrictEqual(false);
  });
});

describe("end", () => {
  it("checks end of string", function () {
    let r = R.regex("c", R.end());

    expect(r.test("abc")).toStrictEqual(true);
    expect(r.test("acb")).toStrictEqual(false);
  });
});

describe("exactly", () => {
  it("match exactly N characters", function () {
    let r = R.regex(R.start(), R.exactly(3, "b"), R.end());

    expect(r.test(""))     .toStrictEqual(false);
    expect(r.test("b"))    .toStrictEqual(false);
    expect(r.test("bbb"))  .toStrictEqual(true);
    expect(r.test("bbbbb")).toStrictEqual(false);
  });

  it("match N or more characters", function () {
    let r = R.regex(R.start(), R.exactly([3], "b"), R.end());

    expect(r.test(""))     .toStrictEqual(false);
    expect(r.test("b"))    .toStrictEqual(false);
    expect(r.test("bbb"))  .toStrictEqual(true);
    expect(r.test("bbbbb")).toStrictEqual(true);
  });

  describe("match N to M characters", function () {
    test.each([
      ["", false],
      ["b", false],
      ["bbb", true],
      ["bbbbb", true],
      ["bbbbbbb", false],
    ])("test(%p, %p)", function (input, expected) {
      let r = R.regex(R.start(), R.exactly([3, 5], "b"), R.end());

      expect(r.test(input)).toStrictEqual(expected);
    });
  });

});

describe("many", () => {
  it("match 1 or more characters", function () {
    let r = R.regex(R.start(), R.many("b"), R.end());

    expect(r.test(""))   .toStrictEqual(false);
    expect(r.test("b"))  .toStrictEqual(true);
    expect(r.test("bbb")).toStrictEqual(true);
  });
});

describe("any", () => {
  it("match 0 or more characters", function () {
      let r = R.regex(R.start(), R.any("b"), R.end());

      expect(r.test(""))   .toStrictEqual(true);
      expect(r.test("b"))  .toStrictEqual(true);
      expect(r.test("bbb")).toStrictEqual(true);
  });
});

describe("maybe", () => {
  it("match 0 or 1 character", function () {
      let r = R.regex(R.start(), R.maybe("b"), R.end());

      expect(r.test(""))   .toStrictEqual(true);
      expect(r.test("b"))  .toStrictEqual(true);
      expect(r.test("bbb")).toStrictEqual(false);
  });
});

describe("digit", () => {
  it("match digit", function () {
      let r = R.regex(R.start(), R.digit(), R.end());

      expect(r.test("2")).toStrictEqual(true);
      expect(r.test("A")).toStrictEqual(false);
      expect(r.test("b")).toStrictEqual(false);
  });
});

describe("alphanum", () => {
  it("match alphanumeric", function () {
      let r = R.regex(R.start(), R.alphanum(), R.end());

      expect(r.test("!")).toStrictEqual(false);
      expect(r.test("@")).toStrictEqual(false);
      expect(r.test(".")).toStrictEqual(false);
      expect(r.test("2")).toStrictEqual(true);
      expect(r.test("A")).toStrictEqual(true);
      expect(r.test("b")).toStrictEqual(true);
  });
});

describe("all", () => {
  it("match anything (except newline)", function () {
      let r = R.regex(R.start(), R.all(), R.end());

      expect(r.test("!")) .toStrictEqual(true);
      expect(r.test("@")) .toStrictEqual(true);
      expect(r.test(".")) .toStrictEqual(true);
      expect(r.test("2")) .toStrictEqual(true);
      expect(r.test("A")) .toStrictEqual(true);
      expect(r.test("b")) .toStrictEqual(true);
      expect(r.test(" ")) .toStrictEqual(true);
      expect(r.test("\n")).toStrictEqual(false);
  });
});

describe("space", () => {
  it("match whitespace", function () {
      let r = R.regex(R.start(), R.space(), R.end());

      expect(r.test("x")) .toStrictEqual(false);
      expect(r.test(" ")) .toStrictEqual(true);
      expect(r.test("\t")).toStrictEqual(true);
      expect(r.test("\n")).toStrictEqual(true);
  });
});

describe("boundary", () => {
  it("match words boundary", function () {
      let r = R.regex("o", R.boundary());

      expect(r.test("foo"))  .toStrictEqual(true);
      expect(r.test("hello")).toStrictEqual(true);
      expect(r.test("no!"))  .toStrictEqual(true);
      expect(r.test("god"))  .toStrictEqual(false);
      expect(r.test("oh?"))  .toStrictEqual(false);
  });
});

describe("or", () => {
  it("multiple expressions", function () {
      let r = R.regex(R.or("foo", "bar"));

      expect(r.test("foo")).toStrictEqual(true);
      expect(r.test("bar")).toStrictEqual(true);
      expect(r.test("bee")).toStrictEqual(false);
  });
});


/*
Modifiers
regex(...parts , {multiline: true, insensitive: true, global: true})

=====

Range [abc] [a-e]

=====

or("foo", "bar") = foo|bar
*/
