class BPromise {
  constructor(executor) {
    this.onSuccess = null;
    this.onError = null;

    this.isFullfilled = false;
    this.isRejected = false;
    this.value = null;
    this.isCalled = false;

    // executor(this.#resolve, this.#reject);
    executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  then(cb) {
    this.onSuccess = cb;
    if (this.isFullfilled && !this.isCalled) {
      console.log(this);
      this.onSuccess(this.value);
      this.isCalled = true;
    }
    return this;
  }

  catch(cb) {
    this.onError = cb;
    if (this.isRejected && !this.isCalled) {
      console.log(this);
      this.onError(this.value);
      this.isCalled = true;
    }
    return this;
  }

  /*
   #resolve = (successData) => {
    this.isFullfilled = true;
    this.value = successData;
    if (typeof this.onSuccess === "function") {
      this.onSuccess(successData);
      this.isCalled = true;
    }
  };

  #reject = (errorData) => {
    this.isRejected = true;
    this.value = errorData;
    if (typeof this.onError === "function") {
      this.onError(errorData);
      this.isCalled = true;
    }
  };
  */

  #resolve(successData) {
    console.log(this);
    this.isFullfilled = true;
    this.value = successData;
    if (typeof this.onSuccess === "function") {
      this.onSuccess(successData);
      this.isCalled = true;
    }
  }

  #reject(errorData) {
    console.log(this);
    this.isRejected = true;
    this.value = errorData;
    if (typeof this.onError === "function") {
      this.onError(errorData);
      this.isCalled = true;
    }
  }
}
const promise = new BPromise((resolve, reject) => {
  setTimeout(() => {
    reject("Operation Failed");
  }, 1000);
});

promise.then((result) => console.log(result)).catch((err) => console.log(err));

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
