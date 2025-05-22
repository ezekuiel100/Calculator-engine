const tokens = [
  { type: "Number", value: "2" },
  { type: "Operator", value: "+" },
  { type: "Number", value: "3" },
  { type: "Operator", value: "+" },
  { type: "Number", value: "4" },
  { type: "Operator", value: "*" },
  { type: "Number", value: "8" },
  { type: "Operator", value: "+" },
  { type: "Number", value: "6" },
];

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

let current = 0;
let curToken;
let peekToken;

function nextToken() {
  curToken = tokens[current];
  peekToken = tokens[current + 1];
  current++;
}

function parserProgram() {
  nextToken();
  let program = [];

  while (curToken) {
    const node = parseExpression(0);
    program.push(node);

    if (!peekToken) break;
  }

  return program;
}

function parseExpression(precedence) {
  let left;

  if (curToken.type === "Number") {
    left = parseNumber(curToken);
  }

  while (peekToken && precedence < peekPrecedence()) {
    nextToken();
    left = parseInfix(left);
  }

  return left;
}

function parseNumber(curToken) {
  return Number(curToken.value);
}

function parseInfix(left) {
  let operator = curToken.value;
  let operatorPrecedence = curPrecedence();

  nextToken();
  const right = parseExpression(operatorPrecedence);

  return {
    type: "BinaryExpression",
    operator,
    left,
    right,
  };
}

function peekPrecedence() {
  return peekToken ? precedence[peekToken.value] : 0;
}

function curPrecedence() {
  return curToken ? precedence[curToken.value] : 0;
}

const program = parserProgram();
console.log(JSON.stringify(program, null, 2));
