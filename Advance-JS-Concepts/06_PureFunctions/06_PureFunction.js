// Pure Functions

// A part of the Functional Programming Paradigm

/**
 *  why write Pure Functions?
 *  1. clean code
 *  2. Easy to test
 *  3. Easy to debug
 *  4. Decoupled and Independent
 *  5. could be added to your utility functions
 */

// Rules for Pure Functions
// 1. The same input ALWAYS gives the same output
// 1a. A pure fn should have at-least one parameter.
// 2. no side-effects

// 1. The same input ALWAYS gives the same output
const add = (x, y) => x + y;
console.log(add(2, 3));

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Dave", "Gray"));

// We can replace the function with the output
// This is called "referential transparency"

// 1a. A pure fn should have at-least one parameter.

// Otherwise, it is the same as a constant because they
// can only work with their input.

const dave = () => "Dave";
const dave1 = "Dave";

// 2. No side effects:

// This also means accessgin the scope outside the function makes the fn impure.

const z = 5;
const sum = (x, y) => x + y + z;
console.log(sum(2, 2));

// Pure fns cannot:
// Access a database, API, file system, storage etc.
// Modify the DOM
// Or even log the console

// That said, clearly "impure" fns are necessary
// but they are harder to test and debug

// Further, no input state can be modified
// That is, no data should be "mutated"
// Consider all input data to be immutable

// Impure Example 1:
let x = 1;
const increment = () => ++x;
console.log(increment());
console.log(x);

// Impure Example 2:
const myArray = [1, 2, 3];
const addToArray = (array, data) => {
  array.push(data);
  return array;
};
console.log(addToArray(myArray, 4));
console.log(myArray);

// Refactored Example 1:
const pureIncrement = (num) => ++num;
console.log(pureIncrement(x));
console.log(x);

// Refactored Example 2:
const pureAddToArray = (array, data) => [...array, data];
console.log(pureAddToArray(myArray, 5));
console.log(myArray);

// These common Higher Order Fns are Pure Functions:
const oneToFive = [1, 2, 3, 4, 5];
const oddToFive = oneToFive.filter((elem) => elem % 2 !== 0);
console.log(oddToFive);

const doubled = oneToFive.map((elem) => elem * 2);
console.log(doubled);

const summed = oneToFive.reduce((acc, elem) => acc + elem);
console.log(summed);

console.log(oneToFive);
