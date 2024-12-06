// Polyfill for foreach

const names = ["james", "thomas", "jack"];
function consoleFunc(x) {
  console.log(x);
}
names.forEach(consoleFunc);

Array.prototype.customForEach = function (callbackFunction) {
  if (typeof callbackFunction === "function") {
    console.log("Oi Mate, this is a function");
  }
  if (Array.isArray(this)) {
    console.log("Oi Mate, this is a Array");
    console.log(this);
    for (let i = 0; i < this.length; i++) {
      callbackFunction(this[i]);
    }
  }
};

names.customForEach(consoleFunc);
names.customForEach((x) => console.log(x));

console.log("---------Polyfill Map--------------");

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function double(x) {
  return x + x;
}
function square(x) {
  return x * x;
}
console.log(nums.map((x) => x * 2));
console.log(nums.map(double));
console.log(nums.map((x) => x * x));
console.log(nums.map(square));

Array.prototype.customMap = function (callbackFunction) {
  if (typeof callbackFunction === "function") {
    console.log("Oi Mate, this is a function");
  }
  if (Array.isArray(this)) {
    console.log("Oi Mate, this is a Array");
    console.log(this);
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
      newArray.push(callbackFunction(this[i]));
    }
    return newArray;
  }
};

console.log(nums.customMap((x) => x * 2));
console.log(nums.customMap(double));
console.log(nums.customMap((x) => x * x));
console.log(nums.customMap(square));

console.log("---------Polyfill Filter--------------");

function isEven(x) {
  return x % 2 == 0;
}
console.log(nums.filter(isEven));
console.log(nums.filter((x) => x % 2 == 0));
console.log(nums.filter((x) => x % 2 != 0));

Array.prototype.customFilter = function (callbackFunction) {
  if (typeof callbackFunction === "function") {
    console.log("Oi Mate, this is a function");
  }
  if (Array.isArray(this)) {
    console.log("Oi Mate, this is a Array");
    console.log(this);
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
      if (callbackFunction(this[i])) {
        newArray.push(this[i]);
      }
    }
    return newArray;
  }
};

console.log(nums.customFilter(isEven));
console.log(nums.customFilter((x) => x % 2 == 0));
console.log(nums.customFilter((x) => x % 2 != 0));

console.log("---------Polyfill Reduce--------------");

function accumulteFunciton(accumulator, current) {
  return accumulator + current;
}

console.log(nums.reduce(accumulteFunciton));
console.log(nums.reduce(accumulteFunciton, 0));
console.log(nums.reduce((acc, val) => acc + val));
console.log(
  nums.reduce((acc, val) => {
    return acc + val;
  }, 0)
);
console.log(
  nums.reduce((acc, val) => {
    return acc + val;
  })
);

Array.prototype.customReduce = function (callbackFunction, initialValue) {
  if (typeof callbackFunction === "function") {
    console.log("Oi Mate, this is a function");
  }
  if (Array.isArray(this)) {
    console.log("Oi Mate, this is a Array");
    console.log(this);
    let accumulator = initialValue === undefined ? 0 : initialValue;

    for (let i = 0; i < this.length; i++) {
      accumulator = callbackFunction(accumulator, this[i]);
    }
    return accumulator;
  }
};

console.log(nums.customReduce(accumulteFunciton));
console.log(nums.customReduce(accumulteFunciton, 0));
console.log(nums.customReduce((acc, val) => acc + val));
console.log(
  nums.customReduce((acc, val) => {
    return acc + val;
  }, 0)
);
console.log(
  nums.customReduce((acc, val) => {
    return acc + val;
  })
);

console.log("====================Call====================");

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
  if (typeof this === "function") {
    console.log(this);
    console.log(args);
    context.buyCar = this;
    context.buyCar(...args);
    // context.buyCar(args);
    // only works when the function takes only one param
  } else {
    console.log("Mate you passed wrong params");
    // we throw exception
  }
};

purchaseCar.call(car, "$", 50000);
purchaseCar.myCall(car, "$", 50000);

console.log("====================Apply====================");

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this === "function" && Array.isArray(args)) {
    console.log(this);
    console.log(args);
    context.buyCar = this;
    context.buyCar(...args);
  } else {
    console.log("Mate you passed wrong params");
    // we throw exception
  }
};

purchaseCar.apply(car, ["$", 50000]);
purchaseCar.myApply(car, ["$", 50000]);

console.log("====================Bind====================");

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this === "function") {
    console.log(this);
    console.log(args);
    context.buyCar = this;
    return function () {
      context.buyCar(...args);
    };
  } else {
    console.log("Mate you passed wrong params");
    // we throw exception
  }
};

purchaseCar.bind(car, "$", 50000)();
purchaseCar.myBind(car, "$", 50000)();

console.log("================Bind with args================");

Function.prototype.myBind2 = function (context = {}, ...args) {
  if (typeof this === "function") {
    console.log(this);
    console.log(args);
    context.buyCar = this;
    return function (...newArgs) {
      context.buyCar(...args, ...newArgs);
    };
  } else {
    console.log("Mate you passed wrong params");
    // we throw exception
  }
};

purchaseCar.bind(car, "$", 50000)();
purchaseCar.myBind2(car, "$", 50000)();
purchaseCar.myBind2(car)("$", 50000);
purchaseCar.myBind2(car, "$")(50000);

console.log("+++++++++++++++Only ONce Closure++++++++++++++++++++");

// closure :: only once polyfill

function onlyOnce(func, context) {
  let ran;
  return function () {
    if (func) {
      console.log(context);
      console.log(this);
      ran = func.apply(context || this, arguments);
      func = null;
    } else {
      console.log("Mate you cannot call the function more than once");
    }
    return ran;
  };
}

const hello = onlyOnce(() => console.log("Hello Mate!!!"));
hello();
hello();

const purchaseCarOnce = onlyOnce(purchaseCar, car);
purchaseCarOnce();
purchaseCarOnce();
onlyOnce(purchaseCar, car)("#", 30000);

// Promise polyfill Implementation

function promisePolyFill(executor) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isCalled = false,
    isRejected = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;

    if (typeof onResolve === "function") {
      onResolve(val);
      isCalled = true;
    }
  }
  function reject(val) {
    isRejected = true;
    value = val;

    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (isFulfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };
  this.catch = function (callback) {
    onReject = callback;
    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }

    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const examplePromise = new promisePolyFill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

examplePromise
  .then((res) => {
    console.log(`Promise Polyfill async response ${res}`);
  })
  .catch((err) => console.log(err));

new promisePolyFill((resolve, reject) => {
  setTimeout(() => {
    reject(5);
  }, 1000);
}).catch((err) => console.log(`Promise Polyfill async response ${err}`));

new promisePolyFill((resolve, reject) => {
  resolve(2);
}).then((res) => console.log(`Promise Polyfill sync response ${res}`));

new promisePolyFill((resolve, reject) => {
  reject(5);
}).catch((res) => console.log(`Promise Polyfill sync response ${res}`));


// Promise.all() polyfill Implementation