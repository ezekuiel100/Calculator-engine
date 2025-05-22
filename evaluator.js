export default function Eval(astNode) {
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
