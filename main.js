import Eval from "./evaluator.js";
import parserProgram from "./parser.js";

const ast = parserProgram();
const result = Eval(ast);

console.log(result);
