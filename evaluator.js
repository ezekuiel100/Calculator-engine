const astNode = {
  type: "BinaryExpression",
  operator: "+",
  left: {
    type: "BinaryExpression",
    operator: "+",
    left: 2,
    right: 3,
  },
  right: {
    type: "BinaryExpression",
    operator: "*",
    left: 4,
    right: 8,
  },
};

function Eval(astNode) {
  if (astNode?.type === "BinaryExpression") {
    const left =
      typeof astNode.left === "object" ? Eval(astNode.left) : astNode.left;
    const right =
      typeof astNode.right === "object" ? Eval(astNode.right) : astNode.right;
    const result = calculate(left, astNode.operator, right);
    return result;
  } else {
    return astNode;
  }
}

function calculate(left, operator, right) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
  }
}

const result = Eval(astNode);
console.log(result);
