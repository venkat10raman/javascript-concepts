/*
class Pizza {
  constructor(size, crust, sauce) {
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.toppings = [];
  }
  prepare() {
    console.log("Preparing...");
  }
  bake() {
    console.log("Baking...");
  }
  ready() {
    console.log("Ready!");
  }
}
*/

// Problem: Repeating methods - Not D.R.Y.

// Instead, use composition for methods
const prepare = () => {
  return {
    prepare: () => console.log("Preparing..."),
  };
};

const bake = () => {
  return {
    bake: () => console.log("Baking..."),
  };
};

const toss = () => {
  return {
    toss: () => console.log("Tossing..."),
  };
};

const ready = () => {
  return {
    ready: () => console.log("Ready!"),
  };
};

const stuff = () => {
  return {
    stuff: () => console.log("Stuffing the crust..."),
  };
};

const butter = () => {
  return {
    butter: () => console.log("Buttering the crust..."),
  };
};

const createPizza = (size, crust, sause) => {
  const pizza = {
    size: size,
    crust: crust,
    sause: sause,
    toppings: [],
  };

  return {
    ...pizza,
    ...prepare(),
    ...bake(),
    ...ready(),
  };
};

const createSalad = (size, dressing) => {
  return {
    size: size,
    dressing: dressing,
    ...prepare(),
    ...toss(),
    ...ready(),
  };
};

// Compare to ES6 Class syntax which extends and super()
const createStuffedButteredCrustPizza = (pizza) => {
  return {
    ...pizza,
    ...stuff(),
    ...butter(),
  };
};

const anotherPizza = createPizza("medium", "thin", "original");
const somebodysPizza = createStuffedButteredCrustPizza(anotherPizza);
console.log(anotherPizza === somebodysPizza);
// console.log(anotherPizza);
// console.log(somebodysPizza);

const davesSalad = createSalad("side", "ranch");

somebodysPizza.bake();
somebodysPizza.stuff();
somebodysPizza.prepare();
console.log(somebodysPizza);
console.log(davesSalad);

// What about the toppings?
const addToppings = (pizza, toppings) => {
  pizza.toppings.push(toppings);
  return pizza;
};

// Shallow Clone
addToppings(anotherPizza, "pepperoni");
console.log(anotherPizza);
console.log(somebodysPizza);

// We need to clone the pizza object to avoid mutation
// Function composition:
const shallowPizzaClone = (fn) => {
  return (obj, array) => {
    const newObj = { ...obj };
    return fn(newObj, array);
  };
};

//const shallowPizzaClone = (fn) => (obj, array) => fn({ ...obj }, array);

let addNewToppings = (pizza, toppings) => {
  pizza.toppings = [...pizza.toppings, ...toppings];
  return pizza;
};

addNewToppings = shallowPizzaClone(addNewToppings);

// Decorate the addNewToppings fn with shallowPizzaClone
addToppings = shallowPizzaClone(addNewToppings);

const timsPizza = createPizza("medium", "thin", "original");
const timsPizzaWithToppings = addNewToppings(timsPizza, [
  "olives",
  "cheese",
  "pepperoni",
]);

console.log(timsPizzaWithToppings);
console.log(timsPizza);
console.log(timsPizza === timsPizzaWithToppings);
