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
  let left = parsePrefix();

  if (!curToken) return;

  while (peekToken && precedence < peekPrecedence()) {
    NextToken();
    left = parseInfix(left);
  }

  return left;
}

function parseNumber() {
  return Number(curToken.value);
}

function parsePrefix() {
  if (curToken.type === "Number") {
    return parseNumber();
  } else if (curToken.type === "LeftParen") {
    NextToken();
    const expr = parseExpression(0);

    NextToken();

    if (curToken?.type !== "RightParen") {
      throw new Error("Expected ')'");
    }

    return expr;
  }

  throw new Error(`Unexpected token: ${curToken?.type}`);
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
