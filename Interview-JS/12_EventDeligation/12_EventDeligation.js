document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log("readyState: complete");
    initApp();
  }
});

const initApp = () => {
  document.querySelector(".products").addEventListener("click", (event) => {
    console.log(event);
    console.log(event.target);

    if (event.target.tagName === "SPAN") {
      window.location.href += "/" + event.target.className;
    }
  });
};
