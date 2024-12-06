class MyPromise {
  constructor(executor) {
    this.onSuccess = null;
    this.onFailed = null;
    this.isFullfilled = false;
    this.isRejected = false;
    this.isCalled = false;
    this.value = null;
    this.then = function (cb) {
      this.onSuccess = cb;
      if (this.isFullfilled && !this.isCalled) {
        this.isCalled = true;
        this.onSuccess(this.value);
      }
      return this;
    };
    this.catch = function (cb) {
      this.onFailed = cb;
      if (this.isRejected && !this.isCalled) {
        this.isCalled = true;
        this.onFailed(this.value);
      }
      return this;
    };
    executor(this.#resolve, this.#reject);
  }

  #resolve = (successData) => {
    console.log(this);
    this.isFullfilled = true;
    this.value = successData;
    if (typeof this.onSuccess === "function") {
      this.onSuccess(successData);
      this.isCalled = true;
    }
  };

  #reject = (errorData) => {
    console.log(this);
    this.isRejected = true;
    this.value = errorData;
    if (typeof this.onFailed === "function") {
      this.onFailed(errorData);
      this.isCalled = true;
    }
  };
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      resolve(randomNumber);
    } else {
      reject("Operation failed");
    }
  }, 1000);
});
myPromise
  .then((result) => console.log(`SUCCESS :: ${result}`))
  .catch((error) => console.log(`ERROR :: ${error}`));

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const randomNumber = Math.random();
//     if (randomNumber < 0.5) {
//       resolve(randomNumber);
//     } else {
//       reject("Operation failed");
//     }
//   });
// });

// promise
//   .then((result) => console.log(`SUCCESS :: ${result}`))
//   .catch((error) => console.log(`ERROR :: ${error}`));
