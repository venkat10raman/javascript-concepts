// Foundational Knowledge for writing Pure Functions

// javascript Data Types

// Primitive vs Structural

/*
    Primitive
    1. undefined
    2. Boolean
    3. Number
    4. String
    5. BigInt
    6. Symbol
*/

/**
    Structural
    1. Object: (new) Object, Array, Map, Set, WeatMap, Date
    2. Function
 */

// Value vs Reference
// Primitives pass values:

let x = 2;
let y = x;
y++;
console.log(x);
console.log(y);

// Structural types use references:
let xArray = [1, 2, 3];
let yArray = xArray;
yArray.push(4);
console.log(yArray);
console.log(xArray);

console.log("---------------------------");
// Mutable vs Immutable

let myName = "Dave";
myName[0] = "W"; // nope!
console.log(myName);

// Reassignment is not the same as mutable
myName = "David";
console.log(myName);

// Structures contain mutable data
yArray[0] = 9;
console.log(yArray);
console.log(xArray);

console.log("---------------------------");

// Pure Functions require you to avoid
// Mutating the data

// Impure function that mutates the data
const addToScoreHistory = (array, score) => {
  array.push(score);
  return array;
};

const scoreArray = [44, 23, 14];
console.log(addToScoreHistory(scoreArray, 14));

// This mutates the original array.
// This is considered to be a side-effect.

// Notice: "const" does not make the array immutable

console.log("---------------------------");

// Shallow copy

// With the spread operator
const zArray = [...yArray, 10];
console.log(zArray);
console.log(yArray);

console.log(xArray === yArray);
console.log(yArray === zArray);

// With Object.assign()
const tArray = Object.assign([], zArray);
console.log(tArray);
console.log(tArray === zArray);
tArray.push(11);
console.log(zArray);
console.log(tArray);

// But if there are nested arrays or objects...
// Above methods does not work
yArray.push([8, 9, 10]);
const vArray = [...yArray];
console.log(vArray);
vArray[4].push(5);
console.log(vArray);
console.log(yArray);

// nested structural data types still share a reference!

// Note: Array.from() and slice() create shallow
// copies, too.

// When it comes to objects, what about...
//  ...Object.freeze() ??

const scoreObj = {
  first: 44,
  second: 12,
  third: { a: 1, b: 2 },
};

Object.freeze(scoreObj);
scoreObj.third.a = 8;
console.log(scoreObj);
// still mutates - it is a shallow freeze

// How do we avoid these mutations?

// Deep copy is needed to avoid this

// Several libraries like lodash, Ramda, and others
// have this feature built-in

/**
 * Here is a one line Vanilla JS Solution
 * but it does not work with Datesm functions, undefined, Infinity, RegExps,
 * Maps, Sets, Blobs, FileLists, ImageDatas and other complex data types
 */

const newScoreObj = JSON.parse(JSON.stringify(scoreObj));
console.log(newScoreObj);
console.log(newScoreObj === scoreObj);

// Instead of using a library, here is a Vanilla JS function

const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  // Create an array or object to hold the values
  const newObject = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    // recursive call for nested objects & arrays
    newObject[key] = deepClone(value);
  }
};

const newScoreArray = deepClone(scoreArray);
console.log(newScoreArray);
console.log(newScoreArray === scoreArray);

const myScoreObj = deepClone(scoreObj);
console.log(myScoreObj);
console.log(myScoreObj === scoreObj);

// Now we can make a pure function
const pureAddToScoreHistory = (array, score, cloneFunc) => {
  const newArray = cloneFunc(array);
  newArray.push(score);
  return newArray;
};

const pureScoreHistory = pureAddToScoreHistory(scoreArray, 18, deepClone);
console.log(pureScoreHistory);
console.log(scoreArray);
console.log(pureScoreHistory === scoreArray);
