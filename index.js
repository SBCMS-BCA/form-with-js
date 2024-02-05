const form = document.querySelector("form");
const error = document.querySelector("#error");
const inputs = document.querySelectorAll("input");
const user = document.querySelector("#user");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.id === "user") {
      const value = input.value;
      input.value = value.toUpperCase();
    }
    inputValidate(input.id, input);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    alert("Form Submitted Successfully");
    form.reset();
  }
});

const errorMessage = (value) => (error.textContent = value);

const validateForm = () => {
  const inputs = ["user", "email", "pass"];
  return inputs.every((id) =>
    inputValidate(id, document.querySelector(`#${id}`))
  );
};

const inputValidate = (id, input) => {
  const message = {
    user: "Name is Required",
    email: "Email is Required",
    pass: "Password is Required",
  };

  if (input.value.trim() === "") {
    errorMessage(message[id]);
    return false;
  }

  switch (id) {
    case "email":
      if (!emailValid(input.value)) {
        errorMessage("Invalid Email Format");
        return false;
      }
    case "pass":
      if (input.value.length < 8) {
        errorMessage("Password must be 8 characters");
        return false;
      }
  }
  errorMessage("");
  return true;
};

const emailValid = (data) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data);
