console.log("Stop Propagation");

const card = document.getElementById("card");
const btn = document.getElementById("button");

card.addEventListener("click", (event) => {
  console.log("clicked on card");
});

btn.addEventListener("click", (event) => {
  console.log("clicked on button");
  event.stopImmediatePropagation();
});
btn.addEventListener("click", (event) => {
  console.log("clicked on button continued");
});
