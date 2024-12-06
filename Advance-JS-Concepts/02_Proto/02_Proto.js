// Prototypal Inheritance and the Prototype Chain

// ES6 introduced classes which is the modern way to construct objects

// That said, prototypal inheritance and the prototype chain are:
// 1. "under the hood", (ES6 Classes are considered "syntactic sugar")
// 2. Often are asked in interview
// 3. and are useful to understand. the more you know the better you construct your code.

const person = {
  alive: true,
};

const musician = {
  plays: true,
};

console.log(musician.plays);
console.log(musician.alive);

// inheriting person attributes to musician
// person is the parent and musician is the child
// using below method is old method
musician.__proto__ = person;
console.log(musician.plays);
console.log(musician.alive);
console.log(musician);

// JS now has the getPrototypeOf and setPrototypeOf methods instead of using __proto__

const drummer = {
  plays: true,
};
Object.setPrototypeOf(drummer, person);
console.log(drummer);
console.log(Object.getPrototypeOf(drummer));
console.log(drummer.__proto__);
console.log(Object.getPrototypeOf(drummer) === drummer.__proto__);

// Extending the prototype chain => general to specific to more specific
// guitarist extends musician extends person
const guitarist = {
  strings: 6,
  __proto__: musician,
};

console.log(guitarist.alive);
console.log(guitarist.plays);
console.log(guitarist.strings);
console.log(guitarist);

// ------------------

// No circular references allowed (person.__proto__ can't be guitarist)
// the __proto__ value must be an object or null
// An object can only directly inherit from one object

// Object with getter and setter methods
const car = {
  doors: 2,
  seats: "vinyl",
  get seatMaterial() {
    return this.seats;
  },
  set seatMaterial(material) {
    this.seats = material;
  },
};

const luxuryCar = {};

// car is a parent object and luxuryCar is another object we make it child of car
Object.setPrototypeOf(luxuryCar, car);
luxuryCar.seatMaterial = "leather"; // Note keyword "this"
// now this refers to object that called seatMaterial setter
// car has its own seatMaterial , it is not overridden
console.log(luxuryCar);
console.log(luxuryCar.doors);
console.log(car);

// Walking up the chain - props and methods are not copied
console.log(luxuryCar.valueOf());

// Getting the keys of an Object
console.log(Object.keys(luxuryCar));

// loop through each object key
Object.keys(luxuryCar).forEach((key) => {
  console.log(key);
});

// But a for..in loop includes inherited props as well
for (const key in luxuryCar) {
  console.log(key);
}

// ------------------
// Object constructor
function Animal(species) {
  this.species = species;
  this.eats = true;
}

Animal.prototype.walks = function () {
  return `A ${this.species} is walking.`;
};

const Bear = new Animal("bear");

console.log(Bear.species);
console.log(Bear.walks);

// The prototype property is where inheritable props and methods are
console.log(Bear.__proto__);
console.log(Bear.__proto__ === Animal.prototype);
console.log(Animal.prototype);
console.log(Bear);

// ------------------
// Now an ES6 Classes example of inheritance

class Vehicle {
  constructor() {
    (this.wheels = 4), (this.motorized = true);
  }

  ready() {
    return "Ready to go!";
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    // before we use this in the child class constructor, we have to call super()
    super();
    this.wheels = 2;
  }

  wheelie() {
    return "On one wheel now!";
  }
}

const myBike = new Motorcycle();
console.log(myBike);
console.log(myBike.wheels);
console.log(myBike.ready());
console.log(myBike.wheelie());

const myTruck = new Vehicle();
console.log(myTruck);
console.log(myTruck.wheels);
console.log(myTruck.ready());
