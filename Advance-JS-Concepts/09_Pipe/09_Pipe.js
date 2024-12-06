// Functional Programming

// Ofter uses pipe and compose = higher order fns

/*
   A higher order fn is any fn which takes a fn as an argument, returns a fn, or both.
*/

// Here's how a "compose" fn works:

// Start with small unary (one parameter) fns
const add2 = (x) => x + 2;
const subtract1 = (x) => x - 1;
const multiplyBy5 = (x) => x * 5;

// Notice how the fns execute from inside to outside and right to left.
const result = multiplyBy5(subtract1(add2(4)));
console.log(result);

// The above is NOT a compose fn = let's make one

// Making our own compose and pipe fns

/* Note: Ramda.js and lodash libraries have their own built-in 
compose and pipe fns. lodash calls pipe "flow". */

/* To get the compose order from right to left as we see with nested
fn calls in our example above, we need reduceRight... */
const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((prev, fn) => fn(prev), val);

const compResult = compose(multiplyBy5, subtract1, add2)(4);
console.log(compResult);

/* To do the same, but read from left to right... we use "pipe".
It is the same except uses reduce instead of reduceRight. */
const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((prev, fn) => fn(prev), val);

const pipeResult = pipe(add2, subtract1, multiplyBy5)(5);
console.log(pipeResult);

/* This is a "pointer free" style where you do not see the unary parameter
passed between each fn */

// example with a 2nd parameter
const dividedBy = (divisor, num) => num / divisor;

const pipeResult2 = pipe(add2, subtract1, multiplyBy5, (x) => dividedBy(2, x))(
  5
);

console.log(pipeResult2);

// Or you could curry the dividedBy fn for a custom unary fn:
const divBy = (divisor) => (num) => num / divisor;
const dividedBy2 = divBy(2); // partially applied

const pipeResult3 = pipe(add2, subtract1, multiplyBy5, dividedBy2)(5);
console.log(pipeResult3);

// Let's look at some examples beyond math fns
const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const splitOnSpace = (message) => message.split(" ");
const count = (array) => array.length;

const wordCount = pipe(splitOnSpace, count);
console.log(wordCount(lorem));

// The pipe fn is reusable
const egbdf = "Every good boy does fine.";
console.log(wordCount(egbdf));

// Combine Processes: Check for palindrome
const pal1 = "taco cat";
const pal2 = "UFO tofu";
const pal3 = "Dave";

const split = (string) => string.split("");
const join = (string) => string.join("");
const lower = (string) => string.toLowerCase();
const reverse = (array) => array.reverse();

const fwd = pipe(splitOnSpace, join, lower);
const rev = pipe(
  fwd, // a nested pipe fn
  split,
  reverse,
  join
);

console.log(fwd(pal1) === rev(pal1));
console.log(fwd(pal2) === rev(pal2));
console.log(fwd(pal3) === rev(pal3));

console.log("---------------------------");

// Clone or Copy fns within a pipe or compose fn

// 3 approches:

// 1. Clone the object before an impure fn mutates it
const scoreObj = { home: 0, away: 0 };

const shallowClone = (obj) => (Array.isArray(obj) ? [...obj] : { ...obj });

const incrementHome = (obj) => {
  obj.home++; // mutation
  return obj;
};

const homeScore = pipe(shallowClone, incrementHome);

console.log(homeScore(scoreObj));
console.log(scoreObj);
console.log(homeScore(scoreObj) === scoreObj);

// +ve: Fewer fn calls
// -ve: Create impure fns and testing difficulties

console.log("---------------------------");

// 2. Curry th fn to create a partial that is unary
let incrementHomeB = (cloneFn) => (obj) => {
  const newObj = cloneFn(obj);
  newObj.home++; // mutation on the new object
  return newObj;
};

// Creates the partial by applying the first argument in advance
incrementHomeB = incrementHomeB(shallowClone);

const homeScoreB = pipe(
  incrementHomeB
  // another fn
  // and another fn, etc
);

console.log(homeScoreB(scoreObj));
console.log(scoreObj);
console.log(homeScoreB(scoreObj) === scoreObj);

// +ve: Pure fn with clear dependencies
// -ve: More calls to the cloning fn

console.log("---------------------------");

// 3. Insert the clone fn as a dependency

let incrementHomeC = (obj, cloneFn) => {
  const newObj = cloneFn(obj);
  newObj.home++; // mutation on the new object
  return newObj;
};

const homeScoreC = pipe(
  (x) => incrementHomeC(x, shallowClone)
  // another fn
  // and another fn, etc
);

console.log(homeScoreC(scoreObj));
console.log(scoreObj);
console.log(homeScoreC(scoreObj) === scoreObj);

// +ve: Pure fn with clear dependencies
// -ve: Non-unary fns in your pipe or compose chain
