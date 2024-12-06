function getSquare(num, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num % 2 === 0) resolve(num * num);
      else reject("cannot calculate square from odd numbers");
    }, delay);
  });
  return promise;
}

async function getDataAll() {
  const result = await Promise.all([getSquare(2, 2000), getSquare(4, 1000)]);
  console.log(result);

  const result2 = await Promise.all([getSquare(2, 2000), getSquare(7, 1000)]);
  console.log(result2);
}

getDataAll();

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((data) => {
          result[i] = data;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    }
  });
};

async function getDataPolyfillAll() {
  const result = await Promise.myAll([getSquare(2, 2000), getSquare(4, 1000)]);
  console.log(result);

  const result2 = await Promise.myAll([getSquare(2, 2000), getSquare(7, 1000)]);
  console.log(result2);
  console.log("-----------------------------------");
}
getDataPolyfillAll();

async function getDataAllSettled() {
  const result = await Promise.allSettled([
    getSquare(2, 2000),
    getSquare(5, 1000),
  ]);
  console.log(result);

  const result2 = await Promise.allSettled([
    getSquare(2, 2000),
    getSquare(7, 1000),
  ]);
  console.log(result2);
}
getDataAllSettled();

Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const result = [];
    let count = 0;

    const commonHandler = (index, status, value) => {
      result[index] =
        status === "fulfilled" ? { status, value } : { status, reason: value };
      count++;
      if (count === promises.length) {
        resolve(result);
      }
    };
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((data) => {
          commonHandler(i, "fulfilled", data);
        })
        .catch((err) => {
          commonHandler(i, "rejected", err);
        });
    }
  });
};

async function getDataMyAllSettled() {
  const result = await Promise.myAllSettled([
    getSquare(2, 2000),
    getSquare(4, 1000),
  ]);
  console.log(result);

  const result2 = await Promise.myAllSettled([
    getSquare(2, 2000),
    getSquare(7, 1000),
  ]);
  console.log(result2);
  console.log("-----------------------------------");
}

getDataMyAllSettled();

async function getDataRace() {
  const result = await Promise.race([getSquare(2, 2000), getSquare(5, 1000)]);
  console.log(result);

  const result2 = await Promise.race([getSquare(2, 2000), getSquare(7, 1000)]);
  console.log(result2);
}

getDataRace();

Promise.myRace = function (promises) {
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((data) => res(data))
        .catch((err) => rej(err));
    }
  });
};

async function getDataMyRace() {
  const result = await Promise.myRace([getSquare(5, 2000), getSquare(4, 1000)]);
  console.log(result);

  const result2 = await Promise.myRace([
    getSquare(2, 2000),
    getSquare(7, 1000),
  ]);
  console.log(result2);
  console.log("---------------------------------");
}
getDataMyRace();

async function getDataAny() {
  // similar to race but it returns first sucessful promise
  const result = await Promise.any([getSquare(2, 2000), getSquare(7, 1000)]);
  console.log(result);

  // if all promises rejected then aggregate error will be returned
  const result2 = await Promise.any([getSquare(3, 2000), getSquare(7, 1000)]);
  console.log(result2);
}
getDataAny();

Promise.myAny = function (promises) {
  return new Promise((res, rej) => {
    const result = [];
    let count = 0;

    const handleError = (index, status, value) => {
      result[index] = { status, value };
      count++;
      if (count === promises.length) {
        // rej(result);
        rej(new AggregateError([result]));
      }
    };
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((data) => res(data))
        .catch((err) => handleError(i, "rejected", err));
    }
  });
};

async function getDataMyAny() {
  // similar to race but it returns first sucessful promise
  const result = await Promise.myAny([getSquare(12, 2000), getSquare(7, 1000)]);
  console.log(result);

  // if all promises rejected then aggregate error will be returned
  try {
    const result2 = await Promise.myAny([
      getSquare(3, 2000),
      getSquare(7, 1000),
    ]);
    console.log(result2);
  } catch (error) {
    console.log(error.name);
    console.log(error.errors);
  }
}
getDataMyAny();
