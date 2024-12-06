console.log(this);
this.a = 3;
console.log(`Accessing from global context ${this.a}`);

// fns are first class citizens

function getParam() {
  console.log(`Inside the function`);
  console.log(this);
  console.log(`Inside the function ${this.a}`);
}
getParam();

let jamesUser = {
  name: "James",
  age: 24,
  getDetails() {
    console.log(this.name); //Piyush
  },
  child: {
    childName: "Bond",
    getDetails() {
      console.log(`${this.childName} :: ${this.name}`);
    },
  },
  arrowFn: () => {
    console.log(`Inside arrow Fn ${this}`);
    console.log(`Inside arrow Fn ${this.name}`);
  },
};
jamesUser.getDetails();
jamesUser.child.getDetails();
jamesUser.arrowFn();

console.log("-----------------");

class user {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(`Inside the class ${this.name}`);
  }
}

let thomasUser = new user("Thomos");
console.log(thomasUser);
thomasUser.getName();

console.log("-----------------");

// 1. What is the output?
const bondUser = {
  lastname: "Bond",
  getLastname() {
    const lastname = "Ford";
    console.log(`BondUser getLastname :: ${this.lastname}`);
  },
};
bondUser.getLastname();

// 2.What is the result of accessing its ref? Why?

function makeUser() {
  return {
    name: "Bond",
    ref: this,

    // fix
    ref2() {
      return this;
    },
  };
}
let user1 = makeUser();
console.log(`Key with value as this :: ${user1.ref.name}`);
console.log(`Key with value as this :: ${user1.ref}`);
console.log(`Key with value as this :: ${user1.ref2().name}`);
console.log(`Key with value as this :: ${user1.ref2()}`);

// 3. What is the output?
const user2 = {
  name: "Bond",
  logMessage: function () {
    console.log(`From the user2 :: ${this.name}`);
  },
};

console.log(user2.logMessage);
user2.logMessage();
setTimeout(user2.logMessage, 10000);
//fix
setTimeout(() => {
  user2.logMessage();
}, 10000);

// 4. What is the output?
const user4 = {
  name: "Bond",
  greet: function () {
    return `Hello user4, ${this.name}`;
  },
  farewell: () => {
    return `GoodBye user4, ${this.name}`;
  },
};

console.log(user4.greet());
console.log(user4.farewell());

// 5. Create an object calculator

let calculator = {
  //... write your code
  read() {
    // this.a = +prompt("a = ", 0);
    // this.b = +prompt("b = ", 0);
    (this.a = 9), (this.b = 10);
  },
  sum() {
    return `Calculator sum :: ${this.a + this.b}`;
  },
  mul() {
    return `Calculator mul :: ${this.a * this.b}`;
  },
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

// 6. What is the output?

var length = 4;
let letLength = 6;
const constLength = 7;
function callback() {
  console.log(`Callback length :: ${this.length}`);
  console.log(`Callback length :: ${this.letLength}`);
  console.log(`Callback length :: ${this.constLength}`);
}

const user6 = {
  length: 6,
  letLength: 7,
  constLength: 8,
  method1: function (fn) {
    fn();
  },
  method2: function () {
    console.log(arguments);
    arguments[0]();
  },
};

user6.method1(callback);
user6.method2(callback, 2, 3);
// array is an object, so it has length 3 above so it prints 3

// 7. Implement calc

const calc = {
  total: 0,
  add: function (n) {
    this.total += n;
    return this;
  },
  multiply: function (n) {
    this.total *= n;
    return this;
  },
  subtract: function (n) {
    this.total -= n;
    return this;
  },
};

const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log(result.total);
