const expression = "(10,89 + 2) - 3";

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
        const num = getNumber();
        lastToken = { type: "Number", value: num };

        return { type: "Number", value: num };
      } else if (isOperator(char)) {
        tok = readNumberWithSign();

        if (tok === null) tok = { type: "Operator", value: char };

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

    if (isNumber(char)) {
      while (isNumber(char)) {
        ch += char;
        updatePosition();
      }

      return { type: "Number", value: ch };
    } else {
      throw new Error("Número com sinal inválido");
    }
  }

  return null;
}

function updatePosition() {
  position++;
  char = expression[position];
}
