const initApp = async () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    processUserInput();
  });
};

document.addEventListener("DOMContentLoaded", initApp);

const processUserInput = () => {
  const rawData = document.querySelector("input").value;
  const cleanData = sanitizeInput(rawData);
  const h1 = document.querySelector("h1");
  h1.innerHTML = cleanData;
};

const sanitizeInput = (inputValue) => {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
};
