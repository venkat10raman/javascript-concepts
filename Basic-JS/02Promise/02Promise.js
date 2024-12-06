// Fetch API requires a discussion of...
// Callbacks, Promises, Thenables, and Async/Await

// Promises

// 3 states: Pending, Fulfilled, Rejected

const promiseOne = new Promise((resolve, reject) => {
  const error = false;
  if (error) {
    reject("Yes! resolved the promise!");
  } else {
    resolve("No! rejected the promise!");
  }
});

console.log(promiseOne);
promiseOne.then((val) => {
  console.log(val);
  return val + 1;
});

const promiseTwo = new Promise((resolve, reject) => {
  const error = false;
  if (error) {
    reject("No! rejected the promise!");
  } else {
    resolve(1);
  }
});

promiseTwo
  .then((val) => {
    console.log(val);
    return val + 1;
  })
  .then((val) => {
    console.log(val);
  });

const promiseThree = new Promise((resolve, reject) => {
  const error = true;
  if (error) {
    reject("No! rejected the promise!");
  } else {
    resolve(1);
  }
});

promiseThree
  .then((val) => {
    console.log(val);
    return val + 1;
  })
  .catch((err) => {
    console.log(err);
    console.error(err);
  });

console.log("---------------------------");

const promiseFour = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("Promise 4 resolved ");
  }, 0);
});

promiseFour.then((val) => {
  console.log(val);
});

console.log("---------------------------");

const users = fetch("https:jsonplaceholder.typicode.com/users");

// pending
console.log(users);
console.log(`users are :: ${users}`);

const userList = fetch("https:jsonplaceholder.typicode.com/users")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((user) => {
      console.log(user);
    });
  });
console.log(userList);
console.log(`user list is :: ${userList}`);

console.log("---------------------------");
