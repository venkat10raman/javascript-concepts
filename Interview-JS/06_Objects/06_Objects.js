let namekey = "firstname";
let namevalue = "Patrick";
const user = {
  name: "Patrick James Cummins",
  age: 31,
  country: "Australia",
  // spaced key should be in double quotes
  "like This Video": true,
  // to add the dynamic property, we have to wrap the key in square brackets
  [namekey]: namevalue,
};

console.log(user);
delete user["like This Video"];
console.log(user);

const funcIffy = ((a) => {
  // here a is not a key , it is a local variable
  delete a;
  console.log(`In the funcIffy :: ${a}`);

  // no delete takes place as, a is not a key
  return a;
})(5);
console.log(`On funcIffy return :: ${funcIffy}`);

// we use for-in loop to loop the object
// it will loop recursively

for (const key in user) {
  console.log(`user ${key} is ${user[key]}`);
}

// 1. what's the output?

// ans: if you have multiple key with the same name
// last overriden value is considered and position is first usage
const obj = {
  a: "one",
  b: "two",
  a: "three",
};
console.log(obj);

// 2. Create a fn multiplyByTwo(obj) that
// multiplies all numeric property values of nums by 2 in the below object

let nums = {
  a: 100,
  b: 200,
  c: "one",
};

const multiplyByTwo = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
};
multiplyByTwo(nums);
console.log(nums);

// 3. What's the output of the following code?
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;
console.log(a[b]);
console.log(a);

// a[b] = 123; --> a["[object Object]"] = 123
// so the value gets overriden

// 4. What is JSON.stringigy and JSON.parse?
const stringUser = JSON.stringify(user);
console.log(stringUser);
console.log(JSON.parse(stringUser));

// local ans session storage only stores string values

// 5. What is the output?
console.log([..."Australia"]);

// 6. What is the output?
const admin = { isAdmin: true, ...user };
console.log(admin);

// 7. What is the output?
const settings = {
  volume: 5,
  level: 19,
  health: 90,
  channel: 24,
  fullName: {
    first: "Patrick",
    last: "Cummins",
  },
};

// It only stringify the specified keys in the object
const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);

// 8. What is the output?
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  area: function () {
    return Math.PI * this.radius * this.radius;
  },
  perimeter: () => {
    // "this" in the arrow functions is pointed to window/global object
    2 * Math.PI * this.radius;
  },
};

console.log(shape.diameter());
console.log(shape.area());
console.log(shape.perimeter());

// 9. What is destructuring in objects
// taking out specified values associate in the object using keys
const {
  volume: myVolume,
  channel,
  fullName: { first },
} = settings;
console.log(settings);
console.log(`${myVolume} - ${channel} - ${first}`);

// 10. What is the output?

function getItems(fruits, vegies, ...args) {
  return [...fruits, ...args, ...vegies];
}
console.log(getItems(["apple", "banana"], ["tomato", "carrot"], "chair"));

// 11. What is the output?

let x = { greeting: "Hey!" };
let y;

y = x;
x.greeting = "Hello";
console.log(x.greeting); // Hello

// 12. What is the output?
console.log({ a: 1 } == { a: 1 });
// console.log({ a: 1 } === { a: 1 }); false

// 13. What is the output?
let person = { name: "Lydia" };
const members = [person];

console.log(person);
console.log(members);

person.name = null;
console.log(person);
console.log(members);

person = null;
console.log(members);

// 13 What is the output?
const value = { number: 10 };

// if no param passed, above object is taken bydefault and cloned
// if obj is provided as param then ==> const multiply = (x) => {}
// actual object is considered
const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply(); // 20
multiply(); // 20
multiply(value); // 40
multiply(value); // 60

// 15 What is the output?
function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: "John",
    age: 50,
  };

  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> ?
console.log(personObj2); // -> ?

// 16. What is shallow copy?

// const userClone = Object.assign({}, user);
// const userClone = JSON.parse(JSON.stringify(user));
const userClone = { ...user };
userClone.firstname = "Ricky";
userClone.name = "Ricky Thomas Pointing";
console.log(userClone);
console.log(user);
