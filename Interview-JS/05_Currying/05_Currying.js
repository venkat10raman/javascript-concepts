// 1. sum(2)(6)(1) -> 9

const sum = (a, b, c) => {
  console.log(`Normal Sum Fn :: ${a + b + c}`);
};
sum(2, 3, 4);

const sumCurry = (a) => (b) => (c) => {
  console.log(`Currying Sum Fn :: ${a + b + c}`);
};
sumCurry(2)(3)(4);

/*
    2. Write below fn
    evaluate("add")(4)(2)
    evaluate("substract")(4)(2)
    evaluate("multiply")(4)(2)
    evaluate("divide")(4)(2)
*/

const evaluate = (type) => (a) => (b) => {
  if (type === "add") {
    console.log(`Evaluate Sum:: ${a + b}`);
  } else if (type === "substract") {
    console.log(`Evaluate substract:: ${a - b}`);
  } else if (type === "multiply") {
    console.log(`Evaluate multiply:: ${a * b}`);
  } else if (type === "divide") {
    b !== 0
      ? console.log(`Evaluate divide:: ${a / b}`)
      : console.log("Result is Undefined");
  } else {
    console.log("Sorry Mate");
  }
};

evaluate("add")(4)(2);
evaluate("substract")(4)(2);
evaluate("multiply")(4)(2);
evaluate("divide")(4)(2);

const add = evaluate("add"); // Partial Currying
add(4)(2);

// 3. Infinite Currying -> sum(1)(2)(3)...(n)

const infiniteAdd = (a) => (b) => {
  if (b) return infiniteAdd(a + b);
  console.log(`Infinite Addtion :: ${a}`);
  return a;
};
infiniteAdd(2)(3)(5)(19)();

// 4.Currying vs Partial Application
const partialSum = (a) => (b, c) => {
  console.log(`Partial Application Sum :: ${a + b + c}`);
};
partialSum(9)(3, 7);

// 5. Manipulating DOM --> Real time application of currying
const updateElementText = (id) => (content) => {
  document.querySelector(`#${id}`).textContent = content;
};
const updateHeader = updateElementText("oi");
updateHeader("Hi Mate!");

// 6. Convert normal fn to curryied function
// f(a,b,c) into f(a)(b)(c)

const convertIntoCurry = (fn) => {
  return function curriedFunc(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
};

const fourAdd = (a, b, c, d) => a + b + c + d;
const totalSum = convertIntoCurry(fourAdd);
console.log(totalSum(1)(2)(3)(4));
