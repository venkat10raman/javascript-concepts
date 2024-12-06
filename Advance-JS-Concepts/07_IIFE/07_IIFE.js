// IIFE - Immediately-Invoked Function Expression

// Pronounced "Iffy" by Ben Alman who introduced the acronym

// Variations:

// with anonymous arrow fn inside:

(() => {
  console.log("variation1");
})();

(function () {
  console.log("variation2");
})();

(function myIIFE() {
  num++;
  console.log(num);
  return num !== 5 ? myIIFE(num) : console.log("finished!");
})((num = 0));

console.log("--------------------------");
// Reason 1. Does not pollute the global object namespace

const x = "whatever";
const helloWorld = () => "Hello World!";

// isoloate declarations within the function
(() => {
  const x = "iife whatever";
  const helloWorld = () => "Hello IIFE!";
  console.log(x);
  console.log(helloWorld());
})();

console.log(x);
console.log(helloWorld());

console.log("--------------------------");

// Reason 2. Private Variables and Methods from Closure

const increment = (() => {
  let counter = 0;
  console.log(counter);
  const credits = (num) => console.log(`I have ${num} credits.`);
  return () => {
    counter++;
    credits(counter);
  };
})();

increment();
increment();
increment();

console.log("--------------------------");

// Reason 3. The Module Pattern

const score = (() => {
  let count = 0;

  return {
    current: () => {
      return count;
    },
    increment: () => {
      count++;
    },
    reset: () => {
      count = 0;
    },
  };
})();

score.increment();
console.log(score.current());
score.increment();
console.log(score.current());
score.reset();
console.log(score.current());

console.log("--------------------------");

// The Revealing Pattern is a variation of the Module Pattern

const game = (() => {
  let count = 0;
  const current = () => {
    return `Game score is ${count}.`;
  };
  const increment = () => {
    count++;
  };
  const reset = () => {
    count = 0;
  };

  return {
    current: current,
    increment: increment,
    reset: reset,
  };
})();

game.increment();
console.log(game.current());
game.increment();
console.log(game.current());
game.reset();
console.log(game.current());

// Injecting a namespace object

((namespace) => {
  namespace.count = 0;
  namespace.current = function () {
    return `App coutn is ${this.count}.`;
  };
  namespace.increment = function () {
    this.count++;
  };
  namespace.reset = function () {
    this.count = 0;
  };
})((window.App = window.App || {}));

App.increment();
console.log(App.current());
