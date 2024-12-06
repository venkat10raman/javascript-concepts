//  Lexical scope defines how variable names are resolved in nested funcitons.

//  Nested (child) functions have access to the scope of their parent functions

//  This is often confused with closure, but lexical scope is only an important part of closure

// global scope
let x = 1;

const parentFunction = () => {
  // local scope
  let myValue = 2;
  console.log(x);
  console.log(myValue);

  const childFunction = () => {
    console.log((x += 5));
    console.log(myValue++);
  };

  childFunction();
};

parentFunction();

// A closure is a fn having access to the parent scope, even after the parent function has closed
// In other words A closure is a parent fn that return another child fn, which is having the parent fn scope

// A closure is created when we define a fn, not when a fn is executed.

// global scope
let y = 1;

const parentFn = () => {
  // local scope
  let myValue = 2;
  console.log(y);
  console.log(myValue);

  const childFn = () => {
    console.log((y += 5));
    console.log(myValue++);
  };

  return childFn;
};

const result = parentFn();
console.log(result);

result();
result();

// IIFE {Immediately Invoked Function Expression}
const privateCounter = (() => {
  let count = 0;
  console.log(`Initial value : ${count}`);
  return () => {
    count++;
    console.log(`Private Counter Value : ${count}`);
  };
})();

console.log(privateCounter);
privateCounter();
privateCounter();

const credits = ((num) => {
  let credits = num;
  console.log(`Initial credits value : ${credits}`);
  return () => {
    if (credits > 0) {
      credits--;
      console.log(`playing game, ${credits} credits remaining`);
    } else {
      console.log("not enough credits to play game");
    }
  };
})(2);

console.log(credits);
credits();
credits();
credits();
