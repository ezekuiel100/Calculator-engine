const expression = "-10 + 2";

const operators = ["+", "-", "*", "/"];
let position = 0;
let char = expression[position];
let lastToken = null;

export default function nextToken() {
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
        let num = "";

        while (isNumber(char)) {
          num += char;
          updatePosition();
        }

        lastToken = { type: "Number", value: num };
        return { type: "Number", value: num };
      } else if (isOperator(char)) {
        if (
          lastToken === null ||
          lastToken.type === "Operator" ||
          lastToken.type === "LeftParen"
        ) {
          tok = readNumberWithSign();
          lastToken = tok;
          return tok;
        }

        tok = { type: "Operator", value: char };
        lastToken = tok;
      } else {
        throw new Error(`Token desconhecido: '${char}'`);
      }
  }

  updatePosition();
  return tok;
}

function isNumber(char) {
  return char >= "0" && char <= "9";
}

function isOperator(char) {
  return operators.some((operator) => operator === char);
}

function readNumberWithSign() {
  let ch = char;
  updatePosition();

  if (isNumber(char)) {
    while (isNumber(char)) {
      ch += char;
      updatePosition();
    }

    return { type: "Number", value: ch };
  }

  throw new Error("Número com sinal inválido");
}

function updatePosition() {
  position++;
  char = expression[position];
}
