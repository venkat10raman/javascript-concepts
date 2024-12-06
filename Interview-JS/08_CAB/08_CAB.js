console.log("--------------------------");

var status = "globalStatus";

setTimeout(() => {
  const status = "fnStatus";
  const data = {
    status: "objectStatus",
    getStatus() {
      return this.status;
    },
  };
  console.log("--------------------------");
  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);

console.log("--------------------------");

const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ": " + this.name);
  };
  this.print();
}

for (let i = 0; i < animals.length; i++) {
  printAnimals.call(animals[i], i);
}

console.log("--------------------------");

const array = ["a", "b"];
const elements = [0, 1, 2];

// array.push(5);
// array.push(elements);

// we are using apply bcoz it takes array as an input
array.push.apply(array, elements);

console.log(array);

console.log("--------------------------");

// Find min/max number in the array
const numbers = [5, 6, 3, 8, 2, 9];
console.log(Math.max.apply(null, numbers));
console.log(Math.min.apply(null, numbers));

console.log("--------------------------");
// What is the output?

function f() {
  // context is hard fixed
  console.log(this);
}
const user1 = {
  g: f.bind(null),
  h: f.bind(this),
};
user1.g();
user1.h();

console.log("--------------------------");
// What is the output?
function f2() {
  console.log(this.name);
}

const f3 = f2.bind({ name: "bond" });
console.log(f3);
f3();
f3.bind({ name: "james" });
f3();

const f4 = f2.bind({ name: "bond" }).bind({ name: "james" });
f4();
// bind chaining does not work

// Fix the line to make code work
function checkPassword(success, failed) {
  let password = "password";
  if (password === "password") success();
  else failed();
}

let user2 = {
  name: "James Bond",
  loginSuccess() {
    console.log(`${this.name} logged in`);
  },
  loginFailed() {
    console.log(`${this.name} failed to log in`);
  },
};

checkPassword(user2.loginSuccess, user2.loginFailed);
checkPassword(user2.loginSuccess.bind(user2), user2.loginFailed.bind(user2));

function checkPassword2(ok, fail) {
  let password = "password";
  if (password === "password") ok();
  else fail();
}

let user3 = {
  name: "James Bond",
  login(result) {
    console.log(
      this.name + " :: " + (result ? "login success" : `login failed`)
    );
  },
};

checkPassword2(user3.login.bind(user3, true), user3.login.bind(user3, false));

// call apply bind does not work with arrow functions

console.log("========================================");

let car = {
  color: "Red",
  company: "Ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}: ${price}`
  );
}

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not Callable");
  }

  console.log(this);
  context.func = this;
  context.func(...args);
};

purchaseCar.call(car, "$", 50000);
purchaseCar.myCall(car, "$", 60000);

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not apply");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  console.log(this);
  context.func = this;
  //...args converts array and spreads to multiple arguments
  context.func(...args);
};
purchaseCar.myApply(car, ["$", 70000]);

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not bound");
  }

  console.log(this);
  context.func = this;
  return function () {
    context.func(...args);
    // context.func(args); both will work
  };
};
console.log("+++++++++++++++++++++++");
purchaseCar.myBind(car, "$", 60000)();
purchaseCar.myBind(car)("$", 60000);
console.log("+++++++++++++++++++++++");

Function.prototype.myBind2 = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not bound");
  }

  console.log(this);
  context.func = this;
  return function (...newArgs) {
    context.func(...args, ...newArgs);
  };
};
console.log("+++++++++++++++++++++++");
purchaseCar.myBind2(car, "$", 60000)();
purchaseCar.myBind2(car)("$", 60000);
purchaseCar.myBind2(car, "$")(60000);
console.log("+++++++++++++++++++++++");
