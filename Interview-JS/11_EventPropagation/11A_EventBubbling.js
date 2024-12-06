console.log("Event Bubbling");

const card = document.getElementById("card");
const btn = document.getElementById("button");

card.addEventListener("click", (event) => {
  console.log("clicked on card");

  console.log(`currentTarget :: ${event.currentTarget.tagName}`);

  // helps in finding origin of bubbling
  console.log(`Target :: ${event.target.tagName}`);

  // this works same as currentTarget
  console.log(`this :: ${this.tagName}`);
  // this does not work in this case bcoz it is an arrow function
});

btn.addEventListener("click", function (event) {
  console.log("clicked on button");

  console.log(`currentTarget :: ${event.currentTarget.tagName}`);

  // helps in finding origin of bubbling
  console.log(`Target :: ${event.target.tagName}`);

  // this works same as currentTarget
  console.log(`this :: ${this.tagName}`);
});
