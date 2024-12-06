// Synchronous vs Asynchronous code

// synchronous code
console.log("start");

// Async code
setTimeout(() => {
  console.log("I will get logged after all the synchronous code executed");
}, 0);

// bcoz javascript is a single thread language, it cannot execute async code
// in parallel so after finishing the sync code it executes async code

const asyncFunc = (username) => {
  setTimeout(() => {
    return `Hello Mate, ${username}`;
  }, 0);
};
console.log(asyncFunc("Bond"));

// fix, not a fix though
const asyncFunc2 = (username, callback) => {
  setTimeout(() => {
    return callback(`Hello Mate, ${username}`);
  }, 1000);
};

const a = asyncFunc2("Bond", (message) => {
  console.log(message);
  return message;
});
console.log(`fixed async call :: ${a}`);

// synchronous code
console.log("Finish");

console.log("-----------Interview Questions-----------------");

// 1. what is the output?

const promise1 = new Promise((resolve, reject) => {
  console.log(`promise1 1`);
  resolve(2);
  console.log(`promise1 2`);
});

promise1.then((res) => {
  console.log(`promise1 response :: ${res}`);
});
console.log(`promise1 end`);

// 2. what is the output?

const promise2 = new Promise((resolve, reject) => {
  console.log(`promise2 1`);
  console.log(`promise2 2`);
});

// will not executed since there is resolve or reject in the promise2
promise2.then((res) => {
  console.log(`promise2 response :: ${res}`);
});
console.log(`promise2 end`);

// 3. what is the output?
console.log(`promise3 start`);
const promise3 = () =>
  new Promise((resolve, reject) => {
    console.log(`promise3 1`);
    resolve(`promise3 success`);
  });

console.log(`promise3 middle`);
promise3().then((res) => {
  console.log(res);
});

console.log(`promise3 end`);

// 4. what is the output?

function job4() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

const promise4 = job4();
promise4
  .then(function () {
    console.log("promise4 success1");
  })
  .then(function () {
    console.log("promise4 success2");
  })
  .then(function () {
    console.log("promise4 success3");
  })
  .catch(function () {
    console.log("promise4 Error");
  })
  .then(function () {
    console.log("promise4 success4");
  });

// 5. what is the output?
function job5(state) {
  return new Promise((resolve, reject) => {
    if (state) {
      resolve("promise5 success");
    } else {
      reject("promise5 error");
    }
  });
}

let promise5 = job5(true);
promise5
  .then((res) => {
    console.log(res);
    return job5(false);
  })
  .catch((rej) => {
    console.log(rej);
    return "promise5 Error Caught";
  })
  .then((res) => {
    console.log(res);
    return job5(true);
  })
  .catch((rej) => {
    console.log(rej);
  });

// promise5 success --> promise5 error --> promise5 Error Caught

// 6. what is the output?

function job6(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("promise6 success");
    } else {
      reject("promise6 error");
    }
  });
}

let promise6 = job6(true);
promise6
  .then((res) => {
    console.log(res);
    return job6(true);
  })
  .then((res) => {
    if (res !== "victory") {
      throw "Promise6 Defeat";
    }
    return job6(true);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((rej) => {
    console.log(rej);
    return job6(false);
  })
  .then((res) => {
    console.log(res);
    return job6(true);
  })
  .catch((rej) => {
    console.log(rej);
    return "Error caught";
  })
  .then((res) => {
    console.log(res);
    return new Error("test"); // Not Returning the promise
  })
  .then((res) => console.log(`Promise6 Success :: ${res}`))
  .catch((rej) => console.log(`Promise5 Error :: ${rej}`));

// success --> Defeat --> error --> Error caught --> Promise6 Success :: test

// 7. Promise Chaining

const firstPromise7 = new Promise((res, rej) => {
  res("Promise7 First");
});

const secondPromise7 = new Promise((res, rej) => {
  res(firstPromise7);
});

secondPromise7.then((res) => res).then((res) => console.log(res));

// 8. rewrite this example using async/await instead of then/catch

function loadJson(url) {
  return fetch(url).then((res) => {
    if (res.status == 200) {
      let data = res.json();
      console.log(data); // interesting
      return data;
    } else {
      throw new Error(res.status);
    }
  });
}

loadJson("https://dummyjson.com/users/1")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// answer

const asyncLoadDadJoke = async (url) => {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status == 200) {
    let json = await response.json();
    console.log(json);
    return json;
  }
  throw new Error(response.status);
};

asyncLoadDadJoke("https://icanhazdadjoke.com/");

// 9. solve promise recursively

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 1000);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video} video`);
    }, 1000);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Share the ${video} video`);
    }, 1000);
  });
}

function solvePromiseRecursively(funcPromises) {
  // write your code here

  if (funcPromises.length === 0) return;
  const currentPromise = funcPromises.shift();
  currentPromise
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  solvePromiseRecursively(funcPromises);
}

solvePromiseRecursively([
  importantAction("Cricket Australia"),
  likeTheVideo("India 36 Allout"),
  shareTheVideo("India 36 Allout"),
]);
