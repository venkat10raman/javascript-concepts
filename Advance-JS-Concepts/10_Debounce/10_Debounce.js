const initApp = () => {
  const button = document.querySelector("button");
  //button.addEventListener("click", debounce(clickLog,2000));

  button.addEventListener("click", () => {
    clickLog();
    button.disabled = true;
    setTimeout(() => (button.disabled = false), 2000);
  });
};

const clickLog = () => console.log(`clicked`);
document.addEventListener("DOMContentLoaded", initApp);

const debounce = (fn, delay) => {
  let id;
  console.log(`id at immiediate load: ${id}`);
  return (...args) => {
    console.log(`previous id: ${id}`);
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
