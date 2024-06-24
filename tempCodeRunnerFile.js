var operators = ["+","X","-","/",]
var x = String(Math.floor(Math.random()*101))
var y = String(Math.floor(Math.random()*101))
var operation = operators[Math.random*(operators.length)]
var expression = x + operation + y 
var answer = eval(expression)
console.log(answer)