/*I decided to refactor the code to clean up the clook of the code*/

const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
const numericCharacters = Array.from({ length: 10 }, (_, i) => String(i));
const lowerCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const upperCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const options = {
  specialCharacters,
  numericCharacters,
  lowerCasedCharacters,
  upperCasedCharacters,
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

/*Here I decided to change the way the password generator works as I felt the prompt at the top of the screen was not slear enough*/ 

const getPasswordOptions = () => {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 128;

  const length = document.getElementById('password-length').valueAsNumber;

  if (isNaN(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
    alert(`Length must be a valid number between ${MIN_LENGTH} and ${MAX_LENGTH}`);
    console.log(`Length must be a valid number between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
    return null;
  }

  const special = document.getElementById('specialCharacters').checked;
  const numeric = document.getElementById('numericCharacters').checked;
  const lowercase = document.getElementById('lowerCasedCharacters').checked;
  const uppercase = document.getElementById('upperCasedCharacters').checked;

  if (!lowercase && !uppercase && !numeric && !special) {
    alert("At least one character type must be selected.");
    console.log("At least one character type must be selected.");
    return null;
  }

  return { length, lowercase, uppercase, numeric, special };
};

const getSelectedOptions = (passwordOptions) => {
  const { lowercase, uppercase, numeric, special } = passwordOptions;
  const selectedOptions = [];

  if (lowercase) selectedOptions.push(...lowerCasedCharacters);
  if (uppercase) selectedOptions.push(...upperCasedCharacters);
  if (numeric) selectedOptions.push(...numericCharacters);
  if (special) selectedOptions.push(...specialCharacters);

  return selectedOptions;
};

const generatePassword = (length, selectedOptions) =>
  Array.from({ length }, () => getRandomElement(selectedOptions)).join('');

const writePassword = () => {
  const passwordOptions = getPasswordOptions();
  if (!passwordOptions) return;
  const selectedOptions = getSelectedOptions(passwordOptions);
  console.log("Password length: " + passwordOptions.length);
  const password = generatePassword(passwordOptions.length, selectedOptions);
  console.log("Password: " + password);
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
  passwordText.focus();
  passwordText.select();
  alert("Password generated successfully!");
};

const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', writePassword);


/*I added the script for a dark button instead of creating a seperate page*/
const darkBtn = document.getElementById("dark-btn");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

darkBtn.onclick = () => {
  darkBtn.classList.toggle("dark-btn-on");
  document.body.classList.toggle("dark-theme");

  if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
    sun.classList.add("d-none");
    moon.classList.remove("d-none");
  } else {
    localStorage.setItem("theme", "light");
    moon.classList.add("d-none");
    sun.classList.remove("d-none");
  }
};

if (localStorage.getItem("theme") == "light") {
  darkBtn.classList.remove("dark-btn-on");
  document.body.classList.remove("dark-theme");
  moon.classList.add("d-none");
  sun.classList.remove("d-none");
} else if (localStorage.getItem("theme") == "dark") {
  darkBtn.classList.add("dark-btn-on");
  document.body.classList.add("dark-theme");
  sun.classList.add("d-none");
  moon.classList.remove("d-none");
} else {
  localStorage.setItem("theme", "light");
  darkBtn.classList.remove("dark-btn-on");
  document.body.classList.remove("dark-theme");
  moon.classList.add("d-none");
  sun.classList.remove("d-none");
}

localStorage.getItem("theme");
