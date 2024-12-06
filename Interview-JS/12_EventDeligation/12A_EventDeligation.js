console.log("Event Delegation");

const table = document.getElementById("timesheet");
const submitBtn = document.getElementById("submit");

const filledHours = {};
table.addEventListener("click", (e) => {
  //   console.log(e);
  console.log(e.target.innerText);
});
table.addEventListener("input", (e) => {
  filledHours[e.target.name] = e.target.value;
});

submitBtn.addEventListener("click", (e) => {
  console.log(filledHours);
});
