const expression = "8990 + 507 - 33 * 1";

const operators = ["+", "-", "*", "/"];
let position = 0;
let char = expression[position];

function tokenizer() {
  if (isNumber(char)) {
    let num = "";

    while (isNumber(char)) {
      num += char;
      updatePosition();
    }

    return { type: "INT", value: num };
  }

  if (isOperator(char)) {
    return { type: "OPERATOR", value: char };
  }
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

export default function nextToken(char) {
  if (char === " ") {
    updatePosition();
  }

  const token = tokenizer();

  updatePosition();

  return token;
}
