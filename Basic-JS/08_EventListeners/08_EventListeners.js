// Syntax: addEventListener(event, function, useCapture)

const doSomething = () => {
  alert("doing something");
};

/* 
h2.addEventListener("click", (event) => {
  console.log(event.target);
  event.target.textContent = "Clicked";
});
*/

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log("readyState: complete");
    initApp();
  }
});

const initApp = () => {
  const view = document.querySelector("#view2");
  const div = view.querySelector("div");
  const h2 = div.querySelector("h2");

  h2.addEventListener("click", doSomething, false);
  h2.removeEventListener("click", doSomething, false);

  view.style.display = "flex";
  view.addEventListener(
    "click",
    (event) => {
      //   view.style.backgroundColor = "purple";
      event.target.style.backgroundColor = "purple";
    },
    false
  );
  div.addEventListener(
    "click",
    (event) => {
      //   event.stopPropagation();
      //   div.style.backgroundColor = "blue";
      event.target.style.backgroundColor = "blue";
    },
    false
  );
  h2.addEventListener(
    "click",
    (event) => {
      event.target.textContent = "Clicked";
    },
    false
  );
};
