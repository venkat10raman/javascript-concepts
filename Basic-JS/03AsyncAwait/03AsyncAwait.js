const userObj = {
  userList: [],
};

const myCoolFunction = async () => {
  const response = await fetch("https:jsonplaceholder.typicode.com/users");
  const jsonUserData = await response.json();
  // console.log("+++++++++++++");
  // console.log(jsonUserData);
  return jsonUserData;
};

myCoolFunction();
console.log(myCoolFunction());

const anotherFunc = async () => {
  const data = await myCoolFunction();
  console.log("+++++++++++++");
  console.log(data);
  userObj.userList = data;
  console.log("-------------");
  console.log(userObj.userList);
};

anotherFunc();
console.log(userObj.userList);

// 2nd parameter of Fetch is a object

const getAllUserEmails = async () => {
  const response = await fetch("https:jsonplaceholder.typicode.com/users");
  const jsonUserData = await response.json();
  const userEmailArray = jsonUserData.map((user) => user.email);

  postToWebPage(userEmailArray);
};

const postToWebPage = (data) => {
  console.log(data);
};

getAllUserEmails();

const getDadJoke = async () => {
  const response = await fetch("https:icanhazdadjoke.com", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const jsonJokeData = await response.json();
  console.log(jsonJokeData);
};

getDadJoke();

const jokeObject = {
  id: "oin8734rlkjdflsk",
  joke: "Why was it called the dark ages? Because of all the knights.",
};

const postJokeData = async (jokeObj) => {
  const response = await fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObj),
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
};

postJokeData(jokeObject);

const requestJoke = async (firstName, lastName) => {
  const response = await fetch(
    `https://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
  );
  const jsonResponse = await response.json();
  console.log(jsonResponse.value.joke);
};

requestJoke("Bruce", "Lee");
