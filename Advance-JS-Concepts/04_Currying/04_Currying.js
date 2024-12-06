// Currying named after Haskell B. Curry

// Concept from lambda calculus

// Currying takes a fn that receives more than one parameter
// and breaks it into a series of unary (one parameter) fns

// Therefore, a curried fn only takes one param at a time

// Currying can look like this

const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      console.log(`${ingredient1} - ${ingredient2} - ${ingredient3}`);
      return `${ingredient1}. ${ingredient2}. ${ingredient3}`;
    };
  };
};

const mySandwich = buildSandwich("Bacon")("Lettuce")("Tomato");
console.log(mySandwich);

console.log("-------------------------");
// It works but that getting ugly and nested , further we go

// Let's refactor:

const buildSammy = (ingredient1) => (ingredient2) => (ingredient3) => {
  console.log(`${ingredient1} - ${ingredient2} - ${ingredient3}`);
  return `${ingredient1}. ${ingredient2}. ${ingredient3}`;
};

const mySammy = buildSammy("Turkey")("Cheese")("Bread");
console.log(mySammy);

console.log("-------------------------");
// Another Example of a curried function

const multiply = (x, y) => x * y;
const curriedMultiply = (x) => (y) => x * y;

console.log(multiply(2, 3));
console.log(curriedMultiply(4));
console.log(curriedMultiply(4)(5));

// Partially applied fns are a common use of currying
const timesTen = curriedMultiply(10);
console.log(timesTen);
console.log(timesTen(9));

// Another Example
const updateElement = (id) => (content) => {
  document.querySelector(`#${id}`).textContent = content;
};

const updateHeaderText = updateElement("venkat");
console.log(updateHeaderText);
if (updateHeaderText) {
  updateHeaderText("Hello Dave!");
}

console.log("-------------------------");
// Another common use of currying is fn composition
// Allows calling small fn in a specific order

const addCustomer =
  (fn) =>
  (...args) => {
    console.log("saving customer info....");
    return fn(...args);
  };

const processOrder =
  (fn) =>
  (...args) => {
    console.log(`processing order #${args[0]}`);
    return fn(...args);
  };

let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed.`);
};

completeOrder = processOrder(completeOrder);
console.log(completeOrder);
completeOrder = addCustomer(completeOrder);
console.log(completeOrder);
completeOrder("1000");

console.log("-------------------------");

// we are converting any fn that expects fixed parameters all are not null
// to a curried fn

// Requires a fn with a fixed number of parameters
const curry = (fn) => {
  console.log(fn.length);
  return (curried = (...args) => {
    // console.log(fn.length);
    // console.log(args.length);
    console.log(...args);
    if (fn.length !== args.length) {
      // bind creates a new fn
      return curried.bind(null, ...args);
    }
    return fn(...args);
  });
};

const total = (x, y, z) => x + y + z;
const curriedTotal = curry(total);
console.log(curriedTotal);
console.log(curriedTotal(10));
console.log(curriedTotal(10)(20));
console.log(curriedTotal(10)(20)(30));
