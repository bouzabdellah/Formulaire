const form = document.getElementById("registrationForm");
const responseDiv = document.getElementById("response");
const clearBtn = document.getElementById("clearBtn");
const exampleInfoDiv = document.getElementById("exampleInfo");

const registeredInfo = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.email.value;
  const telephone = form.telephone.value;
  const date = form.date.value;
  const text = form.text.value;

  let hasErrors = false;

  if (!isValidEmail(email)) {
    showError("Veuillez ecrire l'email .", "email");
    hasErrors = true;
  }
  if (!isValidTelephone(telephone)) {
    showError("Veuillez ecrire le num de telephone.", "telephone");
    hasErrors = true;
  }
  if (!isValidDate(date)) {
    showError("Veuillez ecrire une date entre 2000 et 2024.", "date");
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }

  const info = {
    email,
    telephone,
    date,
    text
  };

  registeredInfo.push(info);

  const responseText = generateResponseMessage();
  responseDiv.innerHTML = responseText;
  responseDiv.style.display = "block";
  responseDiv.style.backgroundColor = "red"; /* Couleur de background pour le message */
  responseDiv.style.color = "white";

  clearFormInputs();
});

clearBtn.addEventListener("click", () => {
  clearFormInputs();
  responseDiv.style.display = "none";
});

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidTelephone(telephone) {
  const telephonePattern = /^(|06|07)\d{8}$/;
  return telephonePattern.test(telephone);
}

function isValidDate(date) {

    const minDate = new Date("2000-01-01");
  const maxDate = new Date("2024-12-31");
  const selectedDate = new Date(date);
  return selectedDate >= minDate && selectedDate <= maxDate;
}



function showError(message, field) {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  errorDiv.classList.add("error-message");

  const inputField = document.getElementById(field);
  inputField.insertAdjacentElement("afterend", errorDiv);
}

function clearFormInputs() {
  form.email.value = "";
  form.telephone.value = "";
  form.date.value = "";
  form.text.value = "";

  const errorMessages = document.getElementsByClassName("error-message");
  while (errorMessages.length > 0) {
    errorMessages[0].remove();
  }
}

function generateResponseMessage() {
  if (registeredInfo.length === 0) {
    return "No registrations yet.";
  }

  const responseText = registeredInfo.map((info) => {
    return `
      Email: ${info.email}<br>
      Telephone: ${info.telephone}<br>
      Date: ${info.date}<br>
      Text: ${info.text}<br><br>
    `;
  }).join('');

  return `Merci pour votre inscription!<br><br>Voici votre formation:<br><br>${responseText}`;
}
