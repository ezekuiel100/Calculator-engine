const operators = ["+", "-", "*", "/"];

export default function createTokenizer(expression) {
  let position = 0;
  let char = expression[position];
  let lastToken = null;

  function nextToken() {
    while (char === " ") {
      updatePosition();
    }

    if (!char) return null;
    let tok;

    switch (char) {
      case "(":
        tok = { type: "LeftParen", value: char };
        break;
      case ")":
        tok = { type: "RightParen", value: char };
        break;
      default:
        if (isNumber(char)) {
          const num = getNumber();
          lastToken = { type: "Number", value: num };
          return { type: "Number", value: num };
        } else if (isOperator(char)) {
          tok = readNumberWithSign();

          if (tok === null) {
            tok = { type: "Operator", value: char };
            updatePosition();
          }

          lastToken = tok;
          return tok;
        } else {
          throw new Error(`Token desconhecido: '${char}'`);
        }
    }

    lastToken = tok;
    updatePosition();
    return tok;
  }

  function isNumber(char) {
    return char >= "0" && char <= "9";
  }

  function isOperator(char) {
    return operators.some((operator) => operator === char);
  }

  function getNumber() {
    let number = "";

    while (isNumber(char) || char === "." || char === ",") {
      if (char === ",") {
        number += ".";
      } else {
        number += char;
      }
      updatePosition();
    }

    return number;
  }

  function readNumberWithSign() {
    if (
      lastToken === null ||
      lastToken.type === "Operator" ||
      lastToken.type === "LeftParen"
    ) {
      let ch = char;
      updatePosition();

      while (char === " ") updatePosition();

      if (isNumber(char)) {
        ch += getNumber();

        return { type: "Number", value: ch };
      }
    }
    return null;
  }

  function updatePosition() {
    position++;
    char = expression[position];
  }

  return { nextToken };
}
