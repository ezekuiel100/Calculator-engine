import nextToken from "./tokenizer.js";

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

let curToken;
let peekToken;

function NextToken() {
  curToken = peekToken;
  peekToken = nextToken();
}

export default function parserProgram() {
  NextToken();
  NextToken();

  let program;
  while (curToken) {
    program = parseExpression(0);

    if (!peekToken) break;
  }
  return program;
}

function parseExpression(precedence) {
  let left;

  if (!curToken) return;

  if (curToken?.type === "Number") {
    left = parseNumber(curToken);
  }

  while (peekToken && precedence < peekPrecedence()) {
    NextToken();
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

  NextToken();
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
