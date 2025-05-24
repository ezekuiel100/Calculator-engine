import test from "node:test";
import createTokenizer from "../tokenizer.js";
import assert from "node:assert";

test("test tokenizer", () => {
  const tokenizer = createTokenizer("(- 10,5 + 3.2) * (4 - -2) / 7");

  const expected = [
    { type: "LeftParen", value: "(" },
    { type: "Number", value: "-10.5" },
    { type: "Operator", value: "+" },
    { type: "Number", value: "3.2" },
    { type: "RightParen", value: ")" },
    { type: "Operator", value: "*" },
    { type: "LeftParen", value: "(" },
    { type: "Number", value: "4" },
    { type: "Operator", value: "-" },
    { type: "Number", value: "-2" },
    { type: "RightParen", value: ")" },
    { type: "Operator", value: "/" },
    { type: "Number", value: "7" },
  ];

  let tokens = [];
  let token;
  while ((token = tokenizer.nextToken())) {
    tokens.push(token);
  }

  assert.deepStrictEqual(tokens, expected);
});
