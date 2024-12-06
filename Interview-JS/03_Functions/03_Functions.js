// 1. What is Function Declaration?

function square(num) {
  console.log(`Square ${num * num}`);
  return num * num;
}
square(5);

// 2 What is Function Expression?
const add = function (a, b) {
  console.log(`Addition :: ${a + b}`);
  return a + b;
};
add(9, 10);

// 3 What are First Class Functions?

// 4 What is IIFE
// Immedeitely invoked function Expression
((num) => {
  console.log(`Square from IIFE :: ${num * num}`);
})(6);

// 5. IIFE :: What is the output?
((x) => {
  return ((y) => {
    console.log(`Value of x :: ${x}`);
    console.log(`Value of y :: ${y}`);
  })(5);
})(1);

// 7 Function scope - What is the output?
// let has block scope
// var has the global scope
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 10);
}

// 8 Function Hoisting - O/P based question

functionName();
console.log(x);
function functionName() {
  console.log(y);
  var y = 8;
  console.log("Function Hoisting!!!");
}
var x = 5;

// 9 Function Hoisting - O/P based question
var a = 21;
var fun = function () {
  console.log(`Fun Function Hoisting :: ${a}`);
  var a = 20;
};
fun();

// 10 Params vs Arguments
function qube(num) {
  // params
  console.log(num * num * num);
}
qube(3); // arguments

// 11 Spread vs rest
function spreadVrest(...nums) {
  // rest
  console.log(nums);
}
var arr = [5, 3];
spreadVrest(...arr); // spread

// 12 Callback function
/*
A callback function is a function passed into another function
as an argument, which is then invoked inside the outer function
to complete some kind of routine or action
*/

function greeting(name) {
  console.log(`Hello, welcom :: ${name}`);
}
function processUserInput(callback) {
  let name = "James Bond";
  callback(name);
}
processUserInput(greeting);

// 13 arguments and this are effective in named functions
function namedFn() {
  console.log(arguments);
}
namedFn(1, 2, 3);
