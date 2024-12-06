const initApp = () => {
  const tbutton = document.querySelector("#throttle");
  tbutton.addEventListener("click", throttle(clickLog, 2000));
  window.addEventListener("scroll", throttle(scrollLog, 200));
};

const clickLog = () => console.log("click");
const scrollLog = () => console.log("scrolling");

document.addEventListener("DOMContentLoaded", initApp);

const throttle = (fn, delay) => {
  let lastTime = 0;
  console.log("called Throttle immediately");
  let id = 0;
  return (...args) => {
    id++;
    const now = new Date().getTime();
    if (now - lastTime < delay) return;
    lastTime = now;
    console.log(`event id: ${id}`);
    fn(...args);
  };
};
