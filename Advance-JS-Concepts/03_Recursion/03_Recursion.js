// In programming, recursion occurs when a fn calls itself.

// Any iterator fn (aka fn with a loop) can be recursion instead.

// iterator fn
const countToTen = (num = 1) => {
  while (num <= 10) {
    console.log(num++);
  }
};

countToTen();
console.log("----------------------------");

// recursion fn have 2 parts:
// 1. the recursive call to the fn
// 2. at least one condition to exit

const recurToTen = (num = 1) => {
  if (num > 10) {
    return;
  }
  console.log(num);
  num++;
  recurToTen(num);
};

recurToTen();

console.log("----------------------------");

// Reasons to NOT use Recursion
// 1. Performance
// 2. Possibly more difficult to dubug (aka follow the logic)
// 3. Is the Readability Improved?

const fibonacci = (num, array = [0, 1]) => {
  while (num > 2) {
    const [secondLast, last] = array.slice(-2);
    array.push(secondLast + last);
    num--;
  }
  return array;
};

console.log(fibonacci(12));

const recurFibonacci = (num, array = [0, 1]) => {
  if (num <= 2) {
    return array;
  }
  const [secondLast, last] = array.slice(-2);
  return recurFibonacci(num - 1, [...array, secondLast + last]);
};

console.log(recurFibonacci(12));

console.log("----------------------------");

// What number is in the nth position of the Fibonnaci Sequence?

// Without Recurison:
const fibonacciPos = (pos) => {
  if (pos <= 1) return pos;
  const seq = [0, 1];
  for (let i = 2; i <= pos; i++) {
    const [secondLast, last] = seq.slice(-2);
    seq.push(secondLast + last);
  }
  return seq[pos];
};
console.log(fibonacciPos(8));

// With Recurison:

const recurFibPos = (pos) => {
  if (pos < 2) {
    return pos;
  }
  return recurFibPos(pos - 1) + recurFibPos(pos - 2);
};

// const recurFibPos = pos => pos < 2 ? pos : recurFibPos(pos - 1) + recurFibPos(pos - 2);

console.log(recurFibPos(8));

console.log("----------------------------");

// Real-Life Examples:

// 1. Continuation Taken from an API

// 2) A Parser:
// a company directory
// a file directory
// the DOM - a web crawler
// An XML or JSON data export

// Export from your streaming service like Spotify, YT Music, etc.

const artistsByGenre = {
  jazz: ["Miles Davis", "John Coltrane"],
  rock: {
    classic: ["Bob Seger", "The Eagles"],
    hair: ["Def Leppard", "Whitesnake", "Poison"],
    alt: {
      classic: ["Pearl Jam", "The Killers"],
      current: ["Joywave", "Sir Sly"],
    },
  },
  unclassified: {
    new: ["Caamp", "Neil Young"],
    classic: ["Seal", "Morcheeba", "Chris Stapleton"],
  },
};

const getArtistNames = (dataObj, arr = []) => {
  Object.keys(dataObj).forEach((key) => {
    if (Array.isArray(dataObj[key])) {
      return dataObj[key].forEach((artist) => {
        arr.push(artist);
      });
    }
    getArtistNames(dataObj[key], arr);
  });
  return arr;
};

console.log(getArtistNames(artistsByGenre));
