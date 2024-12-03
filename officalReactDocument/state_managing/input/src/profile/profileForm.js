// 챌린지 3 of 3: 명령형 코드를 React 없이 리팩토링하기

// React 없이 명령형으로 작성된 챌린지 이전 코드

// function handleFormSubmit(e) {
//   e.preventDefault();

//   if (editButton.textContent === "Edit Profile") {
//     editButton.textContent = "Save Profile";
//     hide(firstNameText);
//     hide(lastNameText);
//     show(firstNameInput);
//     show(lastNameInput);
//   } else {
//     editButton.textContent = "Edit Profile";
//     hide(firstNameInput);
//     hide(lastNameInput);
//     show(firstNameText);
//     show(lastNameText);
//   }
// }

// function handleFirstNameChange() {
//   firstNameText.textContent = firstNameInput.value;
//   updateHelloText();
// }

// function handleLastNameChange() {
//   lastNameText.textContent = lastNameInput.value;
//   updateHelloText();
// }

// function updateHelloText() {
//   helloText.textContent = `Hello ${firstNameInput.value} ${lastNameInput.value}!`;
// }

// function hide(el) {
//   el.style.display = "none";
// }

// function show(el) {
//   el.style.display = "";
// }

// let form = document.getElementById("form");
// let profile = document.getElementById("profile");
// let editButton = document.getElementById("editButton");
// let firstNameInput = document.getElementById("firstNameInput");
// let firstNameText = document.getElementById("firstNameText");
// let lastNameInput = document.getElementById("lastNameInput");
// let lastNameText = document.getElementById("lastNameText");
// let helloText = document.getElementById("helloText");

// form.onsubmit = handleFormSubmit;
// firstNameInput.oninput = handleFirstNameChange;
// lastNameInput.oninput = handleLastNameChange;

// 위 로직을  조금 더 견고하고 React와 비슷하게 리팩토링

let firstName = "Jane";
let lastName = "Jacobs";
let isEditing = false;

function handleFormSubmit(e) {
  e.preventDefault();
  setIsEditing(!isEditing);
}

function handleFirstNameChange(e) {
  setFirstName(e.target.value);
}

function handleLastNameChange(e) {
  setLastName(e.target.value);
}

function setFirstName(value) {
  firstName = value;
  updateDOM();
}

function setLastName(value) {
  lastName = value;
  updateDOM();
}

function setIsEditing(value) {
  isEditing = value;
  updateDOM();
}

function updateDOM() {
  if (isEditing) {
    button.textContent = "Save Profile";
    // TODO: 인풋을 보여주고 텍스트는 숨깁니다.
  } else {
    button.textContent = "Edit Profile";
    // TODO: 인풋을 숨기고 텍스트를 보여줍니다.
  }
  // TODO: 텍스트 라벨을 업데이트합니다.
}

function hide(el) {
  el.style.display = "none";
}

function show(el) {
  el.style.display = "";
}

let form = document.getElementById("form");
let profile = document.getElementById("profile");
let editButton = document.getElementById("editButton");
let firstNameInput = document.getElementById("firstNameInput");
let firstNameText = document.getElementById("firstNameText");
let lastNameInput = document.getElementById("lastNameInput");
let helloText = document.getElementById("helloText");
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
