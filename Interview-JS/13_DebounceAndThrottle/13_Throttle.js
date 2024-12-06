const throttle = function (func, limit) {
  let isThrottling;
  return function () {
    const args = arguments;
    const ctx = this;
    if (!isThrottling) {
      func.apply(null, arguments);
      isThrottling = true;
      setTimeout(() => (isThrottling = false), limit);
    }
  };
};

function shoot() {
  console.log("Function called");
}

const throttledShoot = throttle(shoot, 500);

document.getElementById("myButton").addEventListener("click", () => {
  throttledShoot();
});
