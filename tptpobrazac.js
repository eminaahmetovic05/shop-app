let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Klikno si");

  document.querySelectorAll(".input").forEach((element) => {
    element.style.borderBottom = "1px solid #000";
  });

  document.querySelector(".submit-error").textContent = "";

  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let phoneNum = document.getElementById("phone-num");
  let email = document.getElementById("email");
  let textArea = document.querySelector(".textarea");

  textArea.style.border = "1px solid #000";

  let isValid = true;

  if (firstName.value.trim() === "") {
    isValid = false;
    firstName.style.borderBottom = "1px solid red";
  }

  if (lastName.value.trim() === "") {
    isValid = false;
    lastName.style.borderBottom = "1px solid red";
  }

  if (phoneNum.value.trim() === "") {
    isValid = false;
    phoneNum.style.borderBottom = "1px solid red";
  } else {
    let phonePattern = /^\d{9}$/;
    if (!phonePattern.test(phoneNum.value)) {
      isValid = false;
      phoneNum.style.borderBottom = "1px solid red";
    }
  }

  if (email.value.trim() === "") {
    isValid = false;
    email.style.borderBottom = "1px solid red";
  } else {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      isValid = false;
      email.style.borderBottom = "1px solid red";
    }
  }

  if (textArea.value.trim() === "") {
    isValid = false;
    console.log("Doso je do ovdje");
    textArea.style.border = "1px solid red";
  }

  if (isValid) {
    form.submit();
  } else {
    document.querySelector(".submit-error").textContent =
      "Sva polja moraju biti ispunjena!";
  }
});
