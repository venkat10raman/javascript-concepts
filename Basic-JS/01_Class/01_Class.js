class Pizza {
  constructor(pizzaType, pizzaSize) {
    this.size = pizzaSize;
    this.crust = "original";
    this.type = pizzaType;
    this.toppings = [];
  }

  getCrust() {
    return this.crust;
  }

  setCrust(pizzaCrust) {
    this.crust = pizzaCrust;
  }

  getToppings() {
    return this.toppings;
  }

  setToppings(topping) {
    this.toppings.push(topping);
  }

  bake() {
    console.log(
      `Baking a ${this.size} ${this.type} ${this.crust}  crust pizza`
    );
  }
}

const myPizza = new Pizza("pepperoni", "small");
myPizza.setCrust("thin");
myPizza.bake();
myPizza.setToppings("sausage");
myPizza.setToppings("olives");
console.log(myPizza.getToppings());

console.log("--------------------------");

class BasicPizza {
  constructor(pizzaSize) {
    //_ indicates private variables
    this._size = pizzaSize;
    this._crust = "original";
  }

  getCrust() {
    return this._crust;
  }

  setCrust(pizzaCrust) {
    this._crust = pizzaCrust;
  }
}

class SpecialPizza extends BasicPizza {
  constructor(pizzaSize) {
    super(pizzaSize);
    this.type = "The Works";
  }

  slice() {
    console.log(`Our ${this.type} ${this._size} pizza has 8 slices.`);
    console.log(`And it is of ${this.getCrust()} size`);
  }
}

const specialPizza = new SpecialPizza("medium");
specialPizza.slice();

console.log("--------------------------");

function pizzaFactory(pizzaSize) {
  const crust = "original";
  const size = pizzaSize;
  return {
    bake: () => console.log(`Baking a ${size} ${crust} crust pizza.`),
  };
}

const pizza1 = pizzaFactory("small");
pizza1.bake();

console.log("--------------------------");

class SimplePizza {
  // public field
  crust = "original";
  // privte field
  #sause = "traditional";
  #size;
  constructor(pizzaSize) {
    this.#size = pizzaSize;
  }

  getCrust() {
    return this.crust;
  }

  setCrust(pizzaCrust) {
    this.crust = pizzaCrust;
  }

  getSause() {
    return this.#sause;
  }

  hereYouGo() {
    console.log(
      `Here's your ${this.crust} ${this.#sause} sause ${this.#size} pizza.`
    );
  }
}

const pizza2 = new SimplePizza("large");
pizza2.hereYouGo();
console.log(pizza2.crust);
console.log(pizza2.getCrust());
console.log(pizza2.sause);
console.log(pizza2.getSause());
