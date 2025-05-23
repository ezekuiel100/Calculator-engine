const expression = "(5 + 4) * 1";

const operators = ["+", "-", "*", "/"];
let position = 0;
let char = expression[position];

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

        return { type: "Number", value: num };
      } else if (isOperator(char)) {
        tok = { type: "Operator", value: char };
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

function updatePosition() {
  position++;
  char = expression[position];
}
