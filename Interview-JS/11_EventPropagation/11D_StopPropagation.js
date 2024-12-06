console.log("Stop Propagation");

const card = document.getElementById("card");
const btn = document.getElementById("button");

card.addEventListener(
  "click",
  (event) => {
    console.log("clicked on card");
    event.stopPropagation();
  },
  true
);

btn.addEventListener(
  "click",
  (event) => {
    console.log("clicked on button");
  },
  true
);
btn.addEventListener(
  "click",
  (event) => {
    console.log("clicked on button continued");
  },
  true
);
