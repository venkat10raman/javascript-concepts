// Web Storage API

// Not part of the DOM - refers to the Window API
// Available to JS via the global variable: window

// We do not have to type window. It is implied:

/*
window.alert(window.location);
alert(location);

window.alert("ok!");
alert("ok!");
*/

const myObject = {
  name: "Dave",
  hobbies: ["eat", "sleep", "code"],
  logName: function () {
    console.log(this.name);
  },
};

const myArray = ["eat", "sleep", "code"];

sessionStorage.setItem("myObject", myObject);
const mySessionObj = sessionStorage.getItem("myObject");
console.log(mySessionObj);
console.log(typeof mySessionObj);

sessionStorage.setItem("myArray", myArray);
const mySessionArray = sessionStorage.getItem("myArray");
console.log(mySessionArray);
console.log(typeof mySessionArray);

sessionStorage.setItem("myObject", JSON.stringify(myObject));
const mso1 = JSON.parse(sessionStorage.getItem("myObject"));
console.log(mso1);
console.log(typeof mso1);

sessionStorage.setItem("myArray", JSON.stringify(myArray));
const msa1 = JSON.parse(sessionStorage.getItem("myArray"));
console.log(msa1);
console.log(typeof msa1);

sessionStorage.removeItem("myObject");
sessionStorage.removeItem("myArray");

localStorage.setItem("myObject", JSON.stringify(myObject));
const lso1 = JSON.parse(localStorage.getItem("myObject"));
console.log(lso1);
console.log(typeof lso1);

localStorage.setItem("myArray", JSON.stringify(myArray));
const lsa1 = JSON.parse(localStorage.getItem("myArray"));
console.log(lsa1);
console.log(typeof lsa1);

localStorage.removeItem("myObject");
localStorage.removeItem("myArray");
