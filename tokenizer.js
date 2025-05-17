const expression = "80 + 5";

const operators = ["+", "-", "*", "/"];

function tokenizer(char) {
  if (isNumber(char)) {
    return { type: "INT", value: char };
  }

  if (isOperator(char)) {
    return { type: "OPERATOR", value: char };
  }
}

function isNumber(char) {
  if (Number(char) >= 0) {
    return true;
  }

  return false;
}

function isOperator(char) {
  return operators.some((operator) => operator === char);
}

for (char of expression) {
  if (char === " ") continue;

  const token = tokenizer(char);
  console.log(token);
}
