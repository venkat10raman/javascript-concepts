const initApp = async () => {
  multiplyBy10(20);
  const multiplyByTen = memoizedMultiplyBy10();
  console.log(multiplyByTen(10));
  console.log(multiplyByTen(10));
  console.log(multiplyByTen(5));

  console.log("-----------------");
  const memoizedMultBy10 = memoize(multiplyBy10);
  console.log(memoizedMultBy10(20));
  console.log(memoizedMultBy10(20));
  console.log(memoizedMultBy10(15));

  console.log("-----------------");
  const memoizedAddThree = memoize(addThree);
  console.log(memoizedAddThree(10, 1, 2));
  console.log(memoizedAddThree(10, 1, 2));
  console.log(memoizedAddThree(10, 2, 1));
  console.log(memoizedAddThree(5, 4, 3));
  console.log(memoizedAddThree(5, 4, 3));

  console.log("-----------------");
  const memoizedAddMany = memoize(addMany);
  console.log(memoizedAddMany(1, 2, 3, 4, 5));
  console.log(memoizedAddMany(1, 2, 3, 4, 5));
  console.log(memoizedAddMany(1, 2, 3, 4, 5));
  console.log(memoizedAddMany(6, 7, 8, 9, 10));
  console.log(memoizedAddMany(6, 7, 8, 9, 10));
  console.log(memoizedAddMany(5, 4));

  console.log("-----------------");
  const memoizedFib = memoize(fib);
  console.log(memoizedFib(40));
  console.log(memoizedFib(40));
  console.log(memoizedFib(40));
  console.log(memoizedFib(40));

  console.log(fib(40));
  console.log(fib(40));
  console.log(fib(40));
  console.log("-----------------");
};

document.addEventListener("DOMContentLoaded", initApp);

const multiplyBy10 = (num) => {
  return num * 10;
};

const addThree = (x, y, z) => x + y + z;
const addMany = (...args) => [...args].reduce((acc, num) => acc + num);
const fib = (pos) => {
  if (pos < 2) return pos;
  return fib(pos - 1) + fib(pos - 2);
};

const memoizedMultiplyBy10 = () => {
  const cache = {};
  return (num) => {
    if (num in cache) {
      console.log(cache);
      return cache[num];
    }
    const result = num * 10;
    cache[num] = result;
    return result;
  };
};

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    if (JSON.stringify(args) in cache) {
      // if you want to verify result comes from cache
      console.log(cache);
      return cache[JSON.stringify(args)];
    }
    const result = fn(...args);
    cache[JSON.stringify(args)] = result;
    return result;
  };
};
