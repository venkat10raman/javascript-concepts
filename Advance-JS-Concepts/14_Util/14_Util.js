// Utility Fns are time savers

// Abstract fns that you can use in many applications
// Not coupled to a data model or specific interface
// Like Batman's utility belt!

// Benefits:
// 1. Add additional fnality not built-in to Javascript
// 2. Reduce tediour typing down to a simple fn call

// #1
// proper case
const properCase = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

// #2 console log
const log = (content) => console.log(content);

log(properCase("vEnkAt"));

// #3 query selector with optional scope
const select = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

const body = select("body");
log(body);

// #4 addEventListener wrapper
const listen = (target, event, callback, capture = false) => {
  target.addEventListener(event, callback, !!capture);
};

const eventLog = (e) => console.log(e.target);

listen(body, "click", eventLog);

// #5 Sanitize input - use RegEx or try this
const sanitizeInput = (inputValue) => {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
};

const dirtyInput = "<script>alert('xss attack')</script>&othervalues";
const cleanInput = sanitizeInput(dirtyInput);
log(cleanInput);

// #6 Create an element with an optional CSS class
const createElement = (tag, className) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  return el;
};

const root = createElement("main", "root");
body.appendChild(root);

// #7 Delete all contents
const deleteChildElements = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

// deleteChildElements(body);

// #8 add class with optional query scope
