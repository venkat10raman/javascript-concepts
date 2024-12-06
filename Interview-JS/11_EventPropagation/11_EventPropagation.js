const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");

/*
div.addEventListener("click", function () {
  console.log("div");
});
form.addEventListener("click", function () {
  console.log("form");
});
button.addEventListener("click", function () {
  console.log("button");
});

 */

// event.currentTarget vs target vs this

/* 
div.addEventListener("click", func);
form.addEventListener("click", func);
button.addEventListener("click", func);
function func(event) {
  console.log(`currentTarget :: ${event.currentTarget.tagName}`);

  //helps in finding origin of bubbling
  console.log(`Target :: ${event.target.tagName}`);

  //this works same as currentTarget
  console.log(`this :: ${this.tagName}`);
}
*/

// What is event capturing/trickling
// inverting the event bubbling is called capturing
// here event bubbling happens from top to bottom

div.addEventListener("click", func, { capture: true });
form.addEventListener("click", func, { capture: true });
button.addEventListener("click", func, { capture: true });
function func(event) {
  console.log(`currentTarget :: ${event.currentTarget.tagName}`);

  //helps in finding origin of bubbling
  console.log(`Target :: ${event.target.tagName}`);

  //this works same as currentTarget
  console.log(`this :: ${this.tagName}`);

  // How to stop bubbling or capturing?
  event.stopPropagation();
}
