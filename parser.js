const tokens = [
  { type: "Number", value: "2" },
  { type: "Operator", value: "*" },
  { type: "Number", value: "3" },
  { type: "Operator", value: "-" },
  { type: "Number", value: "4" },
];

function Parser(tokens) {
  let current = 0;

  function peek() {
    return tokens[current];
  }

  function consume() {
    return tokens[current++];
  }

  function parseExpression() {
    let node = parseTerm();

    while (
      peek() &&
      peek().type === "Operator" &&
      (peek().value === "+" || peek().value === "-")
    ) {
      const operator = consume().value;
      const right = parseTerm();

      node = {
        type: "BinaryExpression",
        operator,
        left: node,
        right,
      };

      return node;
    }
  }

  function parseTerm() {
    let node = parseFactor();

    while (
      peek() &&
      peek().type === "Operator" &&
      (peek().value === "*" || peek().value === "/")
    ) {
      const operator = consume().value;
      const right = parseFactor();

      node = {
        type: "BinaryExpression",
        operator,
        left: node,
        right,
      };
    }

    return node;
  }

  function parseFactor() {
    const token = consume();

    if (token.type === "Number") {
      return {
        type: "Literal",
        value: Number(token.value),
      };
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  return parseExpression();
}

const ast = Parser(tokens);
console.log(ast);
