// Closure

// Lexical Scope:
// A variable which is defined outside a fn can be accessable inside the fn
// after a variable declaration but the opposite is not true

// A scope refers to the current context of the code it can be global or local

// with ES6 we also have the block scope

var username = "Roadsidecoder";

function local() {
  // local scope
  console.log(username);
  var localname = "Roadsidee";
}
// console.log(localname);
local();

/*
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
In other words, a closure gives a function access to its outer scope.
*/
function makeFunc() {
  const name = "Mozilla";
  function displayName(num) {
    console.log(name, num);
  }
  return displayName;
}

makeFunc()(5);

// Closure scope chain
/*
 A nested function's access to the outer function's scope includes the enclosing scope
 of the outer function—effectively creating a chain of function scopes.
*/

// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

// Interview Questions on Closures
// 1. What will be logged to console?

let count = 0;
(() => {
  if (count === 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
})();

(function printCount() {
  if (count === 0) {
    let count = 1; // shadowing --> Block scope
    console.log(count);
  }
  console.log(count);
})();

// 2. Write a closure which will add two numbers
// Ex. createBase(6)(8) --> 14

function addTwo(x) {
  return function (y) {
    console.log(x + y);
  };
}

addTwo(6)(8);
addTwo(10)(21);

// 3. Time Optimization

function find(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}
console.time("6");
find(6);
console.timeEnd("6");

function findClosure() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}

console.time("6");
findClosure(6);
console.timeEnd("6");

// 4. Block Scope and setTimeout

function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}
a();
// since var has fn scope above fn returns 3,3,3

function afix() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}
afix();

for (let i = 0; i < 3; i++) {
  function inner(i) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
  inner(i);
}

// 5. How would you use a closure to create a private counter?

function counterClosure() {
  let counter = 0;
  return function add(num) {
    counter += num;
    console.log("Counter :: ", counter);
  };
}

const counter = counterClosure();
counter(1);
counter(2);

// 6. What is Module Pattern?
var Module = (function () {
  function privateMethod() {
    // do something
    console.log("private");
  }
  return {
    publicMethod: function () {
      console.log("public");
    },
  };
})();
Module.publicMethod();

// 7. Make this run only once
function likeVideo() {
  let view = "Roadside Coder";
  console.log(`Subscribe to :: ${view}`);
}
likeVideo();
likeVideo();

function likeVideoClosure() {
  let called = 0;
  let view = "Roadside Coder";
  return function () {
    if (called > 0) {
      console.log(`Already Subscribed to ${view} using Closure`);
    } else {
      console.log(`Subscribe to :: ${view} using Closure`);
      called++;
    }
  };
}

const isSubscribed = likeVideoClosure();
isSubscribed();
isSubscribed();
isSubscribed();

// 8. Make a function run only once using Polyfill

function once(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      console.log(arguments);
      func = null;
    }
    return ran;
  };
}

const hello = once(() => console.log("Hello Once"));
hello();
hello();
const helloArgs = once((a, b) => console.log("Hello Once with params", a + b));
helloArgs(1, 2);

// 9. Memoize Polyfill
// Implement Caching/Memoizing function


