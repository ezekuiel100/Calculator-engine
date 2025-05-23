const expression = "100   + 5 - 3 * 1";

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

    return { type: "Number", value: num };
  }

  if (isOperator(char)) {
    return { type: "Operator", value: char };
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

export default function nextToken() {
  while (char === " ") {
    updatePosition();
  }

  const token = tokenizer();

  updatePosition();

  return token;
}
