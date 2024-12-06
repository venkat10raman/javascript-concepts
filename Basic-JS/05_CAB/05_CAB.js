// this in the global context
console.log(this);

// this inside the class
let a = 7;
class Test {
  a = 1;
  b = 2;
  c = 3;
  d = this.a;
  constructor() {
    console.log(this);
    console.log(this.a, this.b, this.c);
  }
}

const test = new Test();

// this inside the object
console.log("-------obj--------");
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: function (param) {
    this.b = param;
    console.log(this);
    console.log(this.a, this.b, this.c);
  },
};
console.log(obj);
obj.d(5);

console.log("-------obj1--------");
const obj1 = {
  a: 1,
  func: function () {
    console.log(this);
  },
};

obj1.func();

console.log("-------obj2--------");
const obj2 = {
  a: 1,
  func: () => {
    // this will show global object
    console.log(this);
  },
};

obj2.func();

console.log("-------obj3--------");
const obj3 = {
  a: 1,
  b: {
    c: () => {
      console.log(this);
    },
  },
  func: function () {
    const func = () => {
      console.log(this);
    };
    func();
  },
};

obj3.func();
obj3.b.c();

console.log("-------fn--------");

// in the fn, this refer to which object the fn is present in
function sampleFn() {
  let a = 3;
  console.log(this);
}
sampleFn();

console.log("-------call--------");

const john = {
  name: "John",
  surname: "McGrath",
  getName: function () {
    console.log(this.name);
  },
  getFullName: function (param) {
    console.log(this.name, param);
  },
};

const adam = {
  name: "Adam",
  age: 30,
};

john.getName();
john.getFullName("Lenon");
john.getName.call(adam);
john.getFullName.call(adam, "Gardener");

console.log("-------apply--------");
john.getName.apply(adam);
john.getFullName.apply(adam, ["Gardener"]);

console.log("-------bind--------");
const bind1 = john.getName.bind(adam);
const bind2 = john.getFullName.bind(adam, "Gardener");

bind1();
bind2();

console.log("--------call------------");

function getName() {
  console.log(this.firtName, this.lastName);
}

function getFullName(middleName) {
  console.log(this.firtName, middleName, this.lastName);
}

const pat = {
  firtName: "Patrick",
  lastName: "Cummins",
};

const josh = {
  firtName: "Josh",
  lastName: "Hazlewood",
};

getName.call(pat);
getFullName.call(pat, "James");

getName.call(josh);
getFullName.call(josh, "Reginald");

console.log("--------apply------------");

getName.apply(pat);
getFullName.apply(pat, ["James"]);

getName.apply(josh);
getFullName.apply(josh, ["Reginald"]);

console.log("--------bind------------");
getName.bind(pat)();
getFullName.bind(pat, "James")();

getName.bind(josh)();
getFullName.bind(josh, "Reginald")();

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

const numbers = [5, 6, 3, 8, 2, 9];
console.log(Math.max.apply(null, numbers));
